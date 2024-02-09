import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(
    private location:Location
    ) {}

  @Input()
  message:string=''

  @Input()
  showElements:boolean = false

  @Input()
  shoBtn:boolean = true

  goBack(){
    this.location.back()
  }
}
