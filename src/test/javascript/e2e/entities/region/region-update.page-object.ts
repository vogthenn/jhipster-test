import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class RegionUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipstertestApp.region.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  regionNameInput: ElementFinder = element(by.css('input#region-regionName'));
  countrySelect: ElementFinder = element(by.css('select#region-country'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRegionNameInput(regionName) {
    await this.regionNameInput.sendKeys(regionName);
  }

  async getRegionNameInput() {
    return this.regionNameInput.getAttribute('value');
  }

  async countrySelectLastOption() {
    await this.countrySelect.all(by.tagName('option')).last().click();
  }

  async countrySelectOption(option) {
    await this.countrySelect.sendKeys(option);
  }

  getCountrySelect() {
    return this.countrySelect;
  }

  async getCountrySelectedOption() {
    return this.countrySelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setRegionNameInput('regionName');
    expect(await this.getRegionNameInput()).to.match(/regionName/);
    await this.countrySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
