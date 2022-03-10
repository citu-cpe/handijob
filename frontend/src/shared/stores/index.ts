import { LoginResponseDTO, UserDTO } from 'generated-api';
import create from 'zustand';
import { LocalStorageKeys } from '../enums/localStorageKeys';

interface GlobalState {
  setUser: (user: UserDTO | undefined) => void;
  navbarHeight: string;
  user: UserDTO | undefined;
  // isFreelancer: boolean;
  // isEmployer: boolean;
  loginUser: (loginResponseDTO: LoginResponseDTO) => void;
  logoutUser: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  user: undefined,
  setUser: (user: UserDTO | undefined) => set(() => ({ user })),
  navbarHeight: '50px',
  // isFreelancer: !!get().user?.freelancerId,
  // isEmployer: !!get().user?.employerId,
  loginUser: (loginResponseDTO: LoginResponseDTO) => {
    const { user, tokens } = loginResponseDTO;
    const { accessToken, refreshToken } = tokens;

    set(() => ({ user }));

    if (!!accessToken) {
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken!);
    }

    if (!!refreshToken) {
      localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, refreshToken!);
    }

    localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(user));
  },
  logoutUser: () => {
    set(() => ({ user: undefined }));

    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageKeys.USER);
  },
}));
