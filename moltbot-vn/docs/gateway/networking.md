---
sidebar_position: 2
title: Networking (Tailscale & mDNS)
description: Cấu hình mạng nâng cao cho Moltbot. Truy cập từ xa an toàn qua Tailscale VPN và tự động tìm kiếm local qua Bonjour (mDNS).
keywords: [moltbot networking, tailscale remote access, mdns discovery, truy cập bot từ xa, secure vpn]
---

# Networking (Tailscale & Bonjour)

Moltbot hỗ trợ kết nối mạng nâng cao để access Gateway từ xa dễ dàng.

## Tailscale Integration

Đây là tính năng **mạnh mẽ nhất** của Moltbot Gateway. Nó cho phép bạn kết nối an toàn từ bất cứ đâu mà không cần public IP hay mở port router.

### 1. `serve` Mode (Private VPN)

Gateway chỉ access được trong mạng Tailnet của bạn.

```json5
// moltbot.json5
{
  "tailscale": {
    "mode": "serve"
  }
}
```

- **URL:** `http://hostname.tailnet-name.ts.net:18789`
- **Security:** Rất cao. Chỉ devices đã auth vào Tailscale mới truy cập được.
- **Usage:** Dùng cho team nội bộ hoặc personal use.

### 2. `funnel` Mode (Public Internet)

Expose Gateway ra public internet qua Tailscale Funnel.

```json5
{
  "tailscale": {
    "mode": "funnel",
    "funnel": {
      "port": 443
    }
  }
}
```

- **URL:** `https://hostname.tailnet-name.ts.net` (Public)
- **Security:** BẮT BUỘC dùng mật khẩu Gateway (`gateway.auth.mode: "password"`).
- **Usage:** Webhooks (Zalo, Telegram) hoặc public demo.

### 3. Auth Integration

Khi dùng Tailscale, Moltbot có thể tự động nhận diện user:

```json5
{
  "gateway": {
    "auth": {
      "allowTailscale": true
    }
  }
}
```
User login vào Tailscale sẽ tự động bypass auth check của Gateway (SSO).

---

## Bonjour (mDNS) Discovery

Tự động tìm Gateway trong mạng LAN.

```json5
{
  "discovery": {
    "mdns": {
      "enabled": true,
      "name": "moltbot-home"
    }
  }
}
```

- **Access:** `http://moltbot-home.local:18789`
- **Clients:** Mac App và CLI sẽ tự động tìm thấy Gateway này ("Zero Config").

---

## Network Architecture Recommendation

| Environment | Config | Why? |
|-------------|--------|------|
| **Home/Office** | `mdns: true` | Tiện lợi cho local devices |
| **VPS/Cloud** | `tailscale: serve` | Secure access từ laptop dev |
| **Production** | Reverse Proxy (Nginx) | Performance & Standard SSL |
