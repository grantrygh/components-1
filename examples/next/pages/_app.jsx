import { theme } from 'stuff/theme';
import { ThemeProvider } from 'stuff/ThemeProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
