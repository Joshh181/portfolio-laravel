# Video Demonstration Script & Flow Guide
**Midterm Laboratory Activity: Portfolio CRUD with Validation**
**Student:** Joshua C. Lumactod | **Section:** BSIT 3 - BLOCK 4 | **Instructor:** Giobet T. Aban

---

## 🎬 Recording Setup & Tips
- **Total Recommended Duration:** 7 – 9 minutes.
- **Audio:** Clear voiceover with screen recording (showing your face with webcam is encouraged).
- **Preparation before hitting Record:**
  1. Have terminal running: `php artisan serve` at `http://127.0.0.1:8000`.
  2. Have browser tabs open:
     - Tab 1: `http://127.0.0.1:8000` (Public Portfolio)
     - Tab 2: `http://127.0.0.1:8000/projects` (Projects CRUD Index)
  3. Have VS Code open displaying your project files.
- **Tone:** Conversational, confident, speaking like a developer explaining their work.

---

## ⏱️ Video Flow Outline
| Segment | Content | Duration |
| :--- | :--- | :--- |
| **Segment 1** | Introduction & Section Justification | ~45 sec |
| **Segment 2** | VS Code Folder Structure Tour | ~1 min |
| **Segment 3** | Code Walkthrough & Laravel + Inertia Request Flow | ~2 min |
| **Segment 4** | Live CRUD Demo (Create, Read, Update, Delete) | ~2 min |
| **Segment 5** | Validation Error Demo (Deliberate invalid tests) | ~1.5 min |
| **Segment 6** | Live Change (Add a new field live without cutting) | ~1.5 min |
| **Conclusion** | Defense Questions & Wrap-up | ~45 sec |

---

## 🎙️ Segment-by-Segment Script & Screen Actions

### 🟢 Segment 1: Introduction (~45 seconds)
> **[On Screen]:** Open browser tab showing your public portfolio homepage (`http://127.0.0.1:8000`). Scroll down to the **"Recent Projects"** dynamic section.

**Say naturally:**
> "Good day, sir Giobet! My name is Joshua C. Lumactod from BSIT 3 - Block 4, and this is my video demonstration for our Midterm Laboratory Activity in IT ELEC01 — Advanced Web Development.
> 
> For this activity, I converted my static personal portfolio into a full-stack Laravel 11 application using Inertia.js, React, and Tailwind CSS.
> 
> The section I chose to make dynamic is the **Recent Projects** section right here. I chose this section because as a software developer, my projects, hackathon prototypes, and repositories change constantly. Instead of opening source code and rebuilding frontend assets every time I finish a new project, managing projects through a database allows me to add, edit, or remove them in seconds via an admin dashboard, keeping the public showcase always up to date."

---

### 🟢 Segment 2: Folder Structure Tour (~1 minute)
> **[On Screen]:** Switch to VS Code. Collapse and expand the Explorer sidebar to highlight the exact folders.

**Say naturally:**
> "Now let me give you a quick walkthrough of the project's folder structure in VS Code:
> 
> 1. Under `database/migrations/`, here is our migration file: `create_projects_table.php`, which sets up the SQLite schema and constraints.
> 2. In `app/Models/`, we have our Eloquent model: `Project.php`, with protected fillable attributes and date casting.
> 3. In `app/Http/Controllers/`, we have:
>    - `PortfolioController.php` for fetching database records for the public portfolio.
>    - `ProjectController.php`, which is our dedicated resource controller handling all 6 CRUD actions and server validation.
> 4. In `routes/web.php`, we register the public view and `Route::resource('projects', ProjectController::class)`.
> 5. Moving to the frontend under `resources/js/`:
>    - In `Pages/Projects/`, we have `Index.jsx`, `Create.jsx`, and `Edit.jsx`.
>    - In `Components/`, we have our reusable building blocks: `ProjectForm.jsx` shared by Create and Edit, `FormField.jsx` for standardized labels and inline error rendering, `DeleteModal.jsx` for delete confirmation, and `FlashMessage.jsx` for status alerts."

---

