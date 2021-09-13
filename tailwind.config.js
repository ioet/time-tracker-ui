module.exports = {
  prefix: '',
  purge: {
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      whiteTW: '#FFFFFF',
      blackTW: '#000000',
      primaryTW: {
        light: '#59C9F0',
        DEFAULT: '#30BCED',
        dark: '#2183A5',
      },
      secondaryTW: {
        light: '#FF7E3B',
        DEFAULT: '#FF5E0A',
        dark: '#B24107',
      },
      infoTW: {
        light: '#44C7D0',
        DEFAULT: '#16BAC5',
        dark: '#0F8289',
      },
      errorTW: {
        light: '#FF606C',
        DEFAULT: '#FF3948',
        dark: '#B22732',
      },
      successTW: {
        light: '#57DC94',
        DEFAULT: '#2ED47A',
        dark: '#209455',
      },
      warningTW: {
        light: '#FFC76B',
        DEFAULT: '#FFB946',
        dark: '#B28131',
      },
      grayTW: {
        lightest: '#F3F4F6',
        lighter: '#D6D6D7',
        light: '#6F6F6F',
        DEFAULT: '#4B4B4B',
        dark: '#323639',
        darker: '#282C2F',
        darkest: '#202124',
      },
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
