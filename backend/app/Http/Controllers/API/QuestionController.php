<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionCollection;
use App\Http\Resources\QuestionResource;
use App\Models\Question;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function question()
    {
        $user = Auth::user();
        $questions = $this->getQuestionsForUser($user);
        return new QuestionCollection($questions);
    }

    public function responded()
    {
        $user = Auth::user();
        $questions = $this->getQuestionsResponded($user);
        return new QuestionCollection($questions);
    }
    
    public function show($id) {
        $question = Question::with("user")->where("id", $id)->get();
        return new QuestionCollection($question);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "question" => "required"
        ]);

        if ($validation->fails()) {
            return response()->json($validation->errors(), 422);
        }

        try {
            $user = Auth::user();
            Question::create([
                "user_id" => $user->id,
                "question" => $request->question,
                "status" => "norespon"
            ]);

            return response()->json(["message" => "Success"], 201);
        } catch (QueryException $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    private function getQuestionsForUser($user)
    {
        return $user->role === "doctor" ? Question::with("user")->simplePaginate(6) : Question::where("user_id", $user->id)->simplePaginate(6);
    
    }
    private function getQuestionsResponded($user)
    {
        return $user->role === "doctor" ? Question::where("status", "responded")->simplePaginate(6) : Question::where("status", "responded")->where("user_id", $user->id)->simplePaginate(6);
    }
}
