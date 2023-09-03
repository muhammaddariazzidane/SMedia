<?php

namespace App\Http\Controllers\socialite;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GithubController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }
    public function callback($provider)
    {
        try {
            $githubUser = Socialite::driver($provider)->user();
            $findUser = User::where('email', $githubUser->email)->first();
            if (!$findUser) { //jika usernya belum pernah daftar
                $data = [
                    'github_id' => $githubUser->id,
                    'name' => $githubUser->name,
                    'email' => $githubUser->email,
                    'avatar' => $githubUser->avatar,
                    'auth_type' => 'github',
                    'password' => 'logingithub',
                ];
                $data['password'] = Hash::make($data['password']);

                $newUser = User::create($data);

                Auth::login($newUser);

                return redirect()->intended('/dashboard');
            } elseif (!$findUser->auth_type) { //user nya ada tapi tidak login dengan github
                $findUser->update([
                    'github_id' => $githubUser->id,
                    'avatar' => $githubUser->avatar,
                    'auth_type' => 'github',
                ]);
                Auth::login($findUser, true);

                return redirect()->intended('/dashboard');
            } else {
                Auth::login($findUser);
                return redirect()->intended('/dashboard');
            }
        } catch (\Exception $th) {
            throw $th;
        }
    }

}
