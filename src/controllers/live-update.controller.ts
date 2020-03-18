import {inject} from '@loopback/context';
import {USState} from '../domain/Territory';
import {CaseNumberRepository, CountyRepository, UsStatesRepository} from '../repositories';

export class LiveUpdateController {
  constructor(
    @inject('repositories.UsStatesRepository') private usStatesRepository: UsStatesRepository,
    @inject('repositories.CaseNumberRepository') private caseNumberRepository: CaseNumberRepository,
    @inject('repositories.CountyRepository') private countyRepository: CountyRepository
  ) {}

  async liveUpdateStateData() {
    const allStates = await this.usStatesRepository.find()

    for (let state of allStates) {
      console.log(state)
      switch (state.name) {
        case (USState.Wisconsin):
          //this.liveUpdateWI(state)
          break
        case (USState.Minnesota):
          this.liveUpdateMN(state)
          break
      }
    }

    console.log('Finish live update state data')
  }

  async liveUpdateCountryData() {
    const cheerio = require('cheerio')
    const axios = require('axios')

    await axios.get('https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html').then((response: any) => {
      const $ = cheerio.load(response.data)
      const allData = $('div .card-body.bg-white ul li').text().trim()

      const iTotalCases = allData.indexOf('Total cases: ') + 'Total cases: '.length
      const iTotalCasesEnd = allData.indexOf('Total deaths: ')
      const iTotalDeaths = allData.indexOf('Total deaths: ') + 'Total deaths: '.length
      const iTotalDeathsEnd = allData.indexOf('Jurisdictions reporting cases: ')

      const totalCase = allData.substring(iTotalCases, iTotalCasesEnd)
      const totalDeath = allData.substring(iTotalDeaths, iTotalDeathsEnd)

      console.log(totalCase)
      console.log(totalDeath)
      console.log(this.getCurrentDateTime())
    })
  }

  getCurrentDateTime(): string {
    var today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

    return date + ' ' + time
  }


  isNumeric(c: string): Boolean {
    return /^[0-9]*$/.test(c)
  }

  isSpecialChar(c: string): Boolean {
    return c == ' ' || c == ':'
  }

  isAlphabet(c: string): Boolean {
    return /^[a-zA-Z()]+$/.test(c) || this.isSpecialChar(c)
  }

  async liveUpdateWI(state: any) {
    const cheerio = require('cheerio')
    const axios = require('axios')

    let stateUrl = state.url, stateId = state.id
    let stateMapData: Map<string, number> = new Map()
    let countyMapData: Map<string, number> = new Map()
    const stateConst = ['Positive', 'Death']
    let allCounties = await this.countyRepository.find({
      where: {
        usStateId: stateId
      }
    })
    const allCountieName = allCounties.map(state => state.name)
    console.log(allCounties)

    await axios.get(stateUrl).then((response: any) => {
      const $ = cheerio.load(response.data)
      const allData = $('td').text()

      let buildingVal = false, key = '', data = ''

      console.log(allData)

      for (let i = 0; i < allData.length; i++) {
        let c = allData.substring(i, i + 1)
        if (this.isAlphabet(c)) {
          if (buildingVal) {
            if (stateConst.includes(key)) {
              stateMapData.set(key, parseInt(data))
            } else {
              countyMapData.set(key, parseInt(data))
            }
            key = '', data = '', buildingVal = false
          }
          key += c
        }
        if (this.isNumeric(c)) {
          buildingVal = true
          data += c
        }
      }
    })

    console.log(stateMapData)
    console.log(countyMapData)

    // for (let medicalType of stateConst) {
    //   console.log(medicalType)
    //   this.caseNumberRepository.create(new CaseNumber({
    //     'no': stateMapData.get(medicalType) ? stateMapData.get(medicalType) : -1,
    //     'medicalType': MedicalType.medicalType,
    //     'territoryType': Territory.USSTATE.toString(),
    //     'territoryId': stateId,
    //     'timeStampt': Date.now().toString()
    //   }))
    // }

    // for (let countyName of countyMapData.keys()) {
    //   if (!allCountieName.includes(countyName)) {
    //     this.countyRepository.create(new County({
    //       'name': countyName,
    //       'usStateId': stateId
    //     }))
    //   }
    //   this.caseNumberRepository.create(new CaseNumber({
    //     'no': countyMapData.get(countyName),
    //     'medicalType': 'Total',
    //     'territoryType': Territory.USCOUNTY.toString(),
    //     'territoryId': stateId,
    //     'timeStampt': Date.now().toString()
    //   }))
    // }
  }

  async liveUpdateMN(state: any) {
    console.log('run mnke')
    const cheerio = require('cheerio')
    const axios = require('axios')

    let stateUrl = state.url, stateId = state.id

    await axios.get(stateUrl).then((response: any) => {
      const $ = cheerio.load(response.data)
      const allData = $('div ul li').text().trim()
      let noTested = '', noPositive = '', countiesStr = ''

      let iTested = allData.indexOf('Approximate number of patients tested: ') + 39
      let iTestedEnd = allData.indexOf('Positive: ')
      let iPositive = iTestedEnd + 'Positive: '.length
      let iPositiveEnd = allData.indexOf('Counties with cases: ')
      let iCounty = iPositiveEnd + 'Counties with cases: '.length
      let iCountyEnd = allData.indexOf("2020 News Releases")

      noTested = allData.substring(iTested, iTestedEnd)
      noPositive = allData.substring(iPositive, iPositiveEnd)
      countiesStr = allData.substring(iCounty, iCountyEnd)

      console.log('tested' + noTested)
      console.log('pos' + noPositive)
      console.log('countries' + countiesStr.split(', '))
    })
  }
}
