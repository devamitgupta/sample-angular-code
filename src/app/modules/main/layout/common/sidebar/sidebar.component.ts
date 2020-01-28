import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from 'src/app/services/sharedService';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Messages } from 'src/app/services/messages';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  pages: any[] = [
    {
      link: '/main/dashboard',
      title: 'Dashboard',
      icon: 'Dashboard-White.svg'
    },
    {
      link: '/main/projects',
      title: 'Projects',
      icon: 'Projects-White.svg',
      icon2: 'plus-square.svg'
    },
    {
      link: '/main/projects/list-workflow',
      title: 'Workflows',
      icon: 'Workflows-White.svg',
      icon2: 'plus-square.svg'
    },
    {
      link: '/main/projects/tasks',
      title: 'Tasks',
      icon: 'Tasks-White.svg',
      icon2: 'plus-square.svg'
    },
    {
      link: '/main/documents',
      title: 'Documents',
      icon: 'Documents-White.svg'
    },
    {
      link: '/main/report-list',
      title: 'Reporting',
      icon: 'Reporting-White.svg'
    },
    {
      link: '/main/services',
      title: 'Requests',
      icon: 'Requests-White.svg'
    },
    {
      link: '/main/groups',
      title: 'My Groups',
      icon: 'Groups-White.svg'
    },
    {
      link: '/main/company-setup',
      title: 'Company Mgt',
      icon: 'CompanyMGT-White.svg'
    },
    {
      link: '/main/tags-manager',
      title: 'Tag Manager',
      icon: 'tag_grey.svg'
    }
  ];

  currentRoute = '';

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    this.currentRoute = this.router.url;
  }

  openLink(page: any): void {
    document.body.classList.remove('haspanel');
  }

  logout(): void {
    this.ngxService.start();
    this.sharedService.logOut().subscribe(() => {
      this.sharedService.clearStorageAndRedirectToLogin();
      this.ngxService.stop();
      this.sharedService.showSuccess(Messages.success.logout);
      document.body.classList.remove('haspanel');
    }, error => {
      this.ngxService.stop();
    });
  }

  accountSettings = () => {
    document.body.classList.remove('haspanel');
  }
}
