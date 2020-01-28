import { routerReducer } from '@ngrx/router-store';

import * as fromSaveData from './save.reducer';
import * as fromSavePermission from './permission.reducer';

export interface ErrorState {
  message: string;
  data?: any;
}

export interface AppState {
  permissionlist: fromSavePermission.PermissionState;
  userDetails: fromSaveData.SaveDataState;
}

export const reducers = {
  permissionlist: fromSavePermission.reducer,
  userDetails: fromSaveData.reducer,
};
