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

  // Additional tests for error message and button state
  await loginPage.enterEmail('invalid@example.com');
  await loginPage.enterPassword('wrongpassword');
  await loginPage.clickLogin();
  await loginPage.verifyErrorMessage();

  const isEnabled = await loginPage.isLoginButtonEnabled();
  expect(isEnabled).toBe(false);
});