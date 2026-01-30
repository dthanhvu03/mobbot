---
sidebar_position: 1
sidebar_label: 🐳 Docker
title: Cài đặt Moltbot bằng Docker - Hướng dẫn chi tiết | Moltbot
description: Hướng dẫn cài đặt Moltbot (Clawdbot) bằng Docker và Docker Compose. Cách an toàn và nhanh nhất để chạy AI Agent trên server hoặc local machine.
keywords: [moltbot docker, cài đặt moltbot, docker compose ai agent, self-hosted ai docker]
---

# Docker Installation

Cài đặt Moltbot với **Docker** để isolate và dễ manage hơn.

## Tại sao dùng Docker?

**Advantages:**
- ✅ Clean isolation từ host system
- ✅ Easy updates (pull new image)
- ✅ Reproducible setup
- ✅ Resource limits
- ✅ Easy backup (volumes)

**vs Native install:**
- Native: Faster, less overhead
- Docker: Safer, easier management

---

## Prerequisites

### 1. Install Docker

**Ubuntu/Debian:**
```bash
# Uninstall old versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release

# Add Docker GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify
sudo docker run hello-world
```

**macOS:**
```bash
# Install Docker Desktop
brew install --cask docker

# Or download from: https://www.docker.com/products/docker-desktop
```

**Windows (WSL2):**
1. Install Docker Desktop for Windows
2. Enable WSL2 backend in settings
3. Verify trong WSL terminal:
```bash
docker --version
```

### 2. Add User to Docker Group (Linux)

```bash
sudo usermod -aG docker $USER
# Logout and login lại để apply
```

---

## Quick Start (Docker Compose)

### 1. Create Directory

```bash
mkdir ~/moltbot-docker
cd ~/moltbot-docker
```

### 2. Create docker-compose.yml

```yaml
version: '3.8'

services:
  moltbot:
    image: moltbot/moltbot:latest
    container_name: moltbot
    restart: unless-stopped
    
    # Ports
    ports:
      - "18789:18789"  # Gateway WebSocket
      - "18793:18793"  # Canvas host
    
    # Volumes
    volumes:
      - ./config:/root/.clawdbot:rw
      - ./data:/data:rw
      - ./logs:/logs:rw
    
    # Environment
    environment:
      - NODE_ENV=production
      - TZ=Asia/Ho_Chi_Minh
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - BRAVE_API_KEY=${BRAVE_API_KEY}
    
    # Resources
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          memory: 512M
    
    # Security
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    
    # Health check
    healthcheck:
      test: ["CMD", "moltbot", "health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### 3. Create .env File

```bash
# .env
ANTHROPIC_API_KEY=your_anthropic_key_here
BRAVE_API_KEY=your_brave_key_here
```

### 4. Start Container

```bash
docker compose up -d
```

**Check logs:**
```bash
docker compose logs -f moltbot
```

**Expected:**
```
✅ Moltbot Gateway starting...
✅ Node.js: v22.x.x
✅ Config loaded: /root/.clawdbot/moltbot.json
✅ Gateway listening on ws://0.0.0.0:18789
```

---

## Manual Docker Run

**Without docker-compose:**

```bash
docker run -d \
  --name moltbot \
  --restart unless-stopped \
  -p 18789:18789 \
  -p 18793:18793 \
  -v $(pwd)/config:/root/.clawdbot \
  -v $(pwd)/data:/data \
  -e ANTHROPIC_API_KEY=your_key \
  -e TZ=Asia/Ho_Chi_Minh \
  moltbot/moltbot:latest
```

---

## Configuration

### Initial Setup

**First run - run wizard:**

```bash
docker compose exec moltbot moltbot onboard --install-daemon
```

**Follow prompts:**
1. Choose gateway mode (local/remote)
2. Configure Anthropic API
3. Setup channels (WhatsApp, Telegram...)
4. Install daemon

### Edit Config

**Mount config volume:**
```yaml
volumes:
  - ./config:/root/.clawdbot:rw
```

**Edit on host:**
```bash
vim config/moltbot.json
```

**Restart container:**
```bash
docker compose restart moltbot
```

---

## Persistence

### Volumes Explained

```yaml
volumes:
  # Config files
  - ./config:/root/.clawdbot:rw
    # Contains: moltbot.json, auth tokens
  
  # User data
  - ./data:/data:rw
    # Contains: workspaces, files, databases
  
  # Logs
  - ./logs:/logs:rw
    # Contains: application logs
```

### Backup

```bash
# Stop container
docker compose stop moltbot

# Backup volumes
tar -czf moltbot-backup-$(date +%Y%m%d).tar.gz config/ data/ logs/

# Restart
docker compose start moltbot
```

### Restore

```bash
# Stop container
docker compose stop moltbot

# Extract backup
tar -xzf moltbot-backup-20260130.tar.gz

# Restart
docker compose start moltbot
```

---

## Networking

### Expose to LAN

**Default: localhost only**

For LAN access:

```yaml
services:
  moltbot:
    ports:
      - "0.0.0.0:18789:18789"  # All interfaces
