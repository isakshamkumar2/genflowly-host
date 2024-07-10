interface Theme {
  light: {
    [key: string]: string;
  };
  dark: {
    [key: string]: string;
  };
}
const themes: Theme = {
  light: {
    primaryColor: '#4597f7',
    secondaryColor: '#79747E',
    surface: '#2C2C2C',
    hoverColor: '#40404080',
    fontFamily: 'sans-serif',
    stopColor: '#f2f2f2',
  },
  dark: {
    onPrimary: '#FFFFFF',
    primaryColor: '#4597f7',
    secondaryColor: '#79747E',
    surface: '#F5F5F5',
    onSurface: '#444444',
    hoverColor: '#404040',
    fontFamily: 'sans-serif',
    stopColor: '#f2f2f2',
  },
};

export default themes;
