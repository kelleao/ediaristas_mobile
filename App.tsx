import 'data/services/RNEnv';
import 'data/services/RNPolyfills';
import React from 'react';
import Router from './src/ui/router/Router';
import ThemeProvider from './src/ui/themes/ThemeProvider';

export default function App() {
    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    );
}
