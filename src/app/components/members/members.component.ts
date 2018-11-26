import { Component, OnInit } from '@angular/core';

// Services
import { MembersService } from '../../services/members/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  requestingMembers = true;
  requesting = false;

  members = [];
  newMemberData = { userType: 3 };
  memberToEditData = {};
  memberToDeleteData = {};
  errorMessage = '';
  
  constructor(private _membersService: MembersService) { }

  ngOnInit() {
    this.getMembers();
  }
  
  getMembers() {
    this.requestingMembers = true;
    this._membersService.getMembers()
      .subscribe(
        res => {
          this.requestingMembers = false;
          this.members = res;
        },
        err => console.log(err)
      )
  }
  
  resetNewMemberData() {
    this.newMemberData = { userType: 3 };
    this.errorMessage = '';
  }
  
  setMemberToEditData(member) {
    this.memberToEditData = {...member};
    this.errorMessage = '';
  }
  
  setMemberToDeleteData(member) {
    this.memberToDeleteData = {...member};
    this.errorMessage = '';
  }
  
  createNewMember() {
    this.requesting = true;
    
    if(!this.newMemberData.name || !this.newMemberData.email || !this.newMemberData.password || !this.newMemberData.userType) {
      this.errorMessage = 'All fields are required!';
      this.requesting = false;
      return false;
    }
    
    this._membersService.createNewMember(this.newMemberData)
    .subscribe(
      res => {
        this.members.unshift(res.user);
        $('#newMemberModal').modal('hide');
        this.requesting = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.requesting = false;
      }
    )
  }
  
  saveMember() {
    this.requesting = true;
    
    if(!this.memberToEditData.name || !this.memberToEditData.email || !this.memberToEditData.userType) {
      this.errorMessage = 'All fields, excepts password, are required!';
      this.requesting = false;
      return false;
    }
    
    this._membersService.saveMember(this.memberToEditData)
    .subscribe(
      res => {
        this.members = this.members.map((member) => {
          if(member._id === this.memberToEditData._id)
            return res.user;
          
          return member;
        });
        $('#editMemberModal').modal('hide');
        this.requesting = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.requesting = false;
      }
    )
  }
  
  deleteMember() {
    this.requesting = true;
    
    this._membersService.deleteMember(this.memberToDeleteData)
    .subscribe(
      res => {
        this.members = this.members.filter((member) => {
          return member._id !== this.memberToDeleteData._id;
        });
        $('#confirmDeleteMemberModal').modal('hide');
        this.requesting = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.requesting = false;
      }
    )
  }

}
