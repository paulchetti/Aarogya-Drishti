# Aarogya Drishti 🩺

> Early Care. Better Tomorrows.  
> Secure Healthcare Portal built with React and Vite, ready for native mobile expansion via Capacitor.

---

## 📁 Project Structure

```
Aarogya Drishti/
├── .vscode/               # VS Code launch & debug settings
├── public/                # Static public assets
├── src/
│   ├── components/        # Modular UI components
│   │   ├── AuthCard.jsx   # Master container for auth views
│   │   ├── Footer.jsx     # App footer & security info
│   │   ├── Header.jsx     # Navigation bar & branding
│   │   ├── LoginForm.jsx  # Controlled login form
│   │   ├── RegisterForm.jsx # Controlled registration form
│   │   ├── SocialAuth.jsx # Social login integrations
│   │   ├── Toast.jsx      # Feedback notifications
│   │   └── WelcomePanel.jsx # Animated transition & graphic panel
│   ├── App.jsx            # Main app orchestrator & state
│   ├── index.css          # Core styles, responsive design & animations
│   └── main.jsx           # React DOM root entrypoint
├── index.html             # HTML shell with Google Fonts
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite bundler configuration
```

---

## 🚀 Getting Started

### 1. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 📱 Future Mobile App Conversion (Capacitor)

When you are ready to generate Android (`.apk`) or iOS apps:

1. **Install Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   ```
2. **Initialize Capacitor:**
   ```bash
   npx cap init "Aarogya Drishti" "com.aarogyadrishti.app" --web-dir=dist
   ```
3. **Build the web app:**
   ```bash
   npm run build
   ```
4. **Add Android platform & sync:**
   ```bash
   npx cap add android
   npx cap sync
   ```
5. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```
