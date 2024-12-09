<?php

// app/Http/Controllers/LeadFlowController.php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadFlowController extends Controller
{

    /**
     * 
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:5000',
        ]);
    
        Lead::create($validated);
    
        return redirect()->back()->with('success', 'Lead created successfully!');
    }
    


}
