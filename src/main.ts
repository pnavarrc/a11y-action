// import * as core from '@actions/core'
import {AxePuppeteer} from '@axe-core/puppeteer'
import {writeFileSync} from 'fs'
import puppeteer from 'puppeteer'

async function check(): Promise<void> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setBypassCSP(true)

  await page.goto('https://www.covidactnow.org')

  const results = await new AxePuppeteer(page).analyze()
  writeFileSync('demo.json', JSON.stringify(results, null, 2))
  // console.log(results)

  await page.close()
  await browser.close()
}

// async function run(): Promise<void> {
//   try {
//     const url: string = core.getInput('url')
//     core.debug(`Checking ${url}`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

//     core.debug(new Date().toTimeString())
//     core.debug(`url: ${url}`)
//     core.debug(new Date().toTimeString())

//     core.setOutput('time', new Date().toTimeString())
//   } catch (error) {
//     core.setFailed(error.message)
//   }
// }

check()
