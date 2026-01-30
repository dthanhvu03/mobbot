---
sidebar_position: 3
title: Browser Automation
description: Tự động hóa trình duyệt với Moltbot. Hướng dẫn scrape dữ liệu, test web app và tương tác với website sử dụng Moltbot Browser Tool.
keywords: [moltbot browser, browser automation, web scraping ai, headless chrome, automated testing]
---

# Browser Automation với Moltbot

Moltbot tích hợp **browser automation** để tương tác với websites, test apps, và scrape dữ liệu.

## Tại sao cần Browser Tool?

**web_fetch vs browser:**

| Feature | web_fetch | browser |
|---------|-----------|---------|
| Speed | ⚡ Nhanh | 🐌 Chậm hơn |
| JavaScript | ❌ Không | ✅ Full support |
| Screenshots | ❌ | ✅ |
| Form interaction | ❌ | ✅ |
| SPA support | ❌ Limited | ✅ Full |
| Resource usage | 💚 Low | 🔴 High |

**Use browser khi:**
- Site cần JavaScript để render
- Cần screenshots
- Fill forms, click buttons
- Test web apps
- Scrape SPAs (React, Vue, Angular)

---

## Setup

### 1. Install Browser Binary

Moltbot support **Chrome/Chromium** hoặc **Firefox**.

**Linux (Ubuntu/Debian):**
```bash
# Chromium
sudo apt-get install chromium-browser

# Or Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

**macOS:**
```bash
# Chrome (recommended)
brew install --cask google-chrome

# Or Chromium
brew install chromium
```

**Windows (WSL2):**
```bash
# In WSL
sudo apt-get install chromium-browser
```

### 2. Enable Browser Tool

Edit `~/.clawdbot/moltbot.json`:

```json
{
  "tools": {
    "browser": {
      "enabled": true,
      "headless": true,  // No GUI
      "executablePath": "/usr/bin/chromium-browser"  // Auto-detect if omitted
    }
  }
}
```

### 3. Test

```bash
moltbot doctor --check browser
```

Expected output:
```
✅ Browser: Chrome 120.0.6099.109
✅ Headless mode: Enabled
✅ Screenshot support: Available
```

---

## Basic Usage

### Navigate to URL

```typescript
{
  "tool": "browser",
  "action": "navigate",
  "url": "https://example.com"
}
```

**Options:**
- `waitUntil`: `load` | `domcontentloaded` | `networkidle`
- `timeout`: milliseconds (default 30000)

---

### Take Screenshot

```typescript
{
  "tool": "browser",
  "action": "screenshot",
  "fullPage": true,
  "path": "./screenshot.png"
}
```

**Options:**
- `fullPage`: Capture entire page (vs viewport)
- `quality`: 0-100 (for JPEG)
- `type`: `png` | `jpeg`

**Example use:**
```
You: "Screenshot Google homepage"
Bot: [Navigates to google.com]
     [Takes screenshot]
     "Here's the screenshot: /workspace/google.png"
```

---

### Click Element

```typescript
{
  "tool": "browser",
  "action": "click",
  "selector": "button.login"
}
```

**Selectors:**
- CSS: `button.login`, `#submit`, `.btn-primary`
- XPath: `//button[text()='Login']`
- Text: `text=Login`

---

### Type Text

```typescript
{
  "tool": "browser",
  "action": "type",
  "selector": "input[name='email']",
  "text": "user@example.com"
}
```

**Options:**
- `delay`: Typing speed (ms between keystrokes)
- `clear`: Clear existing text first

---

### Extract Content

```typescript
{
  "tool": "browser",
  "action": "evaluate",
  "script": "document.querySelector('h1').textContent"
}
```

**JavaScript in browser context:**
```javascript
// Get all links
Array.from(document.querySelectorAll('a')).map(a => a.href)

// Get table data
Array.from(document.querySelectorAll('table tr')).map(tr => 
  Array.from(tr.querySelectorAll('td')).map(td => td.textContent)
)
```

