"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const Medical_1 = require("../domain/Medical");
const Territory_1 = require("../domain/Territory");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const file = require('fs');
let LiveUpdateController = class LiveUpdateController {
    constructor(usStatesRepository, caseNumberRepository, countyRepository, countryRepository) {
        this.usStatesRepository = usStatesRepository;
        this.caseNumberRepository = caseNumberRepository;
        this.countyRepository = countyRepository;
        this.countryRepository = countryRepository;
    }
    async liveUpdateStateData() {
        const allStates = await this.usStatesRepository.find();
        for (let state of allStates) {
            console.log(state);
            switch (state.name) {
                case (Territory_1.USState.Wisconsin):
                    await this.liveUpdateTotalTable(state);
                    break;
                case (Territory_1.USState.Minnesota):
                    await this.liveUpdateMN(state);
                    break;
                case (Territory_1.USState.Washington):
                    await this.liveUpdateTotalTable(state);
                    break;
                case (Territory_1.USState.New_York):
                    //await this.liveUpdateNY(state)
                    break;
                case (Territory_1.USState.California):
                    // await this.liveUpdateCA(state)
                    break;
            }
        }
        console.log('Finish live update state data');
    }
    async liveUpdateCA(state) {
        console.log('Updating state ' + state.name);
        const puppeteer = require('puppeteer');
        const b = await puppeteer.launch();
        b.on('disconnected', () => {
            console.log('disconnected browerw');
        });
        const p = await b.newPage();
        await p.goto(state.url);
        p.setDefaultNavigationTimeout(0);
        p.setRequestInterception(true);
        p.on('request', async (request) => {
            if (request.resourceType() === 'image' || request.resourceType() === 'media') {
                request.abort();
            }
            else {
                request.continue();
            }
        });
        await p.goto(state.url);
        await p.waitForXPath("//li[contains(., 'Positive:')]", 5000);
        const positive = await p.$x("//li[contains(., 'Positive:')]");
        const positiveText = this.extractInteger(String(await this.innerText(p, positive[0])));
        await console.log('positive national ' + positiveText);
        await p.waitForXPath("//p[contains(., 'there are a total of:')]", 5000);
        const death = await p.$x("//p[contains(., 'there are a total of:')]");
        const deathText = this.extractInteger(String(await this.innerText(p, death[0])));
        await console.log('death national ' + deathText);
    }
    async liveUpdateNY(state) {
        console.log('Updating state ' + state.name);
        const puppeteer = require('puppeteer');
        const b = await puppeteer.launch();
        b.on('disconnected', () => {
            console.log('disconnected browerw');
        });
        const p = await b.newPage();
        await p.goto(state.url);
        p.setDefaultNavigationTimeout(0);
        p.setRequestInterception(true);
        p.on('request', async (request) => {
            if (request.resourceType() === 'image' || request.resourceType() === 'media') {
                request.abort();
            }
            else {
                request.continue();
            }
        });
        await p.goto(state.url);
        await p.waitForXPath("//td[contains(., 'Total Number of Positive Cases')]", 5000);
        const total = await p.$x("//td[contains(., 'Total Number of Positive Cases')]");
        const positive = await this.nextEl(p, total[0]);
        const posText = this.extractInteger(String(await this.innerText(p, positive)));
        await console.log('positive: ' + posText);
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
        await b.close();
    }
    async liveUpdateTotalTable(state) {
        console.log('Updating state ' + state.name);
        const puppeteer = require('puppeteer');
        const b = await puppeteer.launch();
        b.on('disconnected', () => {
            console.log('disconnected browerw');
        });
        const p = await b.newPage();
        await p.goto(state.url);
        p.setDefaultNavigationTimeout(0);
        p.setRequestInterception(true);
        p.on('request', async (request) => {
            if (request.resourceType() === 'image' || request.resourceType() === 'media') {
                request.abort();
            }
            else {
                request.continue();
            }
        });
        await p.goto(state.url);
        await p.waitForXPath("//td[contains(., 'Total')]", 5000);
        const total = await p.$x("//td[contains(., 'Total')]");
        const positive = await this.nextEl(p, total[0]);
        const posText = this.extractInteger(String(await this.innerText(p, positive)));
        console.log('positive: ' + posText);
        this.caseNumberRepository.create(new models_1.CaseNumber({
            'no': posText ? posText : -1,
            'medicalType': Medical_1.MedicalType.Positive,
            'territoryType': Territory_1.Territory.USSTATE.toString(),
            'territoryId': state.id,
            'timeStampt': this.getCurrentDateTime()
        }));
        const death = await this.nextEl(p, positive);
        const deathText = this.extractInteger(String(await this.innerText(p, death)));
        console.log('death: ' + deathText);
        this.caseNumberRepository.create(new models_1.CaseNumber({
            'no': deathText ? deathText : -1,
            'medicalType': Medical_1.MedicalType.Death,
            'territoryType': Territory_1.Territory.USSTATE.toString(),
            'territoryId': state.id,
            'timeStampt': this.getCurrentDateTime()
        }));
        await b.close();
    }
    extractInteger(chars) {
        let ex = '';
        for (let c of chars) {
            if (this.isNumeric(c)) {
                ex += c;
            }
        }
        return parseInt(ex);
    }
    async liveUpdateCountryData() {
        const cheerio = require('cheerio');
        const axios = require('axios');
        const allCountries = await this.countryRepository.find();
        for (let country of allCountries) {
            await this.liveUpdateText(country);
        }
    }
    async innerText(page, elementHandle) {
        return await page.evaluate((el) => el.innerText, elementHandle);
    }
    async nextEl(page, elementHandle) {
        return await page.evaluateHandle((el) => el.nextElementSibling, elementHandle);
    }
    getCurrentDateTime() {
        var today = new Date();
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    }
    isNumeric(c) {
        return /^[0-9]*$/.test(c);
    }
    isSpecialChar(c) {
        return c == ' ' || c == ':';
    }
    isAlphabet(c) {
        return /^[a-zA-Z()]+$/.test(c) || this.isSpecialChar(c);
    }
    async liveUpdateMN(state) {
        console.log('Updating state ' + state.name);
        const puppeteer = require('puppeteer');
        const b = await puppeteer.launch();
        b.on('disconnected', () => {
            console.log('disconnected browerw');
        });
        const p = await b.newPage();
        await p.goto(state.url);
        p.setDefaultNavigationTimeout(0);
        p.setRequestInterception(true);
        p.on('request', async (request) => {
            if (request.resourceType() === 'image' || request.resourceType() === 'media') {
                request.abort();
            }
            else {
                request.continue();
            }
        });
        await p.goto(state.url);
        await p.waitForXPath("//li[contains(., 'Positive:')]", 5000);
        const positive = await p.$x("//li[contains(., 'Positive:')]");
        const positiveText = this.extractInteger(String(await this.innerText(p, positive[0])));
        await console.log('positive national ' + positiveText);
        await p.waitForXPath("//li[contains(., 'Deaths:')]", 5000);
        const death = await p.$x("//li[contains(., 'Deaths:')]");
        const deathText = this.extractInteger(String(await this.innerText(p, death[0])));
        await console.log('death national ' + deathText);
        await this.caseNumberRepository.create(new models_1.CaseNumber({
            'no': positiveText ? positiveText : -1,
            'medicalType': Medical_1.MedicalType.Positive,
            'territoryType': Territory_1.Territory.COUNTRY,
            'territoryId': state.id,
            'timeStampt': this.getCurrentDateTime()
        }));
        await this.caseNumberRepository.create(new models_1.CaseNumber({
            'no': deathText ? deathText : -1,
            'medicalType': Medical_1.MedicalType.Death,
            'territoryType': Territory_1.Territory.COUNTRY,
            'territoryId': state.id,
            'timeStampt': this.getCurrentDateTime()
        }));
        await b.close();
    }
    async updateArticleDB() {
        console.log('here');
        let stateUrl = 'https://doi.org/' + '10.1016/j.idm.2020.02.001';
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' });
        await page.pdf({ path: 'hn.pdf', format: 'A4' });
        await browser.close();
    }
    async liveUpdateText(state) {
        console.log('Updating state ' + state.name);
        const puppeteer = require('puppeteer');
        const b = await puppeteer.launch();
        b.on('disconnected', () => {
            console.log('disconnected browerw');
        });
        const p = await b.newPage();
        await p.goto(state.url);
        p.setDefaultNavigationTimeout(0);
        p.setRequestInterception(true);
        p.on('request', async (request) => {
            if (request.resourceType() === 'image' || request.resourceType() === 'media') {
                request.abort();
            }
            else {
                request.continue();
            }
        });
        await p.goto(state.url);
        await p.waitForXPath("//li[contains(., 'Total cases:')]", 5000);
        const positive = await p.$x("//li[contains(., 'Total cases:')]");
        const positiveText = this.extractInteger(String(await this.innerText(p, positive[0])));
        await console.log('positive national ' + positiveText);
        await p.waitForXPath("//li[contains(., 'Total deaths:')]", 5000);
        const death = await p.$x("//li[contains(., 'Total deaths:')]");
        const deathText = this.extractInteger(String(await this.innerText(p, death[0])));
        await console.log('death national ' + deathText);
        await this.caseNumberRepository.create(new models_1.CaseNumber({
            'no': positiveText ? positiveText : -1,
            'medicalType': Medical_1.MedicalType.Positive,
            'territoryType': Territory_1.Territory.COUNTRY,
            'territoryId': state.id,
            'timeStampt': this.getCurrentDateTime()
        }));
        await this.caseNumberRepository.create(new models_1.CaseNumber({
            'no': deathText ? deathText : -1,
            'medicalType': Medical_1.MedicalType.Death,
            'territoryType': Territory_1.Territory.COUNTRY,
            'territoryId': state.id,
            'timeStampt': this.getCurrentDateTime()
        }));
        await b.close();
    }
};
LiveUpdateController = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject('repositories.UsStatesRepository')),
    tslib_1.__param(1, context_1.inject('repositories.CaseNumberRepository')),
    tslib_1.__param(2, context_1.inject('repositories.CountyRepository')),
    tslib_1.__param(3, context_1.inject('repositories.CountryRepository')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsStatesRepository,
        repositories_1.CaseNumberRepository,
        repositories_1.CountyRepository,
        repositories_1.CountryRepository])
], LiveUpdateController);
exports.LiveUpdateController = LiveUpdateController;
//# sourceMappingURL=live-update.controller.js.map