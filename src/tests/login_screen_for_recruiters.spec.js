// src/tests/LoginScreenForRecruiters.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const LoginScreenForRecruitersPage = require('../pages/LoginScreenForRecruitersPage');

test('Recruiter Login Flow', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  await loginPage.enterEmail(process.env.EMAIL);
  await loginPage.enterPassword(process.env.PASSWORD);

  await loginPage.clickLogin();

  await loginPage.verifyDashboard();
});