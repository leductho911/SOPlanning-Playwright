import { Page } from "@playwright/test";
import { NavigationPage } from "./navigation_page";
import { PlanningPage as PlanningPage } from "./planning_page";
import { LoginPage } from "./login_page";

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage
    private readonly planningPage: PlanningPage
    private readonly loginPage: LoginPage
    // declare variables


    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.planningPage = new PlanningPage(this.page);
        this.loginPage = new LoginPage(this.page);
        // create page instances
    }

    // return instance
    get navigateTo() {
        return this.navigationPage
    }

    get onPlanningPage() {
        return this.planningPage
    }

    get onLoginPage() {
        return this.loginPage
    }

}