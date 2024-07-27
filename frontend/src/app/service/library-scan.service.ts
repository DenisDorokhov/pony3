import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  defer,
  delay,
  delayWhen,
  interval,
  mergeMap,
  Observable,
  of,
  repeat,
  Subscription,
  timer
} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {
  ScanJobDto,
  ScanJobPageDto,
  ScanJobProgressDto,
  ScanStatisticsDto
} from "../domain/library.dto";
import {AuthenticationService} from "./authentication.service";
import {ErrorDto, OptionalResponseDto} from "../domain/common.dto";
import Logger from "js-logger";
import {LibraryService} from "./library.service";

@Injectable({
  providedIn: 'root'
})
export class LibraryScanService {

  private scanStatisticsSubject = new BehaviorSubject<ScanStatisticsDto | undefined | null>(undefined);
  private scanJobProgressSubject = new BehaviorSubject<ScanJobProgressDto | undefined | null>(undefined);

  private scanJobProgressUpdateSubscription: Subscription | undefined;
  private refreshRequestSubscription: Subscription | undefined;

  constructor(
    private libraryService: LibraryService,
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.scheduleScanJobProgressUpdate();
    if (this.authenticationService.isAuthenticated) {
      this.updateScanStatistics().subscribe();
    }
    this.authenticationService.observeAuthentication().pipe(
      mergeMap(() => this.updateScanStatistics())
    ).subscribe();
  }

  updateScanStatistics(): Observable<ScanStatisticsDto | null> {
    Logger.info('Updating scan statistics...');
    return this.httpClient.get<OptionalResponseDto<ScanStatisticsDto>>('/api/library/scanStatistics')
      .pipe(
        map(optionalResponse => {
          if (optionalResponse.present) {
            Logger.info('Scan statistics updated.');
            this.scanStatisticsSubject.next(optionalResponse.value!);
            return optionalResponse.value!;
          } else {
            if (this.scanStatisticsSubject.value !== null) {
              this.scanStatisticsSubject.next(null);
            }
            return null;
          }
        })
      );
  }

  private scheduleScanJobProgressUpdate() {
    this.scanJobProgressUpdateSubscription?.unsubscribe();
    this.scanJobProgressUpdateSubscription = defer(() => {
      if (this.authenticationService.isAuthenticated) {
        return this.updateScanJobProgress();
      } else {
        return of(undefined);
      }
    })
      .pipe(
        catchError(error => {
          Logger.error(`Could not update scan job progress: ${JSON.stringify(error)}`);
          return of(undefined);
        }),
        delayWhen(() => this.scanJobProgressSubject.value ? interval(1000) : interval(30000)),
        repeat()
      )
      .subscribe();
  }

  updateScanJobProgress(): Observable<ScanJobProgressDto | null> {
    return this.httpClient.get<OptionalResponseDto<ScanJobProgressDto>>('/api/admin/library/scanJobProgress')
      .pipe(
        map(optionalResponse => {
          if (optionalResponse.present) {
            Logger.debug('Scan job progress updated.');
            if (!this.scanJobProgressSubject.value) {
              Logger.info("Scheduling auto-refresh during scan job running.");
              this.refreshRequestSubscription = timer(0, 10000).pipe(
                tap(() => {
                  this.libraryService.requestRefresh();
                })
              ).subscribe();
            }
            this.scanJobProgressSubject.next(optionalResponse.value!);
            return optionalResponse.value!;
          } else {
            Logger.info('Scan job is not running.');
            if (this.scanJobProgressSubject.value !== null) {
              this.scanJobProgressSubject.next(null);
            }
            if (this.refreshRequestSubscription) {
              Logger.info("Scan job finished, cancelling auto-refresh.");
              this.libraryService.requestRefresh();
              this.refreshRequestSubscription.unsubscribe();
              this.refreshRequestSubscription = undefined;
            }
            return null;
          }
        })
      );
  }

  observeScanStatistics(): Observable<ScanStatisticsDto | undefined | null> {
    return this.scanStatisticsSubject.asObservable();
  }

  observeScanJobProgress(): Observable<ScanJobProgressDto | undefined | null> {
    return this.scanJobProgressSubject.asObservable();
  }

  getScanJobs(pageIndex = 0, pageSize = 30): Observable<ScanJobPageDto> {
    return this.httpClient.get<ScanJobPageDto>('/api/admin/library/scanJobs', { params: {pageIndex, pageSize} })
      .pipe(
        catchError(error => {
          Logger.error(`Could not get scan jobs: ${JSON.stringify(error)}`);
          throw ErrorDto.fromHttpErrorResponse(error);
        })
      );
  }

  startScanJob(): Observable<ScanJobProgressDto | null> {
    return this.httpClient.post<ScanJobDto>('/api/admin/library/scanJobs', null)
      .pipe(
        delay(1000),
        mergeMap(() => this.updateScanJobProgress()),
        tap(() => this.scheduleScanJobProgressUpdate()),
        catchError(error => {
          Logger.error(`Could not start scan job: ${JSON.stringify(error)}`);
          throw ErrorDto.fromHttpErrorResponse(error);
        })
      );
  }
}
