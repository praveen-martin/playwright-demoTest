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
    const el = this.page.locator('input[type="email"], input[name="email"], [placeholder*="email" i], #email').first();
    await el.waitFor({ state: 'attached', timeout: 15000 });
    await el.scrollIntoViewIfNeeded();
    await el.waitFor({ state: 'visible', timeout: 15000 });
    await el.fill(email);
  }

  async enterPassword(password) {
    const el = this.page.locator('input[type="password"], input[name="password"], [placeholder*="password" i], #password').first();
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
    const totalJobs = this.page.locator('.total-jobs'); // Adjust selector as needed
    const totalCandidates = this.page.locator('.total-candidates'); // Adjust selector as needed
    const interviewsScheduled = this.page.locator('.interviews-scheduled'); // Adjust selector as needed
    const offersMade = this.page.locator('.offers-made'); // Adjust selector as needed

    await totalJobs.waitFor({ state: 'attached', timeout: 15000 });
    await totalJobs.scrollIntoViewIfNeeded();
    await totalJobs.waitFor({ state: 'visible', timeout: 15000 });

    await totalCandidates.waitFor({ state: 'attached', timeout: 15000 });
    await totalCandidates.scrollIntoViewIfNeeded();
    await totalCandidates.waitFor({ state: 'visible', timeout: 15000 });

    await interviewsScheduled.waitFor({ state: 'attached', timeout: 15000 });
    await interviewsScheduled.scrollIntoViewIfNeeded();
    await interviewsScheduled.waitFor({ state: 'visible', timeout: 15000 });

    await offersMade.waitFor({ state: 'attached', timeout: 15000 });
    await offersMade.scrollIntoViewIfNeeded();
    await offersMade.waitFor({ state: 'visible', timeout: 15000 });
  }

  async checkQuickNavigationLinks() {
    const links = this.page.locator('.quick-navigation'); // Adjust selector as needed
    await links.waitFor({ state: 'attached', timeout: 15000 });
    await links.scrollIntoViewIfNeeded();
    await links.waitFor({ state: 'visible', timeout: 15000 });
  }
}

module.exports = ViewDashboardPage;