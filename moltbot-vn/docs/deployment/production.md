---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# 🏭 Production Deployment

Hướng dẫn triển khai Moltbot **chuẩn Enterprise** với tiêu chí: **High Availability (HA)**, **Security Hardening**, và **Monitoring** toàn diện.

## 🏗️ Tổng quan kiến trúc

Sơ đồ kiến trúc khuyến nghị cho hệ thống Production:

```mermaid
graph TD
    User[User / Internet] -->|HTTPS/443| Nginx[Nginx Reverse Proxy]
    Nginx -->|Rate Limited| Gateway[Moltbot Gateway :18789]
    Gateway -->|Cache| Redis[Redis]
    Gateway -->|Persist| PG[PostgreSQL]
    Gateway -->|Auto-Restart| PM2[PM2 Process Manager]
```

## 🚀 Lựa chọn phương án

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card shadow--md h-100">
      <div className="card__header">
        <h3>💻 VPS + Docker (Khuyên dùng)</h3>
      </div>
      <div className="card__body">
        <ul>
            <li><strong>Độ phức tạp:</strong> Trung bình</li>
            <li><strong>Chi phí:</strong> Thấp ($5-10/tháng)</li>
            <li><strong>Kiểm soát:</strong> 100%</li>
        </ul>
        <p>Cân bằng tốt nhất giữa hiệu năng và dễ quản lý. Dùng Docker Compose để điều phối dịch vụ.</p>
      </div>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card shadow--md h-100">
      <div className="card__header">
        <h3>☸️ Kubernetes (K8s)</h3>
      </div>
      <div className="card__body">
        <ul>
            <li><strong>Độ phức tạp:</strong> Cao</li>
            <li><strong>Quy mô:</strong> Không giới hạn</li>
        </ul>
        <p>Dành cho enterprise deployment với yêu cầu auto-scaling phức tạp.</p>
      </div>
    </div>
  </div>
</div>

---

## Thiết lập VPS (Ubuntu 22.04)

### 1. Chọn nhà cung cấp VPS

<Tabs groupId="vps-provider">
  <TabItem value="vn" label="🇻🇳 Local (VN)" default>
    <ul>
      <li><strong>VNG Cloud</strong>: Ổn định, support tốt.</li>
      <li><strong>VNPT Cloud</strong>: Hạ tầng mạnh.</li>
      <li><strong>Viettel IDC</strong>: Chuẩn Tier 3.</li>
    </ul>
  </TabItem>
  <TabItem value="global" label="🌍 Quốc tế">
    <ul>
      <li><strong>Hetzner</strong>: ~€6/tháng (4GB RAM) - <em>Best Value</em></li>
      <li><strong>DigitalOcean</strong>: $6/tháng (1GB RAM)</li>
      <li><strong>Vultr</strong>: $6/tháng (1GB RAM)</li>
      <li><strong>AWS Lightsail</strong>: $5/tháng (1GB RAM)</li>
    </ul>
  </TabItem>
</Tabs>

### 2. Thiết lập máy chủ ban đầu

```bash
# SSH vào server
ssh root@your-server-ip

# Cập nhật hệ thống
apt-get update && apt-get upgrade -y

# Tạo user moltbot (bảo mật hơn root)
useradd -m -s /bin/bash moltbot
usermod -aG sudo moltbot

# Đặt mật khẩu
passwd moltbot

# Chuyển sang user moltbot
su - moltbot
```

### 3. Cài đặt các gói phụ thuộc

```bash
# Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Docker (Tùy chọn nhưng khuyên dùng)
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# PM2 (Process Manager)
sudo npm install -g pm2

# Nginx (Web Server)
sudo apt-get install -y nginx

# Kiểm tra version
node --version  # v22.x.x
npm --version   # 10.x.x
pm2 --version
nginx -v
```

### 4. Cài đặt Moltbot

<Tabs groupId="install-method">
  <TabItem value="npm" label="NPM Global" default>
    ```bash
    npm install -g moltbot@latest
    ```
  </TabItem>
  <TabItem value="source" label="Từ Source Code">
    ```bash
    git clone https://github.com/moltbot/moltbot.git
    cd moltbot
    npm install
    npm run build
    ```
  </TabItem>
</Tabs>

### 5. Thiết lập ban đầu (Onboarding)

```bash
moltbot onboard --install-daemon

# Làm theo hướng dẫn:
# - Gateway mode: local
# - API keys
# - Key channels setup
```

---

## Quản lý tiến trình với PM2

<Admonition type="info" title="Tại sao dùng PM2?">
  <ul>
    <li>✅ Tự khởi động lại khi crash</li>
    <li>✅ Giám sát tài nguyên (CPU/RAM)</li>
    <li>✅ Quản lý Log tập trung</li>
    <li>✅ Chế độ Cluster (tận dụng đa nhân)</li>
  </ul>
