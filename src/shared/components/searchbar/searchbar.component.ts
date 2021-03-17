import {Component, Input, Output, OnDestroy, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.sass']
})
export class SearchbarComponent implements OnDestroy{
  @Output() setValue: EventEmitter<string> = new EventEmitter();

  private searchSubject: Subject<string> = new Subject();
  constructor() {
    this.setSearchSubscription();
  }
  public updateSearch(searchTextValue: string) {
    this.searchSubject.next( searchTextValue );
  }
  private setSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe((searchValue: string) => {
      this.setValue.emit( searchValue );
    });
  }
  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }
}
