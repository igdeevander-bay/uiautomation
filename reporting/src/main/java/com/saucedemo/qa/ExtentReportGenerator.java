package com.saucedemo.qa;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.MediaEntityBuilder;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public final class ExtentReportGenerator {
    private ExtentReportGenerator() {
    }

    public static void main(String[] args) throws IOException {
        String[] reportArguments = args.length == 1 ? args[0].split(",", 2) : args;
        if (reportArguments.length != 2) {
            throw new IllegalArgumentException(
                    "Usage: ExtentReportGenerator <results.json> <report.html>");
        }

        Path resultsPath = Path.of(reportArguments[0]).toAbsolutePath();
        Path reportPath = Path.of(reportArguments[1]).toAbsolutePath();
        Files.createDirectories(reportPath.getParent());

        JsonNode results = new ObjectMapper().readTree(resultsPath.toFile());
        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath.toString());
        sparkReporter.config().setDocumentTitle("SauceDemo UI Automation");
        sparkReporter.config().setReportName("Login and End-to-End Checkout");
        sparkReporter.config().setTheme(Theme.STANDARD);
        sparkReporter.config().setOfflineMode(true);

        ExtentReports extent = new ExtentReports();
        extent.attachReporter(sparkReporter);
        extent.setSystemInfo("Application", "SauceDemo");
        extent.setSystemInfo("Browser", "Chromium");
        extent.setSystemInfo("Environment", "https://www.saucedemo.com");

        Path reportDirectory = reportPath.getParent();
        for (JsonNode testResult : results.path("tests")) {
            ExtentTest test = extent.createTest(testResult.path("title").asText());
            Status status = toExtentStatus(testResult.path("status").asText());
            test.log(status, "Test " + status.name().toLowerCase());
            test.info("Duration: " + testResult.path("duration").asLong() + " ms");

            String error = testResult.path("error").asText("");
            if (!error.isBlank()) {
                test.fail(error);
            }

            for (JsonNode attachment : testResult.path("attachments")) {
                Path screenshot = reportDirectory.resolve(attachment.path("path").asText()).normalize();
                if (!Files.isRegularFile(screenshot)) {
                    throw new IOException("Screenshot attachment not found: " + screenshot);
                }

                String relativePath = reportDirectory.relativize(screenshot)
                        .toString()
                        .replace('\\', '/');
                test.info(
                        attachment.path("name").asText("Evidence"),
                        MediaEntityBuilder.createScreenCaptureFromPath(relativePath).build());
            }
        }

        extent.flush();
        System.out.println("ExtentReports report generated: " + reportPath);
    }

    private static Status toExtentStatus(String status) {
        return switch (status) {
            case "passed" -> Status.PASS;
            case "skipped", "interrupted" -> Status.SKIP;
            case "failed", "timedOut" -> Status.FAIL;
            default -> throw new IllegalArgumentException("Unsupported test status: " + status);
        };
    }
}
