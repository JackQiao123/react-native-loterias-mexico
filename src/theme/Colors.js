import CONFIG from '../config';

import colorsYellow from './ColorsYellow';
import colorsOrange from './ColorsOrange';
import colorsRed from './ColorsRed';
import colorsGreen from './ColorsGreen';
import colorsBlue from './ColorsBlue';
import colorsDefault from './ColorsDefault';

let colorsTable = null;
const theme = CONFIG.VIEW_OPTIONS.THEME;
switch (theme) {
  case 'yellow':
    colorsTable = colorsYellow;
    break;
  case 'orange':
    colorsTable = colorsOrange;
    break;
  case 'red':
    colorsTable = colorsRed;
    break;
  case 'green':
    colorsTable = colorsGreen;
    break;
  case 'blue':
    colorsTable = colorsBlue;
    break;
  case 'default':
  default:
    colorsTable = colorsDefault;
    break;
}

const colors = colorsTable;
export default colors;
