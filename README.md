Kumar Subrato — Portfolio

Quick start

- Edit `data.js` to replace placeholder texts, skills, projects and contact info.
- Replace `assets/avatar.svg` with your real photo (same filename or update `data.js`).

Local preview (simple):

```bash
# From this folder
# 1. Start a simple HTTP server (Python 3)
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Deploy to GitHub Pages (free, recommended)

1. Create a GitHub repo named `kumar-subrato` (or any name). If you want the URL to be `https://<your-github-username>.github.io/kumar-subrato` name the repo `kumar-subrato`.
2. Push these files to the `main` branch:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/kumar-subrato.git
git push -u origin main
```

3. On GitHub, go to Settings → Pages, choose branch `main` and folder `/(root)`, save. The site will publish at `https://YOUR_USERNAME.github.io/kumar-subrato` (no login required for visitors).

Alternative hosts (also free subdomain): Netlify (`*.netlify.app`) or Vercel (`*.vercel.app`). Both support drag & drop or direct GitHub import.

Notes

- To match your Stitch design exactly, upload screenshots and assets; I will update styles to match precise colors & spacing.
- For quick edits later, modify `data.js` only — content will update automatically.
