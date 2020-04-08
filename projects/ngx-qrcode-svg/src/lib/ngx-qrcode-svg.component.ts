import { Component, Input, ElementRef, OnChanges, Renderer2 } from '@angular/core';
import QRCode from 'qrcode';

type QRCode = {
  modules: { size: number; data: Uint8Array; reservedBit: Uint8Array }; // Bitmatrix class with modules data
  version: number; // Calculated QR Code version
  errorCorrectionLevel: { bit: number }; // Error Correction Level
  maskPattern: number; // Calculated Mask pattern
  segments: any; // Generated segments
};

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
export class QRCodeSVGComponent implements OnChanges {
  @Input() value: string;
  @Input() errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  @Input() margin?: number;

  private get options() {
    return {
      errorCorrectionLevel: this.errorCorrectionLevel ?? 'M',
      margin: this.margin ?? 0,
    };
  }

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngOnChanges() {
    this.createQRCode();
  }

  private createQRCode() {
    this.element.nativeElement.childNodes.forEach((node) =>
      this.renderer.removeChild(this.element.nativeElement, node)
    );

    if (!this.value) {
      return;
    }

    const rawData = QRCode.create(this.value, this.options) as QRCode;

    this.renderSVG(rawData.modules.data, rawData.modules.size);
  }

  private renderSVG(data: Uint8Array, size: number) {
    const elementSize = size + this.options.margin * 2;

    const svgElement = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svgElement, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svgElement, 'viewBox', `0 0 ${elementSize} ${elementSize}`);
    this.renderer.setStyle(svgElement, 'shape-rendering', 'crispEdges');

    const backGroundElement = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(backGroundElement, 'd', `M0 0h${elementSize}v${elementSize}H0z`);
    this.renderer.setStyle(backGroundElement, 'fill', '#ffffff');
    this.renderer.appendChild(svgElement, backGroundElement);

    const codeElement = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(codeElement, 'd', this.createPath(data, size, this.margin));
    this.renderer.setStyle(codeElement, 'stroke', '#000000');
    this.renderer.appendChild(svgElement, codeElement);

    this.renderer.appendChild(this.element.nativeElement, svgElement);
  }

  private createPath(data: Uint8Array, size: number, margin: number): string {
    let path = '';
    let moveBy = 0;
    let newRow = false;
    let lineLength = 0;

    data.forEach((bit, index) => {
      const col = Math.floor(index % size);
      const row = Math.floor(index / size);

      if (!col && !newRow) {
        newRow = true;
      }

      if (bit) {
        lineLength++;

        if (!(index > 0 && col > 0 && data?.[index - 1])) {
          path += newRow ? `M${col + margin} ${0.5 + row + margin}` : `m${moveBy} 0`;

          moveBy = 0;
          newRow = false;
        }

        if (!(col + 1 < size && data?.[index + 1])) {
          path += `h${lineLength}`;
          lineLength = 0;
        }
      } else {
        moveBy++;
      }
    });

    return path;
  }
}
