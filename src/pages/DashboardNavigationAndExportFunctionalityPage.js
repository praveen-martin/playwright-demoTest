// src/pages/DashboardNavigationAndExportFunctionalityPage.js
const { expect } = require('@playwright/test');

class DashboardNavigationAndExportFunctionalityPage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
    await this.waitForNetworkIdle();
  }

  async goToSignin() {
    const currentUrl = this.page.url();
    if (currentUrl.includes('signin') || currentUrl.includes('login')) return;

    const getStartedBtn = this.page.locator('button:has-text("Get Started"), a:has-text("Get Started"), [role="button"]:has-text("Get Started")').first();
    await getStartedBtn.waitFor({ state: 'attached', timeout: 15000 });
    await getStartedBtn.scrollIntoViewIfNeeded();
    await getStartedBtn.waitFor({ state: 'visible', timeout: 15000 });
    await getStartedBtn.click();

    const orgBtn = this.page.locator('button:has-text("Continue as Organization"), a:has-text("Continue as Organization")').first();
    try {
      await orgBtn.waitFor({ state: 'attached', timeout: 5000 });
      await orgBtn.scrollIntoViewIfNeeded();
      await orgBtn.waitFor({ state: 'visible', timeout: 5000 });
      await orgBtn.click();
    } catch (_) {
      // Optional step
    }

    await this.page.waitForURL(/signin|login|organization-signup/i, { timeout: 15000 });
    await this.waitForNetworkIdle();
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async enterEmail(email) {
    const el = this.page.locator('input[type="email"], input[name="email"], [placeholder*="email" i]').first();
    await el.waitFor({ state: 'attached', timeout: 15000 });
    await el.scrollIntoViewIfNeeded();
    await el.waitFor({ state: 'visible', timeout: 15000 });
    await el.fill(email);
  }

  async enterPassword(password) {
    const el = this.page.locator('input[type="password"], input[name="password"], [placeholder*="password" i]').first();
    await el.waitFor({ state: 'attached', timeout: 15000 });
    await el.scrollIntoViewIfNeeded();
    await el.waitFor({ state: 'visible', timeout: 15000 });
    await el.fill(password);
  }

  async clickLogin() {
    const btn = this.page.locator('button:has-text("Login"), button:has-text("Sign in"), [type="submit"]').first();
    await btn.waitFor({ state: 'attached', timeout: 15000 });
    await btn.scrollIntoViewIfNeeded();
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.waitForNetworkIdle();
  }

  async verifyDashboard() {
    await expect(this.page).toHaveURL(/dashboard|home|recruiter/i, { timeout: 30000 });
  }

  async verifyLoginError() {
    await expect(this.page.locator('*').filter({ hasText: /error|invalid|incorrect|failed|wrong/i }).first())
      .toBeVisible({ timeout: 10000 });
  }

  async checkSidebarOptions() {
    const sidebar = this.page.locator('nav, aside').first();
    await sidebar.waitFor({ state: 'attached', timeout: 15000 });
    await sidebar.scrollIntoViewIfNeeded();
    await sidebar.waitFor({ state: 'visible', timeout: 15000 });
    // Add checks for specific sidebar options here
  }

  async clickSidebarOption(optionText) {
    const option = this.page.locator('a, button').filter({ hasText: new RegExp(optionText, 'i') }).first();
    await option.waitFor({ state: 'attached', timeout: 15000 });
    await option.scrollIntoViewIfNeeded();
    await option.waitFor({ state: 'visible', timeout: 15000 });
    await option.click();
    await this.waitForNetworkIdle();
  }

  async checkExportButton() {
    const exportBtn = this.page.locator('button:has-text("Export"), a:has-text("Export")').first();
    await exportBtn.waitFor({ state: 'attached', timeout: 15000 });
    await exportBtn.scrollIntoViewIfNeeded();
    await exportBtn.waitFor({ state: 'visible', timeout: 15000 });
  }

  async clickExportButton() {
    const exportBtn = this.page.locator('button:has-text("Export"), a:has-text("Export")').first();
    await exportBtn.waitFor({ state: 'attached', timeout: 15000 });
    await exportBtn.scrollIntoViewIfNeeded();
    await exportBtn.waitFor({ state: 'visible', timeout: 15000 });
    await exportBtn.click();
    await this.waitForNetworkIdle();
  }
}

module.exports = DashboardNavigationAndExportFunctionalityPage;