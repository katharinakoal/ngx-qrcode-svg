import { Component, Input, ElementRef, OnChanges, Renderer2 } from '@angular/core';
import QRCode from 'qrcode';
import type { ErrorCorrectionLevel, QRCodeData, Options } from './ngx-qrcode-svg.types';

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
  @Input() errorCorrectionLevel?: ErrorCorrectionLevel;
  @Input() margin?: number;
  @Input() color?: string;
  @Input() backgroundColor?: string;

  readonly default: Options = {
    errorCorrectionLevel: 'Q',
    margin: 0,
    color: 'black',
    backgroundColor: 'white',
  };

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngOnChanges() {
    this.createQRCode();
  }

  private createQRCode(): void {
    this.element.nativeElement.childNodes.forEach((node) =>
      this.renderer.removeChild(this.element.nativeElement, node)
    );

    if (!this.value) {
      return;
    }

    const { errorCorrectionLevel, margin, color, backgroundColor } = this.sanitizeInputs();

    const raw = QRCode.create(`${this.value}`, {
      errorCorrectionLevel,
      margin,
    });
    this.renderSVG(raw, margin, color, backgroundColor);
  }

  private renderSVG(raw: QRCodeData, margin: number, color: string, backgroundColor: string): void {
    const elementSize = raw.modules.size + margin * 2;

    const svgElement = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svgElement, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svgElement, 'viewBox', `0 0 ${elementSize} ${elementSize}`);
    this.renderer.setStyle(svgElement, 'shape-rendering', 'crispEdges');

    const backGroundElement = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(backGroundElement, 'd', `M0 0h${elementSize}v${elementSize}H0z`);
    this.renderer.setStyle(backGroundElement, 'fill', backgroundColor);
    this.renderer.appendChild(svgElement, backGroundElement);

    const codeElement = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(codeElement, 'd', this.createPath(raw, margin));
    this.renderer.setStyle(codeElement, 'stroke', color);
    this.renderer.appendChild(svgElement, codeElement);

    this.renderer.appendChild(this.element.nativeElement, svgElement);
  }

  private createPath(raw: QRCodeData, margin: number): string {
    const { data, size } = raw.modules;

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

  private sanitizeInputs(): Options {
    const errorCorrectionLevel = ['L', 'M', 'Q', 'H'].includes(this.errorCorrectionLevel)
      ? this.errorCorrectionLevel
      : this.default.errorCorrectionLevel;

    const margin =
      !isNaN(parseFloat(this.margin as any)) && !isNaN(Number(this.margin))
        ? Math.max(Number(this.margin), 0)
        : this.default.margin;

    const color = this.color ?? this.default.color;
    const backgroundColor = this.backgroundColor ?? this.default.backgroundColor;

    return { errorCorrectionLevel, margin, color, backgroundColor };
  }
}
