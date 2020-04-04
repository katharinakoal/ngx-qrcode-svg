import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeSVGComponent } from './ngx-qrcode-svg.component';

describe('NgxQrcodeSvgComponent', () => {
  let component: QRCodeSVGComponent;
  let fixture: ComponentFixture<QRCodeSVGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QRCodeSVGComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRCodeSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
