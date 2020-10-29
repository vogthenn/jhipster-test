import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PurchaseOrderComponentsPage from './purchase-order.page-object';
import PurchaseOrderUpdatePage from './purchase-order-update.page-object';
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

describe('PurchaseOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let purchaseOrderComponentsPage: PurchaseOrderComponentsPage;
  let purchaseOrderUpdatePage: PurchaseOrderUpdatePage;

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
    purchaseOrderComponentsPage = new PurchaseOrderComponentsPage();
    purchaseOrderComponentsPage = await purchaseOrderComponentsPage.goToPage(navBarPage);
  });

  it('should load PurchaseOrders', async () => {
    expect(await purchaseOrderComponentsPage.title.getText()).to.match(/Purchase Orders/);
    expect(await purchaseOrderComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PurchaseOrders', async () => {
    const beforeRecordsCount = (await isVisible(purchaseOrderComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(purchaseOrderComponentsPage.table);
    purchaseOrderUpdatePage = await purchaseOrderComponentsPage.goToCreatePurchaseOrder();
    await purchaseOrderUpdatePage.enterData();

    expect(await purchaseOrderComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(purchaseOrderComponentsPage.table);
    await waitUntilCount(purchaseOrderComponentsPage.records, beforeRecordsCount + 1);
    expect(await purchaseOrderComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await purchaseOrderComponentsPage.deletePurchaseOrder();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(purchaseOrderComponentsPage.records, beforeRecordsCount);
      expect(await purchaseOrderComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(purchaseOrderComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
