import { AfterViewInit,  ViewChild, ElementRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  
  title = 'scheme';

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

}
