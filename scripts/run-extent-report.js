const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const mavenWrapper = process.platform === 'win32'
  ? 'reporting\\mvnw.cmd'
  : './reporting/mvnw';

if (!fs.existsSync(path.join(root, 'reports', 'extent-results.json'))) {
  console.error('No test results found. Run "npm test" first.');
  process.exit(1);
}

const report = spawnSync(
  mavenWrapper,
  [
    '--file',
    'reporting/pom.xml',
    'compile',
    'exec:java',
    '-Dexec.args=reports/extent-results.json,reports/extent-report.html'
  ],
  {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  }
);

if (report.error) {
  console.error(`Unable to generate the ExtentReports report: ${report.error.message}`);
  process.exit(1);
}

process.exit(report.status === null ? 1 : report.status);
