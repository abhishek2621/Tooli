# Tooli

<div align="center">
  <p align="center">
    <strong>100% Free • No Sign-up • Local Processing</strong>
  </p>
</div>

## 🚀 Overview

Tooli is a modern, responsive web utility platform offering a collection of free online tools for image processing, document management, finance, and everyday tasks. Built with **Next.js 16 (App Router)**, **Tailwind CSS**, and **Framer Motion**, all file-processing and calculations run directly in the user's browser for maximum privacy and performance.

### Key Features
*   **Privacy First (Local Processing)**: All file manipulation (PDF compression, image conversion, QR generation) is executed client-side. Files are processed in your browser and never uploaded to any servers.
*   **PWA Ready**: The application is fully configureable as a Progressive Web App, making it installable on mobile and desktop.
*   **Dynamic Theme Support**: Toggle easily between Light and Dark mode options.
*   **Responsive Layout**: Tailored to adjust seamlessly across mobile screens, tablets, laptops, and desktop displays.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Runtime**: React 19
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **PDF Libraries**: `pdf-lib` & `pdfjs-dist` (client-side PDF parsing and rendering)
*   **Image Optimization**: `browser-image-compression` (canvas-based resampling)
*   **Charting**: `recharts` (SVG charts for calculations)

---

## 📦 Included Tools

| Category | Tools | Path |
|----------|-------|------|
| **Image** | Image Compressor (Static Page)<br>Image Converter (JPG, PNG, WebP)<br>Image to PDF Converter | `/image/image-compressor`<br>`/image/image-converter`<br>`/image/image-to-pdf` |
| **Document** | PDF Compressor<br>PDF Merger<br>Text to PDF Converter | `/document/pdf-compressor`<br>`/document/pdf-merger`<br>`/document/text-to-pdf` |
| **Finance** | GST Calculator (India Rates)<br>EMI Calculator (Home, Car, Personal)<br>SIP Investment Return Calculator | `/finance/gst-calculator`<br>`/finance/emi-calculator`<br>`/finance/sip-calculator` |
| **Utility** | Secure Password Generator<br>QR Code Generator<br>Age Calculator | `/utility/password-generator`<br>`/utility/qr-code-generator`<br>`/utility/age-calculator` |

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 20+
*   npm

### Installation & Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/abhishek2621/Tooli.git
    cd Tooli
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the local development server**
    ```bash
    npm run dev
    ```
    *   Open [http://localhost:3000](http://localhost:3000) in your browser.

4.  **Production Build**
    To test the production-compiled build locally:
    ```bash
    npm run build
    npm run start
    ```

---

## 🌐 Deployment

This repository is configured for automatic deployment on [Vercel](https://vercel.com).
*   Vercel auto-detects Next.js and deploys it directly.
*   Redirect routes are configured inside `next.config.ts` to manage transition links (like redirecting previous size-specific dynamic pages to the main image compressor page).

## 🤝 Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
