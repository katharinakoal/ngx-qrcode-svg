export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type QRCodeData = {
  modules: { size: number; data: Uint8Array; reservedBit: Uint8Array }; // Bitmatrix class with modules data
  version: number; // Calculated QR Code version
  errorCorrectionLevel: { bit: number }; // Error Correction Level
  maskPattern: number; // Calculated Mask pattern
  segments: any; // Generated segments
};

export type Options = {
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  color: string;
  backgroundColor: string;
};
