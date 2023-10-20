// types
import type { PaletteMode } from '@mui/material';

export type ConfigProps = {
    layout: string;
    drawerType: string;
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    navType: PaletteMode;
    presetColor: string;
    locale: string;
    rtlLayout: boolean;
    container: boolean;
};

export type CustomizationProps = {
    layout: string;
    drawerType: string;
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    navType: PaletteMode;
    presetColor: string;
    locale: string;
    rtlLayout: boolean;
    container: boolean;
    onChangeLocale: (locale: string) => void;
};