```

:::warning
Chỉ expose LAN nếu:
- Trusted network
- Firewall configured
- Gateway auth enabled
:::

### Reverse Proxy (Nginx)

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name moltbot.local;

    location / {
        proxy_pass http://localhost:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**SSL (Let's Encrypt):**
```bash
certbot --nginx -d moltbot.yourdomain.com
```

---

## Updates

### Update Image

```bash
# Pull latest
docker compose pull moltbot

# Recreate container
docker compose up -d --force-recreate

# Verify
docker compose logs -f moltbot
```

### Version Pinning

**Specify version:**
```yaml
services:
  moltbot:
    image: moltbot/moltbot:1.2.3  # Specific version
```

**Available tags:**
- `latest` - Latest stable
- `1.2.3` - Specific version
- `dev` - Development (unstable)

---

## Multi-Container Setup

### With Redis (for scaling)

```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes

  moltbot:
    image: moltbot/moltbot:latest
    depends_on:
      - redis
    environment:
      - REDIS_URL=redis://redis:6379
    # ... rest of config

volumes:
  redis-data:
```

### With Database (PostgreSQL)

```yaml
services:
  postgres:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: moltbot
      POSTGRES_USER: moltbot
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data

  moltbot:
    depends_on:
      - postgres
    environment:
      - DATABASE_URL=postgresql://moltbot:${DB_PASSWORD}@postgres:5432/moltbot

volumes:
  postgres-data:
```

---

## Resource Management

### CPU Limits

```yaml
deploy:
  resources:
    limits:
      cpus: '2.0'    # Max 2 cores
    reservations:
      cpus: '0.5'    # Reserved
```

### Memory Limits

```yaml
deploy:
  resources:
    limits:
      memory: 2G     # Hard limit
    reservations:
      memory: 512M   # Guaranteed
```

### Disk Limits

```bash
# Create volume with size limit (requires ZFS/Btrfs)
docker volume create --driver local \
  --opt type=tmpfs \
  --opt device=tmpfs \
  --opt o=size=5g \
  moltbot-data
```

---

## Monitoring

### Container Stats

```bash
# Live stats
docker stats moltbot

# Output:
# CONTAINER  CPU %  MEM USAGE / LIMIT  MEM %  NET I/O
# moltbot    15%    512MB / 2GB        25%    1.2MB / 850KB
```

### Logs

```bash
# Tail logs
docker compose logs -f moltbot

# Last 100 lines
docker compose logs --tail=100 moltbot

# Since timestamp
docker compose logs --since "2026-01-30T10:00:00" moltbot
```

### Health Checks

```bash
# Check health
docker inspect --format='{{.State.Health.Status}}' moltbot

# Health history
docker inspect --format='{{json .State.Health}}' moltbot | jq
```

---

## Security

### Run as Non-Root

```dockerfile
# In Dockerfile
RUN useradd -m -s /bin/bash moltbot
USER moltbot
```

```yaml
# In docker-compose.yml
services:
  moltbot:
    user: "1000:1000"  # UID:GID
```

### Read-Only Root FS

```yaml
services:
  moltbot:
    read_only: true
    tmpfs:
      - /tmp
      - /var/run
```

### Security Options

```yaml
security_opt:
  - no-new-privileges:true
  - seccomp=unconfined  # Only if needed
cap_drop:
  - ALL
cap_add:
  - NET_BIND_SERVICE
  - CHOWN
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker compose logs moltbot

# Common issues:
# - Port already in use
# - Invalid config
# - Missing API keys
```

**Fix port conflict:**
```yaml
ports:
  - "18790:18789"  # Use different host port
```

### Out of Memory

```bash
# Check memory usage
docker stats moltbot

# Increase limit
```

```yaml
deploy:
  resources:
    limits:
      memory: 4G  # Increase from 2G
```

### Permission Denied

```bash
# Fix volume permissions
sudo chown -R 1000:1000 config/ data/ logs/

# Or run as root (not recommended)
```

```yaml
services:
  moltbot:
    user: "0:0"  # Root
```

### Network Issues

```bash
# Check container network
docker network inspect moltbot_default

# Recreate network
docker compose down
docker compose up -d
```

---

## Production Checklist

- [ ] Docker installed & configured
- [ ] docker-compose.yml created
- [ ] .env with API keys (not committed to git!)
- [ ] Volumes configured for persistence
- [ ] Resource limits set
- [ ] Health checks enabled
- [ ] Logs rotation configured
- [ ] Backup strategy in place
- [ ] Firewall rules configured
- [ ] SSL/TLS if exposed to internet
- [ ] Monitoring setup (Prometheus/Grafana)
- [ ] Auto-restart enabled

---

## Resources

- [Docker Docs](https://docs.docker.com)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Production Deployment](/docs/deployment/production)

---

_Need help? [Discord #docker](https://discord.gg/moltbot-vn)_
