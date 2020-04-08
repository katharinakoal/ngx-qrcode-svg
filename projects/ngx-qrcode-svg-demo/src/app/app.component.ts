import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngx-qrcode-svg-demo';
  qrData = 'test';
  errorCorrectionLevel = 'Q';
  margin = 0;
}
