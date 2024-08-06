import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentUserComponent} from './modal/current-user.component';
import {LogComponent} from './modal/log.component';
import {ScanningComponent} from './modal/scanning.component';
import {SettingsComponent} from './modal/settings.component';
import {UserListComponent} from './modal/user-list.component';
import {UserDto} from "../../domain/user.dto";
import {AuthenticationService} from "../../service/authentication.service";
import {TranslateModule} from "@ngx-translate/core";
import Logger from "js-logger";
import {NgbDropdownModule, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {LibraryScanService} from "../../service/library-scan.service";
import {Subscription} from "rxjs";

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, NgbDropdownModule, CurrentUserComponent, SettingsComponent, ScanningComponent, LogComponent, UserListComponent],
  selector: 'pony-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  currentUser: UserDto | undefined;

  scanRunning = false;

  private scanStatisticsSubscription: Subscription | undefined;
  private authenticationSubscription: Subscription | undefined;

  constructor(
    private libraryScanService: LibraryScanService,
    private authenticationService: AuthenticationService,
    private modal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.scanStatisticsSubscription = this.libraryScanService.observeScanStatistics().subscribe(scanStatistics => {
      if (scanStatistics === null) {
        this.openScanning();
      }
    });
    this.libraryScanService.observeScanJobProgress().subscribe(scanJobProgress =>
      this.scanRunning = scanJobProgress !== undefined && scanJobProgress !== null);
    this.authenticationSubscription = this.authenticationService.observeAuthentication().subscribe(user =>
      this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.scanStatisticsSubscription?.unsubscribe();
    this.authenticationSubscription?.unsubscribe();
  }

  startScanJob() {
    if (this.scanRunning) {
      this.openScanning();
    } else {
      this.libraryScanService.startScanJob().subscribe(() => this.openScanning());
    }
  }

  openProfile() {
    this.modal.open(CurrentUserComponent).closed.subscribe(user => {
      if (user) {
        this.authenticationService.authenticate().subscribe();
      }
    });
  }

  signOut() {
    Logger.info('Signing out...');
    this.authenticationService.logout().subscribe();
  }

  openSettings() {
    this.modal.open(SettingsComponent, { size: 'lg' });
  }

  openScanning() {
    this.modal.open(ScanningComponent, { size: 'xl' });
  }

  openLog() {
    this.modal.open(LogComponent, { size: 'xl' });
  }

  openUsers() {
    this.modal.open(UserListComponent, { size: 'xl' });
  }
}
