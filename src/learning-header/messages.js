import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  myCourses: {
    id: 'header.menu.myCourses.label',
    defaultMessage: 'My Programs',
    description: 'User menu My Courses link.',
  },
  logout: {
    id: 'header.menu.logout.label',
    defaultMessage: 'Logout',
    description: 'User menu Logout action.',
  },
  orders: {
    id: 'header.menu.orders.label',
    defaultMessage: 'My Orders',
    description: 'User menu My Orders / Payment History link.',
  },
  dashboard: {
    id: 'header.menu.dashboard.label',
    defaultMessage: 'Account',
    description: 'User menu Account settings link. (Kept msgid for translation catalog compat; English label changed from "Dashboard" to "Account" because the target page is the Account MFE at /account/.)',
  },
  profile: {
    id: 'header.menu.profile.label',
    defaultMessage: 'Profile',
    description: 'User menu Profile link.',
  },
  help: {
    id: 'header.help.label',
    defaultMessage: 'Help',
    description: 'Help Center link.',
  },
  skipNavLink: {
    id: 'header.navigation.skipNavLink',
    defaultMessage: 'Skip to main content.',
    description: 'Screen reader skip link.',
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
  'header.menu.myCourses.label': '\u0628\u0631\u0627\u0645\u062c\u064a',
  'header.menu.logout.label': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c',
  'header.menu.orders.label': '\u0637\u0644\u0628\u0627\u062a\u064a',
  'header.menu.dashboard.label': '\u0627\u0644\u062d\u0633\u0627\u0628',
  'header.menu.profile.label': '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a',
  'header.help.label': '\u0645\u0633\u0627\u0639\u062f\u0629',
  'header.navigation.skipNavLink': '\u062a\u062e\u0637\u0649 \u0625\u0644\u0649 \u0627\u0644\u0645\u062d\u062a\u0649 \u0627\u0644\u0631\u0626\u064a\u0633\u064a',
  'general.register.sentenceCase': '\u062a\u0633\u062c\u064a\u0644',
  'general.signIn.sentenceCase': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
};

export { messages, genericMessages, arMessages };
export default messages;
