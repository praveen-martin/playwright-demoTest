/**
 * TAP Reporter — Playwright custom reporter
 * Automatically runs after every `npx playwright test` execution.
 * Sends pass/fail results to the TAP dashboard and emails the report to EMAIL.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

function httpPost(url, body, token) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const isHttps = parsed.protocol === 'https:';
    const mod = isHttps ? require('https') : require('http');
    const data = JSON.stringify(body);
    const headers = { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.pathname + (parsed.search || ''),
      method: 'POST',
      headers,
    };
    const req = mod.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

class TapReporter {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.startTime = Date.now();
  }

  onTestEnd(_test, result) {
    if (result.status === 'passed') this.passed++;
    else if (result.status === 'failed' || result.status === 'timedOut') this.failed++;
    else this.skipped++;
  }

  async onEnd(result) {
    const total = this.passed + this.failed + this.skipped;
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(1);

    const tapConfigPath = path.join(__dirname, 'tap.config.json');
    if (!fs.existsSync(tapConfigPath)) return;

    let project_id, tap_api_url;
    try {
      const cfg = JSON.parse(fs.readFileSync(tapConfigPath, 'utf8'));
      project_id = cfg.project_id;
      tap_api_url = (cfg.tap_api_url || '').replace(/\/$/, '');
    } catch { return; }

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!project_id || !tap_api_url || !email || !password) return;

    try {
      const loginRes = await httpPost(`${tap_api_url}/api/signin`, { email, password });
      if (loginRes.status !== 200) {
        console.log('\n[TAP Reporter] Login failed, skipping notification');
        return;
      }
      const { access_token } = JSON.parse(loginRes.body);
      if (!access_token) return;

      const reportRes = await httpPost(
        `${tap_api_url}/playwright/run-report`,
        { project_id, passed: this.passed, failed: this.failed, skipped: this.skipped, total, duration, status: result.status },
        access_token
      );

      if (reportRes.status === 200) {
        console.log(`\n[TAP Reporter] ✅ Report sent — ${this.passed}/${total} passed. Check TAP dashboard for the report link.`);
      } else {
        console.log(`\n[TAP Reporter] ⚠️ TAP notification failed (${reportRes.status})`);
      }
    } catch (e) {
      console.log(`\n[TAP Reporter] ⚠️ Could not notify TAP: ${e.message}`);
    }
  }
}

module.exports = TapReporter;
