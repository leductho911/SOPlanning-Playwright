import { Page } from '@playwright/test'
import { BasePage, CommonLocators } from './base_page'
import ENV from '../utils/env'
import { printLog } from '../utils/logger'

class LoginPageLocator extends CommonLocators {
    // locator not dynamic
    readonly txtLogin = "//input[@name='login']"
    readonly txtPassword = "//input[@name='password']"

    // example dynamic locator in page
    public itmSecurityQuestionLabel(item: string) {
        return `[data-testid="option-with-label-${item}"]`;
    }
}

export class LoginPage extends BasePage {

    readonly locators: LoginPageLocator

    constructor(page: Page) {
        super(page)
        this.locators = new LoginPageLocator()
    }

    async login(username: string = `${ENV.USERNAME}`, password: string = `${ENV.PASSWORD}`) {
        printLog(` [LoginPage] Login with username: ${username}`)
        await this.enterUserName(username)
        await this.enterPassword(password)
        await this.clickLoginBtn()
    }

    async clickLoginBtn() {
        await this.clickElement(this.commonLocators.commonButton("Login"))
    }

    async enterUserName(username: string) {
        await this.enterText(this.locators.txtLogin, username)
    }

    async enterPassword(password: string) {
        await this.enterText(this.locators.txtPassword, password)
    }
}