---

## Real-World Examples

### Example 1: Login Flow

```typescript
// Navigate
{ action: "navigate", url: "https://app.example.com/login" }

// Fill email
{ action: "type", selector: "input[name='email']", text: "user@example.com" }

// Fill password
{ action: "type", selector: "input[name='password']", text: "secret123" }

// Submit
{ action: "click", selector: "button[type='submit']" }

// Wait for dashboard
{ action: "wait", selector: ".dashboard" }

// Screenshot dashboard
{ action: "screenshot", path: "./dashboard.png" }
```

---

### Example 2: Scrape Product Data

```typescript
// Navigate to product page
{ action: "navigate", url: "https://shop.example.com/product/123" }

// Extract data
{ 
  action: "evaluate",
  script: `({
    title: document.querySelector('.product-title').textContent,
    price: document.querySelector('.price').textContent,
    stock: document.querySelector('.stock').textContent,
    images: Array.from(document.querySelectorAll('.gallery img')).map(img => img.src)
  })`
}
```

**Result:**
```json
{
  "title": "Gaming Mouse X",
  "price": "$49.99",
  "stock": "In Stock",
  "images": ["https://cdn.example.com/img1.jpg", "..."]
}
```

---

### Example 3: Monitor Website Changes

**Setup cron** (see [Cron Guide](/docs/advanced/cron)):

```typescript
// Every hour, check product price
{
  schedule: "0 * * * *",
  task: [
    { action: "navigate", url: "https://shop.com/product/123" },
    { 
      action: "evaluate",
      script: "document.querySelector('.price').textContent"
    },
    // If price changed, notify via Telegram
    {
      tool: "message",
      channel: "telegram",
      target: "@me",
      message: "Price changed to: $NEW_PRICE"
    }
  ]
}
```

---

### Example 4: Form Automation

```typescript
// Fill complex form
{ action: "navigate", url: "https://forms.example.com" }

// Text inputs
{ action: "type", selector: "#name", text: "John Doe" }
{ action: "type", selector: "#email", text: "john@example.com" }

// Radio button
{ action: "click", selector: "input[value='male']" }

// Checkbox
{ action: "click", selector: "#agree-terms" }

// Dropdown
{ action: "select", selector: "#country", value: "Vietnam" }

// File upload
{ action: "upload", selector: "#avatar", path: "/workspace/photo.jpg" }

// Submit
{ action: "click", selector: "button[type='submit']" }

// Wait for success message
{ action: "wait", selector: ".success-message" }
```

---

## Advanced Features

### Wait for Elements

```typescript
{
  action: "wait",
  selector: ".loaded-content",
  timeout: 10000
}
```

**Wait types:**
- `wait`: Element appears in DOM
- `waitVisible`: Element visible
- `waitHidden`: Element disappears

---

### Network Interception

**Block ads, trackers:**

```json
{
  "tools": {
    "browser": {
      "interceptRequests": {
        "enabled": true,
        "block": [
          "*.doubleclick.net",
          "*.googlesyndication.com",
          "*.facebook.com/tr"
        ]
      }
    }
  }
}
```

**Modify requests:**
```javascript
{
  interceptRequests: {
    modify: {
      "*/api/*": {
        headers: {
          "Authorization": "Bearer TOKEN"
        }
      }
    }
  }
}
```

---

### PDF Generation

```typescript
{
  action: "pdf",
  path: "./report.pdf",
  format: "A4",
  margin: {
    top: "1cm",
    bottom: "1cm"
  }
}
```

---

### Mobile Emulation

```typescript
{
  action: "emulate",
  device: "iPhone 12"
}
```

**Supported devices:**
- iPhone 12, 13, 14
- iPad Pro
- Samsung Galaxy S21
- Pixel 5

---

## Performance Optimization

### 1. Headless Mode

**Always use headless** trừ khi debugging:

