---
sidebar_position: 3
---

# Models & AI

Quản lý AI models và providers.

## `models list`

Liệt kê tất cả models có sẵn.

```bash
moltbot models list [options]
```

**Options:**
- `--all`: Hiện tất cả models (kể cả chưa config key)
- `--local`: Chỉ hiện local models (Ollama, LM Studio)
- `--provider <name>`: Filter theo provider (e.g. `anthropic`, `openai`)
- `--json`: Output JSON

## `models status`

Kiểm tra trạng thái kết nối tới các providers.

```bash
moltbot models status
```

**Options:**
- `--check`: Kiểm tra expired/missing keys (exit code 1 nếu lỗi)
- `--probe`: Thử gửi request thật để test (tốn token!)

## `models set`

Chọn model chính cho agent mặc định.

```bash
# Set text model
moltbot models set anthropic/claude-3-5-sonnet-20240620

# Set image model (cho vision)
moltbot models set-image openai/gpt-4o
```

## `models scan`

Quét hệ thống để tìm local models (Ollama, Chutes, etc.).

```bash
moltbot models scan
```

**Options:**
- `--set-default`: Tự động set model tìm thấy làm default
- `--provider <name>`: Chỉ scan provider cụ thể

## `models auth`

Quản lý API Keys.

```bash
# Add new key (interactive)
moltbot models auth add

# Quick paste (cho Anthropic)
moltbot models auth paste-token --provider anthropic
```

## Aliases & Fallbacks

**Aliases:**
Đặt tên ngắn cho model dài.
```bash
moltbot models aliases add "sonnet" "anthropic/claude-3-5-sonnet-20240620"
```

**Fallbacks:**
Tự động chuyển model nếu chính bị lỗi.
```bash
moltbot models fallbacks add "openai/gpt-4o"
```
