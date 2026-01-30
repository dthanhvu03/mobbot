---
sidebar_position: 4
title: Automation với Cron
description: Hướng dẫn lập lịch (Scheduling) cho AI Agent bằng Cron. Tự động chạy task định kỳ, backup dữ liệu và gửi báo cáo hàng ngày.
keywords: [moltbot cron, ai agent scheduler, automation timeline, lập lịch chạy bot, task automation]
---

# Cron & Scheduling - Task Automation

Moltbot tích hợp **cron scheduler** để chạy recurring tasks tự động.

## Quick Start

### Example: Daily Morning Report

```typescript
{
  "tool": "cron",
  "schedule": "0 9 * * *",  // 9:00 AM daily
  "task": {
    "tool": "message",
    "target": "me",
    "message": "Good morning! Here's your daily summary."
  }
}
```

**Result:** Mỗi sáng 9h, bạn nhận message

---

## Cron Syntax

### Format

```
┌───────────── minute (0-59)
│ ┌─────────── hour (0-23)
│ │ ┌───────── day of month (1-31)
│ │ │ ┌─────── month (1-12)
│ │ │ │ ┌───── day of week (0-6) (Sunday=0)
│ │ │ │ │
│ │ │ │ │
* * * * *
```

### Common Patterns

| Schedule | Meaning | Cron Expression |
|----------|---------|-----------------|
| Every minute | Test/debug | `* * * * *` |
| Every 5 minutes | Frequent checks | `*/5 * * * *` |
| Every hour | Hourly reports | `0 * * * *` |
| Every day at 9am | Daily morning | `0 9 * * *` |
| Every Monday 9am | Weekly meeting | `0 9 * * 1` |
| First day of month | Monthly report | `0 0 1 * *` |
| Weekdays at 8am | Work days only | `0 8 * * 1-5` |
| Every 15 min (work hours) | During 9-5 | `*/15 9-17 * * 1-5` |

### Interactive Cron Builder

Online tools:
- https://crontab.guru
- https://crontab-generator.org

---

## Configuration

### Global Cron Config

`~/.clawdbot/moltbot.json`:

```json
{
  "cron": {
    "enabled": true,
    "timezone": "Asia/Ho_Chi_Minh",  // Vietnam time
    "maxConcurrent": 5,  // Max parallel jobs
    "jobs": [
      {
        "id": "morning-report",
        "schedule": "0 9 * * *",
        "task": {...}
      }
    ]
  }
}
```

---

### Per-Job Configuration

```json
{
  "id": "backup-daily",
  "schedule": "0 2 * * *",  // 2am daily
  "enabled": true,
  "timezone": "Asia/Ho_Chi_Minh",
  "retries": 3,
  "timeout": 300000,  // 5 minutes
  "onError": {
    "notify": "telegram",
    "continue": true  // Don't stop on failure
  },
  "task": {
    "tool": "exec",
    "command": "tar -czf /backup/daily.tar.gz /data"
  }
}
```

---

## Real-World Use Cases

### 1. Daily Backup

```json
{
  "id": "backup",
  "schedule": "0 2 * * *",  // 2am daily
  "task": {
    "tool": "exec",
    "command": "tar -czf /backup/$(date +%Y%m%d).tar.gz /data",
    "background": true
  },
  "onSuccess": {
    "tool": "message",
    "target": "admin",
    "message": "✅ Backup completed: /backup/{{date}}.tar.gz"
  }
}
```

---

### 2. Website Monitoring

```json
{
  "id": "uptime-check",
  "schedule": "*/5 * * * *",  // Every 5 minutes
  "task": {
    "tool": "web_fetch",
    "url": "https://mysite.com/health"
  },
  "onError": {
    "tool": "message",
    "channel": "telegram",
    "target": "@admin",
    "message": "🚨 Site down! Check immediately."
  }
}
```

---

### 3. Price Tracking

