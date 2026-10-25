# 🔴 Segment 6: Live Change (Step-by-Step Live Guide)

> **Rule from Teacher (Giobet T. Aban):**  
> *"Without cutting the video, add one new field with a validation rule (migration, model, validation, form input) and show it working."*

We will add a new field called **`client_name`** (e.g., *"Acme Corp"*, *"School Project"*, or *"Personal"*).  
It takes **less than 90 seconds** when following these exact steps.

---

## 📋 Quick Cheat Sheet (Keep this open or on a second screen)

```text
[1] Terminal:
php artisan make:migration add_client_name_to_projects_table --table=projects

[2] Migration file inside up():
$table->string('client_name', 100)->nullable()->after('tech_stack');

[3] Terminal:
php artisan migrate

[4] app/Models/Project.php ($fillable):
'client_name',

[5] app/Http/Controllers/ProjectController.php ($validated in store AND update):
'client_name' => ['nullable', 'string', 'max:100'],

[6] resources/js/Components/ProjectForm.jsx:
1. In useForm: client_name: project?.client_name || '',
2. In JSX:
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

---

## 🎬 Live Step-by-Step Walkthrough

### 🗣️ Spoken Intro (Say this to the camera):
> *"Now for Segment 6, the Live Change. Without cutting or pausing the recording, I am going to add a new field called `client_name` across the entire stack—database migration, Eloquent model, server validation rule, and React form input."*

---

### Step 1: Create the Migration
1. In VS Code, open the built-in terminal (press `Ctrl + ` `~``).
2. Type and run:
   ```bash
   php artisan make:migration add_client_name_to_projects_table --table=projects
   ```
3. Look at the terminal output. It will say:
   `INFO Created migration: ..._add_client_name_to_projects_table.php`

---

### Step 2: Edit the Migration File
1. In VS Code Explorer, open `database/migrations/` and click the newest file:  
   `xxxx_xx_xx_xxxxxx_add_client_name_to_projects_table.php`.
2. Inside `public function up(): void`, add this single line:
   ```php
   $table->string('client_name', 100)->nullable()->after('tech_stack');
   ```
3. Save the file (`Ctrl + S`).
4. In your terminal, run the migration:
   ```bash
   php artisan migrate
   ```
5. *(You will see `Running migrations: ... DONE`)*.

---

### Step 3: Update the Eloquent Model
1. In VS Code Explorer, open `app/Models/Project.php`.
2. Look for `protected $fillable = [`.
3. Add `'client_name',` right after `'tech_stack',`:
   ```php
   protected $fillable = [
       'title',
       'description',
       'tech_stack',
       'client_name', // <-- ADD THIS LINE
       'project_url',
       'repository_url',
       'image',
       'date_completed',
   ];
   ```
4. Save the file (`Ctrl + S`).

---

### Step 4: Add Server-Side Validation in Controller
1. In VS Code Explorer, open `app/Http/Controllers/ProjectController.php`.
2. Scroll to `public function store(Request $request)` (around line 55).
3. In `$request->validate([`, add the rule for `client_name`:
   ```php
   'tech_stack' => ['required', 'string', 'max:150'],
   'client_name' => ['nullable', 'string', 'max:100'], // <-- ADD THIS
   'project_url' => ['nullable', 'url', 'max:255'],
   ```
4. Do the same in `public function update(Request $request, Project $project)` (around line 115):
   ```php
   'tech_stack' => ['required', 'string', 'max:150'],
   'client_name' => ['nullable', 'string', 'max:100'], // <-- ADD THIS
   'project_url' => ['nullable', 'url', 'max:255'],
   ```
5. Save the file (`Ctrl + S`).

---

### Step 5: Add Form Input in React Component
1. In VS Code Explorer, open `resources/js/Components/ProjectForm.jsx`.
2. **Part A — Form State:** Scroll to `useForm({` (around line 15). Add `client_name`:
   ```javascript
   const { data, setData, post, put, processing, errors, reset } = useForm({
       title: project?.title || '',
       description: project?.description || '',
       tech_stack: project?.tech_stack || '',
       client_name: project?.client_name || '', // <-- ADD THIS
       project_url: project?.project_url || '',
       repository_url: project?.repository_url || '',
       date_completed: project?.date_completed || '',
       image: null,
   });
   ```
3. **Part B — Input Field:** Scroll down to the JSX form fields. Right below the `Tech Stack` `<FormField>`, paste:
   ```jsx
   <FormField
       label="Client / Organization"
       name="client_name"
       error={errors.client_name}
       hint="Optional client or company name (max 100 characters)"
   >
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
4. Save the file (`Ctrl + S`).

---

### Step 6: Test and Show it Working in the Browser
1. Switch to your Chrome browser tab at `http://127.0.0.1:8000/projects/create`.
2. Press **Refresh** (`F5` or `Ctrl + R`).
3. **Point out the new field:**
   > *"As you can see, the new **'Client / Organization'** field is now live on our form without any errors."*
4. Fill out a quick project to demonstrate:
   - **Title:** `Cloud Infrastructure Monitor`
   - **Description:** `Real-time cloud server monitoring tool with automated Slack alert webhooks.`
   - **Tech Stack:** `Go, Docker, Prometheus`
   - 👉 **Client / Organization:** `AWS Solutions Corp`
   - **Date Completed:** Today's date
5. Click **"Create Project"**.
6. Green banner appears: *'Project created successfully!'*
7. Click **"Edit"** on `Cloud Infrastructure Monitor` to show that `AWS Solutions Corp` was saved into the database and pre-filled into the form!

### 🗣️ Spoken Outro (Say this to the camera):
> *"And there it is! In less than two minutes, we executed a migration, registered the model attribute, enforced server validation, connected it to the React state, and proved it saves and pre-populates seamlessly from the database. That concludes Segment 6!"*

---

## 🔄 How to Practice and Reset (Before your final recording)

If you want to practice this step before recording your real video:
1. Run this in terminal to undo the migration:
   ```bash
   php artisan migrate:rollback --step=1
   ```
2. Delete the created migration file in `database/migrations/`.
3. Revert the edits in `Project.php`, `ProjectController.php`, and `ProjectForm.jsx` (or run `git checkout .`).
4. You are back to a clean state ready to record!
