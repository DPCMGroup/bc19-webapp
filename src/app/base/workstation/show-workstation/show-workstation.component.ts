import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-workstation',
  templateUrl: './show-workstation.component.html',
  styleUrls: ['./show-workstation.component.css']
})
export class ShowWorkstationComponent implements OnInit {

  constructor(private service: SharedService) { }

  WorkstationList: any = [];
  ModalTitle: string | undefined;
  workstation: any;
  // tslint:disable-next-line
  ActivateAddEditWorkstationComp: boolean = false;

  WorkstationId: string;
  Username: string;

  ngOnInit(): void {
    this.refreshWorkstationList();
  }

  // tslint:disable-next-line:typedef
  addClick(){
    this.workstation = {
      WorkstationId: 0,
      Xposition: '',
      Yposition: '',
      Status: 'NonDisponibile'};
    this.ModalTitle = 'Add workstation';
    this.ActivateAddEditWorkstationComp = true;
  }

  // tslint:disable-next-line:typedef
  closeClick(){
    this.ActivateAddEditWorkstationComp = false;
    this.refreshWorkstationList();
  }

  // tslint:disable-next-line:typedef
  refreshWorkstationList(){
    this.service.getWorkstationList().subscribe(data => {
      this.WorkstationList = data;
    });
  }

  refreshAndFilter(workstationId: string, Username: string): void{
    this.service.getWorkstationList().subscribe(data => {
      this.WorkstationList = data;
      if (workstationId !== null || Username !== null){
        // filtra il data
        let tempWorkstationList: any = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.WorkstationList.length; i++){
          if (this.WorkstationList[i].id === workstationId /*check equality with the username*/){
            tempWorkstationList.push(this.WorkstationList[i]);
          }
        }
        this.WorkstationList = tempWorkstationList;
      }
    });
  }

  // tslint:disable-next-line:typedef
  deleteClick(item: { WorkstationId: any; }){
    if (confirm('Are you sure??')){
      this.service.deleteWorkstation(item.WorkstationId).subscribe(data => {
        alert(data.toString());
        this.refreshWorkstationList();
      });
    }
  }

  searchOccupation(): void {
    // leggi WorkstationId: string;
    // e Username: string;
    // Poi user this.filer
    this.refreshAndFilter(this.WorkstationId, this.Username);

  }

  resetFilter(): void {
    this.refreshAndFilter(null, null);
  }

  testFunc(): void {
    console.log(this.WorkstationList);
  }
}
