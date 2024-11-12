import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const translations = {
  en: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    phone: 'Phone',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    welcome: 'Welcome to Tam Tam',
    subtitle: 'Connect with African culture through short videos',
  },
  fr: {
    signIn: 'Se Connecter',
    signUp: "S'inscrire",
    email: 'Email',
    password: 'Mot de passe',
    phone: 'Téléphone',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié?',
    noAccount: "Pas de compte?",
    hasAccount: 'Déjà un compte?',
    welcome: 'Bienvenue sur Tam Tam',
    subtitle: 'Connectez-vous à la culture africaine à travers de courtes vidéos',
  },
  sw: {
    signIn: 'Ingia',
    signUp: 'Jisajili',
    email: 'Barua pepe',
    password: 'Nywila',
    phone: 'Simu',
    rememberMe: 'Nikumbuke',
    forgotPassword: 'Umesahau nywila?',
    noAccount: 'Huna akaunti?',
    hasAccount: 'Una akaunti tayari?',
    welcome: 'Karibu Tam Tam',
    subtitle: 'Unganisha na utamaduni wa Kiafrika kupitia video fupi',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage,
        translations: translations[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}