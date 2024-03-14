import { Html, Head, Main, NextScript } from 'next/document';
import { Inter } from 'next/font/google';

const MyDocument = () => {

    return (
        <Html lang="en">
            <Head>
                {/* <link
                    href={`https://fonts.googleapis.com/css2?family=Madim+One&display=swap`}
                    rel="stylesheet"
                /> */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Anta&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;