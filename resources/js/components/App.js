import React from 'react';
import Example from './Example';
import TaskList from './TaskList';
import {Provider} from 'react-redux';
import store from '../store/store';
function App() {
    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