### 🟢 Segment 3: Code Explanation & Request Flow (~2 minutes)
> **[On Screen]:** Open `routes/web.php`, then `ProjectController.php`, then `ProjectForm.jsx`.

**Say naturally:**
> "Let's walk through how a request flows through the application from the route all the way to the React page:
> 
> 1. **Routes:** When a user visits `/projects`, `routes/web.php` maps the request to `ProjectController@index`.
> 2. **Controller Query:** The controller executes an Eloquent query on the `Project` model, applying optional search filters, and orders records by the latest completion date.
> 3. **Inertia Response:** Instead of a traditional Blade view or a JSON API endpoint, Laravel returns `Inertia::render('Projects/Index', ['projects' => $projects])`.
> 4. **Client-side Hydration:** Inertia passes the database records directly as props into our React `Index.jsx` page component without doing a full page refresh.
> 5. **Store / Update Flow:** When submitting the form, Inertia sends an XHR request to `store` or `update`. In the controller, `$request->validate()` verifies all rules:
>    - If validation passes, the record is saved to the SQLite database, uploaded images are stored in `storage/app/public/projects`, and the controller redirects to `projects.index` with a flash session message.
>    - If validation fails, Laravel halts execution, flashes the user's typed inputs to `old()`, and returns the error dictionary into Inertia props without reloading the page, displaying red error text under the exact offending input."

---

### 🟢 Segment 4: Live CRUD Demonstration (~2 minutes)
> **[On Screen]:** Open browser at `http://127.0.0.1:8000/projects`.

**Step 1: Create**
> **[Action]:** Click **"+ Add New Project"** button.
> - Title: `AI Task Automator`
> - Description: `Intelligent workflow automation engine with automated task scheduling and Slack integration.`
> - Tech Stack: `Python, FastAPI, Redis, React`
> - Project URL: `https://aitaskautomator.example.com`
> - Date Completed: Select yesterday's date.
> - Image: Upload a screenshot/image.
> - Click **"Create Project"**.

**Say naturally:**
> "Let's create a new project. Notice the smooth redirect and the green notification banner: *'Project created successfully!'* The new record appears immediately in our table."

**Step 2: Read / Public Portfolio Verification**
> **[Action]:** Switch to the Public Portfolio tab (`http://127.0.0.1:8000/#projects`) and refresh.

**Say naturally:**
> "Now let's verify the public portfolio page. As you can see, `AI Task Automator` is now dynamically displayed on the live public portfolio with its tech stack badges and links—backed directly by the database."

**Step 3: Edit**
> **[Action]:** Go back to `/projects`, click **"Edit"** on `AI Task Automator`. Change title to: `AI Task Automator Pro` and click **"Update Project"**.

**Say naturally:**
> "Let's edit the record. The form pre-populates all existing data. We'll update the title to *AI Task Automator Pro* and save. Notice the update succeeded seamlessly because on update, our unique rule uses `Rule::unique()->ignore($project->id)` to prevent false duplicate errors against itself."

**Step 4: Delete**
> **[Action]:** Click **"Delete"** button on that record. Show the modal popping up. Click **"Cancel"** first to demonstrate safety, then click **"Delete"** and confirm.

**Say naturally:**
> "For deletion, clicking delete triggers our custom Delete Confirmation Modal. This prevents accidental data loss. When I confirm, the record and its thumbnail are cleaned up from disk and removed from the database, displaying our deletion success banner."

---

### 🟢 Segment 5: Validation Error Demo (~1.5 minutes)
> **[On Screen]:** Go to `http://127.0.0.1:8000/projects/create`.

**Test 1: Empty Form Submission**
> **[Action]:** Leave everything blank and click **"Create Project"**.

**Say naturally:**
> "Now let's demonstrate our server-side validation rules. First, I will submit the form completely blank.
> As you can see, every required field immediately shows a clear, custom error message: title required, description required, tech stack required, and date required. The page did not reload, and the UI remains fully interactive."

**Test 2: Invalid URL & Future Date**
> **[Action]:** Type `my-invalid-url` in Demo Link, and pick a date in the year 2030. Click **"Create Project"**.

