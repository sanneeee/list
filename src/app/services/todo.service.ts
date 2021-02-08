import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  toDoList!: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getToDoList() {
    this.toDoList = this.firebase.list('titles');
    return this.toDoList;
  }

  addTitle(title: string) {
    this.toDoList.push({
      title: title,
      ischecked: false
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { ischecked: flag })
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }
}
