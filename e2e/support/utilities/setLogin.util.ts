import { chromium, request } from "@playwright/test";
import playwrightConfig from "../../../playwright.config";
import axios from "axios";

interface LoggedInContextData {
  path?: string;
  user: {email: string; password: string};
}

interface SKELLOToken {
  refresh_token: string;
  token: string;
}

export async function setLoggedInContext(data: LoggedInContextData) {
      // open navigator
    await openBrowser();
    let token_init;
    await axios.post('https://app.staging.skello.io/v3/login',
    {
      email: data.user.email,
      password: data.user.password,
    })
    .then((res)=> token_init = res)
    if (!token_init) {
        throw new Error('GetToken failed, verify if username / passwords is still good.');
    }

    const token_response = JSON.stringify(token_init.data);
    const userToken: SKELLOToken = JSON.parse(token_response.toString());
    const {token, refresh_token} = userToken;
    console.log(token)
    console.log('-------------')
    console.log(refresh_token)
};

async function openBrowser() {
    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await browserContext.clearCookies()
    await page.goto("https://app.staging.skello.io/")
    // browserContext.addCookies([{name: 'cookie_consent', value: 'functional%2Cmarketing%2Cpersonnalization%2Canalytics'}])
    await page.reload();
}