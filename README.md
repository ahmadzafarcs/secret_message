# 🔥 Secret Messages: Secure Message Sharing
A lightweight, secure, and privacy-focused web application that allows users to share self-destructing messages. Once a message is viewed and the tab is closed, it is permanently deleted from the database.

# 🚀 Features
Self-Destructing Links: Messages are stored in Firebase Realtime Database and deleted immediately after use.

Tab-Close Protection: Uses beforeunload events and the keepalive Fetch API to ensure data is wiped even if the user closes the window.

Dynamic Input: Auto-expanding textarea for a smooth message-writing experience.

No Persistence: Designed with a "Zero-Knowledge" mindset—once it's gone, it's gone forever.

# 🛠️ Tech Stack
Frontend: React with Vite

Language: TypeScript

Database: Firebase Realtime Database

Deployment: Vercel

Package Manager: pnpm

# ⚙️ Local Setup
Clone the repository:

Bash
```
git clone https://github.com/your-username/burn-on-read.git
cd burn-on-read
```
Install dependencies:

Bash
```
pnpm install
```
Configure Environment Variables: Create a .env file in the root directory and add your Firebase credentials:

Code snippet

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_URL=https://your_project-default-rtdb.firebaseio.com/messages
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Run the development server:

Bash
```
pnpm dev
```
# 🤝 Open Source Contribution
We welcome contributions! Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.

How to Contribute
Fork the Project: Click the 'Fork' button at the top of the repository.

Create a Branch:

Bash
```
git checkout -b feature/AmazingFeature
```
Commit Your Changes:

Use descriptive commit messages.

Ensure you use import type for TypeScript types to comply with verbatimModuleSyntax.

Push to the Branch:

Bash
```
git push origin feature/AmazingFeature
```
Open a Pull Request: Describe your changes and link any related issues.

Areas for Improvement
Encryption: Implement client-side AES encryption so even the database owner cannot read messages.

Expiration Timers: Add an option to delete messages after a specific time (e.g., 1 hour) even if not read.

UI/UX: Transition from inline styles to CSS Modules or Tailwind CSS.

# 🛡️ Security Note
This app is intended for transient data sharing. While it deletes data on read, the security of the message during transit depends on HTTPS and the secrecy of the unique URL generated.

📄 License
Distributed under the MIT License. See LICENSE for more information.
