import i18n from 'i18n-js'
import moment from 'moment'
import { TxKeyPath } from './i18n'

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: TxKeyPath, options?: i18n.TranslateOptions) {
  return key ? i18n.t(key, options) : null
}

export function changeLanguage(locale: string) {
  i18n.locale = locale
  if (locale.includes('es')) {
    moment.updateLocale('es', require('moment/locale/es'))
  }
  if (locale.includes('pt')) {
    moment.updateLocale('pt-br', require('moment/locale/pt-br'))
  }
  if (locale.includes('en')) {
    moment.updateLocale('en', {})
  }
}
