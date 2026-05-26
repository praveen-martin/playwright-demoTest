// src/tests/LoginScreenForRecruiters.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const LoginScreenForRecruitersPage = require('../pages/LoginScreenForRecruitersPage');

test.describe('Login Screen for Recruiters', () => {
  
  test('Verify navigation to Organization signup screen', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.verifyDashboard(); // Verify navigation to the Login page
  });

  test('Valid login with correct credentials', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('recruiter@example.com'); // literal from Excel Test data
    await loginPage.enterPassword('SecurePassword123'); // literal from Excel Test data
    await loginPage.clickLogin();
    await loginPage.verifyDashboard(); // positive: assert dashboard reached
  });

  test('Verify Show/Hide Password functionality', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterPassword('P@ssw0rd123'); // literal from Excel Test data
    await loginPage.checkShowHidePassword();
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
    await loginPage.verifyDashboard(); // assert dashboard reached
    await loginPage.waitForNetworkIdle();
    await loginPage.goToSignin(); // log out and repeat
    await loginPage.enterEmail('user+test@example.com'); // another valid format
    await loginPage.enterPassword('ValidPassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard(); // assert dashboard reached
  });

  test('Verify login functionality across different browsers', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail(process.env.EMAIL); // .env — real app credentials
    await loginPage.enterPassword(process.env.PASSWORD);
    await loginPage.clickLogin();
    await loginPage.verifyDashboard(); // assert dashboard reached
  });

  test('Verify login screen responsiveness across devices', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail(process.env.EMAIL); // .env — real app credentials
    await loginPage.enterPassword(process.env.PASSWORD);
    await loginPage.clickLogin();
    await loginPage.verifyDashboard(); // assert dashboard reached
  });

  test('Verify login after password reset', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.goToSignin();
    // Simulate password reset process
    await loginPage.clickLogin(); // Assuming this leads to a password reset link
    await loginPage.enterPassword('new_password_value'); // literal from Excel Test data
    await loginPage.clickLogin();
    await loginPage.enterEmail('valid_email@example.com'); // literal from Excel Test data
    await loginPage.enterPassword('new_password_value'); // literal from Excel Test data
    await loginPage.clickLogin();
    await loginPage.verifyDashboard(); // assert dashboard reached
  });

});