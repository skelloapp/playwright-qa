import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class LoginPage extends BasePage {
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton : Locator;
  constructor(page: Page) {
      super(page);
      this.email = page.locator('[data-test="login_email"]').locator("input");
      this.password = page.locator('[data-test="login_password"]').locator("input")
      this.loginButton = page.locator('[data-test="login_submit"]')
  }
    async open() {
        await super.open("/users/sign_in")
    }

    async login(email: string, password: string): Promise<void>{
        await this.open()
        await this.email.fill(email)
        await this.password.fill(password)
        await this.loginButton.click()
    }
}