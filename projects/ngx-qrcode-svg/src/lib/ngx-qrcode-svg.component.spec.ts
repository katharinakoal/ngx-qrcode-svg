import { async, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { QRCodeSVGComponent } from './ngx-qrcode-svg.component';
import { ErrorCorrectionLevel } from './ngx-qrcode-svg.types';

@Component({
  template: ` <qrcode-svg [value]="qrCodeValue"></qrcode-svg> `,
})
class BasicTestHostComponent {
  @ViewChild(QRCodeSVGComponent, { static: true })
  public qrCodeSVGComponent: QRCodeSVGComponent;
  qrCodeValue: string;
}

@Component({
  template: `
    <qrcode-svg
      [value]="qrCodeValue"
      [errorCorrectionLevel]="errorCorrectionLevel"
      [margin]="margin"
      [color]="color"
      [backgroundColor]="backgroundColor"
    ></qrcode-svg>
  `,
})
class FullTestHostComponent {
  @ViewChild(QRCodeSVGComponent, { static: true })
  public qrCodeSVGComponent: QRCodeSVGComponent;
  qrCodeValue: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  color: string;
  backgroundColor: string;
}

describe('QRCodeSVGComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QRCodeSVGComponent, BasicTestHostComponent, FullTestHostComponent],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(QRCodeSVGComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render svg without optional inputs', () => {
    const fixture = TestBed.createComponent(BasicTestHostComponent);
    const host = fixture.componentInstance;

    host.qrCodeValue = 'test';
    fixture.detectChanges();

    const paths: HTMLElement[] = fixture.debugElement.nativeElement.querySelectorAll('svg > path');
    expect(paths.length).toBe(2);

    const backgroundElement = paths[0];
    const codeElement = paths[1];

    // TODO assert precomputed paths
    console.log(backgroundElement.getAttribute('d'));
    console.log(codeElement.getAttribute('d'));

    // TODO use factual default values
    expect(backgroundElement.style?.fill).toBe('white');
    expect(codeElement.style?.stroke).toBe('black');
  });

  it('should ignore invalid input values', () => {
    const fixture = TestBed.createComponent(BasicTestHostComponent);
    const host = fixture.componentInstance;
    const svgElement = () => fixture.debugElement.nativeElement.querySelector('svg');

    host.qrCodeValue = '';
    fixture.detectChanges();
    expect(svgElement()).toBeNull();

    host.qrCodeValue = null;
    fixture.detectChanges();
    expect(svgElement()).toBeNull();

    delete host.qrCodeValue;
    fixture.detectChanges();
    expect(svgElement()).toBeNull();
  });

  it('should render svg with full customization', () => {
    const fixture = TestBed.createComponent(FullTestHostComponent);
    const host = fixture.componentInstance;

    host.qrCodeValue = 'test';
    host.margin = 2;
    host.color = 'green';
    host.backgroundColor = 'blue';
    host.errorCorrectionLevel = 'Q';
    fixture.detectChanges();

    const paths = fixture.debugElement.nativeElement.querySelectorAll('svg > path');
    expect(paths.length).toBe(2);

    const backgroundElement = paths[0];
    const codeElement = paths[1];

    // TODO assert precomputed paths
    console.log(backgroundElement.getAttribute('d'));
    console.log(codeElement.getAttribute('d'));

    expect(backgroundElement.style?.fill).toBe(host.backgroundColor);
    expect(codeElement.style?.stroke).toBe(host.color);
  });
});
