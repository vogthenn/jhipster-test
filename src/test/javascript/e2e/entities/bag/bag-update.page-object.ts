import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BagUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipstertestApp.bag.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  qualitySelect: ElementFinder = element(by.css('select#bag-quality'));
  bagsSelect: ElementFinder = element(by.css('select#bag-bags'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQualitySelect(quality) {
    await this.qualitySelect.sendKeys(quality);
  }

  async getQualitySelect() {
    return this.qualitySelect.element(by.css('option:checked')).getText();
  }

  async qualitySelectLastOption() {
    await this.qualitySelect.all(by.tagName('option')).last().click();
  }
  async bagsSelectLastOption() {
    await this.bagsSelect.all(by.tagName('option')).last().click();
  }

  async bagsSelectOption(option) {
    await this.bagsSelect.sendKeys(option);
  }

  getBagsSelect() {
    return this.bagsSelect;
  }

  async getBagsSelectedOption() {
    return this.bagsSelect.element(by.css('option:checked')).getText();
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
    await this.qualitySelectLastOption();
    await this.bagsSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
