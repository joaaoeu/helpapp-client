import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// Services
import { RequestCardsService } from '../../services/request-cards/request-cards.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.scss']
})
export class ListCardsComponent implements OnInit {

  requestingCards = true;
  requesting = false;

  requestCards = [];
  newRequestData = {};
  requestToEditData = {};
  requestToDeleteData = {};
  errorMessage = '';
  
  constructor(
    private _requestCardsService: RequestCardsService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.getRequests();
  }
  
  getRequests() {
    this.requestingCards = true;
    this._requestCardsService.getRequestCards()
      .subscribe(
        res => {
          this.requestingCards = false;
          this.requestCards = res;
        },
        err => console.log(err)
      )
  }
  
  getTimeOfService(startAt, endAt) {
    const timeOfService = new Date(endAt) - new Date(startAt);
    
    const days    = moment.duration(timeOfService).days();
    const hours   = moment.duration(timeOfService).hours();
    const minutes = moment.duration(timeOfService).minutes();
    
    return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes';
  }
  
  resetNewRequestData() {
    this.newRequestData = {};
    this.errorMessage = '';
  }
  
  setRequestToEditData(request) {
    this.requestToEditData = {...request};
    this.errorMessage = '';
  }
  
  setRequestToDeleteData(request) {
    this.requestToDeleteData = {...request};
    this.errorMessage = '';
  }
  
  createNewRequest() {
    this.requesting = true;
    
    if(!this.newRequestData.name || !this.newRequestData.productModel || !this.newRequestData.description) {
      this.errorMessage = 'All fields are required!';
      this.requesting = false;
      return false;
    }
    
    this._requestCardsService.createNewRequest(this.newRequestData)
    .subscribe(
      res => {
        this.requestCards.unshift(res.requestedCard);
        $('#newRequestModal').modal('hide');
        this.requesting = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.requesting = false;
      }
    )
  }
  
  saveRequest() {
    this.requesting = true;
    
    if(!this.requestToEditData.name || !this.requestToEditData.productModel || !this.requestToEditData.description || !this.requestToEditData.status) {
      this.errorMessage = 'All fields are required!';
      this.requesting = false;
      return false;
    }
    
    this._requestCardsService.saveRequest(this.requestToEditData)
    .subscribe(
      res => {
        this.requestCards = this.requestCards.map((requestCard) => {
          if(requestCard._id === this.requestToEditData._id)
            return res.requestCard;
          
          return requestCard;
        });
        $('#editRequestModal').modal('hide');
        this.requesting = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.requesting = false;
      }
    )
  }
  
  deleteRequest() {
    this.requesting = true;
    
    this._requestCardsService.deleteRequest(this.requestToDeleteData)
    .subscribe(
      res => {
        this.requestCards = this.requestCards.filter((requestCard) => {
          return requestCard._id !== this.requestToDeleteData._id;
        });
        $('#confirmDeleteRequestModal').modal('hide');
        this.requesting = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.requesting = false;
      }
    )
  }

}
