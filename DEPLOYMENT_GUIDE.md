# 🚀 Complete Guide: Deploying React + Vite Apps on GitHub Pages

A step-by-step guide to deploy your React (Vite) application to GitHub Pages for free hosting.

---

## Prerequisites

- Node.js installed
- Git installed
- A GitHub account
- A React + Vite project

---

## Step 1: Install gh-pages Package

```bash
npm install gh-pages --save-dev
```

---

## Step 2: Configure vite.config.js

Add the `base` property matching your repository name:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/",  // ← Your GitHub repo name with slashes
});
```

> ⚠️ **Important**: The `base` must match your repository name exactly, with leading and trailing slashes.

---

## Step 3: Update package.json

Add `homepage` and deployment scripts:

```json
{
  "name": "your-app-name",
  "homepage": "https://your-username.github.io/your-repo-name/",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Explanation:
| Field | Purpose |
|-------|---------|
| `homepage` | Tells the app its public URL |
| `predeploy` | Automatically runs before deploy (builds the app) |
| `deploy` | Pushes the `dist` folder to `gh-pages` branch |

---

## Step 4: Initialize Git & Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/your-username/your-repo-name.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 5: Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:
1. Build your app (`npm run build`)
2. Create/update the `gh-pages` branch
3. Push the `dist` folder contents to that branch

---

## Step 6: Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in sidebar)
3. Under **"Build and deployment"**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages` and `/ (root)`
4. Click **Save**

![GitHub Pages Settings](https://docs.github.com/assets/cb-48779/mw-1440/images/help/pages/publishing-source-drop-down.webp)

---

## Step 7: Wait & Access Your Site

- Wait 1-5 minutes for GitHub to deploy
- Your app will be live at: `https://your-username.github.io/your-repo-name/`

---

## 🔄 Updating Your Deployed App

After making changes, simply run:

```bash
git add .
git commit -m "Your update message"
git push origin main
npm run deploy
```

---

## 🐛 Troubleshooting

### 404 Error on Page Load

**Cause**: GitHub Pages not configured correctly

**Fix**:
1. Ensure `gh-pages` branch exists: `git fetch origin gh-pages`
2. Check GitHub Settings → Pages → Source is set to `gh-pages`
3. Verify `base` in `vite.config.js` has trailing slash

### Blank Page / Assets Not Loading

**Cause**: Incorrect `base` path

**Fix**: Ensure `base` in `vite.config.js` matches your repo name exactly:
```javascript
base: "/your-repo-name/",  // NOT "your-repo-name" or "/your-repo-name"
```

### Routes Not Working (React Router)

**Cause**: GitHub Pages doesn't handle client-side routing

**Fix**: Use `HashRouter` instead of `BrowserRouter`:
```jsx
import { HashRouter } from 'react-router-dom';

<HashRouter>
  <App />
</HashRouter>
```

Or add a `404.html` redirect (advanced).

### Changes Not Reflecting

**Fix**:
1. Clear browser cache (Ctrl+Shift+R)
2. Wait a few minutes for GitHub CDN to update
3. Check if `npm run deploy` completed without errors

---

## 📋 Quick Reference Checklist

```
□ Install gh-pages: npm install gh-pages --save-dev
□ Set base in vite.config.js: base: "/repo-name/"
□ Add homepage in package.json
□ Add predeploy and deploy scripts
□ Push code to GitHub
□ Run: npm run deploy
□ Configure GitHub Settings → Pages → Source: gh-pages
□ Wait 1-5 minutes
□ Visit: https://username.github.io/repo-name/
```

---

## 📁 Example Configuration Files

### vite.config.js
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/my-react-app/",
});
```

### package.json
```json
{
  "name": "my-react-app",
  "private": true,
  "version": "1.0.0",
  "homepage": "https://myusername.github.io/my-react-app/",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "gh-pages": "^6.0.0",
    "vite": "^5.0.0"
  }
}
```

---

## 🎉 Success!

Your React app is now live on GitHub Pages! Share the link:

```
https://your-username.github.io/your-repo-name/
```

---

*Guide created for React + Vite projects. For Create React App (CRA), the build folder is `build` instead of `dist`.*
