import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store/ConfigStore';

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
