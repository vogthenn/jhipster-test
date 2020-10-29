import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PurchaseOrderUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipstertestApp.purchaseOrder.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  desiredQuantityInput: ElementFinder = element(by.css('input#purchase-order-desiredQuantity'));
  desiredQualityInput: ElementFinder = element(by.css('input#purchase-order-desiredQuality'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDesiredQuantityInput(desiredQuantity) {
    await this.desiredQuantityInput.sendKeys(desiredQuantity);
  }

  async getDesiredQuantityInput() {
    return this.desiredQuantityInput.getAttribute('value');
  }

  async setDesiredQualityInput(desiredQuality) {
    await this.desiredQualityInput.sendKeys(desiredQuality);
  }

  async getDesiredQualityInput() {
    return this.desiredQualityInput.getAttribute('value');
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
    await this.setDesiredQuantityInput('5');
    expect(await this.getDesiredQuantityInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDesiredQualityInput('desiredQuality');
    expect(await this.getDesiredQualityInput()).to.match(/desiredQuality/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
