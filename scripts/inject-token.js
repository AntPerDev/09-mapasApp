// scripts/inject-token.js
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const token = process.env.MAPBOX_TOKEN || process.argv[2];
if (!token) {
  console.warn('MAPBOX_TOKEN not set. Using placeholder.');
  process.exit(0);
}

const envFile = path.resolve(__dirname, '..', 'src', 'environments', 'environment.ts');
let content = fs.readFileSync(envFile, 'utf8');
const placeholder = /mapboxToken:\s*['"]YOUR_MAPBOX_TOKEN_HERE['"]/;
if (placeholder.test(content)) {
  content = content.replace(placeholder, `mapboxToken: '${token}'`);
  fs.writeFileSync(envFile, content, 'utf8');
  console.log('Injected MAPBOX_TOKEN into environment.ts');
} else {
  console.log('Token placeholder not found, assuming token already injected.');
}
