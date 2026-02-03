# Plausible Analytics Setup

## Status
✅ **Installed** - Plausible is integrated in your portfolio

**Script ID:** `pa-X9mUB_Zk65YApLvjhEeyv`

**Dashboard:** https://plausible.io/maxencelegendre.com

---

## Features

### Automatic Tracking
- ✅ Page views
- ✅ Bounce rate
- ✅ Session duration
- ✅ Geographic data
- ✅ Browser/device stats

### Optional Measurements (Available)

#### 1. Outbound Links
Automatically track clicks to external links:
```javascript
plausible("link", { props: { url: "https://external-site.com" } })
```

#### 2. File Downloads
Track file downloads:
```javascript
plausible("file_download", { props: { file: "document.pdf" } })
```

#### 3. Form Submissions
Track contact form submissions:
```javascript
plausible("form_submit", { props: { form_name: "contact" } })
```

---

## Implementation in Portfolio

### Contact Form Tracking
Add to your contact form submit handler:
```typescript
// On form submission
plausible("contact_form", { 
  props: { 
    source: location.pathname,
    success: response.ok 
  } 
})
```

### Project View Tracking
Add to project detail page:
```typescript
plausible("project_view", { 
  props: { 
    project: project.slug 
  } 
})
```

---

## Dashboard Access

1. Go to https://plausible.io
2. Login to your account
3. Select your site: `maxencelegendre.com`
4. View stats in real-time

---

## Privacy

Plausible is **privacy-focused**:
- ✅ No cookies
- ✅ No personal data collection
- ✅ Compliant with GDPR/CCPA
- ✅ No tracking across sites

---

## Configuration

Script location: [app/layout.tsx](app/layout.tsx#L48)

Plausible config enables:
- Automatic outbound link tracking
- Goal tracking for custom events
- 30-day retention
