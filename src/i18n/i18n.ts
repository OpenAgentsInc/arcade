// @ts-nocheck
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import moment from 'moment'
import en from './en.json'
import es from './es.json'
import pt from './pt-BR.json'

const locale = Localization.locale || 'en'
if (!!i18n) {
  i18n.fallbacks = true
  i18n.translations = { en, es, pt }
  i18n.locale = locale
}

if (locale.includes('es')) {
  moment.updateLocale('es', require('moment/locale/es'))
}
if (locale.includes('pt')) {
  moment.updateLocale('pt-br', require('moment/locale/pt-br'))
}

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

// type RecursiveKeyOf<TObj extends Record<string, any>> = {
//   [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
//     ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
//     : `${TKey}`
// }[keyof TObj & string]
