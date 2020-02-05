const _ = require('lodash');
const defaultLocale = 'en';

class Translate {
  static t(
    translations,
    preferred,
    supportedLocales = ['en', 'zh-hant']
  ) {
    if (!translations) {
      return '';
    }
    if (typeof translations === 'string') {
      return translations;
    }
    if (preferred === undefined) {
      preferred = defaultLocale;
    }

    // Required language present in given translations hash
    if (supportedLocales.indexOf(preferred) >= 0 && translations[preferred]) {
      return translations[preferred];
    }

    // Language code that need special handling
    var availableFallbacks = [];
    switch (preferred) {
      case 'zh-cn':
        availableFallbacks = _.intersection(
          _.keys(translations),
          supportedLocales,
          ['zh-hant', 'zh-hk', 'zh-tw']
        );
        break;
      case 'zh-hant':
      case 'zh-hk':
      case 'zh-tw':
        availableFallbacks = _.intersection(
          _.keys(translations),
          supportedLocales,
          ['zh-hk', 'zh-tw', 'zh-cn']
        );
        break;
    }

    return (
      this.valueFromFallbackLanguages(translations, availableFallbacks) ||
      this.valueFromExistingKeys(translations) ||
      ''
    );
  }

  static valueFromFallbackLanguages(translations, availableFallbacks) {
    return _.chain(translations)
      .pick(function(v, k) {
        return _.contains(availableFallbacks, k);
      })
      .values()
      .reject(function(val) {
        return _.isEmpty(val);
      })
      .first()
      .value();
  }

  static valueFromExistingKeys(translations) {
    return _.chain(translations)
      .values()
      .reject(function(val) {
        return _.isEmpty(val);
      })
      .first()
      .value();
  }
}

module.exports = Translate;
