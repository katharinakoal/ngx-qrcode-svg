import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { QRCodeSVGModule } from 'ngx-qrcode-svg';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, QRCodeSVGModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
