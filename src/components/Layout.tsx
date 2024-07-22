import React, { useState } from 'react';
import TopNavbar from './TopNavBar/TopNavbar';
import {
  COMPANY_NAME,
  LANGUAGES,
  LOGINBUTTONTEXT,
  NAV_ITEMS_LIST,
  SEARCH_BAR_OPTIONS,
  SEARCHBARPLACEHOLDER,
} from '../constants';
import { s3ImageUrls } from '../config/assets/config';
import { ThemeType } from '@genflowly/react-assets/dist';

type LayoutProps = {
  children?: React.JSX.Element[] | React.JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    LANGUAGES[0]
  );
  const navbarProps = {
    navItemsList: NAV_ITEMS_LIST,
    searchBarVisible: false,
    searchBarOptions: SEARCH_BAR_OPTIONS,
    selectedNavItem: (item: string) => {},
    getSelectedLanguage: (lang: string) => {},
    profileName: '',
    loggedIn: false,
    logoSrc: s3ImageUrls.companyLogo,
    logoImageAlt: COMPANY_NAME,
    searchBarPlaceholder: SEARCHBARPLACEHOLDER,
    profileLabel: '',
    loginButtonText: LOGINBUTTONTEXT,
    loginHandler: () => {},
    inputValue: inputValue,
    setInputValue: setInputValue,
    searchBarHandler: (value: string) => {},
    dropDownOptions: LANGUAGES,
    logoRedirectUrl: '/',
    setSelectedLanguage: setSelectedLanguage,
    selectedLanguage: selectedLanguage,
    dropDownLabel: '',
    theme: ThemeType.LIGHT,
  };
  return (
    <div>
      <TopNavbar {...navbarProps} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;