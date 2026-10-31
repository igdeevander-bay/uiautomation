const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const playwrightCli = path.join(root, 'node_modules', '@playwright', 'test', 'cli.js');
const playwright = spawnSync(process.execPath, [playwrightCli, 'test', ...process.argv.slice(2)], {
  cwd: root,
  stdio: 'inherit'
});

if (playwright.error) {
  console.error(`Unable to run Playwright: ${playwright.error.message}`);
  process.exit(1);
}
const playwrightExitCode = playwright.status === null ? 1 : playwright.status;

const reportData = path.join(root, 'reports', 'extent-results.json');
if (!require('node:fs').existsSync(reportData)) {
  process.exit(playwrightExitCode);
}

const mavenWrapper = process.platform === 'win32'
  ? 'reporting\\mvnw.cmd'
  : './reporting/mvnw';
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

if (report.status !== 0) {
  process.exit(report.status || 1);
}

process.exit(playwrightExitCode);
