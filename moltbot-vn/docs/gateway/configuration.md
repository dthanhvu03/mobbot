---
sidebar_position: 1
title: Cấu hình Gateway
description: Tài liệu tham khảo cấu hình Moltbot Gateway. Hướng dẫn file config moltbot.json5, biến môi trường và thiết lập Agent Bindings.
keywords: [moltbot config, cấu hình ai gateway, moltbot.json5 reference, environment variables, agent settings]
---

# Configuration Reference

Tài liệu chi tiết về cấu hình Gateway.

## File Location

Moltbot tìm config file theo thứ tự:
1. `--config <path>` (nếu chạy CLI)
2. `~/.clawdbot/moltbot.json5` (RECOMMENDED - supports comments)
3. `~/.clawdbot/moltbot.json`

## Schema Structure

```json5
{
  // Gateway Settings
  "gateway": {
    "port": 18789,
    "auth": {
      "mode": "token" // or "password"
    }
  },

  // Agent Definitions
  "agents": {
    "defaults": {
      "model": "anthropic/claude-3-5-sonnet-20240620",
      "sandbox": { "mode": "all" }
    },
    "list": [
      { "id": "main", "name": "Main Bot" },
      { "id": "dev", "name": "Dev Helper", "workspace": "~/dev-bot" }
    ],
    // Routing Rules
    "bindings": [
      { "agentId": "dev", "match": { "channel": "github" } }
    ]
  },

  // Channels Config
  "channels": {
    "telegram": {
      "accounts": {
         "bot1": { "token": "..." }
      }
    }
  }
}
```

## Config Includes (`$include`)

Với các setup phức tạp, bạn nên chia nhỏ file config.

**`moltbot.json5`**:
```json5
{
  "gateway": { "port": 18789 },
  "agents": { "$include": "./agents/agents.json5" },
  "channels": { "$include": "./channels/telegram.json5" }
}
```

**Merge Behavior:**
- `$include` string: Thay thế toàn bộ object.
- `$include` array: Merge lần lượt (file sau đè file trước).
- Sibling keys: Đè lên giá trị từ include.

## Environment Variables

Bạn có thể dùng biến môi trường trong config:

```json5
{
  "channels": {
    "telegram": {
      "token": "${TELEGRAM_BOT_TOKEN}"
    }
  }
}
```

**System Envs:**
- `CLAWDBOT_GATEWAY_TOKEN`: Token auth mặc định.
- `CLAWDBOT_LOG_LEVEL`: Đặt log level (`debug`, `info`, `warn`).
- `PORT`: Override gateway port.

## Strict Validation

Moltbot check config rất chặt chẽ khi khởi động.
- Nếu sai schema -> Exit với lỗi chi tiết.
- Không cho phép key thừa (tránh typo).
- Gợi ý sửa lỗi (Did you mean...?).

:::tip
Dùng `moltbot doctor` để validate config mà không cần restart services.
:::
