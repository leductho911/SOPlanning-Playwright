import { test as base } from '@playwright/test'
import { PageManager } from '../pages/page_manager'
import { printLog } from '../utils/logger'
import { LoginPage } from '../pages/login_page';

// Declare the types of your fixtures.
type MyFixtures = {
  pm: PageManager;
  loginPageFixture: LoginPage;
};

// Extend basic test by providing "pm" and "loginPage" fixture.
export const test = base.extend<MyFixtures>({
  pm: async ({ page }, use) => {
    // Set up the fixture.
    const pageManager = new PageManager(page);
    await pageManager.navigateTo.loginPage()
    await pageManager.onLoginPage.login()
    await use(pageManager)

    // Clean up the fixture.
    // await pageManager.removeSomething() will run after the test
  },
  loginPageFixture: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
export { expect } from '@playwright/test';

// Hooks for setup and teardown
test.beforeAll(async () => {
  printLog("Before all: Starting test suite setup...")
})

test.afterAll(async ({page}) => {
  printLog("Aftet all : Test suite cleanup completed.")
  await page.close()
})

// Hook for actions before each test
test.beforeEach(async ({loginPageFixture}) => {
  printLog("Before each test setup...")
  // await loginPage.login()
  // example use fixture "loginPageFixture"
  // can use loginPageFixture in test spec
});