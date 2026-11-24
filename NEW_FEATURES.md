# What's new

## Two preparation levels
- **Foundation Level (Low)** - your existing aptitude practice and assessments (routes unchanged: /practice, /assessment/selection).
- **UPSC Level (High)** - new track at /upsc.

## New files
- client/src/assets/dataset/upsc-data.js - 168 UPSC-style questions (7 subjects x 4 difficulty levels x 6)
- client/src/assets/dataset/resources.js - 38 study resources (add more by appending to the array)
- client/src/pages/UpscHub.jsx, UpscPractice.jsx, DailyChallenge.jsx, SyllabusTracker.jsx, Resources.jsx
- client/src/components/LevelBanner.jsx, client/src/lib/storage.js

## New routes (all protected)
/upsc, /upsc/practice, /upsc/daily, /upsc/syllabus, /resources

## Features
1. UPSC subject-wise practice + full mock (reuses your adaptive DiffAssess engine)
2. Resources library: search, filters, save (star), mark done
3. Daily Challenge: 5 questions/day (same for all users), streak tracker
4. Syllabus Tracker: Prelims, CSAT, Mains checklist with progress
Progress for 2-4 is stored in the browser (localStorage); no server changes needed.

## Adding more questions
Rows are [question, [4 options], correctIndex, explanation] inside upsc-data.js.

---

## Study Assistant, Whiteboard, UPSC marks + summaries

### 1. Study Assistant (chatbot)
- Floating "Study Assistant" button on every logged-in page (bottom-right).
- Ask any study question (concepts, UPSC topics, aptitude, study plans). Off-topic questions are politely declined.
- "Explain the question I'm on" button while practising.
- Hidden during graded assessments (Foundation assessment, Adaptive assessment, Full UPSC Mock) so it can't be used to look up answers. To allow it everywhere, change `chatAllowed` in `client/src/components/StudyTools.jsx`.
- Server: `POST /api/chat` (uses `GEMINI_API_KEY` from `server/.env`; optional `GEMINI_MODEL`, default `gemini-2.5-flash`). Limited to 20 messages/min per user.

### 2. Whiteboard (practice + assessments)
- Floating "Whiteboard" button on every logged-in page; panel shows the current question so you can work it out.
- Mouse, pen and touch all work (touch/pen only matter if the laptop has a touch screen; the board detects it and shows a hint).
- Tools: pen, eraser, text (press T, click, type with the keyboard, Enter), 5 colours, 3 sizes, undo/redo (Ctrl+Z / Ctrl+Y), grid, clear, save as PNG.
- One separate drawing per question.
- Files: `client/src/components/Whiteboard.jsx`, `StudyTools.jsx`, `StudyToolsContext.jsx`.

### 3. UPSC marks + summary
- Every UPSC practice / mock attempt is now saved to your account (track = `upsc`) with subject, difficulty and time per question.
- On finishing, a performance summary (overview, strengths, weaknesses, next steps, topics to revise) is generated with Gemini; if the key is missing or the call fails, a rule-based summary is saved instead.
- My Results (`/results`) has All / Foundation / UPSC tabs showing marks and a summary preview. Result detail page shows the full summary, subject-wise marks, and can generate/regenerate the summary for older results.
- Server: `POST /api/results/:id/summary` (`?force=1` to regenerate), `GET /api/results/history?track=upsc`, `GET /api/results/stats/by-track`.

### Run it
```
cd server && npm install && npm run dev      # needs MONGO_URI, JWT_SECRET, GEMINI_API_KEY in server/.env
cd client && npm install && npm run dev
```

---

## Level picker (Foundation / High level)
- After login/register the user lands on `/level` and chooses **Foundation Level** or **High Level (UPSC)**.
- The choice is stored (`localStorage.prepLevel`), cleared on logout and on every new login.
- Homepage, navbar, hero buttons, footer, Results and Resources now show only the chosen level's workflow.
- Route guard: Foundation pages (`/practice`, `/assessment/selection`, ...) only open for Foundation; `/upsc/*` only for High level. Otherwise redirected to `/level`.
- "Switch level" button on Homepage and in the banner on every level page.
- Dashboard stats are per level (`GET /api/results/summary?track=upsc|foundation`).
- New files: `context/LevelContext.jsx`, `pages/LevelSelect.jsx`.

---

## Navbar, level designs and profile
- `components/AppNavbar.jsx`: one themed navbar (UPSC = navy/gold, text links; Foundation = bright pill links). Foundation | UPSC switcher, avatar menu, mobile drawer.
- `pages/HomeUpsc.jsx`: professional design (serif type, navy/gold, stats strip, toolkit, subjects, exam stages).
- `pages/HomeFoundation.jsx`: interactive design (Quick Brain Boost question widget, daily goal ring, XP levels, badges, topic cards).
- `pages/Profile.jsx`: photo upload (auto-cropped), phone, DOB, city, education, institution, target exam, daily goal, bio, completeness meter, unsaved-changes bar.
- Server: user model + `PUT /api/user/profile` accept the new fields; JSON limit raised to 3 MB for photos.

---

## One theme per level, on every page
- `components/LevelLayout.jsx` wraps ALL protected pages: themed navbar + theme class (`theme-upsc` / `theme-foundation`).
- `index.css` remaps the Tailwind palette, fonts and corner radii per theme, so every existing page (practice, assessments, results, daily challenge, syllabus, resources, profile...) follows the chosen level automatically.
  - UPSC: navy + gold, Playfair Display headings, sharper corners.
  - Foundation: violet/pink, Nunito font, rounder corners, button hover/press animations.
  - Green/red stay as they are (correct/wrong).
- The old per-page banner (`LevelBanner`) now renders nothing; the navbar replaces it.
