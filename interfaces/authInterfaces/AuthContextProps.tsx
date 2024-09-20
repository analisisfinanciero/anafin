export interface AuthContextInterface {
  user: UserInterface | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginWithoutGoogle: () => Promise<void>;
}

export interface UserInterface {
  id: string;
  email: string;
  photoUrl: string;
  name: string;
}

export interface ChildrenProps {
  children?: React.ReactNode;
}
