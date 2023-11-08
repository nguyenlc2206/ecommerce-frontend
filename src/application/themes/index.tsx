// * import libs
import { useMemo } from 'react';

// * import types
import { Props } from '@ecommerce-frontend/src/common/types';

// * import hooks
import useConfig from '@ecommerce-frontend/src/common/hooks/useConfig';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';

// import project
import Palette from '@ecommerce-frontend/src/application/themes/palette';
import Typography from '@ecommerce-frontend/src/application/themes/typography';
import customShadows from '@ecommerce-frontend/src/application/themes/shadows';
import componentStyleOverrides from '@ecommerce-frontend/src/application/themes/compStyleOverride';

// types
import { CustomShadowProps } from '@ecommerce-frontend/src/common/types/default-theme';

// ==============================|| THEME CONFIG ||============================== //

const ThemeCustomization = ({ children }: Props) => {
    /** init variable config */
    const { borderRadius, fontFamily, navType, outlinedFilled, presetColor, rtlLayout } = useConfig();
    /** init theme */
    const theme: Theme = useMemo<Theme>(() => Palette(navType, presetColor), [navType, presetColor]);

    /** custom typography */
    const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
        () => Typography(theme, borderRadius, fontFamily),
        [theme, borderRadius, fontFamily]
    );

    /** custom shadow */
    const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
        () => customShadows(navType, theme),
        [navType, theme]
    );

    /** custom themeOptions */
    const themeOptions: ThemeOptions = useMemo(
        () => ({
            direction: rtlLayout ? 'rtl' : 'ltr',
            palette: theme.palette,
            mixins: {
                toolbar: {
                    minHeight: '48px',
                    padding: '16px',
                    '@media (min-width: 600px)': {
                        minHeight: '48px'
                    }
                }
            },
            typography: themeTypography,
            customShadows: themeCustomShadows
        }),
        [rtlLayout, theme, themeCustomShadows, themeTypography]
    );

    const themes: Theme = createTheme(themeOptions);
    themes.components = useMemo(
        () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
        [themes, borderRadius, outlinedFilled]
    );

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeCustomization;
