<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Group;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GroupControllerTest extends TestCase
{
    use WithFaker;

    public function testGroupCreated()
    {
        $expected = [
            'group_name' => 'Unassinged'
        ];
        $response = $this->json('POST', '/api/groups', $expected);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($expected);

    }

    public function testGroupRetrieved()
    {
        $group = factory('App\Models\Group')->create();

        $response = $this->json('GET', '/api/groups/' . $group->id);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'group_name'
                ]
            ]);
    }

    public function testAllGroupsRetrieved()
    {
        $group = factory('App\Models\Group', 25)->create();

        $response = $this->json('GET', '/api/groups');
        $response
            ->assertStatus(200)
            ->assertJsonCount(25, 'data');
    }

    public function testNoGroupRetrieved()
    {
        $group = factory('App\Models\Group')->create();
        Group::destroy($group->id);

        $response = $this->json('GET', '/api/groups/' . $group->id);
        $response->assertStatus(404);
    }

    public function testGroupUpdated()
    {
        $group = factory('App\Models\Group')->create();

        $updated_group_name = $this->faker->firstName();
        $response = $this->json('PUT', '/api/groups/' . $group->id, [
            'group_name' => $updated_group_name
        ]);
        $response->assertStatus(204);

        $updatedGroup = Group::find($group->id);
        $this->assertEquals($updated_group_name, $updatedGroup->group_name);
    }

    public function testGroupDeleted()
    {
        $group = factory('App\Models\Group')->create();

        $deleteResponse = $this->json('DELETE', '/api/groups/' . $group->id);
        $deleteResponse->assertStatus(204);

        $response = $this->json('GET', '/api/groups/' . $group->id);
        $response->assertStatus(404);

    }
}
