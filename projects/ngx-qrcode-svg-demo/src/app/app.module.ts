import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QRCodeSVGModule } from 'ngx-qrcode-svg';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, QRCodeSVGModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
