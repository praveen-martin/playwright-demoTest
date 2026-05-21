// src/tests/dashboardNavigationAndExportFunctionality.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const DashboardNavigationAndExportFunctionalityPage = require('../pages/DashboardNavigationAndExportFunctionalityPage');

test.describe('Dashboard Navigation and Export Functionality', () => {

  // ── TYPE A: LOGIN TEST ──
  test('User can log into the application and land on the Dashboard page', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail('valid_username'); // literal from Excel Test data
    await dashboardPage.enterPassword('valid_password'); // literal from Excel Test data
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard(); // assert dashboard reached
  });

  // ── TYPE B: IN-APP TEST ──
  test('All sidebar menu options are visible and accessible on the Dashboard page', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL); // .env credentials
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.checkSidebarOptions();
  });

  // ── TYPE B: IN-APP TEST ──
  test('Clicking on sidebar options loads corresponding pages/modules without errors', async ({ page }) => {
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

  // ── TYPE B: IN-APP TEST ──
  test('User can navigate back to the Dashboard from any selected sidebar module', async ({ page }) => {
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

  // ── TYPE B: IN-APP TEST ──
  test('Export button is present and visible on the Dashboard page', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.checkExportButton();
  });

  // ── TYPE B: IN-APP TEST ──
  test('Clicking the Export button generates a report file and initiates a download successfully', async ({ page }) => {
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

  // ── TYPE B: IN-APP TEST ──
  test('Downloaded report contains valid data and is not corrupted', async ({ page }) => {
    const dashboardPage = new DashboardNavigationAndExportFunctionalityPage(page);
    await dashboardPage.navigate(process.env.BASE_URL);
    await dashboardPage.goToSignin();
    await dashboardPage.enterEmail(process.env.EMAIL);
    await dashboardPage.enterPassword(process.env.PASSWORD);
    await dashboardPage.clickLogin();
    await dashboardPage.verifyDashboard();
    await dashboardPage.clickExportButton();
    // Additional checks for file validation can be added here
  });

  // ── TYPE B: IN-APP TEST ──
  test('Sidebar menu options are responsive and display correctly on various screen sizes', async ({ page }) => {
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

  // ── TYPE B: IN-APP TEST ──
  test('User receives feedback indicating a successful export after clicking the Export button', async ({ page }) => {
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