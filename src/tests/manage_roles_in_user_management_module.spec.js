// src/tests/manageRoles.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const ManageRolesInUserManagementModulePage = require('../pages/ManageRolesInUserManagementModulePage');

test('Manage Roles in User Management Module', async ({ page }) => {
  const manageRoles = new ManageRolesInUserManagementModulePage(page);

  await manageRoles.navigate(process.env.BASE_URL);
  await manageRoles.goToSignin();
  await manageRoles.clickRolesTab();

  await manageRoles.verifyRolesListDisplayed();
  await manageRoles.checkRoleDetails();
  await manageRoles.verifyEditOption();
  await manageRoles.verifyScrollableList();

  await manageRoles.searchRole('Admin');
  await manageRoles.verifySearchResults('Admin');

  await manageRoles.createRole('Admin', 'This role is for managing user permissions.');
  await manageRoles.verifyRoleCreated('Admin');

  await manageRoles.toggleRoleStatus('Admin');
  await manageRoles.verifyRoleStatus('Admin', 'Active');

  await manageRoles.toggleRoleStatus('Admin');
  await manageRoles.verifyRoleStatus('Admin', 'Inactive');

  await manageRoles.cancelRoleCreation();
  await manageRoles.refreshRolesList();
  await manageRoles.verifyRolesListUpdated();
});