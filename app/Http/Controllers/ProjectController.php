<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects with optional search filter.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $projects = Project::query()
            ->when($search, function ($query, $term) {
                $query->where(function ($q) use ($term) {
                    $q->where('title', 'like', "%{$term}%")
                      ->orWhere('description', 'like', "%{$term}%")
                      ->orWhere('tech_stack', 'like', "%{$term}%");
                });
            })
            ->latest('date_completed')
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => [
                'search' => $search ?? '',
            ],
            'totalCount' => Project::count(),
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:100', 'unique:projects,title'],
            'description' => ['required', 'string', 'min:10', 'max:1000'],
            'tech_stack' => ['required', 'string', 'max:150'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
        ], [
            'title.required' => 'Please provide a descriptive title for your project.',
            'title.max' => 'Project title must not exceed 100 characters.',
            'title.unique' => 'A project with this title already exists in your portfolio.',
            'description.required' => 'A detailed project description is required.',
            'description.min' => 'The project description must be at least 10 characters long to be informative.',
            'description.max' => 'The project description must not exceed 1000 characters.',
            'tech_stack.required' => 'Please list the primary technologies or tools used (e.g. React, Tailwind CSS).',
            'tech_stack.max' => 'Tech stack list must not exceed 150 characters.',
            'project_url.url' => 'The live demo link must be a valid URL starting with http:// or https://.',
            'repository_url.url' => 'The repository link must be a valid URL starting with http:// or https://.',
            'image.image' => 'The uploaded file must be a valid image file.',
            'image.mimes' => 'The project image must be a file of type: jpeg, png, jpg, or webp.',
            'image.max' => 'The project image file size cannot exceed 2MB (2048 KB).',
            'date_completed.required' => 'Please specify the project completion or release date.',
            'date_completed.date' => 'The completion date must be a valid calendar date format (YYYY-MM-DD).',
            'date_completed.before_or_equal' => 'Project completion date cannot be set in the future.',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = $path;
        }

        Project::create($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully!');
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:100',
                Rule::unique('projects', 'title')->ignore($project->id),
            ],
            'description' => ['required', 'string', 'min:10', 'max:1000'],
            'tech_stack' => ['required', 'string', 'max:150'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
        ], [
            'title.required' => 'Please provide a descriptive title for your project.',
            'title.max' => 'Project title must not exceed 100 characters.',
            'title.unique' => 'A project with this title already exists in your portfolio.',
            'description.required' => 'A detailed project description is required.',
            'description.min' => 'The project description must be at least 10 characters long to be informative.',
            'description.max' => 'The project description must not exceed 1000 characters.',
            'tech_stack.required' => 'Please list the primary technologies or tools used (e.g. React, Tailwind CSS).',
            'tech_stack.max' => 'Tech stack list must not exceed 150 characters.',
            'project_url.url' => 'The live demo link must be a valid URL starting with http:// or https://.',
            'repository_url.url' => 'The repository link must be a valid URL starting with http:// or https://.',
            'image.image' => 'The uploaded file must be a valid image file.',
            'image.mimes' => 'The project image must be a file of type: jpeg, png, jpg, or webp.',
            'image.max' => 'The project image file size cannot exceed 2MB (2048 KB).',
            'date_completed.required' => 'Please specify the project completion or release date.',
            'date_completed.date' => 'The completion date must be a valid calendar date format (YYYY-MM-DD).',
            'date_completed.before_or_equal' => 'Project completion date cannot be set in the future.',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image && Storage::disk('public')->exists($project->image)) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        } else {
            // Keep existing image if no new file provided
            unset($validated['image']);
        }

        $project->update($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully!');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Project $project)
    {
        if ($project->image && Storage::disk('public')->exists($project->image)) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully!');
    }
}