```json
{
  "id": "price-monitor",
  "schedule": "0 */4 * * *",  // Every 4 hours
  "task": [
    {
      "tool": "browser",
      "action": "navigate",
      "url": "https://shop.com/product/123"
    },
    {
      "tool": "browser",
      "action": "evaluate",
      "script": "document.querySelector('.price').textContent"
    }
  ],
  "onSuccess": {
    "tool": "write_file",
    "path": "/data/prices.log",
    "content": "{{timestamp}}: {{result}}",
    "mode": "append"
  }
}
```

**Result:** Price history logged every 4 hours

---

### 4. Social Media Posting

```json
{
  "id": "daily-quote",
  "schedule": "0 8 * * *",  // 8am daily
  "task": {
    "tool": "message",
    "channel": "telegram",
    "target": "@mypublicchannel",
    "message": "Quote of the day: {{randomQuote}}"
  }
}
```

---

### 5. Database Cleanup

```json
{
  "id": "cleanup-old-logs",
  "schedule": "0 3 * * 0",  // Sunday 3am
  "task": {
    "tool": "exec",
    "command": "find /logs -type f -mtime +30 -delete"
  }
}
```

**Deletes logs older than 30 days**

---

### 6. Report Generation

```json
{
  "id": "weekly-report",
  "schedule": "0 9 * * 1",  // Monday 9am
  "task": [
    {
      "tool": "exec",
      "command": "python3 /scripts/generate_report.py"
    },
    {
      "tool": "message",
      "channel": "slack",
      "target": "#team",
      "message": "Weekly report ready!",
      "media": ["/reports/weekly.pdf"]
    }
  ]
}
```

---

### 7. Health Checks

```json
{
  "id": "gateway-health",
  "schedule": "*/10 * * * *",  // Every 10 minutes
  "task": {
    "tool": "gateway",
    "action": "health"
  },
  "onError": {
    "tool": "gateway",
    "action": "restart"
  }
}
```

**Auto-restart if unhealthy**

---

## Advanced Features

### Chained Tasks

**Run multiple tasks sequentially:**

```json
{
  "schedule": "0 9 * * *",
  "task": [
    { tool: "exec", command: "git pull" },
    { tool: "exec", command: "npm install" },
    { tool: "exec", command: "npm run build" },
    { tool: "exec", command: "pm2 restart app" },
    {
      tool: "message",
      target: "me",
      message: "✅ Deployed latest version"
    }
  ]
}
```

**Stops on first failure** unless `continueOnError: true`

---

### Conditional Execution

```json
{
  "schedule": "0 * * * *",
  "condition": {
    "tool": "exec",
    "command": "test -f /tmp/trigger"
  },
  "task": {
    "tool": "message",
    "target": "me",
    "message": "Trigger file found!"
  }
}
```

**Only runs if condition passes**

---

### Dynamic Scheduling

**Pause/resume jobs:**

```bash
# Pause job
moltbot cron pause morning-report

# Resume
moltbot cron resume morning-report

# List all jobs
moltbot cron list

# Trigger manually
moltbot cron run morning-report
```

---

### Variables & Templates

```json
{
  "schedule": "0 9 * * *",
  "task": {
    "tool": "message",
    "target": "me",
    "message": "Good morning! Today is {{date}} {{time}}"
  }
}
```

**Available variables:**
- `{{date}}`: 2026-01-30
- `{{time}}`: 09:00:15
- `{{timestamp}}`: Unix timestamp
- `{{weekday}}`: Monday
- `{{result}}`: Previous task result

---

## Management

### CLI Commands

```bash
# List all cron jobs
moltbot cron list

# Show job details
moltbot cron show morning-report

# Run job now (manual trigger)
moltbot cron run morning-report

# Enable/disable
moltbot cron enable morning-report
moltbot cron disable morning-report

# Delete job
moltbot cron delete morning-report

# View logs
moltbot cron logs morning-report --tail 50
```

---

### Dashboard UI

Open `http://localhost:18789/cron`

**Features:**
- Visual job list
- Next run times
- Execution history
- Manual triggers
- Enable/disable toggles
- Live logs

---

## Monitoring

### Execution History

```bash
# View recent runs
moltbot cron history morning-report

# Example output:
# 2026-01-30 09:00:00 | ✅ Success | 1.2s
# 2026-01-29 09:00:00 | ✅ Success | 0.9s
# 2026-01-28 09:00:00 | ❌ Failed | Error: timeout
```

