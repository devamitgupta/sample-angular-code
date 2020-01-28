import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as fromRoot from '../../../../../store';
import * as fromSave from '../../../../../store/reducers/save.reducer';
import { Store } from '@ngrx/store';
import { MessageService } from '../../../../../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('inside', { static: false }) inside: ElementRef;
  public searchEnabled = false;
  public objUser$: Observable<fromSave.SaveDataState>;
  public userAvatar = '';
  public showNotification = false;
  public isSearching = false;
  projectSubscribe: any;
  permisionList: any = {};

  constructor(
    private router: Router,
    private store: Store<fromRoot.AppState>,
    private messageService: MessageService
  ) {
    this.objUser$ = this.store.select('userDetails');
  }

  ngOnInit() {
    this.projectSubscribe = this.store.select('permissionlist').subscribe((obj) => {
      if (obj.loaded) {
        if (obj.datas && obj.datas.permission) {
          this.permisionList = obj.datas.permission;
        }
      }
    });
    this.getUserDetails();
    this.avatarUpdated();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isSearching = event.url === '/main/search' ? true : false;
        }, 0);
      }
    });

    this.isSearching =  this.router.url === '/main/search'  ? true : false;
  }

  ngOnDestroy() {
    if (this.projectSubscribe) {
      this.projectSubscribe.unsubscribe();
    }
  }

  getUserDetails = () => {
    this.objUser$.subscribe((obj: any) => {
      if (obj.loaded) {
       this.userAvatar = obj.datas.user_avatar;
      }
    });
  }

  displayUsersName = (datas) => {
    const names: Array<string> = [];
    for (const data of datas) {
      names.push(' ' + data.first_name + ' ' + data.last_name);
    }
    return names;
  }

  close = () => {
    this.searchEnabled = false;
  }

  openmenu = () => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('haspanel');
  }

  notifications = () => {
    this.showNotification = false;
    this.router.navigate(['main/notifications']);
  }

  avatarUpdated = () => {
    this.messageService.$isUserImageUpdated.subscribe(res => {
      if (res) {
        this.userAvatar = res;
      }
    }, (error) => {
      // TODO:
    });
  }

  showNotifications = () => {
    this.showNotification = !this.showNotification;
  }
}
