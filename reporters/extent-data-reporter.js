const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const reportsDirectory = path.join(root, 'reports');
const assetsDirectory = path.join(reportsDirectory, 'extent-assets');

class ExtentDataReporter {
  constructor() {
    this.tests = [];
  }

  onBegin() {
    fs.mkdirSync(reportsDirectory, { recursive: true });
    fs.rmSync(assetsDirectory, { recursive: true, force: true });
    fs.mkdirSync(assetsDirectory, { recursive: true });
  }

  onTestEnd(test, result) {
    const testName = test.title.replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-|-$/g, '');
    const attachments = [];

    for (const [index, attachment] of result.attachments.entries()) {
      if (attachment.contentType !== 'image/png' || !attachment.path) {
        continue;
      }

      const fileName = `${testName}-${index + 1}.png`;
      fs.copyFileSync(attachment.path, path.join(assetsDirectory, fileName));
      attachments.push({
        name: attachment.name,
        path: `extent-assets/${fileName}`
      });
    }

    this.tests.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error ? result.error.message : null,
      attachments
    });
  }

  onEnd() {
    const output = {
      generatedAt: new Date().toISOString(),
      tests: this.tests
    };

    fs.writeFileSync(
      path.join(reportsDirectory, 'extent-results.json'),
      JSON.stringify(output, null, 2)
    );
  }
}

module.exports = ExtentDataReporter;
