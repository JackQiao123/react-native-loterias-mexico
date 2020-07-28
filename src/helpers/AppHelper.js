import I18n from 'react-native-i18n';
import moment from 'moment';

import CONFIG from '../config';
import { Images } from '../theme';

const AppHelper = {

  _getCompanyMenuNode: (company) => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    const { SHOW_ALL_GAMES_AT_COMPANY } = CONFIG.VIEW_OPTIONS.LAYOUTS;
    const node = {
      id: `company_${company.id}`,
      icon: company.logo ? { uri: company.logo } : null,
      text: company.title,
      description: company.description,
      screenType: (SHOW_ALL_GAMES_AT_COMPANY ? SCREEN_TYPE.COMPANY : SCREEN_TYPE.MENU),
      menuType: MENU_TYPE.COMPANY,
      expanded: false,
      collapsable: false,
      childNodes: [],
      data: company
    };
    company.games.forEach((game) => {
      const childNode = AppHelper._getGameMenuNode(game, 'company');
      node.childNodes.push(childNode);
    });
    return node;
  },

  _getGameMenuNode: (game, prefix) => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    return {
      id: `${prefix}_game_${game.id}`,
      icon: game.logo ? { uri: game.logo } : null,
      text: game.title,
      description: game.description,
      screenType: SCREEN_TYPE.GAME,
      menuType: MENU_TYPE.GAME,
      data: game
    };
  },

  _getCompaniesMenuNode: (companies, description) => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    const node = {
      id: 'companies',
      text: I18n.t('lotteries'),
      menuType: MENU_TYPE.PRIMARY,
      screenType: SCREEN_TYPE.MENU,
      collapsable: true,
      expanded: true,
      description,
      childNodes: []
    };

    companies.forEach((company) => {
      const childNode = AppHelper._getCompanyMenuNode(company);
      node.childNodes.push(childNode);
    });
    
    return node;
  },

  getMenuNode: (data) => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    const { companies, description } = data;
    const node = {
      id: 'home',
      text: I18n.t(CONFIG.SETTINGS.APP_NAME),
      menuType: MENU_TYPE.PRIMARY,
      screenType: SCREEN_TYPE.HOME,
      childNodes: []
    };

    const companiesNode = AppHelper._getCompaniesMenuNode(companies, description);

    node.childNodes.push(companiesNode);

    return node;
  },

  _getGameMenuListNode(game, prefix) {
    // const date = new Date();
    const data = game;
    // data.updated_at = moment(date).format('DD-MM-YYYY | h:mm:ss a');
    return {
      id: `${prefix}_game_${game.id}`,
      data
    };
  },

  _getCompanyMenuListNode(company) {
    // const date = new Date();
    const data = company;
    // data.updated_at = moment(date).format('DD-MM-YYYY | h:mm:ss a');
    return {
      id: `company_${company.id}`,
      data
    };
  },

  _getCompaniesMenuList(companies) {
    const list = [];
    companies.forEach((company) => {
      const node = AppHelper._getCompanyMenuListNode(company);
      list.push(node);
      company.games.forEach((game) => {
        const childNode = AppHelper._getGameMenuListNode(game, 'company');
        list.push(childNode);
      });
    });
    return list;
  },

  _getPoolsMenuList(companies) {
    const list = [];
    companies.forEach((company) => {
      company.games.forEach((game) => {
        if (game.quinielia) {
          const node = AppHelper._getGameMenuListNode(game, 'pools');
          list.push(node);
        }
      });
    });
    return list;
  },

  getMenuList: (data) => {
    const VIEW_OPTION_MENUS = CONFIG.VIEW_OPTIONS.MENUS;
    const { companies } = data;
    const list = [];

    if (VIEW_OPTION_MENUS.SHOW_COMPANIES) {
      const companiesList = AppHelper._getCompaniesMenuList(companies);
      list.push(...companiesList);
    }

    return list;
  },

  isRecentlyUpdated(updated_at) {
    const todayDate = new Date();
    return updated_at.indexOf(moment(todayDate).format('DD-MM-YYYY')) === 0;
  },

  buildHttpQuery: (params) => {
    const str = [];
    Object.keys(params).forEach((key) => {
      const value = params[key];
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
    return str.join('&');
  },

  convertChartData(stats) {
    const keys = Object.keys(stats);
    const data = [];
    for (let i = 0; i < keys.length; i++) {
      data.push({ name: keys[i], v: stats[keys[i]] });
    }
    data.sort((a, b) => a.name - b.name);

    const mainData = [];
    for (let i = 0; i < data.length; i++) {
      const tempData = [];
      tempData.push(data[i]);
      mainData.push(tempData);
    }
    return mainData;
  },

  convertWaybackData(stats) {
    const keys = Object.keys(stats);
    const data = [];
    for (let i = 0; i < keys.length; i++) {
      data.push({ title: keys[i], content: stats[keys[i]] });
    }
    data.sort((a, b) => b.title - a.title);
    return data;
  }
};

export default AppHelper;
