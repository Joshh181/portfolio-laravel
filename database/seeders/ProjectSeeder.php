<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Personal Portfolio Website',
                'description' => 'Interactive personal portfolio built with modern aesthetics, custom responsive animations, interactive Monkeytype typing speed test, and visitor analytics.',
                'tech_stack' => 'Laravel, Inertia.js, React, Tailwind CSS',
                'project_url' => 'https://joshua-lumactod.vercel.app/',
                'repository_url' => 'https://github.com/Joshh181',
                'image' => null,
                'date_completed' => '2026-10-09',
            ],
            [
                'title' => 'Whack-a-Mole Mobile Game',
                'description' => 'Engaging and fast-paced mobile arcade game featuring responsive touch controls, persistent real-time high-score leaderboards, and sound effects.',
                'tech_stack' => 'Flutter, Dart, Supabase',
                'project_url' => 'https://whack-a-mole-theta-one.vercel.app',
                'repository_url' => 'https://github.com/Joshh181',
                'image' => null,
                'date_completed' => '2026-08-15',
            ],
            [
                'title' => 'SnapSched AI',
                'description' => 'Academic timetable and schedule generation engine with smart conflict detection, automated course planning, and timetable exports.',
                'tech_stack' => 'React, Supabase, Tailwind CSS, Vite',
                'project_url' => 'https://snapschedai.vercel.app/',
                'repository_url' => 'https://github.com/Joshh181',
                'image' => null,
                'date_completed' => '2026-09-20',
            ],
            [
                'title' => 'Low-Poly 3D Character & Environment Designs',
                'description' => 'Collection of original 3D game-ready models, environmental assets, and isometric dioramas crafted with custom materials and lighting.',
                'tech_stack' => 'Blender, 3D Modeling, PBR Texturing',
                'project_url' => null,
                'repository_url' => 'https://github.com/Joshh181',
                'image' => null,
                'date_completed' => '2026-07-10',
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['title' => $project['title']],
                $project
            );
        }
    }
}
