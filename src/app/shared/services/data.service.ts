import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resolveReflectiveProviders } from '../../../../node_modules/@angular/core/src/di/reflective_provider';

@Injectable()
export class DataService <T> {

  private baseUrl = 'http://localhost:3000/';
  private fullUrl = '';

  constructor(protected endPoint: string, protected http: HttpClient) {
      this.fullUrl = this.baseUrl + endPoint;
  }

  getAll(): Observable<Array<T>> {
    const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({headers: headers});
    return this.http.get<Array<T>>(this.fullUrl);
  }

  getOne(id: Number): Observable<T> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // const options = new RequestOptions({headers: headers});
    return this.http.get<T>(this.fullUrl + '/' + id);
  }

  create(resource: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // const options = new RequestOptions({headers: headers});
    return this.http.post<T>(this.fullUrl, JSON.stringify(resource), httpOptions);
  }

  // update(resource) {
  //   return this.http.patch(this.fullUrl + '/' + resource.id, JSON.stringify({ isRead: true }));
  // }

  // delete(id) {
  //   return this.http.delete(this.fullUrl + '/' + id);
  // }

  // handleError(error: Response, dataService: DataService) {

  //   console.log("in error handler");
  //   // console.dir(error);
  //   // console.dir(error);

  //   // unautherised
  //   if (error.status === 401) {
  //       console.log('Unauth error');
  //   }

  //   if (error.status === 400) {
  //     return Observable.throw(new BadInput(error.json()));
  //   }
  //   if (error.status === 404)
  //     return Observable.throw(new NotFoundError());
  //   return Observable.throw(new AppError(error));
  // }
}
