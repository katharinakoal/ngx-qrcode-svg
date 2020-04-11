import { Component, Input, ElementRef, OnChanges, Renderer2 } from '@angular/core';
import QRCode from 'qrcode';
import type { ErrorCorrectionLevel, QRCodeData } from './ngx-qrcode-svg.types';

@Component({
  selector: 'qrcode-svg',
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
  @Input() errorCorrectionLevel?: ErrorCorrectionLevel = 'Q';
  // tslint:disable-next-line: no-inferrable-types
  @Input() margin?: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  @Input() color?: string = 'black';
  // tslint:disable-next-line: no-inferrable-types
  @Input() backgroundColor?: string = 'white';

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngOnChanges() {
    this.createQRCode();
  }

  private createQRCode(): void {
    this.element.nativeElement.childNodes.forEach((node) =>
      this.renderer.removeChild(this.element.nativeElement, node)
    );

    if (!this.sanitizeInputs()) {
      return;
    }

    const { modules }: QRCodeData = QRCode.create(this.value, {
      errorCorrectionLevel: this.errorCorrectionLevel,
      margin: this.margin,
    });
    this.renderSVG(modules.data, modules.size);
  }

  private renderSVG(data: Uint8Array, size: number): void {
    const elementSize = size + this.margin * 2;

    const svgElement = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svgElement, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svgElement, 'viewBox', `0 0 ${elementSize} ${elementSize}`);
    this.renderer.setStyle(svgElement, 'shape-rendering', 'crispEdges');

    const backGroundElement = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(backGroundElement, 'd', `M0 0h${elementSize}v${elementSize}H0z`);
    this.renderer.setStyle(backGroundElement, 'fill', this.backgroundColor);
    this.renderer.appendChild(svgElement, backGroundElement);

    const codeElement = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(codeElement, 'd', this.createPath(data, size, this.margin));
    this.renderer.setStyle(codeElement, 'stroke', this.color);
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

  private sanitizeInputs(): boolean {
    if (!this.value) {
      return false;
    }

    if (!['L', 'M', 'Q', 'H'].includes(this.errorCorrectionLevel)) {
      this.warn('invalid input for errorCorrectionLevel');
      return false;
    }

    this.margin = +this.margin;
    if (isNaN(this.margin)) {
      this.warn('invalid input for margin');
      return false;
    }

    if (!this.color) {
      this.warn('invalid input for color');
      return false;
    }

    if (!this.backgroundColor) {
      this.warn('invalid input for backgroundColor');
      return false;
    }

    return true;
  }

  private warn(message: string): void {
    console.warn('[ngx-qrcode-svg]', message);
  }
}
