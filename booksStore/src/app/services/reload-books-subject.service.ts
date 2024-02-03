import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadBooksSubjectService {

  constructor() { }
  //public loginSubject$: Subject<String> = new Subject();
  public reloadSubject$: Subject<{categoryId: number, searchKey: string}> = new Subject();
}
