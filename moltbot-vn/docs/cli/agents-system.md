---
sidebar_position: 4
---

# Agents & System

Quản lý Agents và System operations.

## Agents Management

Moltbot hỗ trợ multi-agent (nhiều nhân cách/vai trò).

### `agents list`

Liệt kê tất cả agents đang cấu hình.

```bash
moltbot agents list
```

Output sẽ hiện: ID, Name, Model, Workspace path.

### `agents new`

Tạo agent mới.

```bash
moltbot agents new <id>
```

**Options:**
- `--name "Name"`: Tên hiển thị
- `--model <model>`: Model riêng cho agent này
- `--clone-from <id>`: Copy cấu hình từ agent khác

### `agents status`

Xem trạng thái hoạt động của các agents (đang chạy task gì, uptime).

---

## System Operations

Các lệnh quản lý Gateway và System internals.

### `gateway`

Control gateway service.

```bash
# Start/Stop service
moltbot gateway start
moltbot gateway stop
moltbot gateway restart

# Xem logs
moltbot gateway logs --follow
```

### `system status`

Xem tổng quan hệ thống.

```bash
moltbot system status --json
```

Return info về: Memory usage, CPU, Active connections, Uptime.

### `system event`

(Advanced) Emit system events để debug hoặc trigger hooks.

```bash
moltbot system event <name> --data '{"foo":"bar"}'
```

### `system vacuum`

Dọn dẹp database và file rác.

```bash
moltbot system vacuum
```
