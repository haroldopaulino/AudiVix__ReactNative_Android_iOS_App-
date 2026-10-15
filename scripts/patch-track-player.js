// Owner: Haroldo Paulino
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'node_modules', 'react-native-track-player', 'android', 'src', 'main', 'java', 'com', 'doublesymmetry', 'trackplayer', 'module', 'MusicModule.kt');
if (!fs.existsSync(file)) {
  throw new Error('Track Player Kotlin source missing: ' + file);
}
const original = fs.readFileSync(file, 'utf8');
const replacements = [
  [
    /Arguments\.fromBundle\(\s*musicService\.tracks\[index\]\.originalItem\s*\)/g,
    'musicService.tracks[index].originalItem?.let { Arguments.fromBundle(it) }'
  ],
  [
    /Arguments\.fromBundle\(\s*musicService\.tracks\[musicService\.getCurrentTrackIndex\(\)\]\.originalItem\s*\)/g,
    'musicService.tracks[musicService.getCurrentTrackIndex()].originalItem?.let { Arguments.fromBundle(it) }'
  ]
];
let updated = original;
for (const [pattern, replacement] of replacements) {
  updated = updated.replace(pattern, replacement);
}
const unsafe = /Arguments\.fromBundle\(\s*musicService\.tracks\[(?:index|musicService\.getCurrentTrackIndex\(\))\]\.originalItem\s*\)/;
if (unsafe.test(updated)) {
  throw new Error('Track Player still has unsafe nullable Bundle conversions');
}
for (const [, replacement] of replacements) {
  if (!updated.includes(replacement)) {
    throw new Error('Expected Track Player conversion was not found: ' + replacement);
  }
}


const coroutinePattern = /(\bfun\s+[A-Za-z_][A-Za-z_0-9]*\s*\([^{}]*?\)\s*)=\s*scope\.launch\s*\{/g;
let matches = 0;
let cursor = 0;
let converted = '';
const kotlin = updated;
for (const match of kotlin.matchAll(coroutinePattern)) {
  const opening = match.index + match[0].length - 1;
  let depth = 0;
  let quote = '';
  let lineComment = false;
  let blockComment = false;
  let ending = -1;
  for (let i = opening; i < kotlin.length; i++) {
    const current = kotlin[i];
    const next = kotlin[i + 1] || '';
    if (lineComment) {
      if (current === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (current === '*' && next === '/') { blockComment = false; i++; }
      continue;
    }
    if (quote) {
      if (current === '\\') { i++; continue; }
      if (current === quote) quote = '';
      continue;
    }
    if (current === '/' && next === '/') { lineComment = true; i++; continue; }
    if (current === '/' && next === '*') { blockComment = true; i++; continue; }
    if (current === '"' || current === "'") { quote = current; continue; }
    if (current === '{') depth++;
    if (current === '}') {
      depth--;
      if (depth === 0) { ending = i; break; }
    }
  }
  if (ending < 0) throw new Error('Could not locate Track Player coroutine method closing brace');
  if (match.index < cursor) continue;
  const indent = kotlin.slice(kotlin.lastIndexOf('\n', match.index) + 1, match.index).match(/^\s*/)[0];
  converted += kotlin.slice(cursor, match.index);
  converted += match[1] + '{\n' + indent + '    scope.launch {';
  converted += kotlin.slice(opening + 1, ending + 1);
  converted += '\n' + indent + '}';
  cursor = ending + 1;
  matches++;
}
converted += kotlin.slice(cursor);
if (matches > 0) updated = converted;
const remaining = (updated.match(coroutinePattern) || []).length;
if (remaining !== 0) throw new Error('Track Player still has Job-returning ReactMethod functions');
if (updated !== original) fs.writeFileSync(file, updated);
process.stdout.write('Track Player coroutine methods converted: ' + matches + '\n');


const serviceFile = path.join(__dirname, '..', 'node_modules', 'react-native-track-player', 'android', 'src', 'main', 'java', 'com', 'doublesymmetry', 'trackplayer', 'service', 'MusicService.kt');
if (!fs.existsSync(serviceFile)) {
  throw new Error('Track Player service Kotlin source missing: ' + serviceFile);
}
const serviceOriginal = fs.readFileSync(serviceFile, 'utf8');
const legacyContext = /reactNativeHost\s*\.\s*reactInstanceManager\s*\.\s*currentReactContext/g;
const servicePatched = serviceOriginal.replace(legacyContext, 'reactContext');
if (servicePatched === serviceOriginal && !/\breactContext\s*\?\.getJSModule/.test(servicePatched)) {
  throw new Error('Could not locate Track Player service event emitter React context');
}
if (legacyContext.test(servicePatched)) {
  throw new Error('Track Player still accesses the deprecated ReactNativeHost context');
}
if (!/\breactContext\s*\?\.getJSModule/.test(servicePatched)) {
  throw new Error('Track Player event emission is not using the bridgeless-compatible React context');
}
if (servicePatched !== serviceOriginal) fs.writeFileSync(serviceFile, servicePatched);
process.stdout.write('Track Player service ReactContext compatibility: OK\n');
