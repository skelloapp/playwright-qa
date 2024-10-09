import { test, expect, Page } from '@playwright/test';
import {PlanningPage} from '../pageObjects/planningPage';
import {LoginPage} from '../pageObjects/loginPage';

let page: Page;
let planningPage: PlanningPage;

test.describe('Planning - Shift Creation', () => {
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		const loginPage = new LoginPage(page);
		await loginPage.login('victor.bolta+pan@skello.io', 'Skello2022')
		planningPage = new PlanningPage(page)
	});

	test.afterAll(async () => {
    await page.close();
  });


	test('should create a simple shift', async ({}) => {
		await planningPage.navToPlanning();
		await planningPage.openShiftModal();
		await planningPage.createShift();
		expect(await planningPage.shiftIsDisplayed()).toBe(true);
	});

	test('should create a shift with recurrence', async ({}) => {
		expect(await planningPage.createRecurrentShift()).toEqual(' 84h00 ')
	});

	test.afterEach(async() => {
		await planningPage.eraseShifts();
	});
})
