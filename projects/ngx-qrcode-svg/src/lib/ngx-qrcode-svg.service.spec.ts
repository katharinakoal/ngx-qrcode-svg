import { TestBed } from '@angular/core/testing';

import { NgxQrcodeSvgService } from './ngx-qrcode-svg.service';

describe('NgxQrcodeSvgService', () => {
  let service: NgxQrcodeSvgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxQrcodeSvgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