</Admonition>

### Cấu hình PM2

Tạo file `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'moltbot-gateway',
    script: 'moltbot',
    args: 'gateway --port 18789',
    instances: 1,
    exec_mode: 'fork',
    
    // Restart behavior
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 5000,
    
    // Logs
    error_file: '/var/log/moltbot/error.log',
    out_file: '/var/log/moltbot/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Environment
    env: {
      NODE_ENV: 'production',
      TZ: 'Asia/Ho_Chi_Minh'
    },
    
    // Resources
    max_memory_restart: '2G',
    
    // Health check
    listen_timeout: 10000,
    kill_timeout: 5000
  }]
};
```

### Khởi chạy với PM2

```bash
# Tạo thư mục log
sudo mkdir -p /var/log/moltbot
sudo chown moltbot:moltbot /var/log/moltbot

# Start
pm2 start ecosystem.config.js

# Kiểm tra trạng thái
pm2 status
pm2 logs moltbot-gateway
```

### Tự khởi động cùng hệ thống

```bash
# Tạo startup script
pm2 startup

# Lưu danh sách process hiện tại
pm2 save
```

---

## Nginx Reverse Proxy

<Admonition type="tip" title="Lợi ích của Nginx">
  <ul>
    <li>Bảo mật SSL/TLS termination</li>
    <li>Rate limiting (chống spam/DDoS đơn giản)</li>
    <li>Load balancing (nếu chạy nhiều instance)</li>
    <li>Phục vụ file tĩnh cực nhanh</li>
  </ul>
</Admonition>

### Cấu hình

File: `/etc/nginx/sites-available/moltbot`

```nginx
# Upstream (backend)
upstream moltbot_gateway {
    server 127.0.0.1:18789 fail_timeout=30s max_fails=3;
    keepalive 64;
}

# Rate limiting zones
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/s;

# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name moltbot.yourdomain.com;
    
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name moltbot.yourdomain.com;

    # SSL certificates (Let's Encrypt will managed these paths)
    ssl_certificate /etc/letsencrypt/live/moltbot.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/moltbot.yourdomain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # WebSocket proxy (Quan trọng cho Real-time)
    location / {
        proxy_pass http://moltbot_gateway;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

### Kích hoạt & Cài đặt SSL

```bash
# Link file cấu hình
sudo ln -s /etc/nginx/sites-available/moltbot /etc/nginx/sites-enabled/

# Kiểm tra config
sudo nginx -t
sudo systemctl reload nginx

# Cài đặt SSL (Certbot)
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d moltbot.yourdomain.com
```

---

## Thiết lập Database (PostgreSQL)

Dành cho nhu cầu lưu trữ persistent lâu dài và ổn định hơn SQLite mặc định.

```bash
# Cài đặt PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Tạo DB & User
sudo -u postgres psql
```

```sql
CREATE DATABASE moltbot;
CREATE USER moltbot WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE moltbot TO moltbot;
\q
```

**Cấu hình Moltbot (`config.json`):**
```json
{
  "database": {
    "type": "postgresql",
    "url": "postgresql://moltbot:password@localhost:5432/moltbot"
  }
}
```

---

## Sao lưu (Backup)

### Script sao lưu tự động

File: `/home/moltbot/backup.sh`

```bash
#!/bin/bash
BACKUP_DIR="/backups/moltbot"
DATE=$(date +%Y%m%d_%H%M%S)

# Tạo thư mục
mkdir -p $BACKUP_DIR

# Backup
tar -czf $BACKUP_DIR/config-$DATE.tar.gz ~/.clawdbot/
pg_dump -U moltbot moltbot | gzip > $BACKUP_DIR/db-$DATE.sql.gz

# Xóa backup cũ > 30 ngày
find $BACKUP_DIR -type f -mtime +30 -delete
```

Thêm vào Crontab (`crontab -e`) để chạy 2h sáng hàng ngày:
```bash
0 2 * * * /home/moltbot/backup.sh >> /var/log/moltbot/backup.log 2>&1
```

---

## Tăng cường bảo mật

### Tường lửa (UFW)

```bash
sudo ufw enable
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
# KHÔNG mở port 18789 ra public
```

### Fail2Ban

Cài đặt để chống brute-force attack:
```bash
sudo apt-get install -y fail2ban
```

---

## Checklist chuẩn bị Production

- [ ] VPS đã sẵn sàng & SSH Key configured
- [ ] Domain trỏ về IP server
- [ ] SSL certificate (HTTPS) active
- [ ] Database (PostgreSQL) configured
- [ ] Moltbot chạy dưới PM2 (Auto-restart)
- [ ] Nginx làm Reverse Proxy
- [ ] Firewall (UFW) bật
- [ ] Backup script hoạt động

---

## Tài liệu tham khảo

- [Docker Installation](/docs/installation/docker)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
