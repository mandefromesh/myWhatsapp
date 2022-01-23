<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = auth()->user();
        $user_session = $user->wpp_session;
        $user_token = $user->wpp_token;
        if($user_token == "" || $user_session == ""){
            return redirect()->route('wpp.index');
        }
        
        session(['token' => $user_token]);
        session(['session' => $user_session]);

        //return view('home');
        return redirect()->route('wpp.chat');
        //return view('wpp.contact');
    }
}
