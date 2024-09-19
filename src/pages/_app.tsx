import type { AppProps } from 'next/app';
import { Layout } from '../modules/Layout';
import { ThemeProvider } from '../context/ThemeContext';
import { LocalizationProvider } from '../context/LocalizationContext';
import { TodoProvider } from '../context/TodoContext';

const MyApp = ({ Component, ...pageProps }: AppProps) => (
    <ThemeProvider>
        <LocalizationProvider>
            <TodoProvider>
                <Layout>
                    <main>
                        <Component {...pageProps} />
                    </main>
                </Layout>
            </TodoProvider>
        </LocalizationProvider>
    </ThemeProvider>
);

export default MyApp;
