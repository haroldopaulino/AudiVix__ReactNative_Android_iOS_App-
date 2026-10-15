// Owner: Haroldo Paulino
const {execFileSync} = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const output = execFileSync(process.execPath, [path.join(__dirname, 'autolink-config.js')], {
  cwd: root,
  encoding: 'utf8',
});
const config = JSON.parse(output);
const android = config.project?.android;
const dependencies = Object.entries(config.dependencies || {}).filter(([, value]) => value.platforms?.android);
process.stdout.write(JSON.stringify({
  packageName: android?.packageName,
  sourceDir: android?.sourceDir,
  detectedNativeDependencies: dependencies.map(([name]) => name),
}, null, 2) + '\n');
if (android?.packageName !== 'com.audivix') process.exitCode = 1;
