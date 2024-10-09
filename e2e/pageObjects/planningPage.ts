import {Locator, type Page} from "@playwright/test";
import { BasePage } from "./basePage";

/**
 * sub page containing specific selectors and methods for a specific page
 */
export class PlanningPage extends BasePage{
	readonly page: Page;
	readonly planningNavbarLink: Locator;
	readonly planningRowFirstCell: Locator;
	readonly planningShiftModalSubmitBtn: Locator;
	readonly planningToolbarKebabMenu: Locator;
	readonly planningToolbarEraseShiftsLink: Locator;
	readonly planningToolbarEraseShiftsBtn: Locator;
	readonly planningShiftModalSelectAllDaysBtn: Locator;
	readonly shift: Locator;
	readonly totalHours: Locator;
	readonly successPopup: Locator
  readonly locator: Locator;
  readonly headerHourWrapper: Locator;
  readonly employeeWeekPlanningWrapper: Locator;
  readonly dailyMenu: Locator;
  readonly monthlyMenu: Locator;
  readonly monthlyTable: Locator;

	constructor(page: Page) {
    super(page);
		this.page = page;
		this.planningNavbarLink = page.locator('[data-test="navbar__planning"]');
		this.planningRowFirstCell = page.locator('.planning-row__day-cell__add-shift-wrapper').first();
		this.planningShiftModalSubmitBtn = page.locator('[data-test="shift-modal__submit"]');
		this.planningToolbarKebabMenu =  page.locator('[data-test="planning_toolbar-kebab_menu"]');
		this.planningToolbarEraseShiftsLink = page.locator('[data-test="planning-toolbar__erase-week-shifts"]');
		this.planningToolbarEraseShiftsBtn = page.locator('[data-test="erase-shift-modal__submit"]');
		this.planningShiftModalSelectAllDaysBtn = page.getByRole('button', { name: 'Tout sélectionner' });
		this.shift = page.locator('[data-test="shift-work_shift"]');
		this.totalHours = page.locator('.total-hours').first();
		this.successPopup = page.locator('//*[@id="sk-toast"]/div').getByText('Les shifts ont bien été');
    this.locator = page.locator('[data-test="planning-toolbar__filters"]')
    this.headerHourWrapper = page.locator(".header__hours-wrapper");
    this.employeeWeekPlanningWrapper = page.locator(".employees-weeks-planning__wrapper")
    this.dailyMenu = page.locator('[data-test="planning-toolbar__navigation-day"]')
    this.monthlyMenu = page.locator('[data-test="planning-toolbar__navigation-month"]')
    this.monthlyTable = page.locator('.monthly-table')
	}

    async open(path: string){
       await super.open(path);
    }

  async openShiftModal(): Promise<void> {
		await this.planningRowFirstCell.waitFor();
		await this.planningRowFirstCell.click();
  }

  async createShift(): Promise<void>{
    await this.planningShiftModalSubmitBtn.click();
  }

  async createRecurrentShift(): Promise<string | null> {
		await this.openShiftModal();
    await this.planningShiftModalSelectAllDaysBtn.click();
    await this.createShift();
    await this.shift.first().waitFor();
    await this.totalHours.waitFor();
    const totalHoursRec = await this.totalHours.textContent();
    return totalHoursRec;
  }

	async shiftIsDisplayed(): Promise<boolean> {
		await this.shift.waitFor();
		return await this.shift.isVisible()
	}


  async eraseShifts(): Promise<void> {
    await this.planningToolbarKebabMenu.waitFor();
		await this.planningToolbarKebabMenu.click();
    await this.planningToolbarEraseShiftsLink.waitFor();
    await this.planningToolbarEraseShiftsLink.click();
    await this.planningToolbarEraseShiftsBtn.click();
    await this.successPopup.waitFor();
  }

  async navToPlanning(): Promise<void> {
    await this.planningNavbarLink.waitFor();
    await this.planningNavbarLink.click();
  }

  async goToDailyView() {
    await this.dailyMenu.waitFor();
    await this.dailyMenu.click();
  }

  async goToMontlyView() {
    await this.monthlyMenu.waitFor();
    await this.monthlyMenu.click();
  }

  async dailyViewIsDisplayed(): Promise<boolean> {
    await this.headerHourWrapper.waitFor()
    return(this.page.url().includes("plannings/days") && await this.headerHourWrapper.isVisible())
  }

  async monthlyViewIsDisplayed(): Promise<boolean>{
    await this.monthlyTable.waitFor()
    return(this.page.url().includes("plannings/months") && await this.monthlyTable.isVisible())
  }

  async weeklyViewIsDisplayed(): Promise<boolean>{
    await this.employeeWeekPlanningWrapper.waitFor()
    return(this.page.url().includes("plannings/weeks/") && await this.employeeWeekPlanningWrapper.isVisible())
  }
}

