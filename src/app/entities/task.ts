import { User } from './user';

export class Task {
    description:string;
    endDate:Date;
    startDate:Date;
    state:boolean;
    subject:string;
    userId:string;
    userName:string;

    public task(){
        this.description="";
        this.endDate=new Date();
        this.startDate=new Date();
        this.state=true;
        this.subject="";
        this.userId="";
        this.userName="";
    }

}
