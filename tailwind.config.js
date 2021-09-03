module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class',
    theme: {
      extend: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
        fontFamily: {
          sans: [
            'Poppins'
          ],
        },
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
          base: ['1rem', { lineHeight: '1.5rem' }],
          lg: ['1.125rem', { lineHeight: '1.75rem' }],
          xl: ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
        },
        fontWeight: {
          regular: '400',
          medium: '500',
          semibold: '600',
        },
        colors: {
          info: {
            light: "#20CDD3",
            DEFAULT: "#30BCED",
            dark: "#3D57D9",      
          },
          warn: {
            light: "#E87002",
            DEFAULT: "#FF5E0A",
            dark: "#E53402", 
          },     
          danger: {
            light: "#E5524C",
            DEFAULT: "#FF3948",
            dark: "#E83C27",
          },
          success: {
            light: "#31E080", 
            DEFAULT: "#2ED47A",
            dark: "#25A860",
          },
          purple: {
            light: "#8C0E9E",
            DEFAULT: "#861388",
            dark: "#5E1973", 
          },
          black: {
            light: "#FFFFFF",
            DEFAULT: "#192A3E",
            dark: "#161429", 
          },
          grey: {
            light: "#C2CFE0",
            DEFAULT: "#90A0B7",
            dark: "#334D6E", 
          }, 
        },
        width: (theme) => ({
          auto: 'auto',
          ...theme('spacing'),
          '1/2': '50%',
          '1/3': '33.333333%',
          '2/3': '66.666667%',
          '1/5': '20%',
          '2/5': '40%',
          '3/5': '60%',
          '4/5': '80%',
          full: '100%',
          screen: '100vw',
          min: 'min-content',
          max: 'max-content',
        }),
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
