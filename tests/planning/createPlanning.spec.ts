import test from '@playwright/test';
import { PageManager } from '../../pages/PageManager';
import { printLog } from '../../utils/logger';

let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)
    printLog("Navigate to login page and login")
    await pm.navigateTo.loginPage()
    await pm.onLoginPage.login()
})


test('Add task', async () => {
    printLog("Add task")
    await pm.onPlanningPage.clickAddTaskButton()
    await pm.onPlanningPage.enterTitle("New task 01")
    await pm.onPlanningPage.selectProject("Test project 1 (test1) ")

    printLog("VP: Verify modal title")
    await pm.onPlanningPage.verifyModalTitle("New task")
})