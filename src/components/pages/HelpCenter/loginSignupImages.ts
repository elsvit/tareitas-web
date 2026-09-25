import enInitial from '~/assets/images/en/en_login_signup_initial.png';
import enSigninMultidevices from '~/assets/images/en/en_signin_multidevices.png';
import enSigninOnlyDevice from '~/assets/images/en/en_signin_onlydevice.png';
import enSignup from '~/assets/images/en/en_signup.png';
import esInitial from '~/assets/images/es/es_login_signup_initial.png';
import esSigninMultidevices from '~/assets/images/es/es_signin_multidevices.png';
import esSigninOnlyDevice from '~/assets/images/es/es_signin_onlydevice.png';
import esSignup from '~/assets/images/es/es_signup.png';

const images = {
  en: {
    initial: enInitial,
    signup: enSignup,
    signinMultidevices: enSigninMultidevices,
    signinOnlyDevice: enSigninOnlyDevice,
  },
  es: {
    initial: esInitial,
    signup: esSignup,
    signinMultidevices: esSigninMultidevices,
    signinOnlyDevice: esSigninOnlyDevice,
  },
} as const;

export const resolveHelpCenterLang = (
  lang: string | null | undefined,
): keyof typeof images => {
  const normalized = lang?.trim().toLowerCase().split(/[-_]/)[0];
  return normalized === 'es' ? 'es' : 'en';
};

export const getLoginSignupImages = (lang: string | null | undefined) =>
  images[resolveHelpCenterLang(lang)];
