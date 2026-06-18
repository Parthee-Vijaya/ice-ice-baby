// One-off generator for the Iceland-flag app icons.
// Renders an opaque, full-bleed square (maskable-safe) with the Icelandic
// Nordic cross — blue field, white cross, red cross — and emits the PWA PNGs
// plus a PNG-wrapped favicon.ico. Uses only Node built-ins (zlib).
import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Iceland flag colours.
const BLUE = [2, 82, 156];
const WHITE = [255, 255, 255];
const RED = [220, 30, 53];

// Nordic cross geometry as fractions of the side length.
const XC = 0.38; // vertical bar centre, offset toward the hoist (left)
const YC = 0.5; // horizontal bar centre
const WHITE_HALF = 0.1; // half-width of the white arms
const RED_HALF = 0.05; // half-width of the red arms

function render(size) {
  const buf = Buffer.alloc(size * size * 4);
  const xc = XC * size;
  const yc = YC * size;
  const wHalf = WHITE_HALF * size;
  const rHalf = RED_HALF * size;
  for (let y = 0; y < size; y++) {
    const py = y + 0.5;
    for (let x = 0; x < size; x++) {
      const px = x + 0.5;
      const dx = Math.abs(px - xc);
      const dy = Math.abs(py - yc);
      let c = BLUE;
      if (dx <= wHalf || dy <= wHalf) c = WHITE;
      if (dx <= rHalf || dy <= rHalf) c = RED;
      const i = (y * size + x) * 4;
      buf[i] = c[0];
      buf[i + 1] = c[1];
      buf[i + 2] = c[2];
      buf[i + 3] = 255;
    }
  }
  return buf;
}

// --- minimal PNG encoder ---
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePNG(rgba, size) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  // raw image data: filter byte (0) per scanline
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count
  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size; // width
  entry[1] = size >= 256 ? 0 : size; // height
  entry[2] = 0; // palette
  entry[3] = 0; // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bpp
  entry.writeUInt32LE(png.length, 8); // size
  entry.writeUInt32LE(22, 12); // offset
  return Buffer.concat([header, entry, png]);
}

mkdirSync(resolve(root, "public"), { recursive: true });
mkdirSync(resolve(root, "app"), { recursive: true });

for (const size of [192, 512]) {
  const png = encodePNG(render(size), size);
  writeFileSync(resolve(root, `public/icon-${size}.png`), png);
  console.log(`wrote public/icon-${size}.png (${png.length} bytes)`);
}

const fav = encodePNG(render(64), 64);
writeFileSync(resolve(root, "app/favicon.ico"), pngToIco(fav, 64));
console.log("wrote app/favicon.ico");
