# Portfolio Project

A modern, responsive portfolio website built with React and Vite.

## Features
- Modern UI with glassmorphism design
- Responsive layout for all devices
- Contact form with EmailJS integration
- Animated backgrounds and smooth scroll effects
- Resume download functionality

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file (use `.env.example` as template)
4. Fill in your EmailJS credentials in `.env`
5. Run development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

Get these values from your [EmailJS dashboard](https://www.emailjs.com/).

## EmailJS Setup

1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Add email service (Gmail recommended)
3. Create email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Copy your keys to `.env` file

## Build for Production

```bash
npm run build
```

## Technologies Used
- React 18
- Vite
- Tailwind CSS
- EmailJS
- Framer Motion

## Contact
Email: chaudharyshiva2008@gmail.com+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# portfolio
# portfolio
