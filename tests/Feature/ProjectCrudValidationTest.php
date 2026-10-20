<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectCrudValidationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test Case 1: Submitting form with all fields empty.
     */
    public function test_submitting_all_fields_empty_fails_validation(): void
    {
        $response = $this->post(route('projects.store'), []);

        $response->assertSessionHasErrors([
            'title',
            'description',
            'tech_stack',
            'date_completed',
        ]);
    }

    /**
     * Test Case 2: Exceeding maximum length of title field (max: 100).
     */
    public function test_title_exceeding_maximum_length_fails_validation(): void
    {
        $longTitle = str_repeat('A', 101);

        $response = $this->post(route('projects.store'), [
            'title' => $longTitle,
            'description' => 'A valid project description with enough length.',
            'tech_stack' => 'Laravel, React',
            'date_completed' => '2026-10-01',
        ]);

        $response->assertSessionHasErrors(['title']);
    }

    /**
     * Test Case 3: Entering wrong data type or format (invalid URLs).
     */
    public function test_invalid_url_format_fails_validation(): void
    {
        $response = $this->post(route('projects.store'), [
            'title' => 'URL Test Project',
            'description' => 'Testing URL validation rules in Laravel controller.',
            'tech_stack' => 'Laravel, React',
            'project_url' => 'not-a-valid-url-format',
            'repository_url' => 'ftp-or-broken-string',
            'date_completed' => '2026-10-01',
        ]);

        $response->assertSessionHasErrors(['project_url', 'repository_url']);
    }

    /**
     * Test Case 4: Entering a duplicate value in a field that must be unique (title).
     */
    public function test_duplicate_title_fails_unique_rule_on_create(): void
    {
        Project::create([
            'title' => 'SnapSched AI',
            'description' => 'Original academic timetable engine.',
            'tech_stack' => 'React, Supabase',
            'date_completed' => '2026-09-01',
        ]);

        $response = $this->post(route('projects.store'), [
            'title' => 'SnapSched AI', // Duplicate title!
            'description' => 'Another copy attempt with duplicate title.',
            'tech_stack' => 'Vue, Firebase',
            'date_completed' => '2026-09-15',
        ]);

        $response->assertSessionHasErrors(['title']);
    }

    /**
     * Test Case 5: Updating a record without changing its unique field (must still save).
     */
    public function test_updating_record_without_changing_unique_title_passes_validation(): void
    {
        $project = Project::create([
            'title' => 'Whack a Mole',
            'description' => 'Engaging mobile arcade touch game.',
            'tech_stack' => 'Flutter, Dart',
            'date_completed' => '2026-08-01',
        ]);

        $response = $this->put(route('projects.update', $project->id), [
            'title' => 'Whack a Mole', // Same title retained on update
            'description' => 'Updated and expanded mobile game description.',
            'tech_stack' => 'Flutter, Dart, Supabase',
            'date_completed' => '2026-08-10',
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route('projects.index'));

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'description' => 'Updated and expanded mobile game description.',
            'tech_stack' => 'Flutter, Dart, Supabase',
        ]);
    }

    /**
     * Test Case 6: Uploading a file that is not an image, or exceeds 2MB.
     */
    public function test_uploading_non_image_or_oversized_file_fails_validation(): void
    {
        Storage::fake('public');

        // Non-image text document
        $fakeDoc = UploadedFile::fake()->create('document.pdf', 500, 'application/pdf');

        $response = $this->post(route('projects.store'), [
            'title' => 'PDF Upload Test',
            'description' => 'Testing file type mime rejection in controller.',
            'tech_stack' => 'PHP, Laravel',
            'image' => $fakeDoc,
            'date_completed' => '2026-10-01',
        ]);

        $response->assertSessionHasErrors(['image']);

        // Oversized image > 2048 KB (3000 KB)
        $oversizedImage = UploadedFile::fake()->image('huge.png')->size(3000);

        $response2 = $this->post(route('projects.store'), [
            'title' => 'Huge Image Test',
            'description' => 'Testing file size rejection in controller.',
            'tech_stack' => 'PHP, Laravel',
            'image' => $oversizedImage,
            'date_completed' => '2026-10-01',
        ]);

        $response2->assertSessionHasErrors(['image']);
    }

    /**
     * Test Case 7: Description below minimum 10 characters.
     */
    public function test_description_below_minimum_fails_validation(): void
    {
        $response = $this->post(route('projects.store'), [
            'title' => 'Short Desc Test',
            'description' => 'Short', // only 5 characters (min is 10)
            'tech_stack' => 'React',
            'date_completed' => '2026-10-01',
        ]);

        $response->assertSessionHasErrors(['description']);
    }

    /**
     * Test Case 8: Future date completion rejected.
     */
    public function test_future_completion_date_fails_validation(): void
    {
        $futureDate = date('Y-m-d', strtotime('+30 days'));

        $response = $this->post(route('projects.store'), [
            'title' => 'Future Project Test',
            'description' => 'Testing future date restriction rule.',
            'tech_stack' => 'Next.js',
            'date_completed' => $futureDate,
        ]);

        $response->assertSessionHasErrors(['date_completed']);
    }

    /**
     * Test Case 9: Full CRUD Lifecycle - Store, Public Render, Update, and Destroy.
     */
    public function test_complete_crud_lifecycle(): void
    {
        Storage::fake('public');

        $image = UploadedFile::fake()->image('project_banner.png', 600, 400);

        // 1. Create (Store)
        $storeResponse = $this->post(route('projects.store'), [
            'title' => 'Super Mario Clone',
            'description' => '2D retro platformer engine built from scratch.',
            'tech_stack' => 'C++, SDL2',
            'project_url' => 'https://example.com/demo',
            'repository_url' => 'https://github.com/Joshh181/mario',
            'image' => $image,
            'date_completed' => '2026-05-20',
        ]);

        $storeResponse->assertSessionHasNoErrors();
        $storeResponse->assertRedirect(route('projects.index'));
        $storeResponse->assertSessionHas('success', 'Project created successfully!');

        $this->assertDatabaseHas('projects', [
            'title' => 'Super Mario Clone',
        ]);

        $project = Project::where('title', 'Super Mario Clone')->first();
        $this->assertNotNull($project->image);
        Storage::disk('public')->assertExists($project->image);

        // 2. Read (Public Portfolio displays the project)
        $publicResponse = $this->get(route('portfolio'));
        $publicResponse->assertStatus(200);

        // 3. Update
        $updateResponse = $this->put(route('projects.update', $project->id), [
            'title' => 'Super Mario Clone Enhanced',
            'description' => 'Updated 2D retro platformer with custom physics.',
            'tech_stack' => 'C++, SDL2, OpenGL',
            'project_url' => 'https://example.com/demo-v2',
            'repository_url' => 'https://github.com/Joshh181/mario-v2',
            'date_completed' => '2026-06-01',
        ]);

        $updateResponse->assertSessionHasNoErrors();
        $updateResponse->assertRedirect(route('projects.index'));
        $updateResponse->assertSessionHas('success', 'Project updated successfully!');

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'title' => 'Super Mario Clone Enhanced',
        ]);

        // 4. Delete (Destroy)
        $destroyResponse = $this->delete(route('projects.destroy', $project->id));
        $destroyResponse->assertSessionHasNoErrors();
        $destroyResponse->assertRedirect(route('projects.index'));
        $destroyResponse->assertSessionHas('success', 'Project deleted successfully!');

        $this->assertDatabaseMissing('projects', [
            'id' => $project->id,
        ]);
        Storage::disk('public')->assertMissing($project->image);
    }
}
