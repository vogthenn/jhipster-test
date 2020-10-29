import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import region, {
  RegionState
} from 'app/entities/region/region.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import warehouse, {
  WarehouseState
} from 'app/entities/warehouse/warehouse.reducer';
// prettier-ignore
import person, {
  PersonState
} from 'app/entities/person/person.reducer';
// prettier-ignore
import purchaseOrder, {
  PurchaseOrderState
} from 'app/entities/purchase-order/purchase-order.reducer';
// prettier-ignore
import transaction, {
  TransactionState
} from 'app/entities/transaction/transaction.reducer';
// prettier-ignore
import bag, {
  BagState
} from 'app/entities/bag/bag.reducer';
// prettier-ignore
import grain, {
  GrainState
} from 'app/entities/grain/grain.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly region: RegionState;
  readonly country: CountryState;
  readonly location: LocationState;
  readonly warehouse: WarehouseState;
  readonly person: PersonState;
  readonly purchaseOrder: PurchaseOrderState;
  readonly transaction: TransactionState;
  readonly bag: BagState;
  readonly grain: GrainState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  region,
  country,
  location,
  warehouse,
  person,
  purchaseOrder,
  transaction,
  bag,
  grain,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
