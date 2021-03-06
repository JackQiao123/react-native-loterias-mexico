import { Platform } from 'react-native';

const config = {
  API_ENDPOINTS: {
    MAIN: 'https://loteriasdemexico.com/mobile-api-new',
    APP: 'https://loteriasdemexico.com/mobile-api-new'
  },

  // ADMOB
  ADMOB: {
    REWARDED_MAX: 4,
    SECRETS: Platform.select({
      ios: {
        BANNER: 'ca-app-pub-1196303242456869/9088973233',
        INTERSTITIAL: 'ca-app-pub-1196303242456869/9972960434'
      },
      android: {
        BANNER: 'ca-app-pub-1196303242456869/1506846435',
        INTERSTITIAL: 'ca-app-pub-1196303242456869/2449693633'
      }
    })
  },

  SETTINGS: {
    ENCRYPT: true,
    REFRESH_INTERVAL: 30000,
    APP_NAME: 'app_mexico'
  },

  VIEW_OPTIONS: {
    THEME: 'green',
    INITIAL_MENU: {
      ID: 'home',
      OPTIONS: {
        toggle: true,
        trigger: true
      }
    },
    MENUS: {
      SHOW_COMPANIES: true
    },
    LAYOUTS: {
      LOGO_ASPECT_RATIO: 247 / 110,
      SHOW_ALL_GAMES_AT_COMPANY: true,
      BREED_CRUMB_COMPANY_DISTINCTION: true,
      MENU_PRIMARY_DISTINCTION: true
    },
    NAVIGATIONS: {
      SHOW_TITLE: true
    }
  },
  ENUMS: {
    SCREEN_TYPE: {
      HOME: 1,
      MENU: 2,
      COMPANY: 3,
      GAME: 4
    },
    MENU_TYPE: {
      PRIMARY: 1,
      COMPANY: 2,
      GAME: 3
    }
  },

  VARIABLES: {
    app: null
  }
};

export default config;
