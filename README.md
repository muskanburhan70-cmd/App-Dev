# Bareera International - HR Management System

A comprehensive HR Management System built with React + Vite for Bareera International. This application provides features for employee management, attendance tracking, payroll processing, and performance reviews.

## Features

- 🔐 Secure login system
- 👥 Employee management
- 📅 Attendance tracking
- 💰 Payroll management
- 📊 Performance reviews
- 🚀 Employee portal

## SEO Optimization

This project includes comprehensive SEO optimization for better visibility on Google and other search engines. See [SEO_GUIDE.md](./SEO_GUIDE.md) for complete details on:
- Meta tags and structured data
- robots.txt and sitemap.xml
- Social media optimization (Open Graph, Twitter Cards)
- PWA manifest for mobile experience
- Deployment and maintenance best practices

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
├── public/              # Static assets and SEO files
│   ├── robots.txt      # Search engine guidance
│   ├── sitemap.xml     # Site map for search engines
│   └── manifest.json   # PWA configuration
├── src/
│   ├── components/     # React components
│   ├── Pages/          # Page components
│   ├── assets/         # Images and media
│   └── App.jsx         # Main application component
├── index.html          # Entry HTML (with SEO meta tags)
└── SEO_GUIDE.md        # Comprehensive SEO documentation
```

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **ESLint** - Code linting

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Deployment

After building the project with `npm run build`, deploy the contents of the `dist/` folder to your web server or hosting platform. All SEO files are automatically included in the build.

For detailed SEO configuration and optimization steps, refer to [SEO_GUIDE.md](./SEO_GUIDE.md).

## License

Copyright © 2025 Bareera International. All rights reserved.

