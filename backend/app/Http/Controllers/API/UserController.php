<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "name" => "required|min:3",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:4",
            "gender" => "required",
            "address" => "required",
            "photo" => "required|image",
        ]);

        if ($validation->fails()) {
            return response()->json(["message" => $validation->errors()], 422);
        }

        $filename = $this->uploadPhoto($request);

        try {
            User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => bcrypt($request->password),
                "gender" => $request->gender,
                "address" => $request->address,
                "role" => "pacient",
                "photo" => $filename,
            ]);

            return response()->json(["message" => "Success Registration"], 201);
        } catch (QueryException $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function authentication(Request $request)
    {
        $credentials = Validator::make($request->all(), [
            "email" => "required",
            "password" => "required",
        ]);

        if ($credentials->fails()) {
            return response()->json(["message" => $credentials->errors()], 422);
        }

        if (!Auth::attempt($request->only("email", "password"))) {
            return response()->json(["message" => "Invalid Credentials"], 401);
        }

        $user = Auth::user();
        $token = $user->createToken("auth")->plainTextToken;
        $response = [
            'message' => 'Login Success',
            'token' => $token,
            'data' => $user,
        ];

        return response()->json($response, 200);
    }

    public function updateProfile(Request $request) {
        $credentials = Validator::make($request->all(), [
            "name" => "required",
            "address" => "required",
            "gender" => "required"
        ]);

        if($credentials->fails()) {
            return response()->json(["message" => $credentials->errors()]);
        }

        try {
            $user = Auth::user();
            User::where("id",$user->id)->update($request->all());
            $response = [
                "message" => "Update Success",
                "data" => User::where("id", $user->id)->first()
            ];
            return response()->json($response);
        } catch (QueryException $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function updatePhoto(Request $request) {
        $validation = Validator::make($request->all(),[
            "photo" => "required"
        ]);

        if($validation->fails()) {
            return response()->json(["mesage" => $validation->errors()]);
        }

        try {
            $user = Auth::user();
            if(File::exists('photos/'.$user->photo)) {
                File::delete('photos/'.$user->photo);
            }

            $filename = $this->uploadPhoto($request);
            User::find($user->id)->update([
                "photo" => $filename
            ]);

            $response = [
                "message" => "Update Success",
                "data" => User::find($user->id)->first()
            ];

            return response()->json($response);

        } catch (QueryException $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json(['message' => 'Logout Success'], 200);
    }

    public function profile()
    {
        return response()->json(Auth::user());
    }

    private function uploadPhoto(Request $request)
    {
        $filename = strtotime('now') . $request->file('photo')->getClientOriginalName();
        $request->file('photo')->move('photos/', $filename);

        return $filename;
    }
}
