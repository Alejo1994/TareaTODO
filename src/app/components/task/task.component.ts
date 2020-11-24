import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/entities/task';
import { User } from 'src/app/entities/user';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public task:Task;
  public tasks: any[];
  public docId: string;
  public users: any[];
  
  constructor(private taskServices:TaskService,
              private userServices:UsersService) { }

  ngOnInit(): void {
    this.users=new Array();
    this.tasks=new Array();
    this.task=new Task();
    this.getTasks();
    this.docId="";
    this.loadUsers();
  }

  async createTask( ){

    //codigo llamar al services para guardar
    if (!this.docId && this.docId === "") {
        await this.taskServices.addTask(this.task);
    }else{
      await this.taskServices.updateTask(this.docId,this.task);
      this.docId="";
    }
    this.task = new Task();
  }

  getTask(id:string):Boolean {
    //consular si el usuario existe
    let exists: boolean = false;
    this.tasks.forEach(element => {
      if(element.id === id){
        exists = true;
      }
    });
    return exists;
  }

  async getTasks(){
    (await this.taskServices.getAllTasks()).subscribe(resp => {
      this.tasks=[];

      resp.forEach(element => {
        this.tasks.push(element);
      });
      console.log("getTasks =",this.tasks);
    })
  }

  async deleteTask(id:string){
    if(this.getTask(id)){
      //codigo para eliminar
      await this.taskServices.deleteTask(id);
      this.task=new Task();
    }
  }

  updateTask(task:any){
    if(this.getTask(task.id)){
      //codigo para actualizar
      this.docId=task.id;
      this.task=task.data;
    }
  }

  async loadUsers(){
    (await this.userServices.getAllUsers()).subscribe(resp => {
      resp.forEach((element) => {
        this.users.push(element);
      });
      console.log(this.users);
    })
  
  }

  async deactiveTask(id:string, state:boolean){
    await this.taskServices.deactiveTask(id,state);
  }

  getNameUserSelected(){
    this.users.forEach(user=>{
      if(this.task.userId === user.id){
        this.task.userName= `${user.data.firstName} ${user.data.lastName}`;
      }
    });
    console.log(this.task.userName);
  }
}
