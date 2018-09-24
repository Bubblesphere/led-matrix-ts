# led-matrix-ts
A library for simulating an LED matrix panel in the browser. The library offers a maximum of flexibility for the developer to do just about anything to it's panel. Whether you want to add custom characters, a scrolling sequence or/and customize the appareance, you can.


- [Installation](#installation)
- [Basics](#basics)
- [Documentation](#documentation)
- [License](#license)

![Demo gif](https://i.imgur.com/bT8uZPN.gif)
![Demo gif 2](https://i.imgur.com/08NQXUR.gif)

## Size
18.31 KB

4.08 KB (Gzipped)

## Installation
**via npm**

`npm install led-matrix-ts`

**via yarn**

`yarn add led-matrix-ts`

**dev**

`npm install` 

`yarn install` 

`yarn start`

## Basics
**Check out `src/demos/basics` for more details**

**html**

```html
<div id="root" style="font-family: monospace; white-space: pre"></div>
```

**ts**
```typescript
const ledMatrix = new LedMatrix();
ledMatrix.init();
```

## Documentation
[Check out the wiki](https://github.com/Bubblesphere/led-matrix-ts/wiki)

## License
```
Copyright (c) 2018 Bubblesphere


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
