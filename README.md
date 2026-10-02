# InterVue AI — AI Interview Simulator

> **Practice. Improve. Get Interview Ready.**

A modern, responsive web application designed for students and job seekers to prepare for campus placements, internship evaluations, technical rounds, and behavioral HR interviews.

---

## 🌟 Key Features & Capabilities

### 1. Multi-Track Interview Simulation
- **HR Interview**: Behavioral, culture fit, personal strengths, conflict management.
- **Technical Interview**: Core CS principles (OOP, algorithms, compilers vs. interpreters, database architectures, REST APIs).
- **Internship Interview**: Self-learning ability, mentorship receptiveness, project ownership.
- **College Placement**: Engineering foundations, capstone projects, adaptability.
- **Self Introduction**: 90-second elevator pitches and resume walkthroughs.
- **Behavioral (STAR Method)**: Situation, Task, Action, and measurable Result.

### 2. High-Stakes "Pressure Mode" 🔥
- Enforces rapid-fire **30–45s countdown timers**.
- Unexpected challenging queries:
  - *"Why should we choose you over another candidate with higher grades?"*
  - *"You have 30 seconds. Explain your most complex project bottleneck."*
  - *"What is your biggest flaw, and why won't it hurt our team?"*
- Glowing red/orange high-intensity UI with urgency cues.

### 3. Real-Time Intelligent Follow-Up Engine
- Evaluates your answer dynamically.
- Automatically poses contextual follow-ups (e.g. asking for trade-offs, measurable metrics, or how conflicts were de-escalated) before proceeding to the next primary question.

### 4. Comprehensive Performance Feedback & Scoring
- Multi-dimensional breakdown scored out of 100:
  - 🗣️ **Communication**: Clarity, pacing, and logical sequencing.
  - 🛡️ **Confidence**: Assertive phrasing, active verbs, and conviction.
  - 🎯 **Relevance**: Targeted prompt alignment and keyword density.
  - 💻 **Technical Knowledge**: Domain mastery and architecture concepts.
  - ✍️ **Grammar & Tone**: Professional phrasing and filler-word suppression.
- Executive summary report with **Key Strengths**, **Areas for Improvement**, and **Frequently Detected Traps**.
- Question-by-question expandable review with exact critique.

### 5. Student Progress Dashboard & Improvement Visualizer
- Historical trajectory graph displaying scores across sessions (e.g., *62% → 70% → 78% → 84%*).
- Detection of recurring student weaknesses (Answer structure, confidence delivery, technical depth).
- Session audit table with one-click historical report reviews.

### 6. Curated Question Bank
- Explore 30+ categorized placement questions with difficulty badges (*Beginner*, *Intermediate*, *Advanced*).
- Instant search by concept, keywords, or topics.
- **"Practice This Question"** button directly launches an interview session tailored to that question.

### 7. Student Profile Integration
- Captures full name, college, degree/course, career goals, and specific technical skills.
- Synchronized automatically into setup to personalize interview questions.

### 8. Voice & Text Dual Input
- **Microphone Support**: Real-time speech-to-text via the browser Web Speech API.
- **Text Box**: Full keyboard input with word counter and STAR method helper hints.
- **Question Audio**: Listen to interview questions using Microsoft Edge TTS.

---

## 🎨 Design System

- **Brand Colors**: Dark `#0B0E14` base paired with fiery `#FF7A00` orange accents, white gradients, and glowing halos.
- **Theme**: Dark mode default with seamless **Light Mode** toggle switch.
- **Responsive**: Fully optimized for mobile phones, tablets, laptops, and ultra-wide desktop displays.

---

## 🛠️ Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Navigation**: React Router v7
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Storage**: Interview sessions and profiles stored in browser `localStorage`
- **Speech**: Local FastAPI service using Microsoft Edge TTS
- **AI Engine**: Modular evaluator in [`src/utils/evaluator.js`](file:///C:/Users/Student/.gemini/antigravity/scratch/intervue-ai/src/utils/evaluator.js) designed for 1-step integration with Gemini or OpenAI APIs.

---

## 🏃 Running the Application

### Development Server:
```bash
# Inside C:\Users\Student\.gemini\antigravity\scratch\intervue-ai
node ./node_modules/vite/bin/vite.js --port 5174
```
Access the application live at: **[http://localhost:5174](http://localhost:5174)**

### Edge TTS Question Audio
Question playback requires `uv` and an internet connection. Run the API in a second terminal; `uv` provisions Python and installs the speech dependencies:

```bash
npm run dev:api
```

Keep the API running alongside the Vite development server. Use **Listen** in the interview prompt to generate and play the current question; playback also works for follow-up questions.

### Production Build:
```bash
npm.cmd run build
```
Static artifacts will be compiled into the `dist/` directory.

## Hosting

The GitHub Actions workflow publishes the frontend to GitHub Pages at:
`https://sreelakshmita116-lgtm.github.io/Zero_syntaxx_22/`

In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions**. Pushes to `main` then build and publish the site automatically.

GitHub Pages only hosts static files, so the Edge TTS API is configured separately through the included `render.yaml` blueprint:

1. In Render, create a new Blueprint and select this repository.
2. After the `intervue-ai-tts` service is live, copy its URL.
3. In GitHub, open **Settings → Secrets and variables → Actions → Variables** and add `VITE_API_BASE_URL` with the service URL, for example `https://intervue-ai-tts.onrender.com`.
4. Rerun the Pages workflow or push a new commit so the frontend build can use the API URL.

Without `VITE_API_BASE_URL`, the site itself loads, but question audio will not reach the hosted TTS service.
