import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNavbar from './TopNavbar';
import userEvent from '@testing-library/user-event';

jest.mock('@genflowly/react-assets/dist', () => ({
  SearchBar: jest.fn(() => <div data-testid="mock-searchbar">SearchBar</div>),
  Profile: jest.fn(() => <div data-testid="mock-profile">Profile</div>),
  DropDown: jest.fn(() => <div data-testid="mock-dropdown">DropDown</div>),
  MultiPurposeButton: jest.fn(() => <button data-testid="mock-button">Login</button>),
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
    const loginButton = screen.getByRole('button', { name: mockProps.loginButtonText });
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
      value: jest.fn().mockImplementation(query => ({
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
});