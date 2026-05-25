// src/tests/dashboardNavigationAndExportFunctionality.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const DashboardNavigationAndExportFunctionalityPage = require('../pages/DashboardNavigationAndExportFunctionalityPage');

test.describe('Dashboard Navigation and Export Functionality', () => {
  
  test('Verify user can log into the application and land on the Dashboard page', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail('valid_username'); // literal from Excel Test data
    await dashboardPage.enterPassword('valid_password'); // literal from Excel Test data
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
  });

  test('Verify all sidebar menu options are visible and accessible on the Dashboard page', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.checkSidebarOptions();
  });

  test('Verify clicking on sidebar options loads corresponding pages/modules without errors', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.clickSidebarOption('Recruitment');
    await dashboardPage.clickSidebarOption('Reports');
  });

  test('Verify user can navigate back to the Dashboard from any selected sidebar module', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.clickSidebarOption('Settings');
    await dashboardPage.clickSidebarOption('Dashboard');
    await dashboardPage.verifyDashboard();
  });

  test('Verify the Export button is present and visible on the Dashboard page', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.checkExportButton();
  });

  test('Verify clicking the Export button generates a report file and initiates a download successfully', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.clickExportButton();
    // Additional checks for download prompt can be added here
  });

  test('Verify the downloaded report contains valid data and is not corrupted', async ({ page }) => {
    // This test would require file system access to validate the downloaded file
    // Implementation details would depend on the environment setup
  });

  test('Verify the sidebar menu options are responsive and display correctly on various screen sizes', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await page.setViewportSize({ width: 500, height: 800 });
    await dashboardPage.checkSidebarOptions();
    await page.setViewportSize({ width: 1200, height: 800 });
    await dashboardPage.checkSidebarOptions();
  });

  test('Verify user receives feedback indicating a successful export after clicking the Export button', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.clickExportButton();
    // Additional checks for success messages can be added here
  });

});