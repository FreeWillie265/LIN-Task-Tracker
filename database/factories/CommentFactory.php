<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'content' => $this->faker->paragraph(1),
            'user_id' => $this->faker->numberBetween(1, 10),
            'task_id' => $this->faker->numberBetween(1, 50)
        ];
    }
}
