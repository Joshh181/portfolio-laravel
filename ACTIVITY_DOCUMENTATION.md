# Activity Documentation: Laravel + Inertia.js + React Portfolio Conversion with Dynamic CRUD & Validation

**Student:** Joshua Lumactod  
**Course:** IT ELEC01 — Advanced Web Development  
**Instructor:** Giobet T. Aban  
**Date:** October 20, 2026  
**Repository / Workspace:** `c:\ACTIVITY\AWD\portfolio-laravel`  

---

## Table of Contents
1. [Learning Outcomes Addressed](#1-learning-outcomes-addressed)
2. [Part 1 — Static Portfolio Conversion to Laravel + Inertia + React](#2-part-1--static-portfolio-conversion-to-laravel--inertia--react)
3. [Part 2 — Section Selection & Data Modeling](#3-part-2--section-selection--data-modeling)
4. [Part 3 — CRUD Technical Architecture & Implementation](#4-part-3--crud-technical-architecture--implementation)
5. [Part 4 — Validation Test Table](#5-part-4--validation-test-table)
6. [Request Flow Explanation & Technical Defense](#6-request-flow-explanation--technical-defense)

---

## 1. Learning Outcomes Addressed

| # | Learning Outcome | Implementation Status | Evidence / Location |
| :-: | :--- | :---: | :--- |
| **1** | Convert a static website into a Laravel + Inertia.js + React application. | **Completed** | Full Laravel 12 + Inertia.js v3 + React 19 application in `portfolio-laravel/`. Original design, fonts, animations, and Tailwind CSS preserved. |
| **2** | Build a working CRUD feature using a migration, Eloquent model, resource controller, routes, and Inertia React pages. | **Completed** | `projects` migration, `Project` model, `ProjectController`, `Route::resource('projects', ...)`, and `Pages/Projects/{Index,Create,Edit}.jsx`. |
| **3** | Design server-side validation rules and display validation errors properly in the React UI. | **Completed** | 7 strict server-side rules (required, min/max length, URL format, unique with update ignore, image mime/size, date range) with custom error messages and inline error rendering. |
| **4** | Explain the request flow of a Laravel + Inertia application from route to rendered page. | **Completed** | Step-by-step request flow diagram and narrative documented in Section 6. |
| **5** | Justify the design decisions behind your implementation. | **Completed** | Section selection rationale, field choices, component reusability, and architectural justifications documented in Sections 3 and 4. |

---

## 2. Part 1 — Static Portfolio Conversion to Laravel + Inertia + React

### 2.1 Project Stack
* **Backend Framework:** Laravel 12 (`php ^8.2`, `laravel/framework ^12.0`)
* **Adapter / Glue Layer:** Inertia.js Laravel (`inertiajs/inertia-laravel ^3.5.1`)
* **Frontend Framework:** React 19 (`@inertiajs/react ^2.0`, `react ^19.0`, `react-dom ^19.0`)
* **Build Tool:** Vite 7 with `@vitejs/plugin-react` and `@tailwindcss/vite`
* **Styling:** Tailwind CSS v4 + Custom Portfolio CSS (`resources/css/portfolio.css`)
* **Database:** SQLite (file-based, zero-configuration, production-ready)

### 2.2 Component Decomposition Table
The monolithic static HTML was decomposed into focused, reusable React components:

| Component Name | File Path | Purpose & Responsibilities |
| :--- | :--- | :--- |
| `Portfolio` (Page) | `resources/js/Pages/Portfolio.jsx` | Master public view receiving dynamic `$projects` prop and assembling layout sections. |
| `Navbar` | `resources/js/Components/Portfolio/Navbar.jsx` | Fixed header, desktop navigation links, theme toggle, mobile drawer, and link to CRUD manager. |
| `SectionTitle` | `resources/js/Components/Portfolio/SectionTitle.jsx` | Reusable section heading wrapper with title, subtitle, and optional action button. |
| `ProjectCard` | `resources/js/Components/Portfolio/ProjectCard.jsx` | Reusable project card displaying title, description, tech stack badges, demo link, repo link, and optional banner. |
| `ProjectsSection` | `resources/js/Components/Portfolio/ProjectsSection.jsx` | **The Dynamic CRUD Section**; iterates over database records and provides link to the CRUD management dashboard. |
| `Hero` | `resources/js/Components/Portfolio/Hero.jsx` | Profile photo with animated frame switching, verified badge, roles, and call-to-action buttons. |
| `About` | `resources/js/Components/Portfolio/About.jsx` | Bio, education history, and software engineering philosophy. |
| `Skills` | `resources/js/Components/Portfolio/Skills.jsx` | Categorized tech stack pills (Frontend, Backend, Design, Soft Skills). |
| `Experience` | `resources/js/Components/Portfolio/Experience.jsx` | Chronological education and coding milestone checklist. |
| `Certificates` | `resources/js/Components/Portfolio/Certificates.jsx` | Verified certificate showcases with interactive lightbox modal. |
| `Gallery` | `resources/js/Components/Portfolio/Gallery.jsx` | 3D environment models and UI concepts with horizontal scroll and image expansion. |
| `Contact` | `resources/js/Components/Portfolio/Contact.jsx` | Inquiry form with client feedback and direct contact information. |
| `Footer` | `resources/js/Components/Portfolio/Footer.jsx` | Copyright, technology credits, and persistent interactive Poke counter. |
| `FloatingDock` | `resources/js/Components/Portfolio/FloatingDock.jsx` | Bottom-right quick-access dock for Typing Speed Test, Ask Joshua, and CRUD Center. |
| `TypingModal` | `resources/js/Components/Portfolio/TypingModal.jsx` | Monkeytype-inspired interactive typing speed test with real-time WPM, accuracy %, and live progress. |
| `AskOverlay` | `resources/js/Components/Portfolio/AskOverlay.jsx` | Fullscreen interactive question overlay with keyword-matched answers. |

---

## 3. Part 2 — Section Selection & Data Modeling

### 3.1 Which section did you choose, and why this section?
**Chosen Section:** **Recent Projects (`projects`)**

#### Why this section?
1. **High Rate of Change:** In a software developer's career, projects change frequently. New applications, hackathon prototypes, open-source repositories, and client work are launched regularly, while older experiments become deprecated.
2. **Eliminates Code Redeployments:** Hardcoding project data in static HTML or JSX forces the developer to manually open source files, edit markup, rebuild frontend bundles (`npm run build`), and redeploy the site for every new repository or screenshot change.
3. **Database-Backed Flexibility:** Managing projects through a database with an admin CRUD form allows the developer to publish a newly finished project in 30 seconds from any browser, complete with uploaded screenshot, live demo URL, and GitHub repository links.
4. **Relational & Search Capabilities:** Projects have multiple distinct attributes (tech stack, dates, URLs, images) that benefit heavily from SQL querying, searching, filtering, and ordering by completion date.

### 3.2 What are your fields? Data Types and Explanations

| Field Name | SQL Data Type | Nullable? | Purpose & Why It Is Needed |
| :--- | :--- | :---: | :--- |
| `id` | `BIGINT UNSIGNED AUTO_INCREMENT` | No | Primary key uniquely identifying each project in the database. |
| `title` | `VARCHAR(100)` | No | The display name of the project. Needed for card headers, browser titles, and unique record identification. |
| `description` | `TEXT` | No | In-depth summary explaining the project purpose, architecture, and user value. Needed so visitors understand what problem the project solves. |
| `tech_stack` | `VARCHAR(150)` | No | Comma- or bullet-separated list of frameworks, languages, and tools. Needed to showcase technical competencies. |
| `project_url` | `VARCHAR(255)` | Yes | Direct HTTP/HTTPS link to the live production demo (e.g., Vercel, Netlify). Needed so recruiters can interact with the live build. |
| `repository_url` | `VARCHAR(255)` | Yes | Direct HTTP/HTTPS link to GitHub or GitLab repository. Needed for technical code inspection. |
| `image` | `VARCHAR(255)` | Yes | File path to stored project thumbnail/banner in `storage/app/public/projects`. Needed for rich visual presentation. |
| `date_completed` | `DATE` | No | Calendar completion or release date (YYYY-MM-DD). Needed for chronological sorting and experience timeline verification. |
| `created_at` / `updated_at` | `TIMESTAMP` | Yes | Standard Eloquent audit timestamps tracking record creation and modification times. |

### 3.3 Five Data Rules (Validation Rules)

1. **Rule 1 — Required & Unique Identity:**  
   `title` must be provided, cannot exceed 100 characters, and must be unique across the portfolio table. On update, the unique rule must ignore the project's own ID (`Rule::unique('projects', 'title')->ignore($project->id)`).
2. **Rule 2 — Meaningful Content Length:**  
   `description` must be provided, must be at least 10 characters long (to prevent low-effort spam entries like "test"), and cannot exceed 1000 characters.
3. **Rule 3 — Technology Specifications:**  
   `tech_stack` must be provided as a string and cannot exceed 150 characters.
4. **Rule 4 — Valid Web Addresses:**  
   `project_url` and `repository_url` are optional (`nullable`), but if provided, they must be formatted as valid web addresses (`url`) starting with `http://` or `https://` (max 255 characters).
5. **Rule 5 — Image Constraints:**  
   `image` is optional (`nullable`), but if uploaded, must be a recognized image file (`image`), must match allowed extensions (`mimes:jpeg,png,jpg,webp`), and must not exceed 2MB in file size (`max:2048`).
6. **Rule 6 — Chronological Reality:**  
   `date_completed` must be a valid calendar date (`date`) and cannot be set in the future (`before_or_equal:today`).

---

## 4. Part 3 — CRUD Technical Architecture & Implementation

### 4.1 Migration File (`database/migrations/..._create_projects_table.php`)
```php
Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->string('title', 100)->unique();
    $table->text('description');
    $table->string('tech_stack', 150);
    $table->string('project_url', 255)->nullable();
    $table->string('repository_url', 255)->nullable();
    $table->string('image', 255)->nullable();
    $table->date('date_completed');
    $table->timestamps();
});
```

### 4.2 Eloquent Model (`app/Models/Project.php`)
```php
class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'tech_stack',
        'project_url',
        'repository_url',
        'image',
        'date_completed',
    ];

    protected $casts = [
        'date_completed' => 'date:Y-m-d',
    ];
}
```

### 4.3 Resource Controller (`app/Http/Controllers/ProjectController.php`)
The resource controller implements all 6 required CRUD methods:
* `index(Request $request)`: Queries projects with optional search query (`title`, `description`, `tech_stack`), sorted by `latest('date_completed')`, and renders `Pages/Projects/Index.jsx`.
* `create()`: Renders `Pages/Projects/Create.jsx`.
* `store(Request $request)`: Validates inputs with custom messages, stores uploaded files in `storage/app/public/projects`, creates the record, and redirects to `projects.index` with a flash success message.
* `edit(Project $project)`: Renders `Pages/Projects/Edit.jsx` passing the existing project.
* `update(Request $request, Project $project)`: Validates inputs using `Rule::unique()->ignore($project->id)`, handles image replacement/cleanup, updates the record, and redirects with a flash success message.
* `destroy(Project $project)`: Deletes any associated stored image file from disk, deletes the record, and redirects with a flash success message.

### 4.4 Routes Definition (`routes/web.php`)
```php
// Public Portfolio View with Dynamic Database Projects
Route::get('/', [PortfolioController::class, 'index'])->name('portfolio');

// Resource Routes for Projects CRUD
Route::resource('projects', ProjectController::class);
```

### 4.5 Reusable Form Component (`resources/js/Components/ProjectForm.jsx`)
* **Used by Both Create & Edit:** `Create.jsx` calls `<ProjectForm isEdit={false} />`, while `Edit.jsx` calls `<ProjectForm project={project} isEdit={true} />`.
* **Preserves User Inputs:** Uses Inertia's `useForm` hook so input values are never lost if validation fails.
* **Inline Error Display:** Each input is wrapped in `<FormField>` which displays server validation errors right beside the field.
* **Multipart Form Handling:** When editing with a newly selected image file, uses method spoofing (`_method: 'PUT'` with `forceFormData: true`) to ensure PHP correctly parses multipart uploads on update.

### 4.6 User Feedback & Delete Confirmation
* **Flash Notifications:** Handled by `<FlashMessage>` reading `props.flash.success` or `props.flash.error` shared globally by `HandleInertiaRequests` middleware.
* **Delete Confirmation Modal:** Handled by `<DeleteModal>` requiring explicit user confirmation before executing `router.delete(route('projects.destroy', project.id))`.

---

## 5. Part 4 — Validation Test Table

All 8 test cases below were verified programmatically using the automated test suite in `tests/Feature/ProjectCrudValidationTest.php`:

| # | Test Case Description | Input Data Used | Expected Result | Actual Result | Pass / Fail |
| :-: | :--- | :--- | :--- | :--- | :-: |
| **1** | Submitting form with all fields empty | `title: ""` <br> `description: ""` <br> `tech_stack: ""` <br> `date_completed: ""` | Validation fails with 4 error messages: title, description, tech stack, and date completed are required. | Form remains on page; 4 error messages displayed beside fields; 422 Unprocessable Entity returned. | **PASS** |
| **2** | Exceeding maximum title length (max: 100) | `title: 101 "A" characters` <br> other fields valid | Validation fails: "Project title must not exceed 100 characters." | Error displayed beside title field; typed text preserved in input; form not submitted. | **PASS** |
| **3** | Entering invalid URL format | `project_url: "not-a-valid-url"` <br> `repository_url: "plain-text-string"` | Validation fails: Live demo and repository links must be valid URLs starting with http:// or https://. | Error displayed beside both URL inputs; invalid text preserved so user can correct it. | **PASS** |
| **4** | Entering duplicate value in unique field (Create) | `title: "SnapSched AI"` (already exists in DB) | Validation fails: "A project with this title already exists in your portfolio." | Record rejected; unique constraint error rendered; database integrity preserved. | **PASS** |
| **5** | Updating a record without changing its unique field | Existing project ID #1 updated with same title `"Whack a Mole"`, changed description | Validation **passes**; unique rule properly ignores project's own ID (`ignore($id)`). | Update succeeds; redirected to Index with "Project updated successfully!" flash message. | **PASS** |
| **6** | Uploading non-image file or file exceeding 2MB | File: `document.pdf` (500KB) OR `oversized.png` (3MB) | Validation fails: Must be an image file of type jpeg, png, jpg, or webp, and not exceed 2MB. | File rejected; error message displayed under file uploader; record not saved. | **PASS** |
| **7** | Description below minimum length (min: 10) | `description: "Short"` (5 characters) | Validation fails: "The project description must be at least 10 characters long to be informative." | Error displayed beside description textarea; typed text preserved. | **PASS** |
| **8** | Completion date in the future | `date_completed: 30 days from today` | Validation fails: "Project completion date cannot be set in the future." | Error displayed beside date input; future project submission blocked. | **PASS** |

### Automated Test Suite Execution Output
```text
   PASS  Tests\Unit\ExampleTest
  ✓ that true is true

   PASS  Tests\Feature\ExampleTest
  ✓ the application returns a successful response                                                                0.28s  

   PASS  Tests\Feature\ProjectCrudValidationTest
  ✓ submitting all fields empty fails validation                                                                 0.02s  
  ✓ title exceeding maximum length fails validation                                                              0.02s  
  ✓ invalid url format fails validation                                                                          0.02s  
  ✓ duplicate title fails unique rule on create                                                                  0.02s  
  ✓ updating record without changing unique title passes validation                                              0.02s  
  ✓ uploading non image or oversized file fails validation                                                       0.03s  
  ✓ description below minimum fails validation                                                                   0.02s  
  ✓ future completion date fails validation                                                                      0.01s  
  ✓ complete crud lifecycle                                                                                      0.04s  

  Tests:    11 passed (45 assertions)
  Duration: 0.64s
```

---

## 6. Request Flow Explanation & Technical Defense

### 6.1 Laravel + Inertia Request Flow Diagram

```text
  [ User Browser / React UI ]
             │
             │  1. HTTP Request (e.g., GET /projects or POST /projects)
             ▼
  [ public/index.php & HTTP Kernel ]
             │
             │  2. Global Middleware (CORS, Sessions, HandleInertiaRequests)
             ▼
  [ routes/web.php ]  ──> Route::resource('projects', ProjectController::class)
             │
             │  3. Dispatches to Controller Method (e.g. index(), store(), update())
             ▼
  [ ProjectController ]
             │
             ├──> 4a. Server-Side Validation ($request->validate($rules, $messages))
             │        └── If Fails: HTTP 302 Redirect back with Session Errors ($errors prop)
             │
             ├──> 4b. Eloquent ORM Query / Database Operations (Project::create / update / delete)
             │        └── SQLite Database executes SQL query
             │
             │  5. Return Inertia::render('Projects/Index', ['projects' => $projects])
             ▼
  [ Inertia Laravel Adapter ]
             │
             ├── Initial Page Visit: Renders resources/views/app.blade.php with data-page JSON
             └── Subsequent Visit: Returns JSON response with component name and updated props
             ▼
  [ Vite Bundler / Client Runtime (resources/js/app.jsx) ]
             │
             │  6. Resolves React Page component (e.g., Pages/Projects/Index.jsx)
             ▼
  [ React Component Tree (Inertia React) ]
             │
             │  7. Re-renders UI with new props, displays flash alerts & validation errors
             ▼
  [ Screen Updated for User ]
```

### 6.2 Key Oral Defense Questions & Model Answers

#### Q1: "How does Inertia.js differ from building a traditional Blade app vs. a decoupled REST API + React SPA?"
> **Answer:**  
> In a traditional Blade app, every link click or form submission triggers a full browser page reload, which flashes the screen and destroys client state.  
> In a decoupled REST API + React SPA, you must manually write REST endpoints, handle authentication tokens (Sanctum/JWT), manage state libraries (Redux/Zustand), write client-side `fetch`/`axios` calls, and manually map validation errors.  
> **Inertia.js gives us the best of both worlds:** We write standard Laravel controllers returning `Inertia::render('Component', $data)`, and Inertia intercepts link clicks and form submissions via XHR. The browser never does a full page reload, yet we write zero client-side fetch boilerplate or API token logic.

#### Q2: "Why did you use `Rule::unique()->ignore($project->id)` in your `update` method?"
> **Answer:**  
> The project `title` has a `unique:projects,title` constraint. When creating a project, Laravel checks if any record in the table already has that title. However, when an existing project is being edited (e.g., updating its description or tech stack without changing the title), a standard unique rule would check the database, find the project's *own* existing record, and mistakenly reject the update as a duplicate.  
> Using `Rule::unique('projects', 'title')->ignore($project->id)` tells the database validator: *"Check all records EXCEPT the one currently being updated."*

#### Q3: "How are validation errors preserved and displayed without clearing user input?"
> **Answer:**  
> When validation fails in Laravel, it automatically flashes `$request->all()` into the session as flashed input (`old()`). Inertia's `useForm` hook maintains the local React component state (`data`), while receiving the returned `$errors` dictionary into the component props. Because the form fields are controlled components bound to `data[name]`, the user's typed values remain intact, and the corresponding error message from `errors[name]` renders directly below the input via `<FormField>`.
