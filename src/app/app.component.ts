import { Component, OnInit } from '@angular/core';
import { faCoffee, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
import { pipe } from 'rxjs';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {
  title = 'toDolist';

  faCoffee = faCoffee;
  faAddressBook = faAddressBook;

  toDoListArray!: any[];
  toDoListArrayKey!: any[];

  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(
        pipe((res: any[]) => {
          this.toDoListArray = [];
          return res.map(element => {
            let data = element.payload.toJSON();
            data["$key"] = element.key;
            this.toDoListArray.push(data);
            console.log(data)

            this.toDoListArray.sort((a, b) => {
              return a.ischecked - b.ischecked;

            })
          })


        })



      )
  }

  onAdd(itemTitle: any) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  checky(itemchecked: boolean, key: any) {
    let a = !itemchecked

    this.toDoService.checkOrUnCheckTitle(key, a)
  }

}