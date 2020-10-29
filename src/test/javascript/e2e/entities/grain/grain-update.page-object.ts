import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GrainUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipstertestApp.grain.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#grain-name'));
  contentTypeSelect: ElementFinder = element(by.css('select#grain-contentType'));
  nameSelect: ElementFinder = element(by.css('select#grain-name'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async contentTypeSelectLastOption() {
    await this.contentTypeSelect.all(by.tagName('option')).last().click();
  }

  async contentTypeSelectOption(option) {
    await this.contentTypeSelect.sendKeys(option);
  }

  getContentTypeSelect() {
    return this.contentTypeSelect;
  }

  async getContentTypeSelectedOption() {
    return this.contentTypeSelect.element(by.css('option:checked')).getText();
  }

  async nameSelectLastOption() {
    await this.nameSelect.all(by.tagName('option')).last().click();
  }

  async nameSelectOption(option) {
    await this.nameSelect.sendKeys(option);
  }

  getNameSelect() {
    return this.nameSelect;
  }

  async getNameSelectedOption() {
    return this.nameSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await this.contentTypeSelectLastOption();
    await this.nameSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
