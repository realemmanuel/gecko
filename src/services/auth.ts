import { FirebaseError } from "firebase/app";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export type Login = {
  email: string;
  password: string;
};

export type Signup = Login & {
  fullName: string;
};

export type AuthResponse = {
  userId?: string;
  isAuthenticated: boolean;
  response: string;
};

type Validation = {
  email: string;
  password: string;
};

type UserDocument = Signup & {
  userId: string;
};

export const handleSignup = async (formData: Signup): Promise<AuthResponse> => {
  try {
    const isCredentialsValid = validateCredentials(formData);

    if (!isCredentialsValid.isAuthenticated) {
      return isCredentialsValid;
    }

    const { email, password } = formData;

    const createUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = createUser.user;
    const { uid } = user;

    const createUserDocument = await createNewUserDocument(uid, {
      ...formData,
      userId: uid,
    });

    if (!createUserDocument) {
      return {
        isAuthenticated: false,
        response: "Something went wrong. Please try again",
      };
    }

    return {
      userId: uid,
      isAuthenticated: true,
      response:
        "Yayyy! You've created your account successfully, redirecting you now",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.log(firebaseError);
    throw new Error();
  }
};

export const handleLogin = async (formData: Login): Promise<AuthResponse> => {
  try {
    const isCredentialsValid = validateCredentials(formData);

    if (!isCredentialsValid.isAuthenticated) {
      return isCredentialsValid;
    }

    const { email, password } = formData;

    const createUser = await signInWithEmailAndPassword(auth, email, password);
    const user = createUser.user;
    const { uid } = user;

    return {
      userId: uid,
      isAuthenticated: true,
      response: "Yayyy! You've logged in successfully, redirecting you now",
    };
  } catch (error) {
    throw new Error();
  }
};

const validateCredentials = (formData: Validation): AuthResponse => {
  try {
    const { email, password } = formData;

    if (!email || !password) {
      return {
        isAuthenticated: false,
        response: "Form cannot be empty",
      };
    }

    // Validate email
    if (!validateEmail(email)) {
      return {
        isAuthenticated: false,
        response: "Email is not valid",
      };
    }

    // Validate password
    if (!validatePassword(password)) {
      return {
        isAuthenticated: false,
        response: "Password should be at least 8 characters",
      };
    }

    return {
      isAuthenticated: true,
      response: "Credentials are valid",
    };
  } catch (error) {
    throw new Error();
  }
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

const createNewUserDocument = async (
  userId: string,
  formData: UserDocument
): Promise<boolean> => {
  try {
    await setDoc(doc(db, "users", userId), formData);
    return true;
  } catch (error) {
    return false;
  }
};
