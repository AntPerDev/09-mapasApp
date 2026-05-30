// scripts/inject-token.js
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const token = process.env.MAPBOX_TOKEN || process.argv[2];
if (!token) {
  console.warn('MAPBOX_TOKEN not set. Skipping injection.');
  process.exit(0);
}

const envFiles = [
  'src/environments/environment.ts',
  'src/environments/environment.prod.ts',
];

envFiles.forEach((relPath) => {
  const absPath = path.resolve(__dirname, '..', relPath);
  let content = fs.readFileSync(absPath, 'utf8');
  // Replace placeholder token if present, otherwise replace existing token string
  const placeholderRegex = /mapboxToken:\s*['"](?:YOUR_MAPBOX_TOKEN_HERE|__MAPBOX_TOKEN__)['"]/;
  if (placeholderRegex.test(content)) {
    content = content.replace(placeholderRegex, `mapboxToken: '${token}'`);
    console.log(`Injected MAPBOX_TOKEN into ${relPath}`);
  } else {
    // Fallback: replace any existing token string
    const tokenRegex = /mapboxToken:\s*['"][^'"]+['"]/;
    content = content.replace(tokenRegex, `mapboxToken: '${token}'`);
    console.log(`Replaced MAPBOX_TOKEN in ${relPath}`);
  }
  fs.writeFileSync(absPath, content, 'utf8');
});
