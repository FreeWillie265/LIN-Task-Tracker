<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Notifications\TaskAssignedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Task::orderBy('id', 'DESC')->get());
    }

    public function getUserTasks() {
        $userId = Auth::user()->id;
        $tasks = Task::where('assignedUser', $userId)->orderBy('id', 'DESC')->with('user')->get();

        return response()->json($tasks);
    }

    /**
     * Toggle the completion status of a task.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function toggleCompletionStatus($id, Request $request)
    {
        $task = Task::find($id);
        $task->completionStatus = $request->status;
        $task->save();
        return response($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->dueDate = $request->dueDate;

        $user = User::find($request->assignedUser);

        $user->tasks()->save($task);

        Notification::send($user, new TaskAssignedNotification($user->name));

        return response($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        $assignedUser = $task->assignedUser;
        $task->title = $request->title;
        $task->description = $request->description;
        $task->dueDate = $request->dueDate;
        $task->completionStatus = $request->completionStatus;
        $task->assignedUser = $request->assignedUser;

        $task->save();

        if ($assignedUser != $request->assignedUser){
            $user = User::find($request->assignedUser);
            Notification::send($user, new TaskAssignedNotification($user->name));
        }

        return response("Task updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Task::destroy($id);

        return response("Task deleted successfully");
    }
}
