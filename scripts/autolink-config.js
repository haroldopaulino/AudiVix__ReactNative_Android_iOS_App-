// Owner: Haroldo Paulino
const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const manifests = [
  ['@react-native-async-storage/async-storage', 'com.reactnativecommunity.asyncstorage'],
  ['@react-native-community/slider', 'com.reactnativecommunity.slider'],
  ['react-native-fs', 'com.rnfs'],
  ['react-native-safe-area-context', 'com.th3rdwave.safeareacontext'],
  ['react-native-track-player', 'com.doublesymmetry.trackplayer']
];
const modified = [];
try {
  for (const [name, pkg] of manifests) {
    const file = path.join(root, 'node_modules', name, 'android/src/main/AndroidManifest.xml');
    if (!fs.existsSync(file)) throw new Error('Missing autolinking manifest: ' + file);
    const original = fs.readFileSync(file, 'utf8');
    if (/\s+package=["']/.test(original)) continue;
    const match = original.match(/<manifest\b[^>]*>/);
    if (!match) throw new Error('Invalid Android manifest: ' + file);
    const updated = original.replace(match[0], match[0].replace(/>$/, ' package="' + pkg + '">'));
    fs.writeFileSync(file, updated);
    modified.push([file, original]);
  }
  const executable = require.resolve('@react-native-community/cli/build/bin', {paths: [root]});
  const output = execFileSync(process.execPath, [executable, 'config'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe']
  });
  const config = JSON.parse(output);
  config.project = config.project || {};
  config.project.android = config.project.android || {};
  config.project.android.packageName = 'com.audivix';
  config.project.android.sourceDir = path.join(root, 'android');
  config.project.android.appName = 'app';
  process.stdout.write(JSON.stringify(config));
} catch (err) {
  process.stderr.write('AudiVix autolinking configuration failed: ' + (err.stderr ? err.stderr.toString() : err.stack || err.message) + '\n');
  process.exitCode = 1;
} finally {
  for (const [file, original] of modified.reverse()) fs.writeFileSync(file, original);
}
