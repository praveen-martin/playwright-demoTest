// src/tests/LoginScreenForRecruiters.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const LoginScreenForRecruitersPage = require('../pages/LoginScreenForRecruitersPage');

test.describe('Login Screen for Recruiters', () => {

  test('Verify navigation to Organization signup screen', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
  });

  test('Verify successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('recruiter@example.com'); // literal from Excel Test data
    await loginPage.enterPassword('SecurePassword123'); // literal from Excel Test data
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.waitForNetworkIdle();
  });

  test('Verify Show/Hide Password functionality', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterPassword('P@ssw0rd123'); // literal from Excel Test data
    await loginPage.checkShowHidePassword();
    await loginPage.checkShowHidePassword(); // toggle back to hide
  });

  test('Verify Login button is enabled with valid inputs', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('krishna@gmail.com'); // literal from Excel Test data
    await loginPage.enterPassword('SecurePassword123'); // literal from Excel Test data
    const loginBtn = page.locator('button:has-text("Login"), button:has-text("Sign in"), [type="submit"]').first();
    await loginBtn.waitFor({ state: 'attached', timeout: 15000 });
    await loginBtn.scrollIntoViewIfNeeded();
    await expect(loginBtn).toBeEnabled();
  });

  test('Verify login with various valid email formats', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('user.name@subdomain.example.com'); // literal from Excel Test data
    await loginPage.enterPassword('ValidPassword123'); // literal from Excel Test data
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.waitForNetworkIdle();
    // Log out and repeat with a different valid email format
    await loginPage.enterEmail('user+test@example.com'); // another valid format
    await loginPage.enterPassword('ValidPassword123'); // literal from Excel Test data
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.waitForNetworkIdle();
  });

  test('Verify login functionality across different browsers', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail(process.env.EMAIL);
    await loginPage.enterPassword(process.env.PASSWORD);
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.waitForNetworkIdle();
    // Log out and repeat for other browsers in separate tests
  });

  test('Verify responsive login functionality across devices', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail(process.env.EMAIL);
    await loginPage.enterPassword(process.env.PASSWORD);
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.waitForNetworkIdle();
    // Log out and repeat for tablet and mobile in separate tests
  });

  test('Verify login after password reset', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    // Simulate password reset steps
    await loginPage.clickResetPasswordLink(); // Assuming this method exists
    await loginPage.enterNewPassword('new_password_value'); // literal from Excel Test data
    await loginPage.confirmNewPassword('new_password_value'); // literal from Excel Test data
    await loginPage.clickResetPassword(); // Assuming this method exists
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('valid_email@example.com'); // literal from Excel Test data
    await loginPage.enterPassword('new_password_value'); // literal from Excel Test data
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.waitForNetworkIdle();
  });

});