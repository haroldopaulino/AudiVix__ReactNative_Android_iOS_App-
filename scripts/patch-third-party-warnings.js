// Owner: Haroldo Paulino
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'node_modules');
const manifests = [
  ['@react-native-async-storage/async-storage', 'com.reactnativecommunity.asyncstorage'],
  ['@react-native-community/slider', 'com.reactnativecommunity.slider'],
  ['react-native-fs', 'com.rnfs'],
  ['react-native-safe-area-context', 'com.th3rdwave.safeareacontext'],
  ['react-native-track-player', 'com.doublesymmetry.trackplayer']
];
for (const [name, expected] of manifests) {
  const file = path.join(root, name, 'android/src/main/AndroidManifest.xml');
  if (!fs.existsSync(file)) throw new Error('Missing dependency manifest: ' + file);
  const before = fs.readFileSync(file, 'utf8');
  const pattern = new RegExp(String.raw`\s+package="${expected}"`);
  const after = before.replace(pattern, '');
  if (/\s+package=["']/.test(after)) throw new Error('Unremoved manifest package attribute: ' + file);
  if (before !== after) fs.writeFileSync(file, after);
  console.log('Manifest namespace: ' + name + ' OK');
}
const fsGradle = path.join(root, 'react-native-fs', 'android', 'build.gradle');
if (!fs.existsSync(fsGradle)) throw new Error('Missing react-native-fs Gradle file: ' + fsGradle);
const fsGradleBefore = fs.readFileSync(fsGradle, 'utf8');
if (!/\bnamespace\s*(?:=\s*)?["\']com\.rnfs["\']/.test(fsGradleBefore)) {
  const androidBlock = /\bandroid\s*\{/;
  if (!androidBlock.test(fsGradleBefore)) throw new Error('No android block in react-native-fs Gradle file: ' + fsGradle);
  const fsGradleAfter = fsGradleBefore.replace(androidBlock, 'android {\n    namespace "com.rnfs"');
  fs.writeFileSync(fsGradle, fsGradleAfter);
}
console.log('Android Gradle namespace: react-native-fs com.rnfs OK');

for (const name of ['react-native-safe-area-context', 'react-native-track-player', 'react-native-video']) {
  const folder = path.join(root, name, 'android/src/main/java');
  if (!fs.existsSync(folder)) throw new Error('Missing Kotlin dependency source: ' + folder);
  let count = 0;
  const walk = dir => {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.isFile() && p.endsWith('.kt')) {
        const old = fs.readFileSync(p, 'utf8');
        if (!/\bpackage\s+[\w.]+/.test(old)) continue;
        const directive = '@file:Suppress("DEPRECATION", "OVERRIDE_DEPRECATION", "UNNECESSARY_SAFE_CALL", "USELESS_ELVIS")';
        const oldDirective = '@file:Suppress("DEPRECATION", "OVERRIDE_DEPRECATION")';
        if (old.includes(oldDirective)) {
          fs.writeFileSync(p, old.replace(oldDirective, directive));
          count++;
          continue;
        }
        if (old.includes(directive)) continue;
        const result = old.replace(/^(\s*(?:\/\*[\s\S]*?\*\/\s*)?)((?:package\s+[\w.]+))/, '$1' + directive + '\n\n$2');
        if (result === old) throw new Error('Unable to apply Kotlin file-level warning suppression: ' + p);
        fs.writeFileSync(p, result);
        count++;
      }
    }
  };
  walk(folder);
  console.log('Kotlin deprecation diagnostics scoped: ' + name + ', updated files: ' + count);
}
