# Portfolio CRUD with Validation (Laravel + Inertia.js + React)

**Student:** JOSHUA C. LUMACTOD  
**Course & Section:** BSIT 3 - BLOCK 4  
**Course Code & Title:** IT ELEC01 — Advanced Web Development  
**Instructor:** Giobet T. Aban  
**Institution:** College of Information Technology  
**Academic Term:** Midterm Laboratory Activity (2026)

---

## 📌 Project Overview

This project converts a personal portfolio website into a modern **Laravel + Inertia.js + React** full-stack web application. The **Recent Projects** section has been transformed from static HTML into a database-driven dynamic CRUD feature backed by SQLite, Eloquent ORM, and comprehensive server-side validation.

Visitors can view the dynamic portfolio showcase seamlessly, while administrators can create, update, search, and delete portfolio records via an intuitive dashboard without page refreshes.

---

## 🚀 Key Features

1. **Portfolio Conversion:**
   - Single-page application architecture using **Inertia.js** and **React**.
   - Preserves all original portfolio animations: continuous auto-scrolling gallery, 3D card tilt deck, full-screen lightbox portals, and interactive Monkeytype-style typing speed test.
   - Built with **Tailwind CSS**.

2. **Full Dynamic CRUD Operations (`/projects`):**
   - **Index (`GET /projects`):** Real-time search query filtering (`title`, `description`, `tech_stack`), completion date sorting, thumbnail preview badges, and record count metrics.
   - **Create (`GET /projects/create`):** Dedicated creation form with multipart file upload support.
   - **Store (`POST /projects`):** Server-side validation with custom error feedback and automatic disk storage in `storage/app/public/projects`.
   - **Edit (`GET /projects/{project}/edit`):** Pre-populated edit view displaying existing thumbnail and field values.
   - **Update (`POST /projects/{project}` with `_method: 'PUT'`):** Uses method spoofing to support multipart image updates alongside standard form fields, utilizing `Rule::unique()->ignore($id)`.
   - **Destroy (`DELETE /projects/{project}`):** Automatic file cleanup of stored images from disk upon record deletion.

3. **Robust Server-Side Validation:**
   - `title`: `required`, `string`, `max:100`, `unique:projects,title` (ignoring own ID on update).
   - `description`: `required`, `string`, `min:10`, `max:1000`.
   - `tech_stack`: `required`, `string`, `max:150`.
   - `project_url`: `nullable`, `url`, `max:255`.
   - `repository_url`: `nullable`, `url`, `max:255`.
   - `image`: `nullable`, `image`, `mimes:jpeg,png,jpg,webp`, `max:2048`.
   - `date_completed`: `required`, `date`, `before_or_equal:today`.
   - Friendly, customized error messages displayed directly beneath affected fields while preserving user input state.

4. **User Experience & Safety:**
   - **Delete Confirmation Modal:** Explicit `<DeleteModal>` prompt preventing accidental record destruction.
   - **Flash Notifications:** Auto-dismissing success banners triggered via Inertia session redirects.

5. **Automated Testing Suite:**
   - 11 automated test cases (45 assertions) verifying the full CRUD lifecycle and validation constraints via `php artisan test`.

---

## 🛠️ Tech Stack

- **Backend:** Laravel 11 (PHP 8.2+)
- **Frontend:** React 18, Inertia.js React Adapter
- **Styling:** Tailwind CSS, CSS3 Transforms & Portals
- **Database:** SQLite
- **Asset Bundler:** Vite

---

## 💻 Local Setup & Installation

Follow these steps to run the application locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/Joshh181/portfolio-laravel.git
cd portfolio-laravel
```

### 2. Install PHP & Node Dependencies
```bash
composer install
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Database Setup & Seeding
```bash
# Creates SQLite database and applies migrations with initial seed projects
php artisan migrate --seed
```

### 5. Link Public Storage
```bash
# Links public disk to public/storage for uploaded project thumbnails
php artisan storage:link
```

### 6. Run Automated Tests
```bash
php artisan test
```

### 7. Run the Development Servers
In two separate terminals:

**Terminal 1 (Vite Frontend):**
```bash
npm run dev
```

**Terminal 2 (Laravel Backend):**
```bash
php artisan serve
```

Open your browser and navigate to:
- **Public Portfolio:** `http://127.0.0.1:8000`
- **Projects CRUD Management:** `http://127.0.0.1:8000/projects`

---

## 📁 Project Architecture

```
portfolio-laravel/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── PortfolioController.php      # Serves public portfolio with dynamic DB records
│   │       └── ProjectController.php        # Resource controller for CRUD & validation
│   └── Models/
│       └── Project.php                      # Eloquent model with $fillable & date casts
├── database/
│   ├── migrations/
│   │   └── 2026_10_20_042545_create_projects_table.php
│   └── seeders/
│       └── ProjectSeeder.php
├── resources/
│   └── js/
│       ├── Components/
│       │   ├── DeleteModal.jsx              # Reusable confirmation modal
│       │   ├── FlashMessage.jsx             # Flash alert component
│       │   ├── FormField.jsx                # Form input wrapper with inline error text
│       │   ├── ProjectForm.jsx              # Shared form component for create & edit
│       │   └── Portfolio/
│       │       └── ProjectsSection.jsx      # Dynamic public section
│       └── Pages/
│           ├── Portfolio.jsx                # Public single-page portfolio layout
│           └── Projects/
│               ├── Create.jsx               # New project form view
│               ├── Edit.jsx                 # Edit project form view
│               └── Index.jsx                # Admin records table view
├── routes/
│   └── web.php                              # Web routes definition
└── tests/
    └── Feature/
        └── ProjectCrudValidationTest.php    # Validation and CRUD test suite
```

---

## 📄 Documentation

Full documentation formatted according to course requirements can be found in the root directory:
- `ACTIVITY_DOCUMENTATION.md`
- `ACTIVITY_DOCUMENTATION.html` (Print-friendly format with screenshots)
- `PART_6_DOCUMENTATION.docx`

---

## 👤 Author

**Joshua C. Lumactod**  
BSIT 3 - BLOCK 4  
College of Information Technology
