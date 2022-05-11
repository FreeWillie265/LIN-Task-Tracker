import ReactDOM from 'react-dom';
import App from './components/App';

if (document.getElementById('taskApp')) {
    ReactDOM.render(<App />, document.getElementById('taskApp'));
}
