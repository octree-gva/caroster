import Head from 'next/head';

type Metas = {
  title: string;
  url: string;
};

interface Props {
  metas: Metas;
}

const Meta = (props: Props) => {
  const {metas} = props;

  const siteName = 'Caroster - Covoiturage de groupe';
  const title = metas?.title
    ? `${metas.title} - Caroster`
    : 'Caroster - Covoiturage de groupe';
  const description =
    'Covoiturez à un événement en proposant une voiture ou en prenant une place.';
  const socialImage = '/assets/Caroster_Octree_Social.jpg';

  return (
    <Head>
      {/* General */}
      <title>{title}</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />

      <meta name="robots" content="noindex" />
      <meta itemProp="name" content={siteName} />
      {metas?.url && <meta itemProp="url" content={metas.url} />}
      <meta itemProp="thumbnailUrl" content={socialImage} />
      <link rel="image_src" href={socialImage} />
      <meta itemProp="image" content={socialImage} />
      <meta name="description" content={description} />

      {/* OpenGraph */}
      <meta property="og:site_name" content="Caroster" />
      <meta property="og:title" content={title} />
      {metas?.url && <meta property="og:url" content={metas.url} />}
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1500" />
      <meta property="og:image:height" content="843" />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={socialImage} />
      {metas?.url && <meta name="twitter:url" content={metas.url} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default Meta;
