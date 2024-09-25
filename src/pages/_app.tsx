import type { AppProps } from 'next/app';
import { Provider } from 'effector-react';
import { Layout } from '../modules/Layout';
import { ThemeProvider } from '../context/ThemeContext';
import { LocalizationProvider } from '../context/LocalizationContext';
import { TodoProvider } from '../context/TodoContext';
import { useScope } from '../shared/lib/ssr';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const scope = useScope(pageProps.initialState);

    return (
        <ThemeProvider>
            <LocalizationProvider>
                <TodoProvider>
                    <Provider value={scope}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Provider>
                </TodoProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default MyApp;
