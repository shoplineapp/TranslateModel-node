const Translate = require('../index');

const translateObject = {
  en: 'ENGLISH',
  'zh-hant': 'CHINESE'
};

describe(`Translate`, () => {
  test(`.valueFromExistingKeys`, () => {
    const result = Translate.valueFromExistingKeys(translateObject, [
      'en',
      'zh-hant'
    ]);
    expect(result).toEqual(translateObject.en);
  });

  test(`.valueFromExistingKeys`, () => {
    const result = Translate.valueFromExistingKeys(translateObject);
    expect(result).toEqual(translateObject.en);
  });

  describe(`.t`, () => {
    test(`.when translateObject preference language have value should show preference - EN`, () => {
      const result = Translate.t(translateObject, 'en');
      expect(result).toEqual(translateObject.en);
    });

    test(`when translateObject preference language have value should show preference - ZH-HANT`, () => {
      const result = Translate.t(translateObject, 'zh-hant');
      expect(result).toEqual(translateObject['zh-hant']);
    });

    test(`when translateObject preference dont have preference language should fallbacking - ZH-HANT`, () => {
      const onlyEnglishTranslate = {
        en: 'ENGLISH'
      };
      const result = Translate.t(onlyEnglishTranslate, 'zh-hant');
      expect(result).toEqual(onlyEnglishTranslate.en);
    });

    test(`when translateObject preference dont have preference language should fallbacking - EN`, () => {
      const onlyChineseTranslate = {
        'zh-hant': 'Chinese'
      };
      const result = Translate.t(onlyChineseTranslate, 'en');
      expect(result).toEqual(onlyChineseTranslate['zh-hant']);
    });

    test(`when translateObject preference language have value should show preference - ZH-HK`, () => {
      const translateWithHKObject = {
        en: 'ENGLISH',
        'zh-hant': 'CHINESE',
        'zh-hk': 'HONG_KONG'
      };
      const result = Translate.t(translateWithHKObject, 'zh-hk', [
        'en',
        'zh-hant',
        'zh-hk'
      ]);
      expect(result).toEqual(translateWithHKObject['zh-hk']);
    });
  });
});
