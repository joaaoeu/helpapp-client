import { Component, OnInit } from '@angular/core';

// Services
import { MembersService } from '../../services/members/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members = [];
  newMemberData = { userType: 3 };
  memberToEditData = {};
  memberToDeleteData = {};
  
  constructor(private _membersService: MembersService) { }

  ngOnInit() {
    this.getMembers();
  }
  
  getMembers() {
    this._membersService.getMembers()
      .subscribe(
        res => this.members = res,
        err => console.log(err)
      )
  }
  
  resetNewMemberData() {
    this.newMemberData = { userType: 3 }; 
  }
  
  setMemberToEditData(member) {
    this.memberToEditData = member;
  }
  
  setMemberToDeleteData(member) {
    this.memberToDeleteData = member;
  }
  
  createNewMember() {
    console.log(this.newMemberData);
  }
  
  saveMember() {
    console.log(this.memberToEditData);
  }
  
  deleteMember() {
    console.log(this.memberToDeleteData);
  }

}
