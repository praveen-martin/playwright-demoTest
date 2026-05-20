// src/tests/LoginScreenForRecruiters.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const LoginScreenForRecruitersPage = require('../pages/LoginScreenForRecruitersPage');

test('Login Flow for Recruiters', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await page.goto(process.env.BASE_URL);
  await loginPage.goToSignin();
  
  await loginPage.checkGetStartedButton();
  
  await loginPage.enterEmail(process.env.EMAIL);
  await loginPage.enterPassword(process.env.PASSWORD);
  await loginPage.clickLogin();
  
  await loginPage.verifyDashboard();
  await loginPage.waitForNetworkIdle();

  await loginPage.enterEmail(process.env.EMAIL);
  await loginPage.enterPassword('wrongpassword');
  await loginPage.clickLogin();
  
  await loginPage.waitForNetworkIdle();
  await loginPage.checkErrorMessage();
  
  await loginPage.enterEmail(process.env.EMAIL);
  await loginPage.enterPassword(process.env.PASSWORD);
  await loginPage.clickLogin();
  
  await loginPage.waitForNetworkIdle();
  await loginPage.verifyDashboard();
});