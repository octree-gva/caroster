import React from 'react';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
const LayoutHelmet = ({title}) => {
  const {t} = useTranslation();
  return (
    <Helmet>
      <meta property="og:site_name" content="Caroster" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="https://app.caroster.io" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={t('meta.description')} />
      <meta property="og:image" content="/Caroster_Octree_Social.jpg" />
      <meta property="og:image:width" content="1500" />
      <meta property="og:image:height" content="843" />
      <meta itemprop="name" content={title} />
      <meta itemprop="url" content="https://app.caroster.io" />
      <meta itemprop="thumbnailUrl" content="/Caroster_Octree_Social.jpg" />
      <link rel="image_src" href="/Caroster_Octree_Social.jpg" />
      <meta itemprop="image" content="/Caroster_Octree_Social.jpg" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content="/Caroster_Octree_Social.jpg" />
      <meta name="twitter:url" content="https://app.caroster.io" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={t('meta.description')} />
      <meta name="description" content={t('meta.description')} />
      <title>{title}</title>
    </Helmet>
  );
};

export default LayoutHelmet;