---

### Notifications

**Alert on failures:**

```json
{
  "cron": {
    "notifications": {
      "enabled": true,
      "channel": "telegram",
      "target": "@admin",
      "onFailure": true,
      "onSuccess": false  // Only alert failures
    }
  }
}
```

---

### Health Checks

```bash
# Check cron daemon status
moltbot cron status

# Output:
# ✅ Cron scheduler: Running
# ⏰ Active jobs: 5
# ⏭️  Next run: morning-report in 2h 15m
# 📊 Success rate: 98.5%
```

---

## Best Practices

### 1. Use Specific Timezones

```json
{
  "timezone": "Asia/Ho_Chi_Minh",  // Not "UTC+7"
  "schedule": "0 9 * * *"
}
```

**Why:** Handles DST correctly

---

### 2. Set Timeouts

```json
{
  "timeout": 300000,  // 5 minutes
  "task": {...}
}
```

**Prevents hung jobs**

---

### 3. Retry Failed Jobs

```json
{
  "retries": 3,
  "retryDelay": 60000,  // 1 minute between retries
  "task": {...}
}
```

---

### 4. Log Everything

```json
{
  "task": {
    "tool": "exec",
    "command": "backup.sh"
  },
  "onSuccess": {
    "tool": "write_file",
    "path": "/logs/backup.log",
    "content": "{{timestamp}}: Backup successful\n",
    "mode": "append"
  },
  "onError": {
    "tool": "write_file",
    "path": "/logs/backup.log",
    "content": "{{timestamp}}: FAILED - {{error}}\n",
    "mode": "append"
  }
}
```

---

### 5. Avoid Overlaps

```json
{
  "schedule": "*/5 * * * *",
  "concurrent": false,  // Don't run if previous still running
  "task": {...}
}
```

---

### 6. Test Before Scheduling

```bash
# Test cron expression
moltbot cron validate "0 9 * * *"
# Output: Every day at 09:00
#         Next 5 runs:
#         - 2026-01-30 09:00:00
#         - 2026-01-31 09:00:00
#         - 2026-02-01 09:00:00

# Run job manually first
moltbot cron run test-job --dry-run
```

---

## Security

### 1. Limit Permissions

```json
{
  "agents": {
    "list": [
      {
        "id": "cron-agent",
        "tools": {
          "allowed": ["exec", "message", "write_file"],
          "denied": ["browser", "gateway"]
        }
      }
    ]
  }
}
```

---

### 2. Sandbox Cron Tasks

```json
{
  "cron": {
    "sandbox": {
      "enabled": true,
      "workspace": "/cron-workspace"
    }
  }
}
```

---

### 3. Audit Logs

```bash
# Review what cron jobs did
moltbot audit --filter cron --since "1 week ago"
```

---

## Troubleshooting

### Job Not Running

**Check:**
```bash
# Is cron enabled?
moltbot config get cron.enabled

# Is job enabled?
moltbot cron show job-id | grep enabled

# Timezone correct?
moltbot config get cron.timezone

# Schedule valid?
moltbot cron validate "0 9 * * *"
```

---

### Job Failing

```bash
# Check logs
moltbot cron logs job-id --tail 50

# Test manually
moltbot cron run job-id --verbose

# Check timeout
moltbot cron show job-id | grep timeout
```

---

### Jobs Overlapping

**Solution: Set `concurrent: false`**

```json
{
  "concurrent": false,
  "schedule": "*/5 * * * *"
}
```

---

## Examples Repository

Full examples tại: https://github.com/moltbot-vn/cron-examples

**Categories:**
- Backups & Archiving
- Monitoring & Alerts
- Content Publishing
- Data Sync
- Cleanup & Maintenance
- Reports & Analytics

---

## Resources

- [Crontab Guru](https://crontab.guru) - Interactive cron builder
- [Tools Overview](/docs/advanced/tools-overview)
- [Exec Security](/docs/advanced/exec-security)

---

_Questions? [Discord #automation](https://discord.gg/moltbot-vn)_
