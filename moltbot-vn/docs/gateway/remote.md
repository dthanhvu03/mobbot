---
sidebar_position: 4
title: Truy cập từ xa (Remote)
description: Hướng dẫn điều khiển Moltbot Gateway từ xa. Setup mô hình Client-Server, kết nối laptop với Home Server qua WebSocket an toàn.
keywords: [moltbot remote access, điều khiển ai từ xa, client-server architecture, websocket secure control, home server bot]
---

# Remote Access

Điều khiển Gateway từ xa bằng CLI hoặc UI.

## The Concept

Thay vì chạy Moltbot trên laptop (tốn pin, nóng máy), bạn chạy nó trên một **VPS** hoặc **Home Server** mạnh mẽ. Laptop của bạn chỉ đóng vai trò là **Remote Controller**.

```mermaid
graph LR
    Laptop[Laptop (CLI/UI)] -->|WebSocket (Secure)| Server[Home Server (Gateway)]
    Server -->|Run| Agent1[Agent]
    Server -->|Run| Agent2[Agent]
```

## Setup Server

1. **Install Moltbot** trên server.
2. **Start Gateway:** `moltbot gateway start`
3. **Get Token:**
   ```bash
   moltbot gateway status --show-token
   # Output: eyJhbGciOiJIUzI1Ni...
   ```
4. **Expose Port:**
   - Dùng **Tailscale** (Recommended): `100.x.y.z:18789`
   - Hoặc SSH Tunnel: `ssh -L 18789:localhost:18789 user@server`

## Setup Client (Laptop)

Trên laptop của bạn, không cần chạy `moltbot gateway start`.

### 1. One-time Setup
```bash
moltbot setup --remote-url ws://100.x.y.z:18789 --remote-token <your-token>
```
*(Thay IP bằng IP Tailscale hoặc localhost nếu dùng SSH Tunnel)*

### 2. Verify
```bash
moltbot health
```
Output sẽ hiện: `Gateway: Remote (ws://...) ✅`

### 3. Use as Normal
Tất cả commands CLI giờ sẽ chạy trên server:
```bash
moltbot models list   # Lists models on server
moltbot agents list   # Lists agents on server
```

## Web UI Remote

Nếu bạn dùng Web UI (`http://localhost:18789`), bạn có thể trỏ nó tới remote gateway bằng param:

`http://localhost:18789/?gateway=ws://100.x.y.z:18789&token=...`

Tuy nhiên, khuyến khích dùng **Tailscale DNS** để truy cập trực tiếp UI trên server:
`http://moltbot-server.tailnet-name.ts.net:18789`

## Security Best Practices

1. **Never expose port 18789** ra public internet trực tiếp.
2. Luôn dùng **Tailscale** hoặc **VPN**.
3. Nếu phải expose public, bắt buộc dùng **Reverse Proxy (Nginx) + SSL**.
4. Rotate token định kỳ nếu nghi ngờ lộ.
