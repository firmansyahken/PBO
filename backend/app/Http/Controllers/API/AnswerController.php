<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnswerCollection;
use App\Http\Resources\AnswerResource;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AnswerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function show($id) {
        $answers = Answer::with("user")->where("question_id", $id)->simplePaginate(10);
        return new AnswerCollection($answers);
    }

    public function store(Request $request, $id) {
        $validation = Validator::make($request->all(),[
            "answer" => "required"
        ]);

        if($validation->fails()) {
            return response()->json(["message" => $validation->errors()]);
        }

        try {
            $user = Auth::user(); 
            $answer = Answer::create([
                "question_id" => $id,
                "user_id" => $user->id,
                "answer" => $request->answer
            ]);

            if($user->role === "doctor") {
                Question::find($id)->update([
                    "status" => "responded"
                ]);
            }

            return response()->json([
                "message" => "Success",
                "data" => [
                    "name" => $user->name,
                    "answer" => $request->answer,
                    "photo" => $user->photo,
                    "time" => $answer->created_at->format("Y-m-d")
                ]
            ]);
        } catch (QueryException $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}
