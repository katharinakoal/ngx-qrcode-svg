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

const expected = {
  basicSample: {
    value: 'test',
    viewBox: 'M0 0h29v29H0z',
    path:
      'M4 4.5h7m1 0h2m2 0h1m1 0h7M4 5.5h1m5 0h1m7 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m2 0h2m3 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h4m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m4 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h2m1 0h2m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h7M13 11.5h3M5 12.5h7m1 0h1m1 0h1m3 0h2m3 0h1M4 13.5h3m1 0h2m1 0h1m1 0h1m1 0h2m2 0h1m1 0h2m1 0h1M4 14.5h1m1 0h1m1 0h1m1 0h1m5 0h2m2 0h4M4 15.5h1m1 0h1m1 0h1m4 0h1m1 0h1m3 0h4M6 16.5h3m1 0h3m2 0h3m2 0h2m1 0h1M12 17.5h4m1 0h2m3 0h3M4 18.5h7m1 0h2m1 0h2m1 0h2m1 0h1m1 0h1M4 19.5h1m5 0h1m1 0h1m1 0h2m1 0h2m2 0h2M4 20.5h1m1 0h3m1 0h1m1 0h2m5 0h1m1 0h1m1 0h1M4 21.5h1m1 0h3m1 0h1m1 0h1m3 0h1m2 0h1m1 0h2M4 22.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h1m2 0h1m1 0h1M4 23.5h1m5 0h1m1 0h1m1 0h1m4 0h2m1 0h1M4 24.5h7m4 0h1m1 0h1m2 0h1m1 0h2',
  },
  fullSample: {
    value: 'test',
    margin: 3,
    ErrorCorrectionLevel: 'H' as ErrorCorrectionLevel,
    color: 'green',
    backgroundColor: 'grey',
    viewBox: 'M0 0h27v27H0z',
    path:
      'M3 3.5h7m3 0h3m1 0h7M3 4.5h1m5 0h1m3 0h3m1 0h1m5 0h1M3 5.5h1m1 0h3m1 0h1m1 0h3m3 0h1m1 0h3m1 0h1M3 6.5h1m1 0h3m1 0h1m1 0h3m3 0h1m1 0h3m1 0h1M3 7.5h1m1 0h3m1 0h1m2 0h1m4 0h1m1 0h3m1 0h1M3 8.5h1m5 0h1m3 0h3m1 0h1m5 0h1M3 9.5h7m1 0h1m1 0h1m1 0h1m1 0h7M14 10.5h1M6 11.5h2m1 0h2m9 0h2M3 12.5h3m2 0h1m3 0h3m1 0h1m2 0h3M3 13.5h3m2 0h2m1 0h7m1 0h1m1 0h3M5 14.5h1m1 0h2m1 0h2m1 0h2m1 0h1m4 0h1M3 15.5h1m2 0h1m2 0h3m1 0h2m1 0h1m6 0h1M11 16.5h3m3 0h2m2 0h1M3 17.5h7m1 0h1m1 0h1m2 0h5M3 18.5h1m5 0h1m4 0h1m1 0h1m1 0h4m1 0h1M3 19.5h1m1 0h3m1 0h1m1 0h2m4 0h2m3 0h2M3 20.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m1 0h1M3 21.5h1m1 0h3m1 0h1m2 0h1m1 0h2m4 0h4M3 22.5h1m5 0h1m3 0h1m1 0h2m2 0h1m1 0h3M3 23.5h7m2 0h2m7 0h1',
  },
};

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

  it('should render new qr code when inputs change', () => {
    const fixture = TestBed.createComponent(BasicTestHostComponent);
    const host = fixture.componentInstance;
    const component = host.qrCodeSVGComponent;
    const createFn = spyOn(component as any, 'createQRCode').and.callThrough();
    const clearFn = spyOn((component as any).renderer, 'removeChild').and.callThrough();

    host.qrCodeValue = 'first value';
    fixture.detectChanges();

    expect(createFn).toHaveBeenCalled();
    expect(clearFn).not.toHaveBeenCalled();

    host.qrCodeValue = 'second value';
    fixture.detectChanges();

    expect(createFn).toHaveBeenCalled();
    expect(clearFn).toHaveBeenCalled();
  });

  it('should render svg without optional inputs', () => {
    const fixture = TestBed.createComponent(BasicTestHostComponent);
    const host = fixture.componentInstance;
    const component = host.qrCodeSVGComponent;

    host.qrCodeValue = expected.basicSample.value;
    fixture.detectChanges();

    const paths: HTMLElement[] = fixture.debugElement.nativeElement.querySelectorAll('svg > path');
    expect(paths.length).toBe(2);

    const backgroundElement = paths[0];
    const codeElement = paths[1];

    expect(backgroundElement.getAttribute('d')).toBe(expected.basicSample.viewBox);
    expect(codeElement.getAttribute('d')).toBe(expected.basicSample.path);

    expect(backgroundElement.style?.fill).toBe(component.default.backgroundColor);
    expect(codeElement.style?.stroke).toBe(component.default.color);
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

    host.qrCodeValue = expected.fullSample.value;
    host.margin = expected.fullSample.margin;
    host.color = expected.fullSample.color;
    host.backgroundColor = expected.fullSample.backgroundColor;
    host.errorCorrectionLevel = expected.fullSample.ErrorCorrectionLevel;
    fixture.detectChanges();

    const paths = fixture.debugElement.nativeElement.querySelectorAll('svg > path');
    expect(paths.length).toBe(2);

    const backgroundElement = paths[0];
    const codeElement = paths[1];

    expect(backgroundElement.getAttribute('d')).toBe(expected.fullSample.viewBox);
    expect(codeElement.getAttribute('d')).toBe(expected.fullSample.path);

    expect(backgroundElement.style?.fill).toBe(host.backgroundColor);
    expect(codeElement.style?.stroke).toBe(host.color);
  });
});
