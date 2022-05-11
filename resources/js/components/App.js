import React from 'react';
import Example from './Example';
function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        {/* Components goes here */}
                        <Example />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
