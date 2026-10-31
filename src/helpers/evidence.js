async function captureEvidence(page, testInfo, name) {
  const screenshotPath = testInfo.outputPath('screenshots', `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach(name, {
    path: screenshotPath,
    contentType: 'image/png'
  });
}

module.exports = { captureEvidence };
