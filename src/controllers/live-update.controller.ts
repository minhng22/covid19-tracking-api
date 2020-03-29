import {inject} from '@loopback/context';
import {MedicalType} from '../domain/Medical';
import {Territory, USState} from '../domain/Territory';
import {CaseNumber} from '../models';
import {CaseNumberRepository, CountryRepository, CountyRepository, UsStatesRepository} from '../repositories';

const file = require('fs')

export class LiveUpdateController {
  constructor(
    @inject('repositories.UsStatesRepository') private usStatesRepository: UsStatesRepository,
    @inject('repositories.CaseNumberRepository') private caseNumberRepository: CaseNumberRepository,
    @inject('repositories.CountyRepository') private countyRepository: CountyRepository,
    @inject('repositories.CountryRepository') private countryRepository: CountryRepository
  ) {}

  async liveUpdateStateData() {
    const allStates = await this.usStatesRepository.find()

    for (let state of allStates) {
      console.log(state)
      switch (state.name) {
        case (USState.Wisconsin):
          await this.liveUpdateTotalTable(state)
          break
        case (USState.Minnesota):
          await this.liveUpdateMN(state)
          break
        case (USState.Washington):
          await this.liveUpdateTotalTable(state)
          break
        case (USState.New_York):
          //await this.liveUpdateNY(state)
          break
        case (USState.California):
          // await this.liveUpdateCA(state)
          break
      }
    }

    console.log('Finish live update state data')
  }

