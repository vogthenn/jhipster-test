import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GrainComponentsPage from './grain.page-object';
import GrainUpdatePage from './grain-update.page-object';
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

describe('Grain e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let grainComponentsPage: GrainComponentsPage;
  let grainUpdatePage: GrainUpdatePage;

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
    grainComponentsPage = new GrainComponentsPage();
    grainComponentsPage = await grainComponentsPage.goToPage(navBarPage);
  });

  it('should load Grains', async () => {
    expect(await grainComponentsPage.title.getText()).to.match(/Grains/);
    expect(await grainComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Grains', async () => {
    const beforeRecordsCount = (await isVisible(grainComponentsPage.noRecords)) ? 0 : await getRecordsCount(grainComponentsPage.table);
    grainUpdatePage = await grainComponentsPage.goToCreateGrain();
    await grainUpdatePage.enterData();

    expect(await grainComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(grainComponentsPage.table);
    await waitUntilCount(grainComponentsPage.records, beforeRecordsCount + 1);
    expect(await grainComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await grainComponentsPage.deleteGrain();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(grainComponentsPage.records, beforeRecordsCount);
      expect(await grainComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(grainComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
