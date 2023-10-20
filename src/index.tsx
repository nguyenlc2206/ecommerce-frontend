// * import libs
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

// * import thirth party
import * as serviceWorker from '@ecommerce-frontend/src/serviceWorker';
import reportWebVitals from '@ecommerce-frontend/src/reportWebVitals';

// * import projects
import App from '@ecommerce-frontend/src/App';
import { persister, store } from '@ecommerce-frontend/src/infras/data/store';
import { ConfigProvider } from '@ecommerce-frontend/src/common/contexts/config';
import { BASE_PATH } from '@ecommerce-frontend/src/config';

// * import scss + assets
import '@ecommerce-frontend/src/assets/scss/style.scss';

// ==============================|| REACT DOM RENDER ||============================== //

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
            <ConfigProvider>
                <BrowserRouter basename={BASE_PATH}>
                    <App />
                </BrowserRouter>
            </ConfigProvider>
        </PersistGate>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
