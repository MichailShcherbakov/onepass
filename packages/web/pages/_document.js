import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const style = {
    fontFamily: '"Nunito", sans-serif',
    backgroundColor: '#f3f3f3',
};

class OnePassDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => {
            return props => {
                return sheet.collectStyles(<App {...props} />);
            };
        });
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                    <meta
                        name="description"
                        content="OnePass Password Manager: A free and open source secure password manager"
                    />
                    {/* for styled-components */}
                    {this.props.styleTags}
                </Head>
                <body style={style}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default OnePassDocument;
