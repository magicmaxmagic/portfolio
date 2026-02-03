# Portfolio – Maxence Le Gendre

Professional portfolio website for Applied Data Scientist / ML Engineer. Built with Next.js 14, TypeScript, Tailwind CSS, and MDX for project case studies.

**Live:** https://maxencelegendre.com

---

## Overview

A clean, production-ready portfolio website showcasing:
- 4 detailed project case studies (Marketing Attribution, Medical NLP, Text Clustering, SaaS)
- Professional narrative and tech stack documentation
- Fast, accessible, SEO-optimized
- Single-click deployment to VPS via GitHub Actions

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- MDX for project content
- Docker + Caddy (reverse proxy, automatic HTTPS)
- GitHub Actions CI/CD

---

## Local Development

### Prerequisites
- Node.js 18+ (check: `node --version`)
- npm 9+ (check: `npm --version`)
- Make (optional, for `make` commands)
- Docker (optional, for `docker-compose`)

### Quick Start

#### Using Makefile (recommended)
```bash
make install    # Install dependencies
make dev        # Start dev server (http://localhost:3000)
```

#### Or use npm directly
```bash
npm ci           # Install dependencies (lock file respected)
npm run dev      # Start development server
```

Development server reloads on file changes. Open [http://localhost:3000](http://localhost:3000).

### Makefile Commands

**Development:**
```bash
make dev         # Start dev server
make build       # Build for production
make start       # Start production server
```

**Quality Checks:**
```bash
make lint        # ESLint
make typecheck   # TypeScript type checking
make format      # Prettier code formatting
make check       # All checks combined
```

**Docker:**
```bash
make docker-build   # Build Docker image
make docker-run     # Run with docker-compose
make docker-stop    # Stop containers
make docker-logs    # View logs
```

**Cleanup:**
```bash
make clean       # Remove node_modules, .next, build artifacts
```

### Project Structure

```
portfolio/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page
│   ├── projects/
│   │   ├── page.tsx         # Projects index
│   │   └── [slug]/page.tsx  # Project detail (dynamic)
│   ├── about/page.tsx       # About page
│   ├── stack/page.tsx       # Tech stack
│   ├── contact/page.tsx     # Contact page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   └── not-found.tsx        # 404 page
├── components/              # Reusable React components
│   ├── layout/             # Header, Footer, Container
│   ├── project/            # ProjectCard, ProjectMeta, ProjectNav
│   └── mdx/                # MDX rendering components
├── content/projects/        # MDX project files
│   ├── ubisoft-attribution-mmm.mdx
│   ├── medical-ner-medmentions.mdx
│   ├── text-clustering-voc.mdx
│   └── prevent-saas-vuln-detection.mdx
├── lib/                    # Utilities
│   └── projects.ts         # MDX loading + project indexing
├── public/                 # Static assets
├── Dockerfile              # Multi-stage build
├── docker-compose.yml      # Docker Compose configuration
├── Caddyfile              # Caddy reverse proxy config
├── Makefile               # Development shortcuts
└── README.md              # This file
```

---

## Adding a New Project

### 1. Create MDX File

Create `content/projects/your-project-slug.mdx`:

```yaml
---
title: "Project Title"
summary: "Short description (1-2 sentences)"
date: "2025-02-15"
role: "Your Role"
tags:
  - "Tag1"
  - "Tag2"
stack:
  - "Tool1"
  - "Tool2"
metrics:
  - "Key result 1"
  - "Key result 2"
featured: true              # Show on home page
featuredOrder: 1            # Featured sort order (lower = first)
---

## Section Heading

Your MDX content here. Use standard Markdown + React components.
```

### 2. Metadata Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Project title |
| `summary` | string | Yes | 1-2 sentence summary |
| `slug` | derived | No | Auto-derived from filename |
| `date` | ISO 8601 | Yes | YYYY-MM-DD format |
| `role` | string | Yes | Your role on project |
| `tags` | string[] | No | Topic tags for filtering |
| `stack` | string[] | No | Tech stack list |
| `metrics` | string[] | No | Business/technical results |
| `featured` | boolean | No | Default: false |
| `featuredOrder` | number | No | Default: 999 |

### 3. URL Generation

The project URL is auto-derived from the filename:
- File: `content/projects/my-awesome-project.mdx`
- URL: `/projects/my-awesome-project`

No manual slug declaration needed.

### 4. Total Time: < 5 minutes
1. Copy template
2. Fill in frontmatter (1 min)
3. Write MDX content (3 min)
4. Save → Site auto-discovers project

---

## Docker & HTTPS (Caddy)

### Architecture

```
Internet (80, 443)
    ↓
Caddy (reverse proxy, auto HTTPS via Let's Encrypt)
    ↓
Next.js (internal network, port 3000, not exposed)
```

**Security:** Only ports 80 and 443 are exposed publicly. Next.js is isolated on internal Docker network.

### Local Docker Testing

```bash
# Build and run locally
make docker-build
make docker-run

# View logs
make docker-logs

# Stop
make docker-stop
```

**Access:** http://localhost (Caddy listens on port 80 locally without HTTPS)

### Production Deployment

Caddy automatically:
- Obtains Let's Encrypt certificate
- Handles HTTPS renewal
- Redirects HTTP → HTTPS
- Forwards traffic to Next.js on internal network

Configuration via `Caddyfile`:
```
{$DOMAIN} {
    reverse_proxy portfolio:3000
    # Auto HTTPS, auto renewal
}
```

Domain is passed via `DOMAIN` environment variable in `docker-compose.yml`.

---

## VPS Setup Checklist

### 1. Server Prerequisites

- Ubuntu 20.04 or newer
- 2+ GB RAM, 1+ vCPU
- Public IP address
- Domain name (DNS pointing to server)

### 2. Install Docker & Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version
```

### 3. Clone Repository

```bash
cd ~
git clone https://github.com/maxencelegendre/portfolio.git
cd portfolio
```

### 4. Configure Environment

Create `.env` file:
```bash
DOMAIN=maxencelegendre.com
SITE_URL=https://maxencelegendre.com
NODE_ENV=production
```

### 5. Start Services

```bash
DOMAIN=maxencelegendre.com docker-compose up -d
```

Verify:
```bash
docker-compose logs -f caddy
curl https://maxencelegendre.com
```

### 6. Auto-Restart on Reboot

Docker Compose services have `restart: unless-stopped`, so they auto-start after server reboots.

---

## CI/CD Pipeline (GitHub Actions)

### Workflow: `.github/workflows/deploy.yml`

**Triggered on:** `push` to `main` branch

**Steps:**
1. ✓ Checkout code
2. ✓ Setup Node.js 18
3. ✓ npm ci (respect lock file)
4. ✓ Lint (ESLint)
5. ✓ Typecheck (TypeScript)
6. ✓ Build (Next.js)
7. ✓ Build Docker image
8. ✓ Push to GitHub Container Registry (ghcr.io)
9. ✓ Deploy via SSH to VPS
10. ✓ Health check

### Required Secrets

Add these GitHub Secrets in: Settings → Secrets and variables → Actions

```
VPS_HOST          = your.vps.ip.or.domain (e.g., 192.168.1.1)
VPS_USER          = deploy user (e.g., ubuntu)
VPS_SSH_KEY       = SSH private key (multiline)
VPS_PORT          = SSH port (usually 22)
DOMAIN            = domain name (e.g., maxencelegendre.com)
GITHUB_TOKEN      = Auto-provided by GitHub
```

### Setup Instructions

#### 1. Create Deploy User on VPS
```bash
sudo adduser deploy
sudo usermod -aG docker deploy
```

#### 2. Generate SSH Key
```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions@portfolio" -f deploy_key -N ""

# Add public key to VPS
ssh-copy-id -i deploy_key.pub deploy@your.vps.ip

# Copy private key content and add as `VPS_SSH_KEY` GitHub Secret
cat deploy_key | pbcopy  # macOS
# or
cat deploy_key          # Linux, copy manually
```

#### 3. Add Secrets to GitHub
- Go to repo Settings → Secrets and variables → Actions → New repository secret
- Add each secret from the table above

#### 4. Test Deployment
```bash
git push origin main
```

Monitor workflow in GitHub Actions tab. Should see:
- ✓ All checks pass
- ✓ Docker image built and pushed
- ✓ SSH deploy runs
- ✓ Health check passes

---

## Troubleshooting

### Local Development

**Problem:** npm install fails
```bash
# Solution: clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm ci
```

**Problem:** Port 3000 already in use
```bash
# Solution: use different port
PORT=3001 npm run dev
```

**Problem:** TypeScript errors in IDE but build succeeds
```bash
# Solution: restart TypeScript server
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Docker & VPS

**Problem:** Docker containers won't start
```bash
# Check logs
docker-compose logs portfolio caddy

# Check resources
docker system df

# Rebuild and retry
docker-compose down
docker-compose up -d
```

**Problem:** Site returns 502 Bad Gateway
```bash
# Caddy can't reach Next.js
docker-compose exec -T caddy cat /etc/caddy/Caddyfile

# Check Next.js is running
docker-compose ps

# Restart
docker-compose restart portfolio
docker-compose exec -T caddy caddy reload
```

**Problem:** HTTPS certificate not working
```bash
# Let's Encrypt rate limited (wait 1 hour)
# Or check domain DNS: dig maxencelegendre.com

# Force renewal
docker-compose exec -T caddy caddy reload -c /etc/caddy/Caddyfile
```

**Problem:** Deployment workflow fails
- Check GitHub Actions log
- Verify all secrets are set correctly
- Ensure SSH key has correct permissions (600)
- Test SSH manually: `ssh -i deploy_key deploy@your.vps.ip`

### Content & MDX

**Problem:** Project not showing up
- Check filename: `content/projects/slug-name.mdx` (kebab-case)
- Check frontmatter YAML format (colon-space syntax)
- Rebuild: `npm run build`

**Problem:** MDX component not rendering
- Check `components/mdx/components.ts` has the component
- Check capitalization (React components must be PascalCase)
- Check import in MDX matches export

---

## Performance & SEO

### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

### Optimization Tips

1. **Images:** Optimize and use WebP format
2. **Fonts:** System font stack (no web fonts loading delay)
3. **JavaScript:** Minimal; server components by default
4. **Metadata:** Auto-generated per page

### SEO Implementation

- ✓ Metadata tags (title, description, OG image)
- ✓ Sitemap: Auto-generated from routes (`next-sitemap` optional)
- ✓ Robots.txt: Allow all
- ✓ Structured data: JSON-LD for articles (projects)
- ✓ Canonical tags: Prevent duplication

---

## Production Checklist

Before deploying to production:

- [ ] Update `SITE_URL` and `DOMAIN` in `.env`
- [ ] Set up SSH keys and GitHub Secrets
- [ ] DNS points to VPS
- [ ] VPS has Docker and Docker Compose installed
- [ ] First deploy: `docker-compose up -d` to test
- [ ] Health check passes: `curl https://yourdomain.com`
- [ ] Caddy logs show no errors: `docker-compose logs caddy`
- [ ] Monitor logs after push: `docker-compose logs -f`

---

## File Reference

### Key Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js config (standalone output, image optimization) |
| `tailwind.config.ts` | Tailwind CSS theme |
| `tsconfig.json` | TypeScript strict mode config |
| `Dockerfile` | Multi-stage build for production |
| `docker-compose.yml` | Caddy + Next.js orchestration |
| `Caddyfile` | Reverse proxy config, auto HTTPS |
| `.github/workflows/deploy.yml` | CI/CD pipeline |
| `Makefile` | Development shortcuts |

---

## Maintenance

### Weekly
- Monitor uptime (simple curl check)
- Review GitHub Actions logs if deployment fails

### Monthly
- Update dependencies: `npm update`
- Check Lighthouse score
- Review Caddy logs for errors

### Quarterly
- Update Node.js version in Dockerfile
- Review and update content

---

## License

MIT

---

## Contact

For questions or issues:
- GitHub Issues: [Open an issue](https://github.com/maxencelegendre/portfolio/issues)
- Email: maxence@example.com

---

**Last Updated:** February 2026
