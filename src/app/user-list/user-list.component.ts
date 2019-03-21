import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent, merge} from 'rxjs';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort} from '@angular/material';
import {ApiService} from '../service/api.service';
import {NotificationService} from '../service/notification.service';
import {UserService} from '../service/user.service';
import {UserSaveComponent} from '../user-save/user-save.component';
import {CommonDataSource} from '../service/common-data-source';
import {ConfirmDialogService} from '../service/confirm-dialog.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit, OnInit {

  dataSource: CommonDataSource;
  displayedColumns: string[] = ['name', 'description', 'actions'];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  searchKey: string;

  result: any;


  constructor(private userService: UserService,
              private apiService: ApiService,
              private dialog: MatDialog,
              private confirmDialogService: ConfirmDialogService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.dataSource = new CommonDataSource(this.apiService);
    this.dataSource.loadEntities(UserService.URL);
  }

  onSearchClear() {
    this.input.nativeElement.value = '';
    this.loadEntitiesPage();
  }

  onCreate() {
    this.userService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.position = {
      'top': '10px'
    };
    const dialogRef = this.dialog.open(UserSaveComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.loadEntitiesPage();
    });
  }

  onEdit(entity) {
    this.userService.populateForm(entity);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.position = {
      'top': '10px'
    };
    const dialogRef = this.dialog.open(UserSaveComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.loadEntitiesPage();
    });
  }

  onDelete(entity) {
    this.confirmDialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.apiService.deleteEntity(UserService.URL, entity).subscribe(
          (data) => {
            this.notificationService.success('! Deleted successfully');
            this.loadEntitiesPage();
          },
          (error) => this.notificationService.warn('! Error')
        );
      }
    });
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadEntitiesPage();
        })
      ).subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new tab
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEntitiesPage())
      ).subscribe();
    // console.log(this.dataSource);
  }

  loadEntitiesPage() {
    this.dataSource.loadEntities(
      UserService.URL,
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}
