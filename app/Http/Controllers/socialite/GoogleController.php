<?php

namespace App\Http\Controllers\socialite;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }
    public function callback($provider)
    {
        try {
            $googleUser = Socialite::driver($provider)->user();
            $findUser = User::where('email', $googleUser->email)->first();

            if (!$findUser) { //jika usernya belum pernah daftar
                $data = [
                    'google_id' => $googleUser->id,
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'avatar' => $googleUser->avatar,
                    'auth_type' => 'google',
                    'password' => 'logingoogle',
                ];
                $data['password'] = Hash::make($data['password']);

                $newUser = User::create($data);

                Auth::login($newUser);

                return redirect()->intended('/dashboard');
            } elseif (!$findUser->auth_type) { //user nya ada tapi tidak login dengan google
                $findUser->update([
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'auth_type' => 'google',
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
