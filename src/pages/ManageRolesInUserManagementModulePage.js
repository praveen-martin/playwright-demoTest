// src/pages/ManageRolesInUserManagementModulePage.js
const { expect } = require('@playwright/test');

class ManageRolesInUserManagementModulePage {
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

    await this.page.waitForURL(/signin|organization-signup|login/i, { timeout: 15000 });
  }

  async clickRolesTab() {
    const rolesTab = this.page.locator('a:has-text("Roles")').first();
    await rolesTab.waitFor({ state: 'attached', timeout: 15000 });
    await rolesTab.scrollIntoViewIfNeeded();
    await rolesTab.waitFor({ state: 'visible', timeout: 15000 });
    await rolesTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRolesListDisplayed() {
    const rolesList = this.page.locator('section, div, article').filter({ hasText: /roles/i }).first();
    await rolesList.waitFor({ state: 'attached', timeout: 15000 });
    await rolesList.scrollIntoViewIfNeeded();
    await rolesList.waitFor({ state: 'visible', timeout: 15000 });
  }

  async checkRoleDetails() {
    const roles = this.page.locator('tr').filter({ hasText: /Role Name|Type|Status/i });
    const count = await roles.count();
    for (let i = 0; i < count; i++) {
      const roleName = roles.nth(i).locator('td').nth(0);
      const type = roles.nth(i).locator('td').nth(1);
      const status = roles.nth(i).locator('td').nth(2);
      await roleName.waitFor({ state: 'visible', timeout: 15000 });
      await type.waitFor({ state: 'visible', timeout: 15000 });
      await status.waitFor({ state: 'visible', timeout: 15000 });
    }
  }

  async verifyEditOption() {
    const editButtons = this.page.locator('button:has-text("Edit")');
    const count = await editButtons.count();
    for (let i = 0; i < count; i++) {
      await editButtons.nth(i).waitFor({ state: 'visible', timeout: 15000 });
    }
  }

  async verifyScrollableList() {
    const rolesList = this.page.locator('section, div, article').filter({ hasText: /roles/i }).first();
    const isScrollable = await rolesList.evaluate(el => el.scrollHeight > el.clientHeight);
    expect(isScrollable).toBeTruthy();
  }

  async searchRole(roleName) {
    const searchInput = this.page.locator('input[placeholder*="search role"]');
    await searchInput.waitFor({ state: 'attached', timeout: 15000 });
    await searchInput.scrollIntoViewIfNeeded();
    await searchInput.waitFor({ state: 'visible', timeout: 15000 });
    await searchInput.fill(roleName);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySearchResults(roleName) {
    const roles = this.page.locator('tr').filter({ hasText: roleName });
    const count = await roles.count();
    expect(count).toBeGreaterThan(0);
  }

  async createRole(roleName, description) {
    const createButton = this.page.locator('button:has-text("Create")').first();
    await createButton.waitFor({ state: 'attached', timeout: 15000 });
    await createButton.scrollIntoViewIfNeeded();
    await createButton.waitFor({ state: 'visible', timeout: 15000 });
    await createButton.click();

    const roleNameInput = this.page.locator('input[placeholder*="Role Name"]');
    await roleNameInput.waitFor({ state: 'attached', timeout: 15000 });
    await roleNameInput.scrollIntoViewIfNeeded();
    await roleNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await roleNameInput.fill(roleName);

    const descriptionInput = this.page.locator('textarea[placeholder*="Description"]');
    await descriptionInput.waitFor({ state: 'attached', timeout: 15000 });
    await descriptionInput.scrollIntoViewIfNeeded();
    await descriptionInput.waitFor({ state: 'visible', timeout: 15000 });
    await descriptionInput.fill(description);

    const createModalButton = this.page.locator('button:has-text("Create")').nth(1);
    await createModalButton.waitFor({ state: 'attached', timeout: 15000 });
    await createModalButton.scrollIntoViewIfNeeded();
    await createModalButton.waitFor({ state: 'visible', timeout: 15000 });
    await createModalButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRoleCreated(roleName) {
    const roles = this.page.locator('tr').filter({ hasText: roleName });
    const count = await roles.count();
    expect(count).toBeGreaterThan(0);
  }

  async toggleRoleStatus(roleName) {
    const roleRow = this.page.locator('tr').filter({ hasText: roleName }).first();
    const toggleButton = roleRow.locator('button:has-text("Toggle")').first();
    await toggleButton.waitFor({ state: 'attached', timeout: 15000 });
    await toggleButton.scrollIntoViewIfNeeded();
    await toggleButton.waitFor({ state: 'visible', timeout: 15000 });
    await toggleButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRoleStatus(roleName, expectedStatus) {
    const roleRow = this.page.locator('tr').filter({ hasText: roleName }).first();
    const status = roleRow.locator('td').nth(2);
    await status.waitFor({ state: 'visible', timeout: 15000 });
    const statusText = await status.innerText();
    expect(statusText).toBe(expectedStatus);
  }

  async cancelRoleCreation() {
    const cancelButton = this.page.locator('button:has-text("Cancel")').first();
    await cancelButton.waitFor({ state: 'attached', timeout: 15000 });
    await cancelButton.scrollIntoViewIfNeeded();
    await cancelButton.waitFor({ state: 'visible', timeout: 15000 });
    await cancelButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async refreshRolesList() {
    const refreshButton = this.page.locator('button:has-text("Refresh")').first();
    await refreshButton.waitFor({ state: 'attached', timeout: 15000 });
    await refreshButton.scrollIntoViewIfNeeded();
    await refreshButton.waitFor({ state: 'visible', timeout: 15000 });
    await refreshButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRolesListUpdated() {
    const rolesList = this.page.locator('section, div, article').filter({ hasText: /roles/i }).first();
    await rolesList.waitFor({ state: 'visible', timeout: 15000 });
  }

  async verifyDashboard() {
    await expect(this.page).toHaveURL(/dashboard|home|recruiter/i, { timeout: 30000 });
  }
}

module.exports = ManageRolesInUserManagementModulePage;