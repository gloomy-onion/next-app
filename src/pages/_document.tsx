import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    public render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Internship Project</title>
                </Head>
                <body>
                    <div id="root" />
                    <div id="portal-root" />
                    <Main />
                    <NextScript />
                    <script src="https://yastatic.net/share2/share.js" async />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
