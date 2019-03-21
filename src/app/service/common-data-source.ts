import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {ApiResponse} from '../model/api-response';
import {ApiService} from './api.service';

export class CommonDataSource implements DataSource<ApiResponse> {

  public entitiesSubject = new BehaviorSubject<ApiResponse>(new ApiResponse());
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: ApiService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<ApiResponse['result']> {
    return this.entitiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitiesSubject.complete();
    this.loadingSubject.complete();
  }

  loadEntities(url: string, search?: string, sort?: string, sortDirection?: string, page?: number, size?: number) {

    this.loadingSubject.next(true);

    console.log('common-data');
    console.log(url);

    this.apiService.getEntities(url, search, sort, sortDirection, page, size).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(entities => {
        this.entitiesSubject.next(entities['result']);
      });
  }
}
