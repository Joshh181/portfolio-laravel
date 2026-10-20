<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

// Public Portfolio View with Dynamic Projects Section
Route::get('/', [PortfolioController::class, 'index'])->name('portfolio');

// Resource Routes for Projects CRUD
Route::resource('projects', ProjectController::class);
