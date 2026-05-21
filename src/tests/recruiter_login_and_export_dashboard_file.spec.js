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
    const showHideBtn = page.locator('button:has-text("Show"), button:has-text("Hide")').first();
    await showHideBtn.waitFor({ state: 'attached', timeout: 15000 });
    await showHideBtn.scrollIntoViewIfNeeded();
    await showHideBtn.waitFor({ state: 'visible', timeout: 15000 });
    await showHideBtn.click();
    // Add assertions for visibility
    await showHideBtn.click();
    // Add assertions for visibility again
  });

  test('Verify Export button functionality', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.enterEmail(process.env.EMAIL);
    await sample.enterPassword(process.env.PASSWORD);
    await sample.clickLogin();
    await sample.verifyDashboard();
    await sample.clickExportButton();
    // Add assertions for download prompt
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

  test('Verify successful logout from Recruiter Dashboard', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.enterEmail(process.env.EMAIL);
    await sample.enterPassword(process.env.PASSWORD);
    await sample.clickLogin();
    await sample.verifyDashboard();
    await sample.clickLogout();
    // Add assertions for redirection to Welcome page
  });

  test('Verify navigation back to Welcome page from Login page', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.clickBackButton();
    // Add assertions for Welcome page elements
  });

  test('Verify access to help/support options from Login page', async ({ page }) => {
    const sample = new RecruiterLoginAndExportDashboardFilePage(page);
    await sample.navigate(process.env.BASE_URL);
    await sample.goToSignin();
    await sample.checkHelpSupport();
    // Add assertions for help/support page content
  });

});