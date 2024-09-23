import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AuthContextInterface,
  ChildrenProps,
  UserInterface,
} from "@/interfaces/authInterfaces/AuthContextProps";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

const initialValue: AuthContextInterface = {
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => {},
  logout: async () => {},
  loginWithoutGoogle: async () => {},
};

export const AuthContext = createContext<AuthContextInterface>(initialValue);

export const AuthContextProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("recuperando usuario");

    GoogleSignin.configure({
      webClientId:
        "378349837326-88ovh8e0tg6nqdg96v3a882ql486lpdt.apps.googleusercontent.com",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      offlineAccess: true,
    });

    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const { type, data } = await GoogleSignin.signInSilently();
      if (type === "success") {
        const userData: UserInterface = {
          id: data.user.id ?? "",
          email: data.user.email ?? "",
          photoUrl: data.user.photo ?? "",
          name: data.user.name ?? "",
        };
        setValues(userData, true);
      } else {
        setValues(null, false);
      }
    } catch (error) {
      console.error("error getCurrentUser", error);
      setValues(null, false);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response: any = await GoogleSignin.signIn();
      if (response?.data?.idToken) {
        const userData: UserInterface = {
          id: response.data.user.id ?? "",
          email: response.data.user.email ?? "",
          photoUrl: response.data.user.photo ?? "",
          name: response.data.user.name ?? "",
        };
        setValues(userData, true);
      } else {
        setValues(null, false);
      }
    } catch (error: any) {
      console.error("error login", error);
      setValues(null, false);
    } finally {
      setLoading(false);
    }
  };

  const loginWithoutGoogle = async () => {
    setLoading(true);
    const userData: UserInterface = {
      id: "usuarioIncognito",
      email: "prueba@gmail.com",
      photoUrl: "",
      name: "Incognito",
    };
    setValues(userData, true);
  };

  const logout = async () => {
    setValues(null, false);
    console.log("Usuario deslogueado");
    await GoogleSignin.signOut();
    setLoading(false);
  };

  const setValues = (user: UserInterface | null, isAuthenticated: boolean) => {
    setUser(user);
    setIsAuthenticated(isAuthenticated);
    if (user) {
      console.log("Usuario logueado");
      router.replace("/Home");
    } else {
      console.log("Usuario deslogueado");
      router.replace("/Login");
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      loginWithoutGoogle,
    }),
    [user, isAuthenticated, loading, login, logout, loginWithoutGoogle]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("Debes estar dentro del contexto de AuthContext");
  }
  return context;
};
