import { test as base } from '@playwright/test'
import { PageManager } from '../pages/page_manager'
import { printLog } from '../utils/logger'
import { APIs } from '../utils/apis'

// Declare the types of your fixtures.
type MyFixtures = {
  pm: PageManager
  api: APIs
};

// Extend basic test by providing "pm" and "api" fixture.
export const test = base.extend<MyFixtures>({
  pm: async ({ page }, use) => {
    // Set up the fixture.
    const pageManager = new PageManager(page)
    await pageManager.navigateTo.loginPage()
    await pageManager.onLoginPage.login()
    await use(pageManager)

    // Clean up the fixture.
    // await pageManager.removeSomething() will run after the test
  },
  api: async ({}, use) => {
    const api = new APIs()
    await api.init()
    await use(api)
  },
})

export { expect } from '@playwright/test'

// Hooks for setup and teardown
test.beforeAll(async () => {
  printLog("Before all: Starting test suite setup...")
})

test.afterAll(async () => {
  printLog("After all : Test suite cleanup completed.")
})