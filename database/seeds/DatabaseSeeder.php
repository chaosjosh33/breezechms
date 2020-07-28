<?php

use Illuminate\Database\Seeder;
use App\Models\Group;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Group::create(['group_name' => 'Unassigned']);
    }
}
