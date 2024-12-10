export const getLocaleForLang = async (lang: string, key: string) => {
  let langFile = await getLangFile(lang);
  return langFile?.[key] || (await getLangFile('en'))?.[key] || '';
};

const getLangFile = async (lang: string) => {
  try {
    const langFile = await require(`../locales/${lang}.json`);
    return langFile;
  } catch (error) {
    return null;
  }
};
