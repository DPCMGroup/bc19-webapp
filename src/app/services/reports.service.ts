import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OccupationData} from '../models/occupation-data';
import {Observable} from 'rxjs';
import {SanitizationData} from '../models/sanitization-data';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private APIUrl: string
  ) { }

  getOccupationsReport(startTime = '2021-06-01 00:00:00',
                       endTime = '2021-06-03 00:00:00'): Observable<OccupationData[]> {
    const params = {
      starttime: startTime,
      endtime: endTime
    };
    return this.http.post<OccupationData[]>(this.APIUrl + '/report/occupations', params);
  }

  getSanitizationsReport(startTime = '2021-06-01 00:00:00',
                         endTime = '2021-06-03 00:00:00'): Observable<SanitizationData[]> {
    const params = {
      starttime: startTime,
      endtime: endTime
    };
    return this.http.post<SanitizationData[]>(this.APIUrl + '/report/sanitizations', params);
  }
}
