# 🎵 Gramophone — Persian Music Player

> A modern Persian music streaming platform built with **Next.js, React, and Strapi**, designed to provide a smooth and immersive music discovery experience.

[![Live Demo](https://music-player-zahra-azizi.vercel.app/)]


---

## ✨ Overview

**Gramophone** is a full-stack Persian music platform created as a portfolio project to explore modern frontend development, API integration, content management, and production deployment.

The application combines a responsive music-focused interface with a **Strapi CMS backend**, allowing songs, artists, albums, genres, and categories to be managed dynamically without hardcoding content in the frontend.

The project focuses on building a polished music experience with a dark visual identity, smooth interactions, responsive layouts, and a custom audio player.

---

## 🎧 Features

* 🎵 Custom audio player with play, pause, next, and previous controls
* 🔎 Dynamic music search
* ❤️ Favorite songs
* 🎤 Artist profiles and artist-based music collections
* 💿 Album pages
* 🎼 Genre and category browsing
* 🔥 Latest and featured songs
* 📱 Fully responsive design
* 🌙 Dark music-focused UI
* ✨ Smooth UI interactions and animations
* 🖼️ Dynamic cover artwork
* ☁️ Cloudinary media integration
* 🗂️ Content management through Strapi
* 🚀 Production deployment with Vercel and Railway

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **Tailwind CSS**
* **Framer Motion**
* **Lucide React**

### Backend

* **Strapi**
* REST API

### Media

* **Cloudinary**

### Deployment

* **Vercel** — Frontend
* **Railway** — Strapi Backend

---

## 🏗️ Architecture

```text
┌──────────────────────┐
│      Next.js         │
│      Frontend        │
└──────────┬───────────┘
           │
           │ REST API
           ▼
┌──────────────────────┐
│       Strapi         │
│      CMS / API       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Cloudinary       │
│   Media / Artwork    │
└──────────────────────┘
```

The frontend communicates with Strapi through REST API endpoints. Content such as songs, artists, albums, and categories is managed through the Strapi dashboard.

---

## 📂 Main Features & Data Models

The backend is structured around several connected content types:

* **Songs**
* **Artists**
* **Albums**
* **Categories**
* **Genres**

Songs can be associated with artists and multiple categories, allowing the same track to appear across different music collections.

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_STRAPI_URL=your_strapi_api_url
```

For example:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
```

> Do not commit environment files containing private credentials or secrets.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd music-player
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

and add your Strapi API URL:

```env
NEXT_PUBLIC_STRAPI_URL=your_strapi_api_url
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📸 Screenshots

### Home

*Add a screenshot of the homepage here.*

### Music Player

*Add a screenshot of the player here.*

### Artist / Album

*Add a screenshot of an artist or album page here.*

---

## 🌐 Live Demo

**Frontend:**
[View Live Application](YOUR_VERCEL_URL)

**Backend:**
Strapi API is deployed separately and consumed by the Next.js frontend.

---

## 🎯 Project Goals

This project was built to practice and demonstrate:

* Modern React and Next.js development
* Component-based UI architecture
* State management with React Context
* REST API integration
* Headless CMS architecture
* Dynamic routing
* Responsive UI development
* Media management
* Production deployment
* Frontend/backend separation

---

## 📄 License

This project was created for educational and portfolio purposes.
created by ZahraAzizi
