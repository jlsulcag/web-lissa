import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit {

  breakpoint: number;

  constructor() { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 480) ? 1 : 3;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 3;
  }

}
