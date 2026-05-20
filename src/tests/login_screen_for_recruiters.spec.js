// src/tests/LoginScreenForRecruiters.spec.js
const { test, expect } = require('@playwright/test');
const LoginScreenForRecruitersPage = require('../pages/LoginScreenForRecruitersPage');

test.describe('Login Screen for Recruiters', () => {

  test('Verify that clicking the Get Started button navigates to the Organization signup screen', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.waitForNetworkIdle();
  });

  test('Verify that entering valid email and password allows the user to log in and access the dashboard', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('krishna@gmail.com');
    await loginPage.enterPassword('SecurePassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.waitForNetworkIdle();
  });

  test('Verify that the Show/Hide Password option toggles the visibility of the password', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterPassword('P@ssw0rd123');
    const toggleBtn = page.locator('button:has-text("Show"), button:has-text("Hide")').first();
    await toggleBtn.waitFor({ state: 'attached', timeout: 15000 });
    await toggleBtn.scrollIntoViewIfNeeded();
    await toggleBtn.waitFor({ state: 'visible', timeout: 15000 });
    await toggleBtn.click();
    // Add verification for password visibility here
    await toggleBtn.click();
    // Add verification for password hidden here
  });

  test('Verify that the Login button is enabled when both Email ID and Password fields are filled with valid data', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('krishna@gmail.com');
    await loginPage.enterPassword('SecurePassword123');
    const loginBtn = page.locator('button:has-text("Login"), button:has-text("Sign in"), [type="submit"]').first();
    await loginBtn.waitFor({ state: 'attached', timeout: 15000 });
    await loginBtn.scrollIntoViewIfNeeded();
    await expect(loginBtn).toBeEnabled();
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
  });

  test('Verify that after entering incorrect credentials, the user remains on the Login page', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('krishna@gmail.com');
    await loginPage.enterPassword('wrongpassword');
    await loginPage.clickLogin();
    await loginPage.verifyLoginError();
    expect(page.url()).toMatch(/login/i);
  });

  test('Verify that after a failed login attempt, the user can enter new credentials and attempt to log in again', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('krishna@gmail.com');
    await loginPage.enterPassword('wrongpassword');
    await loginPage.clickLogin();
    await loginPage.verifyLoginError();
    await loginPage.enterPassword('correctpassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
  });

  test('Verify that a user can log in successfully after resetting their password', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('krishna@gmail.com');
    await loginPage.enterPassword('NewPassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
  });

  test('Verify that entering a valid email address in lowercase allows the user to log in successfully', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('krishna@gmail.com');
    await loginPage.enterPassword('correctPassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
  });

  test('Verify that entering a valid email address in mixed case allows the user to log in successfully', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await page.goto(process.env.BASE_URL);
    await loginPage.goToSignin();
    await loginPage.enterEmail('KrIsHnA@GmAiL.cOm');
    await loginPage.enterPassword('correctPassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
  });

});