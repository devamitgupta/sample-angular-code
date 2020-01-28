import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../../apiBaseModel/baseResponse';
import { API_BASE_URL } from '../../config/web.config';

@Injectable()

export class DashboardService {

    constructor(private http: HttpClient) { }

    getAssignedTask(data?): Observable<any> {
        return this.http.get<IBaseResponse<any>>(`${API_BASE_URL}projects/api/dashboard_statistic/assigned_task/`, { params: data });
    }

    getUpcomingWeek(data?): Observable<any> {
        return this.http.get<IBaseResponse<any>>(`${API_BASE_URL}projects/api/dashboard_statistic/upcoming_week/`, { params: data });
    }
}