#!/usr/bin/env node
/**
 * TAP-DAP Credential Fetcher
 * ---------------------------------------------------------
 * Logs into TAP with your account credentials (email + password),
 * fetches the Playwright credentials for this project, and writes
 * them to a local .env file -- credentials never touch git.
 *
 * Usage:
 *   node fetch-credentials.js
 *   (you will be prompted for your TAP email and password)
 *
 * Or non-interactive (CI/scripts):
 *   TAP_EMAIL=you@example.com TAP_PASSWORD=yourpass node fetch-credentials.js
 */

'use strict';

const https    = require('https');
const http     = require('http');
const readline = require('readline');
const fs       = require('fs');
const path     = require('path');

// Load project config
const configPath = path.join(__dirname, 'tap.config.json');
if (!fs.existsSync(configPath)) {
  console.error('tap.config.json not found. Re-generate files from TAP.');
  process.exit(1);
}
const config     = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const TAP_API    = (config.tap_api_url || '').replace(/\/$/, '');
const PROJECT_ID = config.project_id || '';

if (!TAP_API)    { console.error('tap_api_url missing in tap.config.json'); process.exit(1); }
if (!PROJECT_ID) { console.error('project_id missing in tap.config.json');  process.exit(1); }

function request(url, options, body) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function prompt(question, hidden) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (hidden) {
      process.stdout.write(question);
      process.stdin.setRawMode(true);
      let input = '';
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', function onData(ch) {
        if (ch === '\n' || ch === '\r' || ch === '') {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.removeListener('data', onData);
          process.stdout.write('\n');
          rl.close();
          resolve(input);
        } else if (ch === '' || ch === '') {
          input = input.slice(0, -1);
        } else {
          input += ch;
          process.stdout.write('*');
        }
      });
    } else {
      rl.question(question, (answer) => { rl.close(); resolve(answer); });
    }
  });
}

async function main() {
  console.log('\nTAP-DAP Credential Fetcher');
  console.log('-'.repeat(40));

  const email    = process.env.TAP_EMAIL    || await prompt('TAP Email    : ');
  const password = process.env.TAP_PASSWORD || await prompt('TAP Password : ', true);

  if (!email || !password) {
    console.error('Email and password are required.');
    process.exit(1);
  }

  console.log('\nLogging in...');
  const loginBody = JSON.stringify({ email, password });
  const loginRes  = await request(
    `${TAP_API}/api/signin`,
    { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginBody) } },
    loginBody
  );

  if (loginRes.status !== 200) {
    console.error(`Login failed (${loginRes.status}): ${loginRes.body}`);
    process.exit(1);
  }

  let loginData;
  try { loginData = JSON.parse(loginRes.body); } catch {
    console.error('Unexpected login response (not JSON)');
    process.exit(1);
  }

  const token = loginData.access_token;
  if (!token) {
    console.error('No access_token in login response');
    process.exit(1);
  }
  console.log('Login successful');

  console.log('Fetching project credentials...');
  const credRes = await request(
    `${TAP_API}/api/generated_playwright/credentials?project_id=${PROJECT_ID}`,
    { method: 'GET', headers: { Authorization: `Bearer ${token}` } }
  );

  if (credRes.status !== 200) {
    console.error(`Credentials fetch failed (${credRes.status}): ${credRes.body}`);
    process.exit(1);
  }

  let creds;
  try { creds = JSON.parse(credRes.body); } catch {
    console.error('Invalid JSON in credentials response');
    process.exit(1);
  }

  const envContent = `BASE_URL=${creds.base_url || ''}\nEMAIL=${creds.email || ''}\nPASSWORD=${creds.password || ''}\n`;
  fs.writeFileSync(path.join(__dirname, '.env'), envContent, 'utf8');

  console.log('.env written successfully!');
  console.log('\nYou can now run your tests:');
  console.log('  npx playwright test\n');
}

main().catch(e => { console.error('Unexpected error:', e.message); process.exit(1); });
