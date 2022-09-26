/** @format */

import moment from 'moment';

import * as config from './i18n';

const date = {
  init(locale) {
    return new Promise((resolve, reject) => {
      config.supportedLocales[locale]
        .momentLocaleLoader()
        .then(() => {
          moment.locale(locale);

          return resolve();
        })
        .catch(err => reject(err));
    });
  },
  format(date, format) {
    return moment(date).format(format);
  },
};

export default date;
