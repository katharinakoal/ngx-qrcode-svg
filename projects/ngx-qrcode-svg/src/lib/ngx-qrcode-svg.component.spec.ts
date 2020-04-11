import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { QRCodeSVGComponent } from './ngx-qrcode-svg.component';
import { ErrorCorrectionLevel } from './ngx-qrcode-svg.types';
@Component({
  template: ` <qrcode-svg
    [value]="qrCodeValue"
    [errorCorrectionLevel]="errorCorrectionLevel"
    [margin]="margin"
    [color]="color"
    [backgroundColor]="backgroundColor"
  ></qrcode-svg>`,
})
class TestHostComponent {
  @ViewChild(QRCodeSVGComponent, { static: true })
  public qrCodeSVGComponent: QRCodeSVGComponent;
  qrCodeValue: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  color: string;
  backgroundColor: string;
}

describe('QRCodeSVGComponent', () => {
  let component: QRCodeSVGComponent;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QRCodeSVGComponent, TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.qrCodeSVGComponent;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    hostComponent.qrCodeValue = 'test';
    hostComponent.errorCorrectionLevel = 'H';
    hostComponent.margin = 0;
    hostComponent.color = '#000';
    hostComponent.backgroundColor = '#fff';
    hostFixture.detectChanges();

    console.log(component);

    // component.value = 'yo!';
    // jasmine.createSpy();
    // component.ngOnChanges();
    // delete component.value;
    // component.ngOnChanges();
    // fixture.detectChanges();
    // console.log(fixture.debugElement);
  });
});
