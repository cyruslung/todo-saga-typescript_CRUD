import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../store/configureStore";
import "../app/globals.css";

const { store, persistor } = configureStore();

interface MyAppProps {
    Component: React.ComponentType;
    pageProps: any;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
