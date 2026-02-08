# Circle Tool

A visual geometry calculator for circles and chords. Draw a circle, add a chord (line), and instantly see all the computed measurements — distances, angles, arc lengths, areas, and more. Export your diagrams as images or copy the data as JSON/CSV.

## What it does

- **Draw a circle** by entering a diameter
- **Add a chord** (a straight line across the circle) and adjust its length and angle with sliders
- **See live geometry data** — the sidebar shows computed values like sagitta, central angle, arc length, sector area, and segment area, all updating in real time
- **Copy data** — grab the computed measurements as JSON or CSV with a preview before copying
- **Export images** — download your diagram as a JPG (with quality and background color options) or PNG (with transparency support)

## Getting it running on your computer

### Step 1: Install Node.js

Node.js is the program that runs the app on your computer. You only need to do this once.

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the big green button on the left)
3. Open the downloaded file and follow the installer steps
4. When it's done, open your terminal:
   - **Mac**: Open the **Terminal** app (search for "Terminal" in Spotlight, or find it in Applications > Utilities)
   - **Windows**: Open **Command Prompt** (search for "cmd" in the Start menu)
5. Type `node -v` and press Enter. You should see a version number like `v20.19.0`. If you do, you're good to go.

### Step 2: Install pnpm

pnpm is a tool that downloads all the code libraries the app depends on. You only need to do this once.

In your terminal, run:

```
npm install -g pnpm
```

### Step 3: Download the project

You have two options:

**Option A: Download as a ZIP (easiest)**

1. Go to the GitHub page for this project
2. Click the green **Code** button
3. Click **Download ZIP**
4. Unzip the downloaded file — you'll get a folder called `chris-circle-line-tool-main`
5. In your terminal, navigate to that folder:
   - **Mac**: Type `cd ` (with a space after it), then drag the folder from Finder into the terminal window. Press Enter.
   - **Windows**: Type `cd ` (with a space after it), then paste the folder path. Press Enter.

**Option B: Clone with Git (if you have Git installed)**

```
git clone https://github.com/rcrades/chris-circle-line-tool.git
cd chris-circle-line-tool
```

### Step 4: Install dependencies

This downloads all the libraries the app needs. Run this from inside the project folder:

```
pnpm install
```

This may take a minute or two the first time. You'll see a progress bar and then a summary when it's done.

### Step 5: Start the app

```
pnpm dev
```

After a few seconds, you'll see a message like:

```
▲ Next.js 16.1.6
- Local: http://localhost:3000
```

Open your web browser and go to **http://localhost:3000**. The app should be running.

### Stopping the app

When you're done, go back to the terminal and press **Ctrl + C** to stop the app.

### Starting it again later

You don't need to repeat the install steps. Just open your terminal, navigate to the project folder, and run:

```
pnpm dev
```

## Troubleshooting

| Problem | Solution |
|---|---|
| `node: command not found` | Node.js isn't installed or your terminal needs to be restarted. Close and reopen your terminal, then try again. |
| `pnpm: command not found` | Run `npm install -g pnpm` first. |
| `pnpm install` shows errors | Make sure you're inside the project folder. Run `ls` (Mac) or `dir` (Windows) — you should see `package.json` in the list. |
| The browser shows a blank page | Make sure `pnpm dev` is still running in your terminal. Check for errors there. |
| Port 3000 is already in use | Another app is using that port. Either close it, or run `pnpm dev -- -p 3001` to use a different port, then go to http://localhost:3001 instead. |
