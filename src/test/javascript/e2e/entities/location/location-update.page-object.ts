import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LocationUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipstertestApp.location.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  streetAddressInput: ElementFinder = element(by.css('input#location-streetAddress'));
  postalCodeInput: ElementFinder = element(by.css('input#location-postalCode'));
  cityInput: ElementFinder = element(by.css('input#location-city'));
  stateProvinceInput: ElementFinder = element(by.css('input#location-stateProvince'));
  coordinatesInput: ElementFinder = element(by.css('input#location-coordinates'));
  regionSelect: ElementFinder = element(by.css('select#location-region'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStreetAddressInput(streetAddress) {
    await this.streetAddressInput.sendKeys(streetAddress);
  }

  async getStreetAddressInput() {
    return this.streetAddressInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode) {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput() {
    return this.postalCodeInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setStateProvinceInput(stateProvince) {
    await this.stateProvinceInput.sendKeys(stateProvince);
  }

  async getStateProvinceInput() {
    return this.stateProvinceInput.getAttribute('value');
  }

  async setCoordinatesInput(coordinates) {
    await this.coordinatesInput.sendKeys(coordinates);
  }

  async getCoordinatesInput() {
    return this.coordinatesInput.getAttribute('value');
  }

  async regionSelectLastOption() {
    await this.regionSelect.all(by.tagName('option')).last().click();
  }

  async regionSelectOption(option) {
    await this.regionSelect.sendKeys(option);
  }

  getRegionSelect() {
    return this.regionSelect;
  }

  async getRegionSelectedOption() {
    return this.regionSelect.element(by.css('option:checked')).getText();
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
    await this.setStreetAddressInput('streetAddress');
    expect(await this.getStreetAddressInput()).to.match(/streetAddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPostalCodeInput('postalCode');
    expect(await this.getPostalCodeInput()).to.match(/postalCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCityInput('city');
    expect(await this.getCityInput()).to.match(/city/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStateProvinceInput('stateProvince');
    expect(await this.getStateProvinceInput()).to.match(/stateProvince/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCoordinatesInput('coordinates');
    expect(await this.getCoordinatesInput()).to.match(/coordinates/);
    await this.regionSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