  async liveUpdateCA(state: any) {
    console.log('Updating state ' + state.name)
    const puppeteer = require('puppeteer')

    const b = await puppeteer.launch()
    b.on('disconnected', () => {
      console.log('disconnected browerw')
    })
    const p = await b.newPage()

    await p.goto(state.url)

    p.setDefaultNavigationTimeout(0);
    p.setRequestInterception(true);

    p.on('request', async (request: any) => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media') {
        request.abort();
      } else {
        request.continue();
      }
    });

    await p.goto(state.url)

    await p.waitForXPath("//li[contains(., 'Positive:')]", 5000)
    const positive = await p.$x("//li[contains(., 'Positive:')]")
    const positiveText = this.extractInteger(String(await this.innerText(p, positive[0])))

    await console.log('positive national ' + positiveText)

    await p.waitForXPath("//p[contains(., 'there are a total of:')]", 5000)
    const death = await p.$x("//p[contains(., 'there are a total of:')]")
    const deathText = this.extractInteger(String(await this.innerText(p, death[0])))

    await console.log('death national ' + deathText)
  }

  async liveUpdateNY(state: any) {
    console.log('Updating state ' + state.name)
    const puppeteer = require('puppeteer')

    const b = await puppeteer.launch()
    b.on('disconnected', () => {
      console.log('disconnected browerw')
    })
    const p = await b.newPage()

    await p.goto(state.url)

    p.setDefaultNavigationTimeout(0);
    p.setRequestInterception(true);

    p.on('request', async (request: any) => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media') {
        request.abort();
      } else {
        request.continue();
      }
    });

    await p.goto(state.url)

    await p.waitForXPath("//td[contains(., 'Total Number of Positive Cases')]", 5000)
    const total = await p.$x("//td[contains(., 'Total Number of Positive Cases')]")

    const positive = await this.nextEl(p, total[0])
    const posText = this.extractInteger(String(await this.innerText(p, positive)))
    await console.log('positive: ' + posText)

    // this.caseNumberRepository.create(new CaseNumber({
    //   'no': posText ? posText : -1,
    //   'medicalType': MedicalType.Positive,
    //   'territoryType': Territory.USSTATE.toString(),
    //   'territoryId': state.id,
    //   'timeStampt': this.getCurrentDateTime()
    // }))

    // const death = await this.nextEl(p, positive)
    // const deathText = this.extractInteger(String(await this.innerText(p, death)))
    // console.log('death: ' + deathText)

    // this.caseNumberRepository.create(new CaseNumber({
    //   'no': deathText ? deathText : -1,
    //   'medicalType': MedicalType.Death,
    //   'territoryType': Territory.USSTATE.toString(),
    //   'territoryId': state.id,
    //   'timeStampt': this.getCurrentDateTime()
    // }))

    await b.close()
  }

  async liveUpdateTotalTable(state: any) {
    console.log('Updating state ' + state.name)
    const puppeteer = require('puppeteer')

    const b = await puppeteer.launch()
    b.on('disconnected', () => {
      console.log('disconnected browerw')
    })
    const p = await b.newPage()

    await p.goto(state.url)

    p.setDefaultNavigationTimeout(0);
    p.setRequestInterception(true);

    p.on('request', async (request: any) => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media') {
        request.abort();
      } else {
        request.continue();
      }
    });

    await p.goto(state.url)

    await p.waitForXPath("//td[contains(., 'Total')]", 5000)
    const total = await p.$x("//td[contains(., 'Total')]")

    const positive = await this.nextEl(p, total[0])
    const posText = this.extractInteger(String(await this.innerText(p, positive)))
    console.log('positive: ' + posText)

    this.caseNumberRepository.create(new CaseNumber({
      'no': posText ? posText : -1,
      'medicalType': MedicalType.Positive,
      'territoryType': Territory.USSTATE.toString(),
      'territoryId': state.id,
      'timeStampt': this.getCurrentDateTime()
    }))

    const death = await this.nextEl(p, positive)
    const deathText = this.extractInteger(String(await this.innerText(p, death)))
    console.log('death: ' + deathText)

    this.caseNumberRepository.create(new CaseNumber({
      'no': deathText ? deathText : -1,
      'medicalType': MedicalType.Death,
      'territoryType': Territory.USSTATE.toString(),
      'territoryId': state.id,
      'timeStampt': this.getCurrentDateTime()
    }))

    await b.close()
  }

  extractInteger(chars: string): number {
    let ex = ''
    for (let c of chars) {
      if (this.isNumeric(c)) {
        ex += c
      }
    }
    return parseInt(ex)
  }

  async liveUpdateCountryData() {
    const cheerio = require('cheerio')
    const axios = require('axios')

    const allCountries = await this.countryRepository.find()
    for (let country of allCountries) {
      await this.liveUpdateText(country)
    }
  }

  async innerText(page: any, elementHandle: any) {
    return await page.evaluate((el: any) => el.innerText, elementHandle)
  }

  async nextEl(page: any, elementHandle: any) {
    return await page.evaluateHandle((el: any) => el.nextElementSibling, elementHandle)
  }

  getCurrentDateTime(): string {
    var today = new Date()
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
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

  async liveUpdateMN(state: any) {
    console.log('Updating state ' + state.name)
    const puppeteer = require('puppeteer')

    const b = await puppeteer.launch()
    b.on('disconnected', () => {
      console.log('disconnected browerw')
    })
    const p = await b.newPage()

    await p.goto(state.url)

    p.setDefaultNavigationTimeout(0);
    p.setRequestInterception(true);

    p.on('request', async (request: any) => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media') {
        request.abort();
      } else {
        request.continue();
      }
    });

    await p.goto(state.url)

    await p.waitForXPath("//li[contains(., 'Positive:')]", 5000)
    const positive = await p.$x("//li[contains(., 'Positive:')]")
    const positiveText = this.extractInteger(String(await this.innerText(p, positive[0])))

    await console.log('positive national ' + positiveText)

    await p.waitForXPath("//li[contains(., 'Deaths:')]", 5000)
    const death = await p.$x("//li[contains(., 'Deaths:')]")
    const deathText = this.extractInteger(String(await this.innerText(p, death[0])))

    await console.log('death national ' + deathText)

    await this.caseNumberRepository.create(new CaseNumber({
      'no': positiveText ? positiveText : -1,
      'medicalType': MedicalType.Positive,
      'territoryType': Territory.COUNTRY,
      'territoryId': state.id,
      'timeStampt': this.getCurrentDateTime()
    }))

    await this.caseNumberRepository.create(new CaseNumber({
      'no': deathText ? deathText : -1,
      'medicalType': MedicalType.Death,
      'territoryType': Territory.COUNTRY,
      'territoryId': state.id,
      'timeStampt': this.getCurrentDateTime()
    }))

    await b.close()
  }

  async updateArticleDB() {
    console.log('here')
    let stateUrl = 'https://doi.org/' + '10.1016/j.idm.2020.02.001'
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    await page.pdf({path: 'hn.pdf', format: 'A4'});

    await browser.close();
  }

  async liveUpdateText(state: any) {
    console.log('Updating state ' + state.name)
    const puppeteer = require('puppeteer')

    const b = await puppeteer.launch()
    b.on('disconnected', () => {
      console.log('disconnected browerw')
    })
    const p = await b.newPage()

    await p.goto(state.url)

    p.setDefaultNavigationTimeout(0);
    p.setRequestInterception(true);

    p.on('request', async (request: any) => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media') {
        request.abort();
      } else {
        request.continue();
      }
    });

    await p.goto(state.url)

    await p.waitForXPath("//li[contains(., 'Total cases:')]", 5000)
    const positive = await p.$x("//li[contains(., 'Total cases:')]")
    const positiveText = this.extractInteger(String(await this.innerText(p, positive[0])))

    await console.log('positive national ' + positiveText)

    await p.waitForXPath("//li[contains(., 'Total deaths:')]", 5000)
    const death = await p.$x("//li[contains(., 'Total deaths:')]")
    const deathText = this.extractInteger(String(await this.innerText(p, death[0])))

    await console.log('death national ' + deathText)

    await this.caseNumberRepository.create(new CaseNumber({
      'no': positiveText ? positiveText : -1,
      'medicalType': MedicalType.Positive,
      'territoryType': Territory.COUNTRY,
      'territoryId': state.id,
      'timeStampt': this.getCurrentDateTime()
    }))

    await this.caseNumberRepository.create(new CaseNumber({
      'no': deathText ? deathText : -1,
      'medicalType': MedicalType.Death,
      'territoryType': Territory.COUNTRY,
      'territoryId': state.id,
      'timeStampt': this.getCurrentDateTime()
    }))

    await b.close()
  }
}
