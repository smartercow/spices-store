import { atom } from "recoil";

interface AuthModalState {
  open: boolean;
  view: "overview" | "login" | "signup" | "resetPassword";
}

const defaultModalState: AuthModalState = {
  open: false,
  view: "overview",
};

export const AuthModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
