require('dotenv').config();
const { test, expect } = require('@playwright/test');
const ViewDashboardPage = require('../pages/ViewDashboardPage.js');

/**
 * Test Spec  : Playwright — ViewDashboard
 * Generated  : 2026-05-18 16:05
 */
test.describe('Playwright - ViewDashboard Tests', () => {

  test('should load the page successfully', async ({ page }) => {
    const viewDashboard = new ViewDashboardPage(page);
    await viewDashboard.navigate(process.env.BASE_URL);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('should perform main workflow actions', async ({ page }) => {
    const viewDashboard = new ViewDashboardPage(page);
    await viewDashboard.navigate(process.env.BASE_URL);
    // Auto-generated placeholder
    await viewDashboard.verifyDashboard();
  });

});
