import React, { useState } from 'react';
import TopNavbar from './TopNavBar/TopNavbar';
import { LANGUAGES } from '../constants';
import { s3ImageUrls } from '../config/assets/config';

type LayoutProps = {
  children?: React.JSX.Element[] | React.JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    LANGUAGES[0]
  );
  const navbarProps = {
    navItemsList: ['Marketplace', 'Prompt Engineering', 'Prompt Chaining'],
    searchBarVisible: true,
    searchBarOptions: ['Option 1', 'Option 2', 'Option 3'],
    selectedNavItem: (item: string) =>
      console.log(`Selected nav item: ${item}`),
    getSelectedLanguage: (lang: string) =>
      console.log(`Selected language: ${lang}`),
    profileName: 'John Doe',
    loggedIn: false,
    logoSrc: s3ImageUrls.companyLogo,
    logoImageAlt: 'Genflowly',
    searchBarPlaceholder: 'Search...',
    profileLabel: 'My Profile',
    loginButtonText: 'Login',
    loginHandler: () => console.log('Login clicked'),
    inputValue: inputValue,
    setInputValue: setInputValue,
    searchBarHandler: (value: string) => console.log(`Search for: ${value}`),
    dropDownOptions: LANGUAGES,
    logoRedirectUrl: '/',
    setSelectedLanguage: setSelectedLanguage,
    selectedLanguage: selectedLanguage,
  };
  return (
    <div>
      <TopNavbar {...navbarProps} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
