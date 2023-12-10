<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AdminController extends Controller
{
    public function __construct() {
        $this->middleware('guest:admin')->except('logout'); 
    }
    public function login() {
        return view("login");
    }
    public function logout() {
        Session::flush();
        Auth::guard("admin")->logout();
        return redirect("/admin");
    }
    public function authentication(Request $request) {
        $credential = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        if(Auth::guard("admin")->attempt($credential)) {
            $request->session()->regenerate();
            return redirect("/dashboard");
        }
    }
}
