import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BagComponentsPage from './bag.page-object';
import BagUpdatePage from './bag-update.page-object';
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

describe('Bag e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bagComponentsPage: BagComponentsPage;
  let bagUpdatePage: BagUpdatePage;

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
    bagComponentsPage = new BagComponentsPage();
    bagComponentsPage = await bagComponentsPage.goToPage(navBarPage);
  });

  it('should load Bags', async () => {
    expect(await bagComponentsPage.title.getText()).to.match(/Bags/);
    expect(await bagComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Bags', async () => {
    const beforeRecordsCount = (await isVisible(bagComponentsPage.noRecords)) ? 0 : await getRecordsCount(bagComponentsPage.table);
    bagUpdatePage = await bagComponentsPage.goToCreateBag();
    await bagUpdatePage.enterData();

    expect(await bagComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bagComponentsPage.table);
    await waitUntilCount(bagComponentsPage.records, beforeRecordsCount + 1);
    expect(await bagComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bagComponentsPage.deleteBag();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bagComponentsPage.records, beforeRecordsCount);
      expect(await bagComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bagComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
