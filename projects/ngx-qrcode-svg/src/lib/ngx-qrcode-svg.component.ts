import { Component, Input, ElementRef, OnChanges, AfterViewInit, Renderer2 } from '@angular/core';
import QRCode from 'qrcode';

@Component({
  selector: 'ngx-qrcode-svg',
  template: '',
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class QRCodeSVGComponent implements AfterViewInit, OnChanges {
  @Input() text: string;

  private domParser = new DOMParser();

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngOnChanges() {
    this.createQRCode();
  }

  ngAfterViewInit() {
    this.createQRCode();
  }

  private createQRCode() {
    this.element.nativeElement.childNodes.forEach((node) =>
      this.renderer.removeChild(this.element.nativeElement, node)
    );

    if (!this.text) {
      return;
    }

    QRCode.toString(
      this.text,
      { type: 'svg', errorCorrectionLevel: 'Q', margin: 0 },
      (_, qrString) => {
        const element = this.domParser.parseFromString(qrString, 'image/svg+xml');
        this.renderer.appendChild(this.element.nativeElement, element.childNodes?.[0]);
      }
    );
  }
}
