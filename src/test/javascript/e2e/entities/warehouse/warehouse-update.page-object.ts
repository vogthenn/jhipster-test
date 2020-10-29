import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class WarehouseUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipstertestApp.warehouse.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bagCapacityInput: ElementFinder = element(by.css('input#warehouse-bagCapacity'));
  nameInput: ElementFinder = element(by.css('input#warehouse-name'));
  locationSelect: ElementFinder = element(by.css('select#warehouse-location'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBagCapacityInput(bagCapacity) {
    await this.bagCapacityInput.sendKeys(bagCapacity);
  }

  async getBagCapacityInput() {
    return this.bagCapacityInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async locationSelectLastOption() {
    await this.locationSelect.all(by.tagName('option')).last().click();
  }

  async locationSelectOption(option) {
    await this.locationSelect.sendKeys(option);
  }

  getLocationSelect() {
    return this.locationSelect;
  }

  async getLocationSelectedOption() {
    return this.locationSelect.element(by.css('option:checked')).getText();
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
    await this.setBagCapacityInput('5');
    expect(await this.getBagCapacityInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await this.locationSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
