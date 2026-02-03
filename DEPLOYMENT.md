# Quick Deployment Guide

## 5-Minute VPS Deployment

### Prerequisites
- VPS with Ubuntu 20.04+
- Domain name (DNS already configured)
- GitHub account with repo access

### Step 1: SSH into VPS

```bash
ssh ubuntu@your.vps.ip
```

### Step 2: Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo usermod -aG docker $USER
exit  # Reconnect for group to take effect
```

### Step 3: Clone & Setup

```bash
cd ~
git clone https://github.com/maxencelegendre/portfolio.git
cd portfolio
```

### Step 4: Manual Deploy (First Time)

```bash
# Build image
docker build -t portfolio .

# Run containers
DOMAIN=your-domain.com docker-compose up -d

# Check status
docker-compose ps
docker-compose logs caddy

# Test
curl https://your-domain.com
```

### Step 5: Setup GitHub Auto-Deploy

1. Generate SSH key on VPS:
```bash
ssh-keygen -t ed25519 -C "github-actions@portfolio" -f ~/.ssh/deploy_key -N ""
cat ~/.ssh/deploy_key
```

2. Add as GitHub Secret `VPS_SSH_KEY` (full private key content)

3. Add other required secrets to GitHub:
   - `VPS_HOST`: your.vps.ip
   - `VPS_USER`: ubuntu (or deploy user)
   - `VPS_PORT`: 22
   - `DOMAIN`: your-domain.com

4. Push to main branch:
```bash
git push origin main
```

5. Monitor deployment in GitHub Actions tab

### Verify Deployment

```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f

# Test endpoint
curl https://your-domain.com

# Check health
curl https://your-domain.com/projects
```

### Troubleshooting

**502 Bad Gateway:**
```bash
docker-compose restart portfolio
docker-compose exec -T caddy caddy reload
```

**Certificate issue:**
```bash
# Let's Encrypt might be rate-limited
# Wait 1 hour and retry, or manually touch domain:
docker-compose down
docker-compose up -d
```

**SSH key permission error:**
```bash
chmod 600 ~/.ssh/deploy_key
chmod 700 ~/.ssh
```

---

## Next Steps

1. **Monitor:** Set up simple uptime monitoring
2. **Logs:** Check Caddy logs weekly: `docker-compose logs caddy`
3. **Updates:** Update content via Git push (auto-deploys via GitHub Actions)

---

**Done!** Your portfolio is now live at https://your-domain.com
