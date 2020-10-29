import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PurchaseOrderUpdatePage from './purchase-order-update.page-object';

const expect = chai.expect;
export class PurchaseOrderDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('jhipstertestApp.purchaseOrder.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-purchaseOrder'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PurchaseOrderComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('purchase-order-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('purchase-order');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePurchaseOrder() {
    await this.createButton.click();
    return new PurchaseOrderUpdatePage();
  }

  async deletePurchaseOrder() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const purchaseOrderDeleteDialog = new PurchaseOrderDeleteDialog();
    await waitUntilDisplayed(purchaseOrderDeleteDialog.deleteModal);
    expect(await purchaseOrderDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jhipstertestApp.purchaseOrder.delete.question/);
    await purchaseOrderDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(purchaseOrderDeleteDialog.deleteModal);

    expect(await isVisible(purchaseOrderDeleteDialog.deleteModal)).to.be.false;
  }
}
