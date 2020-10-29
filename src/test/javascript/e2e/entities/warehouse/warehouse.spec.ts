import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WarehouseComponentsPage from './warehouse.page-object';
import WarehouseUpdatePage from './warehouse-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Warehouse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let warehouseComponentsPage: WarehouseComponentsPage;
  let warehouseUpdatePage: WarehouseUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    warehouseComponentsPage = new WarehouseComponentsPage();
    warehouseComponentsPage = await warehouseComponentsPage.goToPage(navBarPage);
  });

  it('should load Warehouses', async () => {
    expect(await warehouseComponentsPage.title.getText()).to.match(/Warehouses/);
    expect(await warehouseComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Warehouses', async () => {
    const beforeRecordsCount = (await isVisible(warehouseComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(warehouseComponentsPage.table);
    warehouseUpdatePage = await warehouseComponentsPage.goToCreateWarehouse();
    await warehouseUpdatePage.enterData();

    expect(await warehouseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(warehouseComponentsPage.table);
    await waitUntilCount(warehouseComponentsPage.records, beforeRecordsCount + 1);
    expect(await warehouseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await warehouseComponentsPage.deleteWarehouse();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(warehouseComponentsPage.records, beforeRecordsCount);
      expect(await warehouseComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(warehouseComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
