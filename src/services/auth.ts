import auth from '@react-native-firebase/auth';

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await auth().createUserWithEmailAndPassword(email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInWithPhone = async (phoneNumber: string) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const confirmPhoneCode = async (confirmation: any, code: string) => {
  try {
    const result = await confirmation.confirm(code);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};