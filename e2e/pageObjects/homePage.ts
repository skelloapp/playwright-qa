import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class HomePage extends BasePage {
    readonly locator: Locator
    constructor(page: Page) {
        super(page)
        this.locator = page.locator(".navbar__user-dropdown__anchor")
    }
}