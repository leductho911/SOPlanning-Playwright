import { expect, Locator, Page } from '@playwright/test'
import { BasePage, CommonLocators } from './BasePage'
import { printLog } from '../utils/logger';


class PlanningPageLocator extends CommonLocators {
    // fixed locators go here
    readonly btnAddTask = `#btnAddTask`
    readonly cboProject = `#select2-projet_id-results`
    readonly cboUser = `#select2-user_id2-results`


    // example dynamic locator in page
    public itmSecurityQuestionLabel(item: string) {
        return `[data-testid="option-with-label-${item}"]`;
    }
}

export class PlanningPage extends BasePage {

    readonly locators: PlanningPageLocator

    constructor(page: Page) {
        super(page)
        this.locators = new PlanningPageLocator()
    }

    async enterTitle(title: string) {
        printLog(` [PlanningPage] Enter title: ${title}`)
        await this.inputToTextbox("Title", title)
    }

    async selectProject(project: string) {
        printLog(` [PlanningPage] Select project: ${project}`)
        await this.selectCustomComboboxSingle("Project", this.locators.cboProject, project)
    }

    async verifyModalTitle(expectedTitle: string) {
        printLog(" [PlanningPage] Verify modal title")
        const actual = await this.getText(this.commonLocators.lblModalTitle)
        expect(actual).toBe(expectedTitle)
    }

    async clickAddTaskButton() {
        printLog(" [PlanningPage] Click Add Task button")
        await this.clickElement(this.locators.btnAddTask)
    }

    async selectUser(users: string[]) {
        for (const user of users) {
            printLog(` [PlanningPage] Select user: ${user}`)
            await this.selectCustomComboboxMultiple("User", this.locators.cboUser, user)
        }
    }

}