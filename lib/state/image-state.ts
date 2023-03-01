import { atom } from "recoil";

interface ImageModalState {
  open: boolean;
  name?: string;
  source?: string;
}

const defaultImageModalState: ImageModalState = {
  open: false,
  name: "",
  source: "",
};

export const ImageModalState = atom<ImageModalState>({
  key: "imageModalState",
  default: defaultImageModalState,
});
