![CI/CD](https://github.com/katharinakoal/ngx-qrcode-svg/workflows/CI/CD/badge.svg)
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# ngx-qrcode-svg

Angular component library to generate QR codes with SVG rendering.

## Table of Contents

- [Features](#features)
- [Quick example](#quick-example)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Features

- **Scalable** high-quality QR code rendering
- **Responsive** layout fills the containing element
- **Customizable** with support for [CSS Color Values](https://www.w3schools.com/cssref/css_colors_legal.asp)

## Quick example

```html
<qrcode-svg value="The content you want show as QR code"></qrcode-svg>
```

## Demo

**[See running demo here](https://katharinakoal.github.io/ngx-qrcode-svg/)**

## Installation

To install `ngx-qrcode-svg` run the following command:

```bash
npm i ngx-qrcode-svg
# Or if you use yarn
yarn add ngx-qrcode-svg
```

## Usage

First, import the `QRCodeSVGModule` into your consuming module, e.g. into the `AppModule`

```typescript
import { QRCodeSVGModule } from 'ngx-qrcode-svg';
...

@NgModule({
    ...
    imports: [ QRCodeSVGModule ],
    ...
})
```

Then you can use the `qrcode-svg` tag in your component templates like this:

```html
<qrcode-svg
  [value]="qrCodeValue"
  [errorCorrectionLevel]="errorCorrectionLevel"
  [margin]="margin"
  [color]="color"
  [backgroundColor]="backgroundColor"
></qrcode-svg>
```

### Bindings

The `qrcode-svg` component supports the following bindings:

- `value: string` (required)
  - the content you want to display as QR code
- `errorCorrectionLevel: string` (optional, default: `'Q'`)
  - [error correction capability](https://www.qrcode.com/en/about/error_correction.html) controls the amount of redundant information to restore data if the code is dirty or damaged
  - Valid values: `'L'`, `'M'`, `'Q'`, `'H'`
  - If you need the type you can
    ```typescript
    import { ErrorCorrectionLevel } from 'ngx-qrcode-svg';
    ```
- `margin: number | string` (optional, default: `4`)
  - the [margin](https://www.qrcode.com/en/howto/code.html#marginH2Title) is a clear area around a symbol where nothing is printed.
- `color: string` (optional, default: `'black'`)
  - color of the dark squares
  - you can provide any [CSS Color Value](https://www.w3schools.com/cssref/css_colors_legal.asp)
- `backgroundColor: string` (optional, default: `'white'`)
  - color of the light squares
  - you can provide any [CSS Color Value](https://www.w3schools.com/cssref/css_colors_legal.asp)

## Credits

This library is based on the [node-qrcode](https://github.com/soldair/node-qrcode) package and inspired by the excellent [angularx-qrcode](https://github.com/cordobo/angularx-qrcode) library, which I highly recommend if you need other QR code output formats than SVG in your Angular applications.

## License

[MIT](https://github.com/katharinakoal/ngx-qrcode-svg/blob/master/LICENSE)

The word "QR Code" is registered trademark of:<br>
DENSO WAVE INCORPORATED
