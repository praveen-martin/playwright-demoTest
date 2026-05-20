// src/pages/ViewDashboardPage.js
const { expect } = require('@playwright/test');

class ViewDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'load' });
    await this.page.waitForLoadState('networkidle');
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
      // "Continue as Organization" step is optional
    }

    await this.page.waitForURL(/signin|login|organization-signup/i, { timeout: 15000 });
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
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDashboard() {
    await expect(this.page).toHaveURL(/dashboard|home|recruiter/i, { timeout: 30000 });
  }

  async checkRecruitmentStatistics() {
    const statsSection = this.page.locator(':has-text("Recruitment Statistics")');
    await statsSection.waitFor({ state: 'attached', timeout: 15000 });
    await statsSection.scrollIntoViewIfNeeded();
    await statsSection.waitFor({ state: 'visible', timeout: 15000 });
    // Add checks for specific statistics here
  }

  async checkQuickNavigationLinks() {
    const navLinks = this.page.locator(':has-text("Jobs"), :has-text("Candidates"), :has-text("Interviews")');
    await navLinks.waitFor({ state: 'attached', timeout: 15000 });
    await navLinks.scrollIntoViewIfNeeded();
    await navLinks.waitFor({ state: 'visible', timeout: 15000 });
  }

  async logout() {
    const logoutBtn = this.page.locator('button:has-text("Logout"), a:has-text("Logout")').first();
    await logoutBtn.waitFor({ state: 'attached', timeout: 15000 });
    await logoutBtn.scrollIntoViewIfNeeded();
    await logoutBtn.waitFor({ state: 'visible', timeout: 15000 });
    await logoutBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = ViewDashboardPage;