import { Locator, Page } from "@playwright/test"

export class BasePage {
    readonly page: Page;
    readonly locator: Locator
    readonly acceptCookieButton: Locator

    constructor(page: Page) {
        this.page = page;

        this.acceptCookieButton = page.getByRole('button', { name: 'Accept' })
    }

    async open( path:string): Promise<void>{
        await this.page.goto(path);
        await this.removeCookieBanner()
    }

    async isDisplayed(): Promise<boolean>{
        await this.locator.waitFor()
        return this.locator.isVisible()
    }

    async removeCookieBanner(): Promise<void> {
        await this.acceptCookieButton.waitFor()
        await this.acceptCookieButton.click()
    }
}