// src/pages/RecruiterLoginAndExportDashboardFilePage.js
const { expect } = require('@playwright/test');

class RecruiterLoginAndExportDashboardFilePage {
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
    } catch (_) {}

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

  async checkRecruitmentMetrics() {
    const metrics = this.page.locator('*').filter({ hasText: /recruitment/i }).first();
    await metrics.waitFor({ state: 'attached', timeout: 15000 });
    await metrics.scrollIntoViewIfNeeded();
    await metrics.waitFor({ state: 'visible', timeout: 15000 });
  }

  async clickExportButton() {
    const exportBtn = this.page.locator('button:has-text("Export"), a:has-text("Export")').first();
    await exportBtn.waitFor({ state: 'attached', timeout: 15000 });
    await exportBtn.scrollIntoViewIfNeeded();
    await exportBtn.waitFor({ state: 'visible', timeout: 15000 });
    await exportBtn.click();
    await this.waitForNetworkIdle();
  }

  async togglePasswordVisibility() {
    const toggleBtn = this.page.locator('button:has-text("Show/Hide Password")').first();
    await toggleBtn.waitFor({ state: 'attached', timeout: 15000 });
    await toggleBtn.scrollIntoViewIfNeeded();
    await toggleBtn.waitFor({ state: 'visible', timeout: 15000 });
    await toggleBtn.click();
    await this.waitForNetworkIdle();
  }

  async logout() {
    const logoutBtn = this.page.locator('button:has-text("Logout"), a:has-text("Logout")').first();
    await logoutBtn.waitFor({ state: 'attached', timeout: 15000 });
    await logoutBtn.scrollIntoViewIfNeeded();
    await logoutBtn.waitFor({ state: 'visible', timeout: 15000 });
    await logoutBtn.click();
    await this.waitForNetworkIdle();
  }

  async navigateBackToWelcome() {
    const backBtn = this.page.locator('button:has-text("Back"), a:has-text("Back")').first();
    await backBtn.waitFor({ state: 'attached', timeout: 15000 });
    await backBtn.scrollIntoViewIfNeeded();
    await backBtn.waitFor({ state: 'visible', timeout: 15000 });
    await backBtn.click();
    await this.waitForNetworkIdle();
  }
}

module.exports = RecruiterLoginAndExportDashboardFilePage;