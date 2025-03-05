import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angularCRUDApp';
  isNewUser: boolean = false;
  userObj: User = new User();

  userList: User[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('angular19User');
    if(localData != null){
      this.userList = JSON.parse(localData);
    }
  }

  changeView(){
    this.isNewUser = !this.isNewUser;
  }

  resetUser(){
    this.userObj.userId=0;
    this.userObj.fName="";
    this.userObj.lName="";
    this.userObj.username="";
    this.userObj.city="";
    this.userObj.state="";
    this.userObj.zip="";
    this.userObj.isAgree=false;
  }

  onSave(){
    this.userObj.userId = this.userList.length + 1;
    this.userList.push(this.userObj);
    localStorage.setItem('angular19User', JSON.stringify(this.userList));
    this.changeView();
  }

  onEdit(user: User){
    this.userObj = user;
    this.changeView();
  }

  onUpdate(){
    const record = this.userList.find(m => m.userId == this.userObj.userId);
    if(record != undefined) {
      record.city = this.userObj.city;
      record.fName = this.userObj.fName;
      record.state = this.userObj.state;
      record.lName = this.userObj.lName;
      record.username = this.userObj.username;
      record.zip = this.userObj.zip;
    }
    localStorage.setItem('angular19User', JSON.stringify(this.userList));
    this.changeView();
  }

  onDelete(userId: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if(isDelete){
      const index = this.userList.findIndex(m => m.userId == userId)
      this.userList.splice(index,1);
      localStorage.setItem('angular19User', JSON.stringify(this.userList));
    }
  }

}

class User {
  userId: number;
  fName: string;
  lName: string;
  username: string;
  city: string;
  state: string;
  zip: string;
  isAgree: boolean;

  constructor(){
    this.userId=0;
    this.fName="";
    this.lName="";
    this.username="";
    this.city="";
    this.state="";
    this.zip="";
    this.isAgree=false;
  }

}