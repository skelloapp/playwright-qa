import { test, expect, Page } from "@playwright/test"
import { PlanningPage } from "../pageObjects/planningPage";
import { LoginPage } from "../pageObjects/loginPage";

let page: Page;
let planningPage: PlanningPage;

test.describe('Planning', () => {
    test.beforeAll(async ({ browser}) => {
        page = await browser.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.login('victor.bolta+pan@skello.io', 'Skello2022')
        planningPage = new PlanningPage(page)
    });

	test.afterAll(async () => {
        await page.close();
    });

    test('should seen planning weekly', async ({}) => {
        await planningPage.navToPlanning();
        const shopId = 17297;
        const path = `v3/shops/${shopId}/plannings/weeks`;
        await planningPage.open(path);
         expect(await planningPage.weeklyViewIsDisplayed()).toBe(true);
    })

    test('should see planning monthly view', async ({}) => {
        await planningPage.goToMontlyView();
        expect(await planningPage.monthlyViewIsDisplayed()).toBe(true);
    });

    test('should daily planing view', async ({}) => {
        await planningPage.goToDailyView();
        expect(await planningPage.dailyViewIsDisplayed()).toBe(true);
    });
})


