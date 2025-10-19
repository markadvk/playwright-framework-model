// Page locators for the Dropdown page
export const locators = {
  staticDropdown: '#carSelect',
  searchableInput: '#carSearch',
  searchableOption: (option: string) => `#carList .car-option:has-text("${option}")`,
  customDropdownButton: '.dropdown-button',
  customDropdownOption: (option: string) => `[role="menuitem"]:has-text("${option}")`,
};
