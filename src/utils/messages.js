import { localizeFilter } from '@/filters';

export default {
  login: localizeFilter('LogIn'),
  logout: localizeFilter('LoggOut'),
  'auth/invalid-credential': localizeFilter('InvalidCredential'),
  'auth/email-already-in-use': localizeFilter('EmailAlreadyInUse'),
};
