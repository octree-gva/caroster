import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheets} from '@material-ui/core/styles';
import theme from '../theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <meta property="og:site_name" content="Caroster" />
          <meta
            property="og:title"
            content="Caroster - Covoiturage de groupe"
          />
          <meta property="og:url" content="%PUBLIC_URL%" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Covoiturez à un événement en proposant une voiture ou en prenant une place."
          />
          <meta
            property="og:image"
            content="%REACT_APP_URL%/Caroster_Octree_Social.jpg"
          />
          <meta property="og:image:width" content="1500" />
          <meta property="og:image:height" content="843" />
          <meta itemProp="name" content="Caroster - Covoiturage de groupe" />
          <meta itemProp="url" content="%PUBLIC_URL%" />
          <meta
            itemProp="thumbnailUrl"
            content="%REACT_APP_URL%/Caroster_Octree_Social.jpg"
          />
          <link
            rel="image_src"
            href="%REACT_APP_URL%/Caroster_Octree_Social.jpg"
          />
          <meta
            itemProp="image"
            content="%REACT_APP_URL%/Caroster_Octree_Social.jpg"
          />
          <meta
            name="twitter:title"
            content="Caroster - Covoiturage de groupe"
          />
          <meta
            name="twitter:image"
            content="%REACT_APP_URL%/Caroster_Octree_Social.jpg"
          />
          <meta name="twitter:url" content="%PUBLIC_URL%" />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:description"
            content="Covoiturez à un événement en proposant une voiture ou en prenant une place."
          />
          <meta
            name="description"
            content="Covoiturez à un événement en proposant une voiture ou en prenant une place."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
