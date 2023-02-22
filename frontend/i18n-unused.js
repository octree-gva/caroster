var fs = require('fs');
var glob = require('glob');

glob(
  '**/*.{js,jsx,ts,tsx}',
  {ignore: ['**/node_modules/**'], absolute: true},
  function (err, filesPaths) {
    if (err) {
      console.log(err);
      return;
    }

    const i18nSourceFileRelativePath = '/locales/en.json';
    const i18nSourceFilePath = `${__dirname}${i18nSourceFileRelativePath}`;

    const sourceJson = fs.readFileSync(i18nSourceFilePath, 'UTF-8');
    const preSourceTranslations = JSON.parse(sourceJson);
    const preKeys = Object.keys(preSourceTranslations);

    const keysToKeep = preKeys.filter(k => k.split('.')[0] === 'PROTECTED');
    filesPaths.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'UTF-8');

      preKeys.forEach(key => {
        if (content.includes(key) && !keysToKeep.includes(key)) {
          keysToKeep.push(key);

          //supports plurals for english source translation
          if (preKeys.includes(`${key}_plural`)) {
            keysToKeep.push(`${key}_plural`);
          }
        }
      });
    });

    const sourceTranslationsToKeep = {};
    keysToKeep.sort();
    keysToKeep.forEach(key => {
      sourceTranslationsToKeep[key] = preSourceTranslations[key];
    });

    const sourceJsonToKeep = JSON.stringify(sourceTranslationsToKeep, null, 4);
    fs.writeFileSync(i18nSourceFilePath, sourceJsonToKeep);
    console.warn(
      `This script is a workaround, ${
        preKeys.length - keysToKeep.length
      } keys were removed from the ${i18nSourceFileRelativePath}, please make sure to review them before running i18n-format and adapt the code to avoid future deletion.`
    );
  }
);