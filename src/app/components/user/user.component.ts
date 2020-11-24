import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user:User;
  public users :any[];
  public docId:string;
  
  constructor(private userServices:UsersService) { }

  ngOnInit(): void {
    this.users= new Array();
    this.user = new User();
    this.getUsers();
    this.docId="";
  }

  async createUser( ){
    
    //codigo llamar al services para guardar
    if(!this.docId && this.docId === ""){
      await this.userServices.addUser(this.user);
    }else{
      await this.userServices.updateUser(this.docId,this.user);
      this.docId="";
    }
      this.user = new User();

  }

  getUser(id:string):Boolean {
    //consular si el usuario existe
    let exists: boolean = false;
    this.users.forEach(element => {
      if( element.id === id)
      {
        exists = true;
      }
    });
    
    return exists;
  }

  async getUsers(){
    
    //obtener todos los users
    (await this.userServices.getAllUsers()).subscribe( resp => {
      this.users= [];
     // return this.users;
     resp.forEach(element => {
       this.users.push(element);
      });
      console.log("getUsers = " ,this.users);  
    })
  }

  async deleteUser(id:string){
    if(this.getUser(id)){
      //codigo para eliminar
      await this.userServices.deleteUser(id);
      this.user = new User();
    }
  }

  async updateUser(user:any){
    if(this.getUser(user.id)){
      //codigo para actualizar
      this.docId=user.id;
      this.user=user.data;
    }
  }
}
