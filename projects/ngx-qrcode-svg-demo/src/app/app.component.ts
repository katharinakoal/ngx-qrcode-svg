import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  qrCodeValue = 'https://angular.io/';
  errorCorrectionLevel = 'Q';
  margin = 0;
  color = '#000000';
  backgroundColor = '#ffffff';
}
