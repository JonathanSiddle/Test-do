import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BadInput } from './errors/bad-input';
import { Observable } from 'rxjs';

@Injectable()
export class DataService <T> {

  private baseUrl = 'http://localhost:3000/';
  private fullUrl = '';
  public badInputHandler: (response: BadInput) => void;

  constructor(protected http: HttpClient) {
  }

  getAll(): Observable<Array<T>> {
    const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({headers: headers});
    return this.http.get<Array<T>>(this.fullUrl);
  }

  // getOne(id: Number) {
  //   const headers = new Headers();
  //   headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   const options = new RequestOptions({headers: headers});
  // return this.http.get(this.fullUrl + '/' + id, options);
  // }

  // create(resource) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   const options = new RequestOptions({headers: headers});
  //   return this.http.post(this.fullUrl, JSON.stringify(resource), options);
  // }
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
