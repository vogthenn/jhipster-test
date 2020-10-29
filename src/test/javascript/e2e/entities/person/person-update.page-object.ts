import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PersonUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipstertestApp.person.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#person-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#person-lastName'));
  emailInput: ElementFinder = element(by.css('input#person-email'));
  phoneNumberInput: ElementFinder = element(by.css('input#person-phoneNumber'));
  hireDateInput: ElementFinder = element(by.css('input#person-hireDate'));
  salaryInput: ElementFinder = element(by.css('input#person-salary'));
  commissionPctInput: ElementFinder = element(by.css('input#person-commissionPct'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setHireDateInput(hireDate) {
    await this.hireDateInput.sendKeys(hireDate);
  }

  async getHireDateInput() {
    return this.hireDateInput.getAttribute('value');
  }

  async setSalaryInput(salary) {
    await this.salaryInput.sendKeys(salary);
  }

  async getSalaryInput() {
    return this.salaryInput.getAttribute('value');
  }

  async setCommissionPctInput(commissionPct) {
    await this.commissionPctInput.sendKeys(commissionPct);
  }

  async getCommissionPctInput() {
    return this.commissionPctInput.getAttribute('value');
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
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('email');
    expect(await this.getEmailInput()).to.match(/email/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneNumberInput('phoneNumber');
    expect(await this.getPhoneNumberInput()).to.match(/phoneNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setHireDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getHireDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setSalaryInput('5');
    expect(await this.getSalaryInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommissionPctInput('5');
    expect(await this.getCommissionPctInput()).to.eq('5');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
