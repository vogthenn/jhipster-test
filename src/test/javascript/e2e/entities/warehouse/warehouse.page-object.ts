import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import WarehouseUpdatePage from './warehouse-update.page-object';

const expect = chai.expect;
export class WarehouseDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('jhipstertestApp.warehouse.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-warehouse'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class WarehouseComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('warehouse-heading'));
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
    await navBarPage.getEntityPage('warehouse');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateWarehouse() {
    await this.createButton.click();
    return new WarehouseUpdatePage();
  }

  async deleteWarehouse() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const warehouseDeleteDialog = new WarehouseDeleteDialog();
    await waitUntilDisplayed(warehouseDeleteDialog.deleteModal);
    expect(await warehouseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jhipstertestApp.warehouse.delete.question/);
    await warehouseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(warehouseDeleteDialog.deleteModal);

    expect(await isVisible(warehouseDeleteDialog.deleteModal)).to.be.false;
  }
}
