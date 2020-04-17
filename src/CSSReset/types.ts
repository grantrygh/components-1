import { ITheme } from '../theme/types';

interface Config {
    color: string;
    bg: string;
    borderColor: string;
    placeholderColor: string;
}

export type CSSResetProps = {
    config?: (theme: ITheme, defaultConfig?: Config) => Config;
};
