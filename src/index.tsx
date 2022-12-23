import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export const history: any = createBrowserHistory()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HistoryRouter history={history}>
    <Provider store={store}>
    <ToastContainer
       theme="dark"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
      <App />
    </Provider>
  </HistoryRouter>
);


