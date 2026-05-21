// src/tests/recruiterLoginAndExportDashboardFile.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const RecruiterLoginAndExportDashboardFilePage = require('../pages/RecruiterLoginAndExportDashboardFilePage');

test.describe('Recruiter Login and Export Dashboard File', () => {

  test('Verify navigation to Organization Signup/Login screen', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.verifyDashboard();
  });

  test('Verify successful login with valid credentials', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.enterEmail('krishna@gmail.com'); // literal from Excel Test data
    await sample.enterPassword('ValidPassword123'); // literal from Excel Test data
    await sample.clickLogin();
    await sample.verifyDashboard();
  });

  test('Verify Show/Hide Password functionality', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.enterPassword('P@ssw0rd123'); // literal from Excel Test data
    await sample.togglePasswordVisibility();
    await sample.togglePasswordVisibility();
  });

  test('Verify Export button functionality on the dashboard', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.enterEmail(process.env.EMAIL);
    await sample.enterPassword(process.env.PASSWORD);
    await sample.clickLogin();
    await sample.verifyDashboard();
    await sample.clickExportButton();
  });

  test('Verify Recruiter Dashboard displays relevant information', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.enterEmail(process.env.EMAIL);
    await sample.enterPassword(process.env.PASSWORD);
    await sample.clickLogin();
    await sample.verifyDashboard();
    await sample.checkRecruitmentMetrics();
  });

  test('Verify successful logout from the Recruiter Dashboard', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.enterEmail(process.env.EMAIL);
    await sample.enterPassword(process.env.PASSWORD);
    await sample.clickLogin();
    await sample.logout();
    await sample.navigateBackToWelcome();
  });

  test('Verify navigation back to Welcome page from Login page', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.navigateBackToWelcome();
  });

  test('Verify viewing various recruitment metrics on the Recruiter Dashboard', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.enterEmail(process.env.EMAIL);
    await sample.enterPassword(process.env.PASSWORD);
    await sample.clickLogin();
    await sample.verifyDashboard();
    await sample.checkRecruitmentMetrics();
  });

  test('Verify access to help or support options from the Login page', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    const helpLink = this.page.locator('a:has-text("Help"), a:has-text("Support")').first();
    await helpLink.waitFor({ state: 'attached', timeout: 15000 });
    await helpLink.scrollIntoViewIfNeeded();
    await helpLink.waitFor({ state: 'visible', timeout: 15000 });
    await helpLink.click();
    await sample.waitForNetworkIdle();
  });

});