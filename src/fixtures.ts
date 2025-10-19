import { test as base } from '@playwright/test';
import { DropdownPage } from './pages/dropdown/page';

type MyFixtures = {
  dropdownPage: DropdownPage;
};

export const test = base.extend<MyFixtures>({
  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.open();
    await use(dropdownPage);
  },
});

export { expect } from '@playwright/test';
