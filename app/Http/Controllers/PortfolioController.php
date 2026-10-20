<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Display the public portfolio page with dynamic projects from the database.
     */
    public function index(): Response
    {
        $projects = Project::query()
            ->latest('date_completed')
            ->get();

        return Inertia::render('Portfolio', [
            'projects' => $projects,
        ]);
    }
}
