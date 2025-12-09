
# Elite Agent Hub - AI Voice & Chat Agents Website

This is a complete, clean, and responsive React web application designed to showcase AI agents, capture leads, book demos, and prove ROI for "Elite Agent Hub".

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Tech Stack](#tech-stack)
3.  [Getting Started](#getting-started)
4.  [Customization](#customization)
    -   [Updating Copy and Content](#updating-copy-and-content)
    -   [Integrating GoHighLevel Calendar](#integrating-gohighlevel-calendar)
    -   [Configuring Lead Forms](#configuring-lead-forms)
5.  [Deployment](#deployment)
    -   [Building the Application](#building-the-application)
    -   [Deploying to a Static Host](#deploying-to-a-static-host)

---

## 1. Project Overview

This project is a single-page application (SPA) built with React, TypeScript, and Tailwind CSS. It uses `react-router-dom` with `HashRouter` for client-side routing, making it suitable for deployment on static hosting platforms.

The primary goals of this website are:
-   **Showcase** the value of AI voice and chat agents.
-   **Educate** potential customers on how the service works.
-   **Prove ROI** through interactive calculators.
-   **Capture leads** and book demos.

---

## 2. Tech Stack

-   **React 18+**: For building the user interface.
-   **TypeScript**: For type safety and improved developer experience.
-   **Tailwind CSS**: For utility-first styling.
-   **React Router DOM**: For client-side routing (`HashRouter`).

---

## 3. Getting Started

To run this project locally, you'll need Node.js and a package manager (like npm or yarn).

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

---

## 4. Customization

### Updating Copy and Content

Most of the site's text content (pricing tiers, FAQ questions, feature descriptions) is centralized in `src/constants.ts`.

-   **To change pricing details:** Modify the `PRICING_PLANS` object.
-   **To update FAQs:** Edit the `FAQ_DATA` array.
-   **For other text:** Most other text is located directly within the respective page components in the `src/pages/` directory.

### Integrating GoHighLevel Calendar

The "Book a Demo" page (`src/pages/BookDemoPage.tsx`) is ready for your GoHighLevel calendar embed.

1.  **Get your GHL Calendar URL:** Find the direct URL for your calendar embed in your GoHighLevel account.
2.  **Update the Component:**
    -   Open `src/pages/BookDemoPage.tsx`.
    -   Find the `useEffect` hook.
    -   Replace the placeholder URL `https://link.msgsndr.com/widget/booking/YOUR_CALENDAR_ID` with your actual GHL calendar URL.

    ```typescript
    // Inside src/pages/BookDemoPage.tsx
    useEffect(() => {
      const script = document.createElement('script');
      // TODO: REPLACE THIS URL WITH YOUR ACTUAL GOHIGHLEVEL CALENDAR URL
      script.src = 'https://link.msgsndr.com/js/form_embed.js'; 
      document.body.appendChild(script);

      // ... rest of the script
    }, []);
    ```

    The calendar will then be embedded into the `<div id="ghl-calendar"></div>` placeholder.

### Configuring Lead Forms

The forms (ROI calculator email form, demo fallback form) are currently stubs. They log data to the console. To make them functional, you need to connect them to a backend service, webhook, or marketing automation tool.

1.  **Identify the Form Handlers:** The logic is in the `handleSubmit` functions within `src/pages/RoiCalculatorPage.tsx` and `src/pages/BookDemoPage.tsx`.

2.  **Connect to Your Endpoint:**
    -   Inside the `handleSubmit` function, replace the `console.log` and `alert` with a `fetch` call to your API endpoint, Zapier webhook, or GHL webhook.
    -   Example:
        ```typescript
        const handleSubmit = async (event: React.FormEvent) => {
          event.preventDefault();
          // TODO: Replace this with your API endpoint (e.g., Zapier webhook, GHL webhook)
          try {
            const response = await fetch('https://your-webhook-url.com/api/lead', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, name, phone, results }), // Add relevant data
            });

            if (response.ok) {
              // Show success toast
            } else {
              // Show error toast
            }
          } catch (error) {
            // Handle network error
          }
        };
        ```

---

## 5. Deployment

### Building the Application

To create a production-ready build of the app, run:

```bash
npm run build
```

This will create a `build` directory with optimized, static files.

### Deploying to a Static Host

You can deploy the contents of the `build` directory to any static hosting service like:
-   Vercel
-   Netlify
-   Firebase Hosting
-   AWS S3
-   Google Cloud Storage

Since this application uses `HashRouter`, it does not require any special server-side routing configuration. Simply upload the `build` folder and ensure the server serves `index.html` for any request.
