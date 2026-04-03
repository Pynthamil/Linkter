import fs from 'fs';
const buf = fs.readFileSync('./src/assets/cursor-sprite.png');
const w = buf.readUInt32BE(16);
const h = buf.readUInt32BE(20);
console.log(`SPRITE: ${w}x${h}`);
