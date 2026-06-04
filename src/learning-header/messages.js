import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  dashboard: {
    id: 'header.menu.dashboard.label',
    defaultMessage: 'Dashboard',
    description: 'User menu Dashboard link.',
  },
  help: {
    id: 'header.help.label',
    defaultMessage: 'Help',
    description: 'Help Center link.',
  },
  profile: {
    id: 'header.menu.profile.label',
    defaultMessage: 'Profile',
    description: 'User menu Profile link.',
  },
  account: {
    id: 'header.menu.account.label',
    defaultMessage: 'Account',
    description: 'User menu Account link.',
  },
  orderHistory: {
    id: 'header.menu.orderHistory.label',
    defaultMessage: 'Order History',
    description: 'User menu Order History link.',
  },
  skipNavLink: {
    id: 'header.navigation.skipNavLink',
    defaultMessage: 'Skip to main content.',
    description: 'Screen reader skip link.',
  },
  signOut: {
    id: 'header.menu.signOut.label',
    defaultMessage: 'Sign Out',
    description: 'User menu Sign Out action.',
  },
});

// Shared generic messages (also used by AnonymousUserMenu)
const genericMessages = defineMessages({
  registerSentenceCase: {
    id: 'general.register.sentenceCase',
    defaultMessage: 'Register',
    description: 'Register button.',
  },
  signInSentenceCase: {
    id: 'general.signIn.sentenceCase',
    defaultMessage: 'Sign In',
    description: 'Sign In button.',
  },
});

const arMessages = {
  'header.menu.dashboard.label': '\u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645',
  'header.help.label': '\u0645\u0633\u0627\u0639\u062f\u0629',
  'header.menu.profile.label': '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a',
  'header.menu.account.label': '\u0627\u0644\u062d\u0633\u0627\u0628',
  'header.menu.orderHistory.label': '\u0633\u062c\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
  'header.navigation.skipNavLink': '\u062a\u062e\u0637\u0649 \u0625\u0644\u0649 \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0631\u0626\u064a\u0633\u064a',
  'header.menu.signOut.label': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c',
  'general.register.sentenceCase': '\u062a\u0633\u062c\u064a\u0644',
  'general.signIn.sentenceCase': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
};

export { messages, genericMessages, arMessages };
export default messages;
