# How to Update
## 1. Edit the `pages/home.html` File
- Open it in a code editor (e.g., VS Code, Sublime Text).

## 2. Add a New Image Entry 
Inside the `<div class="container">`, insert a new `<img>` or `<video>` tag with the appropriate format:

### **For Images:**
```html
<img loading = "lazy"
        src="link to image, we recommend using a CDN for large files"
        data-desc="asset name; artist name; department"
      />
```

### **For Videos:**
```html
<video preload = "none" 
        src="link to .mp4 video, we recommend using a CDN for large files" 
        data-desc="asset name; artist name; department"
        muted autoplay loop>
      </video>
```

- The **JavaScript** will handle interactions and display automatically.

## 3. Save the File
- Ensure all edits are saved before proceeding to the next step.

---

# Pushing Changes to GitHub

## 1. Open Terminal or Git Bash
Navigate to the project folder using the terminal:
```bash
cd path/to/your/archive-website
```

## 2. Check the Current Status
Run:
```bash
git status
```
This will show any modified or new files.

## 3. Stage the Changes
```bash
git add .
```
Or, if you want to add specific files:
```bash
git add filename.html
```

## 4. Commit the Changes
```bash
git commit -m "Added new image entry to the archive"
```

## 5. Push to GitHub
```bash
git push origin main
```
*(If using a different branch, replace `main` with the correct branch name.)*

## 6. Verify the Update
- Go to the GitHub repository and check if the changes are reflected.
- If the site is hosted via GitHub Pages, wait a few minutes for updates to deploy.

---

**Done!** The new entry should now appear on the website. 
