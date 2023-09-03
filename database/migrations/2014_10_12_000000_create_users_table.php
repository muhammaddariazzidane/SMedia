<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->string('email', 50)->unique();
            $table->string('password', 128);
            $table->string('avatar', 128)->nullable()->default('default.jpg');
            $table->string('github_id', 50)->nullable();
            $table->string('google_id', 50)->nullable();
            $table->string('auth_type', 8)->nullable();
            $table->string('is_admin', 1)->default(false);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
