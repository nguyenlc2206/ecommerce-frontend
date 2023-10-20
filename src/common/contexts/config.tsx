import { createContext, ReactNode } from 'react';

// * import project
import defaultConfig from '@ecommerce-frontend/src/config';
import useLocalStorage from '@ecommerce-frontend/src/common/hooks/useLocalStorage';

// * import types
import { CustomizationProps } from '@ecommerce-frontend/src/common/types/config';
import { ConfigProviderProps } from '@ecommerce-frontend/src/common/types';

// initial state
const initialState: CustomizationProps = {
    ...defaultConfig,
    onChangeLocale: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

const ConfigProvider = ({ children }: ConfigProviderProps) => {
    const [config, setConfig] = useLocalStorage('ecommerce-config-ts', {
        layout: initialState.layout,
        drawerType: initialState.drawerType,
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        navType: initialState.navType,
        presetColor: initialState.presetColor,
        locale: initialState.locale,
        rtlLayout: initialState.rtlLayout
    });

    const onChangeLocale = (locale: string) => {
        setConfig({
            ...config,
            locale
        });
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeLocale
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};

export { ConfigProvider, ConfigContext };
