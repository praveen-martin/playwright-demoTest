// src/pages/ViewDashboardPage.js
const { expect } = require('@playwright/test');

class ViewDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async goToSignin() {
    const currentUrl = this.page.url();
    if (currentUrl.includes('signin') || currentUrl.includes('login')) return;

    const getStartedBtn = this.page.locator('text=Get Started, button:has-text("Get Started"), a:has-text("Get Started")').first();
    await getStartedBtn.waitFor({ state: 'visible', timeout: 15000 });
    await getStartedBtn.click();

    const orgBtn = this.page.locator('text=Continue as Organization, button:has-text("Continue as Organization")').first();
    if (await orgBtn.isVisible({ timeout: 5000 })) {
      await orgBtn.click();
    }
    await this.page.waitForURL(/signin|login|organization-signup/i, { timeout: 15000 });
  }

  async enterEmail(email) {
    const el = this.page.locator('input[type="email"], input[name="email"], [placeholder*="email" i], #email').first();
    await el.waitFor({ state: 'visible' });
    await el.fill(email);
  }

  async enterPassword(password) {
    const el = this.page.locator('input[type="password"], input[name="password"], [placeholder*="password" i], #password').first();
    await el.waitFor({ state: 'visible' });
    await el.fill(password);
  }

  async clickLogin() {
    const btn = this.page.locator('button:has-text("Login"), button:has-text("Sign in"), [type="submit"]').first();
    await btn.waitFor({ state: 'visible' });
    await btn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDashboard() {
    await expect(this.page).toHaveURL(/dashboard|home|recruiter/i, { timeout: 30000 });
  }

  async checkRecruitmentStatistics() {
    const statsSection = this.page.locator('selector-for-recruitment-statistics').first();
    await statsSection.waitFor({ state: 'visible' });
    // Add assertions for specific statistics here
  }

  async checkQuickNavigationLinks() {
    const navLinks = this.page.locator('selector-for-quick-navigation-links').first();
    await navLinks.waitFor({ state: 'visible' });
    // Add assertions for navigation links here
  }
}

module.exports = ViewDashboardPage;