import { Locator, Page } from '@playwright/test'
import { printLog } from '../utils/logger'
import { SHORT_TIME } from '../utils/constants'

export class CommonLocators {
  readonly lblModalTitle = `div.modalBig h5`

  // dynamic locator in basepage
  public commonLocator(text: string) {
    return `//*[contains(normalize-space(text()), "${text}")]`
  }

  public controlLink(text: string) {
    return `//a[contains(., "${text}")]`
  }

  public controlTextBox(label: string) {
    return `//label[contains(text(), '${label}')]/following-sibling::div/input`
  }

  public commonPlaceholder(text: string) {
    return `//*[@placeholder='${text}']`
  }

  public commonButton(text: string) {
    return `//input[contains(@class,'btn-primary') and @value='${text}']`
  }

  public commonComboBox(text: string) {
    return `//label[contains(text(), '${text}')]/following-sibling::div//span[@role='textbox']`
  }

  public commonComboBoxMultiple(text: string) {
    return `//label[contains(text(), '${text}')]/following-sibling::div//input[@role='searchbox']`
  }

  public commonPTag(text: string) {
    return `//p[contains(., "${text}")]`
  }

  public commonH5Tag(text: string) {
    return `//h5[contains(., "${text}")]`
  }

}


export class BasePage {
  readonly page: Page
  readonly commonLocators: CommonLocators

  constructor(page: Page) {
    this.page = page
    this.commonLocators = new CommonLocators()
  }

  /**
   * Wait for element visible on browser
   * @param locator
   */
  public async waitForElementVisible(locator: string, waitTime: number = SHORT_TIME) {
    try {
      printLog(`  Common action - Wait for element visible`, 'debug')
      await this.getElement(locator).waitFor({ timeout: waitTime })
    } catch (error) {
      printLog(`Wait for element visible on browser: ${error}`, 'error')
    }
  }

  public async inputToTextbox(label: string, value: string) {
    printLog(`  Common action - Input to Element: ${label} Value: ${value}`, 'debug')
    await this.enterText(this.commonLocators.controlTextBox(label), value)
  }

  public async clickElement(locator: string, timeout?: number) {
    printLog(`  Common action - Click Element: ${locator}`, 'debug')
    await this.getElement(locator).click({ timeout: timeout })
  }

  public getElement(locator: string): Locator {
    printLog(`  Common action - Get Element: ${locator}`, 'debug')
    return this.page.locator(locator)
  }

  public async enterText(locator: string, text: string) {
    printLog(`  Common action - Enter Text: ${text}`, 'debug')
    await this.getElement(locator).fill(text)
  }

  public async getText(locator: string) {
    printLog(`  Common action - Get Element Text: ${locator}`, 'debug')
    return await this.getElement(locator).textContent()
  }

  public async openPage(url: string) {
    printLog(`  Common action - Open Page: ${url}`, 'debug')
    await this.page.goto(url)
  }


  /**
  * Selects an option from a custom combobox (single choice).
  *
  * @param {string} label - The label of the combobox.
  * @param {string} optionsLocator - The locator of the options element that contains the options to be selected.
  * @param {string} option - The text of the option to be selected.
  */
  public async selectCustomComboboxSingle(label: string, optionsLocator: string, option: string) {
    printLog(`  Common action - Select combobox single`, 'debug')
    await this.clickElement(this.commonLocators.commonComboBox(label))
    await this.page.locator(optionsLocator).locator("li", { hasText: option }).click()
  }

  public async selectCustomComboboxMultiple(label: string, optionsLocator: string, option: string) {
    printLog(`  Common action - Select combobox multiple`, 'debug')
    await this.clickElement(this.commonLocators.commonComboBoxMultiple(label))
    await this.page.locator(optionsLocator).locator("li[role='option']", { hasText: option }).click()
  }

}