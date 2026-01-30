---
sidebar_position: 3
title: Sandboxing & Security
description: Cơ chế cách ly Sandbox bảo vệ hệ thống của Moltbot. Chạy AI Agents trong môi trường an toàn, ngăn chặn lệnh độc hại và bảo vệ dữ liệu.
keywords: [moltbot sandbox, ai agent security, container isolation, bảo mật bot, docker sandbox]
---

# Sandboxing & Security

Cơ chế cách ly agents để đảm bảo an toàn cho host machine.

## Isolation Levels

### 1. `off` (Default for Local)
- Agent chạy process trực tiếp trên host.
- **Risk:** Agent có thể `rm -rf /` hoặc đọc mọi file.
- **Use case:** Personal laptop, trusted developer.

### 2. `non-main` (Mixed)
- **Main Agent:** Chạy trên host (Full quyền).
- **Secondary Agents:** Chạy trong Sandbox (Docker).
- **Use case:** Bạn muốn bot chính mạnh mẽ, nhưng test bot phụ an toàn.

### 3. `all` (Paranoid)
- Mọi agent đều chạy trong Sandbox.
- **Use case:** Public bots, shared servers, executing untrusted code.

## Configuration

```json5
// moltbot.json5
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "all",      // off | non-main | all
        "scope": "session"  // session | agent
      }
    }
  }
}
```

## Scope Types

- **`session`**: Mỗi cuộc hội thoại (session) tạo một container mới. Xong việc là xóa sạch. Cực an toàn nhưng khởi động chậm hơn.
- **`agent`**: Một container cho mỗi Agent, tái sử dụng cho nhiều users. Nhanh hơn nhưng kém secure hơn giữa các users.

## Workspace Access

Sandbox container access file như thế nào?

```json5
{
  "sandbox": {
    "workspaceAccess": "rw" // none | ro | rw
  }
}
```

- **`none`**: Agent chỉ thấy file trong container `/tmp`.
- **`ro` (Read-only)**: Mount workspace vào container chế độ đọc.
- **`rw` (Read-write)**: Agent có thể sửa file trong workspace host.

## Tool Policies

Trong Sandbox, một số tools bị hạn chế:

| Tool | Sandbox Behavior | Override |
|------|------------------|----------|
| `exec` | Chạy trong container | `tools.elevated` |
| `read_file` | Chỉ đọc trong mount | `tools.fs.allowHost` |
| `write_file` | Chỉ ghi nếu mode=rw | - |
| `browser` | Chạy headless browser trong container | `tools.browser.host` |

:::warning
Việc enable `tools.elevated` cho agent trong sandbox sẽ phá vỡ mục đích bảo mật!
:::
