import { test, expect } from '../../fixtures';
import { testData } from '../../utils/testData';
import { applyAllureMetadata } from '../../utils/allureHelper';

const { static: staticOption, searchable, custom } = testData.dropdownOptions;

test.describe('Dropdown Tests', () => {
  test('@smoke TC-005 should select value from static dropdown', async ({ dropdownPage }) => {
    applyAllureMetadata({
      ownerName: 'dropdown-team',
      severityLevel: 'normal',
      epicName: 'Dropdowns',
      featureName: 'Static Dropdown',
      storyName: 'Select value from static dropdown',
    });

    await dropdownPage.selectStaticOption(staticOption);
    const selected = await dropdownPage.getStaticSelectedValue();
    expect(selected).toBe(staticOption);
  });

  test('@functional TC-006 should search and select value from searchable dropdown', async ({ dropdownPage }) => {
    applyAllureMetadata({
      ownerName: 'dropdown-team',
      severityLevel: 'normal',
      epicName: 'Dropdowns',
      featureName: 'searchable Dropdown',
      storyName: 'Select value from searchable dropdown',
    });

    await dropdownPage.searchAndSelect(searchable);
    const inputVal = await dropdownPage.getSearchInputValue();
    expect(inputVal).toBe(searchable);
  });

  test('@regression TC-007 should select value from custom dropdown', async ({ dropdownPage }) => {
    applyAllureMetadata({
      ownerName: 'dropdown-team',
      severityLevel: 'normal',
      epicName: 'Dropdowns',
      featureName: 'custom Dropdown',
      storyName: 'Select value from custom dropdown',
    });

    await dropdownPage.selectFromCustomDropdown(custom);
    const selected = await dropdownPage.getCustomDropdownSelected();
    expect(selected).toBe(custom);
  });

});
