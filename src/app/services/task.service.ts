import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Task } from '../entities/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db:AngularFirestore) { }

  async getAllTasks(){
    return this.db.collection("task").snapshotChanges()
        .pipe(map(document => {
            return document.map(doc => {
                return {id:doc.payload.doc.id, data:doc.payload.doc.data() as Task}
            })
        }));
  }

  async addTask(task: Task){
    return this.db.collection("task").add({
      description: task.description,
      endDate: task.endDate,
      startDate: task.startDate,
      state: true,
      subject: task.subject,
      userId: task.userId,
      userName: task.userName
    })
  }

  async updateTask(docId:string, task:Task){
    this.db.doc(`task/${docId}`).update({
      description: task.description,
      endDate: task.endDate,
      startDate: task.startDate,
      subject: task.subject,
      userId:task.userId,
      userName: task.userName
    });
  }

  async deactiveTask(docId:string,state:boolean){
    console.log(docId);
    this.db.doc(`task/${docId}`).update({
      state: state
    });
  }

  async deleteTask(taskId:string){
    this.db.doc(`task/${taskId}`).delete();
  }
}
