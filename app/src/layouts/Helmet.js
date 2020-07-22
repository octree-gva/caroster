import React from 'react';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';

const LayoutHelmet = ({title}) => {
  const {t} = useTranslation();
  const imagePath = process.env.PUBLIC_URL + 'Caroster_Octree_Social.jpg';

  return (
    <Helmet>
      <meta property="og:site_name" content="Caroster" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="https://app.caroster.io" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={t('meta.description')} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:image:width" content="1500" />
      <meta property="og:image:height" content="843" />
      <meta itemProp="name" content={title} />
      <meta itemProp="url" content="https://app.caroster.io" />
      <meta itemProp="thumbnailUrl" content={imagePath} />
      <link rel="image_src" href={imagePath} />
      <meta itemProp="image" content={imagePath} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={imagePath} />
      <meta name="twitter:url" content="https://app.caroster.io" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={t('meta.description')} />

      <meta name="description" content={t('meta.description')} />
      <title>{title}</title>
    </Helmet>
  );
};

export default LayoutHelmet;
