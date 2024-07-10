
import React, { useEffect, useState } from 'react';
import {
SearchBar,
InputSize,
Profile,
DropDown,
MultiPurposeButton,
ButtonVariant,
ThemeType,
} from '@genflowly/react-assets/dist';
import Styles from './TopNavbar.module.scss';
import styled from '@emotion/styled';
import themes from '../../themes/theme';
import { s3ImageUrls } from '../../config/assets/config';

import { useTranslation } from 'react-i18next';

type TopNavbarProps = {
navItemsList: string[];
searchBarVisible: boolean;
searchBarOptions: string[];
selectedNavItem: (item: string) => void;
setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
profileName: string;
loggedIn?: boolean;
logoSrc?: string;
logoImageAlt?: string;
searchBarPlaceholder: string;
profileLabel?: string;
loginButtonText?: string;
loginHandler?: () => void;
inputValue: string;
setInputValue: React.Dispatch<React.SetStateAction<string>>;
searchBarHandler: (value: string) => void;
dropDownOptions: string[];
logoRedirectUrl?: string;
fontSize?: number;
getSelectedLanguage: (lang: string) => void;
selectedLanguage: string;
loginButtonAriaLabel?: string;
dropDownLabel?: string;
theme?: ThemeType;
};

const TopNavbar: React.FC<TopNavbarProps> = ({
navItemsList,
searchBarVisible = true,
searchBarOptions,
selectedNavItem,
setSelectedLanguage,
profileName,
loggedIn = false,
logoSrc,
logoImageAlt,
searchBarPlaceholder,
profileLabel,
loginButtonText,
loginHandler,
inputValue,
setInputValue,
searchBarHandler,
dropDownOptions,
logoRedirectUrl,
fontSize,
getSelectedLanguage,
selectedLanguage,
loginButtonAriaLabel,
dropDownLabel,
theme,
}) => {
const [selectedListItem, setSelectedListItem] = useState<number | null>(0);
const [focusedListItem, setFocusedListItem] = useState<number | null>(null);
console.log(Styles, 'Styles');

const { t } = useTranslation();

const handleItemClick = (index: number) => {
setSelectedListItem(index);
selectedNavItem(navItemsList[index]);
};

const NavbarContainer = styled.div`
font-family: ${(props) => themes.light.fontFamily};
background-color: ${(props) =>
theme === ThemeType.LIGHT ? themes.light.surface : ''};
`;

const ListItem = styled.li<{ isSelected: boolean }>`
font-family: ${(props) => themes.light.fontFamily};
color: ${(props) =>
props.isSelected ? themes.dark.surface : themes.light.secondaryColor};
aria-selected: ${(props) => props.isSelected};
&:hover {
background-color: ${(props) => themes.light.hoverColor};
}
&:before {
background-color: ${(props) => themes.light.primaryColor};
}
`;
const handleKeyBoardNavigation = (e: React.KeyboardEvent, index: number) => {
switch (e.key) {
case 'Enter':
case ' ':
e.preventDefault();
handleItemClick(index);
break;
case 'ArrowRight':
case 'ArrowDown':
e.preventDefault();
const nextIndex = (index + 1) % navItemsList.length;
setFocusedListItem(nextIndex);
break;
case 'ArrowLeft':
case 'ArrowUp':
e.preventDefault();
const prevIndex =
(index - 1 + navItemsList.length) % navItemsList.length;
setFocusedListItem(prevIndex);
break;
}
};

useEffect(() => {
if (focusedListItem !== null) {
const listItem = document.getElementById(`list-item-${focusedListItem}`);
listItem?.focus();
}
}, [focusedListItem]);

return (
<NavbarContainer className={Styles['navbarContainer']}>
<div className={Styles['optionContainer']}>
<div className={Styles['logoContainer']}>
<a
tabIndex={selectedListItem ? -1 : 0}
href={logoRedirectUrl}
rel="noreferrer"
target="_blank"
>
<img
className={Styles.logoImage}
src={logoSrc}
alt={logoImageAlt}
/>
</a>
</div>
<ul className={Styles.listItemContainer}>
{navItemsList.map((option, index) => (
<ListItem
data-testid={`nav-item-${index}`}
id={`list-item-${index}`}
isSelected={selectedListItem === index}
aria-selected={selectedListItem === index}
style={{ fontSize: fontSize ? `${fontSize}rem` : '1.2rem' }}
onKeyDown={(e) => handleKeyBoardNavigation(e, index)}
tabIndex={selectedListItem === index ? -1 : 0}
key={index}
className={`${Styles.listItem} ${
selectedListItem === index ? Styles.selectedItem : ''
}`}
onClick={() => handleItemClick(index)}
>
{option}
</ListItem>
))}
</ul>
</div>

{searchBarVisible && (
<SearchBar
dropDownItems={searchBarOptions}
size={InputSize.extraLarge}
onClick={() => searchBarHandler(inputValue)}
inputText={searchBarPlaceholder}
inputValue={inputValue}
setInputValue={setInputValue}
searchBarIconSrc={s3ImageUrls.whiteSearchIcon}
searchBarDropDownIconSrc={s3ImageUrls.whiteDownArrowIcon}
theme={ThemeType.LIGHT}
/>
)}

<div className={Styles.profile}>
<DropDown
alt={dropDownLabel ?? t('DropDownLabel')}
options={dropDownOptions}
setSelectedOption={setSelectedLanguage}
selectedOption={selectedLanguage}
selectedLanguage={getSelectedLanguage}
/>
{loggedIn ? (
<Profile name={profileName} label={profileLabel || t('Profile')} />
) : (
<div data-testid="login-button">
<MultiPurposeButton
label={loginButtonAriaLabel ?? t('Login')}
theme={ThemeType.DARK}
variant={ButtonVariant.text}
onClick={loginHandler}
>
{loginButtonText}
</MultiPurposeButton>
</div>
)}
</div>
</NavbarContainer>
);
};

export default TopNavbar;