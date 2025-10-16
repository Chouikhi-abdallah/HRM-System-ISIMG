# TECH HR - Frontend

This is the frontend application for the TECH HR Human Resource Management System, built with React and Vite.

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool with Hot Module Replacement (HMR)
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Socket.IO Client** - Real-time communication
- **Chart.js & Recharts** - Data visualization
- **React Big Calendar** - Calendar component for scheduling
- **React Toastify** - Toast notifications
- **jsPDF** - PDF generation
- **ESLint** - Code linting

## 📦 Installation

```sh
npm install
```

## 🚀 Development

Start the development server with hot module replacement:

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🔨 Build

Create a production build:

```sh
npm run build
```

The build output will be in the `dist/` directory.

## 👀 Preview Production Build

Preview the production build locally:

```sh
npm run preview
```

## 🧹 Linting

Run ESLint to check code quality:

```sh
npm run lint
```

## 🏗 Project Structure

```
frontend/
├── src/                 # Source files
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── components/     # React components
│   ├── pages/          # Page components
│   └── ...
├── public/             # Public static files
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── eslint.config.js    # ESLint configuration
└── package.json        # Dependencies and scripts
```

## 🔌 Vite Plugins

This project uses [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) which uses [SWC](https://swc.rs/) for Fast Refresh, providing extremely fast HMR.

## 📝 Notes

- Make sure the backend API is running before starting the frontend
- Default API endpoint should be configured in the application settings
- The application uses JWT tokens stored in localStorage for authentication

## 🔗 Related

- [Main Project README](../README.md) - For complete setup instructions including backend and database
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
