import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './store';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Proxy';

  constructor(
    private titleService: Title,
    private router: Router,
    private userService: UserService,
    private store: Store<fromRoot.AppState>,
  ) { }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
      }
    });
    Promise.all([this.loadUserDetails(), this.loadUserPermission()]).then(
      () => {
        // TODO:
      },
    );
  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  loadUserDetails = () => {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getLoggedInUserDetails().subscribe(res => {
        this.store.dispatch(new fromRoot.SaveDataSuccessAction(res));
      }, (e) => {
        // TODO:
      });
    }
  }

  loadUserPermission = () => {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.userPermission().subscribe(res => {
        this.store.dispatch(new fromRoot.SavePermissionSuccessAction(res));
      }, (e) => {
        // TODO:
      });
    }
  }

}