```json
{
  "tools": {
    "browser": {
      "headless": true
    }
  }
}
```

**Headless = 50% faster + less RAM**

---

### 2. Disable Images

```json
{
  "tools": {
    "browser": {
      "disableImages": true  // Faster page loads
    }
  }
}
```

---

### 3. Reuse Browser Context

```typescript
// BAD: New browser per task
navigate(...) // Browser starts
screenshot(...) // Browser closes
navigate(...) // Browser starts again ❌

// GOOD: Keep browser open
{
  keepAlive: true,
  tasks: [
    navigate(...),
    screenshot(...),
    navigate(...),
    screenshot(...)
  ]
}  // Browser closes once
```

---

### 4. Resource Limits

```json
{
  "tools": {
    "browser": {
      "maxInstances": 2,  // Parallel browsers
      "timeout": 30000,
      "memory": "512MB"  // Per browser
    }
  }
}
```

---

## Security Considerations

### 1. Sandbox Browser

**Run browser on isolated node:**

```json
{
  "agents": {
    "list": [
      {
        "id": "scraper",
        "tools": {
          "browser": {
            "host": "node",  // Not gateway
            "nodeId": "scraper-node"
          }
        }
      }
    ]
  }
}
```

---

### 2. Block Dangerous Sites

```json
{
  "tools": {
    "browser": {
      "blocklist": [
        "*.onion",
        "*.torrent",
        "known-malware-domains.txt"
      ]
    }
  }
}
```

---

### 3. Limit Domains

```json
{
  "tools": {
    "browser": {
      "allowedDomains": [
        "example.com",
        "api.example.com",
        "cdn.example.com"
      ]
    }
  }
}
```

**Agent tries to visit `evil.com`** → ❌ Blocked

---

## Troubleshooting

### "Browser not found"

```bash
# Check path
which chromium-browser
which google-chrome

# Set explicitly
moltbot configure --set tools.browser.executablePath=/usr/bin/chromium-browser
```

---

### "Timeout waiting for page load"

**Increase timeout:**
```typescript
{
  action: "navigate",
  url: "...",
  timeout: 60000  // 60 seconds
}
```

**Or use different wait strategy:**
```typescript
{
  waitUntil: "domcontentloaded"  // Don't wait for all resources
}
```

---

### "Out of memory"

**Browser eating RAM:**

```bash
# Check memory
moltbot health

# Reduce concurrent browsers
moltbot configure --set tools.browser.maxInstances=1

# Enable headless + disable images
```

---

### Screenshots blank/white

**Wait for content:**
```typescript
{ action: "navigate", url: "..." }
{ action: "wait", selector: "main", timeout: 5000 }  // Wait for content
{ action: "screenshot", path: "./screen.png" }
```

---

## Best Practices

### 1. Always Screenshot

**Helpful for debugging:**
```typescript
try {
  navigate(url)
  click(selector)
} catch (error) {
  screenshot("./error.png")  // See what went wrong
  throw error
}
```

---

### 2. Use Specific Selectors

```typescript
// ❌ BAD: Too generic
{ selector: "button" }

// ✅ GOOD: Specific
{ selector: "button[data-test='login-submit']" }
{ selector: "button.btn-primary:contains('Login')" }
```

---

### 3. Handle Popups

```typescript
// Dismiss cookie banners
{ action: "click", selector: ".cookie-accept", optional: true }

// Close modals
{ action: "click", selector: ".modal-close", optional: true }
```

---

### 4. Error Handling

```typescript
{
  action: "click",
  selector: "button.submit",
  timeout: 5000,
  onError: {
    screenshot: true,
    notify: "telegram"
  }
}
```

---

## Resources

- [Playwright Docs](https://playwright.dev) - Browser API reference
- [CSS Selectors Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [Tools Overview](/docs/advanced/tools-overview)

---

_Questions? [Discord #automation](https://discord.gg/moltbot-vn)_