**Say naturally:**
> "Next, let's enter an invalid URL format without http, and pick a completion date in the future.
> The backend rejects both: displaying *'The live demo link must be a valid URL starting with http:// or https://'* and *'Project completion date cannot be set in the future.'* Notice that everything else I typed was retained in the form—the user never loses their progress."

**Test 3: Duplicate Title**
> **[Action]:** Type an existing project title: `Whack-a-Mole Mobile Game`. Click **"Create Project"**.

**Say naturally:**
> "Finally, if I attempt to create a project with a title that already exists in the portfolio, our unique rule rejects it with: *'A project with this title already exists in your portfolio.'*"

---

### 🟢 Segment 6: The Live Change without Cutting (~1.5 minutes)
> **[Important]:** The rubric requires: *"Without cutting the video, add one new field with a validation rule (migration, model, validation, form input) and show it working."*

Here is the cleanest 90-second live change: **Add a `client_name` field (Optional string, max: 100 characters)**.

#### Step 1: Migration in Terminal
> **[Action]:** In VS Code terminal, run:
```bash
php artisan make:migration add_client_name_to_projects_table --table=projects
```
> **[Action]:** Open the newly created migration file in `database/migrations/` and add inside `up()`:
```php
$table->string('client_name', 100)->nullable()->after('tech_stack');
```
> **[Action]:** In terminal, run:
```bash
php artisan migrate
```

#### Step 2: Add to Model
> **[Action]:** Open `app/Models/Project.php`, add `'client_name'` to `$fillable`:
```php
protected $fillable = [
    'title',
    'description',
    'tech_stack',
    'client_name', // <-- ADD THIS
    'project_url',
...
```

#### Step 3: Add to Controller Validation
> **[Action]:** Open `app/Http/Controllers/ProjectController.php`, add to `$validated` in `store` (and `update`):
```php
'client_name' => ['nullable', 'string', 'max:100'],
```

#### Step 4: Add to React Form
> **[Action]:** Open `resources/js/Components/ProjectForm.jsx`.
> 1. In `useForm({ ... })`, add: `client_name: project?.client_name || '',`
> 2. In JSX (right under Tech Stack), add:
```jsx
<FormField label="Client / Organization" name="client_name" error={errors.client_name}>
    <input
        type="text"
        id="client_name"
        value={data.client_name}
        onChange={(e) => setData('client_name', e.target.value)}
        className="form-input"
        placeholder="e.g. Acme Corp or Personal Project"
    />
</FormField>
```

#### Step 5: Test Live in Browser
> **[Action]:** Switch back to browser at `http://127.0.0.1:8000/projects/create`. Refresh.
> Show the new **"Client / Organization"** input. Enter `Acme Corp` and submit.
> Open SQLite or Edit to show `client_name` was saved!

**Say naturally:**
> "Without cutting the video, we just added a brand-new field called `client_name`. We generated and ran the database migration, updated the model's `$fillable` array, added the server validation rule in `ProjectController`, and bound it to our React `ProjectForm`.
> As you can see right here in the browser, the new field renders seamlessly, saves into SQLite, and validates properly!"

---

### 🟢 Conclusion & Quick Defense Q&A (~45 seconds)
> **[On Screen]:** Public portfolio page or your face on webcam.

**Say naturally:**
> "To conclude, here are brief answers to the core architectural questions:
> - **Why a separate resource controller?** To uphold the Single Responsibility Principle and avoid bloated route files.
> - **What routes does `Route::resource` create?** It registers all seven RESTful endpoints: index, create, store, show, edit, update, and destroy.
> - **What happens if we remove `$fillable`?** Laravel throws a `MassAssignmentException` to safeguard against malicious users injecting unauthorized fields.
> - **Why server-side validation?** Client-side HTML checks can be bypassed with Postman or by disabling JavaScript; server validation guarantees database integrity.
> - **How do errors reach React without a full reload?** Inertia intercepts form submissions via XHR, catches HTTP 302 validation redirects, and merges the session errors into component props.
> 
> Thank you very much, sir Giobet, for watching my demonstration!"

---
*End of Video Recording*
