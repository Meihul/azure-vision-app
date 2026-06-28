# Azure Vision Explorer

A web application built with Azure AI Vision that detects faces, recognises landmarks, and identifies brands in any image — just paste a URL and get instant results.

Built by **Meihul** as part of the **Season of AI 2.0** course.

---

## What it does

- **Face Detection** — detects faces in an image and returns position, size, and an AI-generated description of the person
- **Landmark Recognition** — identifies famous landmarks and geographic locations
- **Brand Detection** — spots logos and brands visible in an image
- **AI Description** — generates a natural language caption describing the image

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Vercel Serverless Functions |
| AI | Azure AI Vision (Computer Vision v3.2) |
| Deployment | Vercel |

---

## Project Structure

```
azure-vision-app/
├── api/
│   └── analyze.js       # Serverless function — proxies requests to Azure
├── public/
│   └── index.html       # Frontend UI
├── .env                 # Local environment variables (not committed)
├── .gitignore
├── package.json
└── vercel.json
```

---

## How to run locally

**1. Clone the repo**
```bash
git clone https://github.com/Meihul/azure-vision-app.git
cd azure-vision-app
```

**2. Install dependencies**
```bash
npm install
```

**3. Add your Azure credentials**

Create a `.env` file in the root:
```
VISION_KEY=your_azure_vision_key
VISION_ENDPOINT=https://your-resource.cognitiveservices.azure.com
```

**4. Run locally**
```bash
npx vercel dev
```

Visit `http://localhost:3000`

---

## Deployment

This app is deployed on Vercel. The Azure credentials are stored as environment variables in the Vercel dashboard and are never exposed in the code or committed to GitHub.

Live demo: https://azure-vision-75kt3i62z-meihul-saini.vercel.app/

---


## Notes

- Only publicly accessible image URLs are supported (JPEG, PNG, BMP, GIF)
- Age and gender attributes are not returned by the Azure Vision API in accordance with Microsoft's Responsible AI policy
- Face detection returns bounding box position and size; detailed attributes are provided via AI-generated captions