import React from 'react';
import Example from './Example';
import TaskList from './TaskList';
function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        {/* Components goes here */}
                        <TaskList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
