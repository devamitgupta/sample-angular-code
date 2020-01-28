import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBaseResponse } from '../apiBaseModel/baseResponse';
import { Messages } from './messages';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../config/web.config';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(
    private messageService: NotifierService,
    private http: HttpClient,
    private router: Router
  ) { }

  loginPageMessage = new BehaviorSubject({ msg: '', success: false });
  moduleCarrier = new BehaviorSubject({ type: '', data: []});
  statusList = [{
    id: 1,
    title: 'New'
  },
  {
    id: 2,
    title: 'In-Progress'
  },
  {
    id: 3,
    title: 'Completed'
  },
  {
    id: 4,
    title: 'Archived'
  },
  {
    id: 5,
    title: 'External Request'
  },
  {
    id: 6,
    title: 'External Update'
  }];

  importanceList = [
    { id: 1, title: 'Low' },
    { id: 2, title: 'Medium' },
    { id: 3, title: 'High' }
  ];

  privilegeList = [{
    id: '',
    title: 'None'
  },
  {
    id: 'attorney_client_privilege',
    title: 'Attorney Client'
  },
  {
    id: 'work_product_privilege',
    title: 'Work Product'
  },
  {
    id: 'confidential_privilege',
    title: 'Confidential'
  }];

  allowedFileFormats: Array<string> = [
    '.docx', '.doc', '.rtf', '.txt', '.docm', '.xml', '.xlsx', '.xls', '.pdf',
    '.png', '.tif', '.msg', '.jpg', '.pptx', '.gif', '.stl', '.csv'
  ];

  globalSearchFilter = {
    sortBy: [
      {
        id: '1',
        name: 'A-Z'
      },
      {
        id: '2',
        name: 'Z-A'
      }
    ],
    status: [
      {
        id: '1',
        name: 'New'
      },
      {
        id: '2',
        name: 'In Progress'
      },
      {
        id: '3',
        name: 'Completed'
      },
      {
        id: '5',
        name: 'Show All'
      },
    ],
    type: [
      {
        id: '1',
        name: 'Projects'
      },
      {
        id: '2',
        name: 'Workflows'
      },
      {
        id: '3',
        name: 'Tasks'
      },
      {
        id: '4',
        name: 'Documents'
      },
      {
        id: '5',
        name: 'Show All'
      },
    ],
    importance: [
      {
        id: '3',
        name: 'High'
      },
      {
        id: '2',
        name: 'Medium'
      },
      {
        id: '1',
        name: 'Low'
      },
      {
        id: '4',
        name: 'Show All'
      },
    ],
  };

  public showError(msg: string): void {
    this.messageService.notify('error', msg);
  }

  public showSuccess(msg: string): void {
    this.messageService.notify('success', msg);
  }

  public dismissAllMessages(): void {
    this.messageService.hideAll();
  }

  public getFileBlob(fileUrl: string = ''): Observable<any> {
    return this.http.get(`${fileUrl}`, { responseType: 'blob' });
  }

  public deleteDocument(id: number): Observable<any> {
    return this.http.delete<IBaseResponse<any>>(`${API_BASE_URL}projects/api/documents/${id}/`);
  }

  public clearStorageAndRedirectToLogin(sessionExpired?: boolean): void {
    localStorage.clear();
    sessionStorage.clear();

    if (sessionExpired) {
      this.loginPageMessage.next({ success: false, msg: Messages.errors.sessionExpired });
    }

    this.router.navigate(['/auth/login']);
  }

  public sendNotifications(id: string): Observable<any> {
    return this.http.post<IBaseResponse<any>>(`${API_BASE_URL}notifications/api/taskupdate/`, { task_id: id });
  }

  public logOut(): Observable<IBaseResponse<any>> {
    return this.http.get<IBaseResponse<any>>(`${API_BASE_URL}api/logout/`, {});
  }

  public uploadDocument(file: any): Observable<any> {
    const formData = new FormData();
    if (file.newName) {
      formData.append('document', file, file.newName);
    } else {
      formData.append('document', file);
    }
    formData.append('document_name', file.newName ? file.newName : file.name);
    if (file.document_tag_save) {
      formData.append('document_tag_save', file.document_tag_save);
    }

    return this.http.post(`${API_BASE_URL}projects/api/documents/`, formData);
  }

  public filterParams(params): object {
    return Object.entries(params).reduce((a, [k, v]) => (!v ? a : { ...a, [k]: v }), {});
  }

  public formatDate(date): string {
    const time = moment().format('HH:mm:ss');
    return moment(date).format(`YYYY-MM-DD[T]${time}Z`);
  }
}
