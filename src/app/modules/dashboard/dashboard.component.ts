import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store';
import * as fromSave from '../../store/reducers/save.reducer';
import * as fromSavePermission from '../../store/reducers/permission.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projectList$: Observable<fromSavePermission.PermissionState>;
  public objUser$: Observable<fromSave.SaveDataState>;
  public userAvatar = '';
  public firstName = '';
  public userName = '';
  public title = '';
  public module = 'welcome';

  constructor(private store: Store<fromRoot.AppState>) {
    this.objUser$ = this.store.select('userDetails');
  }

  ngOnInit() {
    this.objUser$.subscribe((obj: any) => {
      const objUser = obj.datas;
      if (objUser) {
        this.firstName = `${objUser.first_name || ''}`;
        this.userName = `${objUser.first_name || ''} ${objUser.last_name || ''}`;
        this.title = `${objUser.title || ''}`;
        this.userAvatar = `${objUser.user_avatar || ''}`;
      }
    });
  }
}
