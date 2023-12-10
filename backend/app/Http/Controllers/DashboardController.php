<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {
        $total_doctor = User::where("role", "doctor")->count();
        $total_pacient = User::where("role", "pacient")->count();

        $data = [
            "doctor" => $total_doctor,
            "pacient" => $total_pacient
        ];
        return view("dashboard", $data);
    }

    public function create() {
        return view("adddoctor");
    }

    public function doctor() {
        $doctors = User::where("role", "doctor")->get();
        $data = [
            "doctors" => $doctors
        ];

        return view("listdoctor", $data);
    }

    public function store(Request $request) {
        $credentials = $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required",
            "gender" => "required",
            "address" => "required",
            "photo" => "required|image"
        ]);

        
        if($request->hasFile('photo')) {
            $filename = strtotime('now').$request->file('photo')->getClientOriginalName();
            $request->file('photo')->move('photos/', $filename);
        }

        try {
            User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => bcrypt($request->password),
                "gender" => $request->gender,
                "address" => $request->address,
                "role" => "doctor",
                "photo" => $filename
            ]);
            return redirect('/register')->with('success', 'Data berhasil ditambahkan!');
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
