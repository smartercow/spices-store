import { atom } from 'recoil';

export interface Cookies {
  filled: boolean;
  consent?: boolean;
}

export type CookiesState = {
  cookiesState: Cookies;
};

export const defaultCookiesState: CookiesState = {
  cookiesState: {
    filled: false,
    consent: false
  }
};

export const CookiesState = atom<CookiesState>({
  key: 'cookiesState',
  default: defaultCookiesState
});
