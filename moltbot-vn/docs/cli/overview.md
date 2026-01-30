---
sidebar_position: 1
title: Moltbot CLI Reference
description: Tài liệu đầy đủ về Moltbot Command Line Interface (CLI). Các lệnh quản lý agent, gateway, cấu hình hệ thống và debug lỗi.
keywords: [moltbot cli, moltbot commands, quản lý ai agent, dòng lệnh moltbot, gateway cli]
---

# CLI Overview

Moltbot CLI là công cụ chính để quản lý bot, gateway, và tools.

## Global Flags

Tất cả commands đều hỗ trợ các cờ sau:

| Flag | Description |
|------|-------------|
| `--json` | Output JSON format (good for parsing) |
| `--plain` | Tắt formatting/colors |
| `--debug` | Hiện debug logs |
| `--help` | Hiện hướng dẫn sử dụng |
| `--version` | Hiện version hiện tại |

## Command Tree

```
moltbot
├── setup           # Setup workspace
├── onboard         # Interactive wizard
├── configure       # Manage config keys
├── doctor          # Health checks
├── update          # Update CLI
├── uninstall       # Remove everything
│
├── channels        # Manage channels
│   ├── login
│   ├── logout
│   └── list
│
├── models          # Manage AI models
│   ├── list
│   ├── set
│   └── scan
│
├── agents          # Manage agents
│   ├── list
│   └── new
│
├── skills          # Manage skills
├── plugins         # Manage plugins
├── pairing         # Manage DM pairing requests
│
└── gateway         # Gateway service control
    ├── start
    ├── stop
    └── restart
```

## Config Location

Mặc định config được lưu tại:
- **Unix:** `~/.clawdbot/moltbot.json`
- **Windows:** `%USERPROFILE%\.clawdbot\moltbot.json`

## Output Styling

Moltbot CLI dùng colors để indicate status:
- 🟢 **Green:** Success, active
- 🟡 **Yellow:** Warning, degraded
- 🔴 **Red:** Error, offline, denied
- 🔵 **Blue:** Info, path
- 🟣 **Purple:** AI related
