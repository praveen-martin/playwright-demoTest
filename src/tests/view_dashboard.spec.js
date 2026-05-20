// src/tests/viewDashboard.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const ViewDashboardPage = require('../pages/ViewDashboardPage');

test('View Dashboard', async ({ page }) => {
  const dashboard = new ViewDashboardPage(page);

  await dashboard.navigate(process.env.BASE_URL);
  await dashboard.goToSignin();

  await dashboard.enterEmail(process.env.EMAIL);
  await dashboard.enterPassword(process.env.PASSWORD);
  await dashboard.clickLogin();
  await dashboard.verifyDashboard();
  
  await dashboard.checkRecruitmentStatistics();
  await dashboard.checkQuickNavigationLinks();
  
  await dashboard.logout();
});