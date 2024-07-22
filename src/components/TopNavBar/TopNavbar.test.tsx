import React from 'react';

import {
render,
fireEvent,
screen,
within,
waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNavbar from './TopNavbar';
jest.mock('@genflowly/react-assets/dist', () => ({
SearchBar: jest.fn(({ setInputValue, onClick, inputValue }) => (
<div data-testid="mock-searchbar">
<input
data-testid="search-input"
value={inputValue}
onChange={(e) => setInputValue(e.target.value)}
/>
<button onClick={onClick}>Search</button>
</div>
)),
Profile: jest.fn(() => <div data-testid="mock-profile">Profile</div>),
DropDown: jest.fn(
({ setSelectedOption, selectedOption, selectedLanguage }) => (
<select
onChange={(e) => {
setSelectedOption(e.target.value);
selectedLanguage(e.target.value);
}}
value={selectedOption}
data-testid="mock-dropdown"
>
{['EN', 'FR', 'ES'].map((option) => (
<option key={option} value={option}>
{option}
</option>
))}
</select>
)
),
MultiPurposeButton: jest.fn(({ onClick, children }) => (
<button data-testid="mock-button" onClick={onClick}>
{children}
</button>
)),
InputSize: { extraLarge: 'extraLarge' },
ButtonVariant: { text: 'text' },
ThemeType: { DARK: 'DARK', LIGHT: 'LIGHT' },
}));

jest.mock('react-i18next', () => ({
useTranslation: () => ({ t: (key: string) => key }),
}));

const mockProps = {
navItemsList: ['Home', 'About', 'Contact'],
searchBarVisible: true,
searchBarOptions: ['Option 1', 'Option 2'],
selectedNavItem: jest.fn(),
setSelectedLanguage: jest.fn(),
profileName: 'John Doe',
loggedIn: false,
logoSrc: 'logo.png',
logoImageAlt: 'Logo',
searchBarPlaceholder: 'Search...',
loginButtonText: 'Login',
loginHandler: jest.fn(),
inputValue: '',
setInputValue: jest.fn(),
searchBarHandler: jest.fn(),
dropDownOptions: ['EN', 'FR'],
logoRedirectUrl: 'https://example.com',
fontSize: 16,
getSelectedLanguage: jest.fn(),
selectedLanguage: 'EN',
};

describe('TopNavbar', () => {

it('renders logo with correct attributes', () => {
render(<TopNavbar {...mockProps} />);
const logo = screen.getByAltText('Logo');
expect(logo).toBeInTheDocument();
expect(logo).toHaveAttribute('src', 'logo.png');
});

it('renders nav items correctly', () => {
render(<TopNavbar {...mockProps} />);
mockProps.navItemsList.forEach((item) => {
expect(screen.getByText(item)).toBeInTheDocument();
});
});

it('handles nav item click', () => {
render(<TopNavbar {...mockProps} />);
fireEvent.click(screen.getByText('About'));
expect(mockProps.selectedNavItem).toHaveBeenCalledWith('About');
});

it('renders SearchBar when searchBarVisible is true', () => {
render(<TopNavbar {...mockProps} />);
expect(screen.getByTestId('mock-searchbar')).toBeInTheDocument();
});

it('does not render SearchBar when searchBarVisible is false', () => {
render(<TopNavbar {...mockProps} searchBarVisible={false} />);
expect(screen.queryByTestId('mock-searchbar')).not.toBeInTheDocument();
});

it('renders login button when not logged in', () => {
render(<TopNavbar {...mockProps} />);
const loginButton = screen.getByRole('button', {
name: mockProps.loginButtonText,
});
expect(loginButton).toBeInTheDocument();
});

it('renders profile when logged in', () => {
render(<TopNavbar {...mockProps} loggedIn={true} />);
expect(screen.getByTestId('mock-profile')).toBeInTheDocument();
});

it('handles Enter key on nav items', () => {
render(<TopNavbar {...mockProps} />);
const aboutItem = screen.getByText('About');
fireEvent.keyDown(aboutItem, { key: 'Enter' });
expect(mockProps.selectedNavItem).toHaveBeenCalledWith('About');
});

it('applies correct font size', () => {
render(<TopNavbar {...mockProps} />);
const navItem = screen.getByText('Home');
expect(navItem).toHaveStyle('font-size: 16px');
});

it('renders DropDown component', () => {
render(<TopNavbar {...mockProps} />);
expect(screen.getByTestId('mock-dropdown')).toBeInTheDocument();
});

it('handles focus changes on nav items', () => {
render(<TopNavbar {...mockProps} />);
const homeItem = screen.getByTestId('nav-item-0');
homeItem.focus();
expect(homeItem).toHaveFocus();
});
it('renders with default fontSize when not provided', () => {
render(<TopNavbar {...mockProps} fontSize={undefined} />);
const navItem = screen.getByText('Home');
expect(navItem).toHaveStyle('font-size: 1.2rem');
});

it('applies media query styles', () => {
Object.defineProperty(window, 'matchMedia', {
writable: true,
value: jest.fn().mockImplementation((query) => ({
matches: false,
media: query,
onchange: null,
addListener: jest.fn(),
removeListener: jest.fn(),
addEventListener: jest.fn(),
removeEventListener: jest.fn(),
dispatchEvent: jest.fn(),
})),
});

render(<TopNavbar {...mockProps} />);
const navItem = screen.getByTestId('nav-item-0');
expect(getComputedStyle(navItem).fontSize).toBe('16px');
});
it('handles keyboard navigation', async () => {
render(<TopNavbar {...mockProps} />);

const firstItem = screen.getByTestId('nav-item-0');
const secondItem = screen.getByTestId('nav-item-1');
const thirdItem = screen.getByTestId('nav-item-2');

firstItem.focus();
expect(firstItem).toHaveFocus();

fireEvent.keyDown(firstItem, { key: 'ArrowRight' });

await waitFor(() => {
expect(secondItem).not.toHaveFocus();
});

fireEvent.keyDown(secondItem, { key: 'ArrowRight' });

await waitFor(() => {
expect(thirdItem).not.toHaveFocus();
});

fireEvent.keyDown(thirdItem, { key: 'ArrowLeft' });

await waitFor(() => {
expect(secondItem).not.toHaveFocus();
});

fireEvent.keyDown(secondItem, { key: 'ArrowLeft' });

await waitFor(() => {
expect(firstItem).not.toHaveFocus();
});
});

it('renders logo with correct redirect URL', () => {
render(<TopNavbar {...mockProps} />);
const logoLink = screen.getByRole('link');
expect(logoLink).toHaveAttribute('href', mockProps.logoRedirectUrl);
});
it('handles search bar input and search', () => {
const { setInputValue, searchBarHandler } = mockProps;
render(<TopNavbar {...mockProps} />);

const searchInput = screen.getByTestId('search-input');

fireEvent.change(searchInput, { target: { value: 't' } });
expect(setInputValue).toHaveBeenCalledWith('t');

const searchButton = screen.getByText('Search');
fireEvent.click(searchButton);
expect(searchBarHandler).toHaveBeenCalled();
});
it('handles language selection', () => {
const { setSelectedLanguage, getSelectedLanguage } = mockProps;
render(<TopNavbar {...mockProps} />);
const dropdown = screen.getByTestId('mock-dropdown');

fireEvent.change(dropdown, { target: { value: 'FR' } });

expect(setSelectedLanguage).toHaveBeenCalledWith('FR');
expect(getSelectedLanguage).toHaveBeenCalledWith('FR');
});
it('handles login button click', () => {
const { loginHandler } = mockProps;
render(<TopNavbar {...mockProps} />);
const loginButtonContainer = screen.getByTestId('login-button');
const actualButton = within(loginButtonContainer).getByRole('button');
fireEvent.click(actualButton);

expect(loginHandler).toHaveBeenCalled();
});
it('renders correctly with different prop combinations', () => {
const { rerender } = render(<TopNavbar {...mockProps} />);

rerender(<TopNavbar {...mockProps} searchBarVisible={false} />);
expect(screen.queryByTestId('mock-searchbar')).not.toBeInTheDocument();

rerender(<TopNavbar {...mockProps} loggedIn={true} />);
expect(screen.getByTestId('mock-profile')).toBeInTheDocument();
expect(screen.queryByTestId('login-button')).not.toBeInTheDocument();

rerender(<TopNavbar {...mockProps} fontSize={20} />);
const navItem = screen.getByTestId('nav-item-0');
expect(navItem).toHaveStyle('font-size: 20px');
});
});
