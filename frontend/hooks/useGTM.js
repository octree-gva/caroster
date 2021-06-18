import {useEffect} from 'react';
import {useSettingQuery} from '../generated/graphql';

const getHeadScript = gtmId => `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
`;

const getBodyScript = gtmId => `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
`;

const useGTM = () => {
  const {data: {setting} = {}} = useSettingQuery();

  if (process.env.NODE_ENV !== 'production') return null;

  useEffect(() => {
    if (setting) {
      const {gtm_id: gtmId} = setting;
      if (gtmId) loadGTM(gtmId);
    }
  }, [setting]);

  const loadGTM = gtmId => {
    const headScript = document.createElement('script');
    headScript.innerHTML = getHeadScript(gtmId);
    const bodyScript = document.createElement('noscript');
    bodyScript.innerHTML = getBodyScript(gtmId);

    document.head.insertBefore(headScript, document.head.childNodes[0]);
    document.body.insertBefore(bodyScript, document.body.childNodes[0]);
  };
};

export default useGTM;
