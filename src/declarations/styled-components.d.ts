/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import ITheme from 'interfaces/ITheme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
