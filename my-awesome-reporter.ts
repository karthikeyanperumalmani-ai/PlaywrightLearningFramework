import type {
  Reporter, FullConfig, Suite, TestCase, TestResult, FullResult
} from '@playwright/test/reporter';

import fs from 'fs';
import path from 'path';

class MyReporter implements Reporter {
  private logs: string[] = [];

  constructor(options: { customOption?: string } = {}) {
    console.log(`Reporter initialized with ${options.customOption}`);
  }

  onBegin(config: FullConfig, suite: Suite) {
    this.logs.push(`<h2>Test Run Started</h2>`);
    this.logs.push(`<p>Total tests: ${suite.allTests().length}</p>`);
  }

  onTestBegin(test: TestCase) {
    this.logs.push(`<p>🟡 Starting: ${test.title}</p>`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.logs.push(
      `<p>✅ Finished: <b>${test.title}</b> - Status: <span style="color:${this.getColor(result.status)}">${result.status}</span></p>`
    );
  }

  onEnd(result: FullResult) {
    this.logs.push(`<h3>Final Status: ${result.status}</h3>`);

    const htmlContent = `
      <html>
        <head>
          <title>Custom Playwright Report</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Playwright Custom Report</h1>
          ${this.logs.join('\n')}
        </body>
      </html>
    `;

    const filePath = path.join(process.cwd(), 'custom-report.html');
    fs.writeFileSync(filePath, htmlContent);

    console.log(`📄 Custom HTML report generated at: ${filePath}`);
  }

  private getColor(status: string): string {
    switch (status) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      case 'skipped': return 'orange';
      default: return 'black';
    }
  }
}

export default MyReporter;