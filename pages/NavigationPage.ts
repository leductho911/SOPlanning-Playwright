import { Page } from '@playwright/test'
import { BasePage, CommonLocators } from './BasePage'
import ENV from '../utils/env'
import { printLog } from '../utils/logger';

class NavigationPageLocator extends CommonLocators{
    readonly locatorNotCommon = `//button[text()='NOT COMMON LOCATOR']`

    // example dynamic locator in page
    public itmSecurityQuestionLabel(item: string) {
        return `[data-testid="option-with-label-${item}"]`;
    }
}

export class NavigationPage extends BasePage{

    readonly locators: NavigationPageLocator


    constructor(page: Page) {
        super(page)
        this.locators = new NavigationPageLocator()
    }

    async loginPage(){
        printLog(' [NavigationPage: navigate to Login page]');
        await this.openPage(`${ENV.BASE_URL}`)
    }

    
}