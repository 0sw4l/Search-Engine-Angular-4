import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from '../components/models/Data';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './MessageService';


@Injectable()
export class ApiRestService {

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getDataApi(url: string): Observable<Data[]> {
    return this.http.get<Data[]>(url)
      .pipe(
        tap(data => this.log('data ' + data)),
        catchError(this.handleError('getData', []))
      );
  }

  getDataProperty(url: string): Observable<Data[]> {
    return this.http.get<Data[]>(url)
      .pipe(
        tap(data => this.log('data ' + data)),
        catchError(this.handleError('getProperty', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
