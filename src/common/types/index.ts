import { FunctionComponent, ReactNode } from 'react';

// material-ui
import { SvgIconTypeMap, ChipProps, TableCellProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { AxiosResponse } from 'axios';

// project imports
// import { TablerIcon } from '@tabler/icons';

/** define type ReactNode */
export type Props = {
    children: ReactNode;
};

/** define type ConfigProviderProps */
export type ConfigProviderProps = {
    children: ReactNode;
};

/** define color types */
export type ColorProps = {
    readonly [key: string]: string;
};

/** type common */
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

/** define types auth resgister */
export type StringColorProps = {
    id?: string;
    label?: string;
    color?: string;
    primary?: string;
    secondary?: string;
};

export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type OverrideIcon =
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
          muiName: string;
      })
    | React.ComponentClass<any>
    | FunctionComponent<any>
    | any;

export interface GenericCardProps {
    title?: string;
    primary?: string | number | undefined;
    secondary?: string;
    content?: string;
    image?: string;
    dateTime?: string;
    iconPrimary?: OverrideIcon;
    color?: string;
    size?: string;
}

/** define response axios */
export interface AxiosResponseCustom extends AxiosResponse {
    DT?: {
        [key: string]: KeyedObject;
    };
    EC?: number;
    EM?: string;
    MS?: string;
    stack?: string;
    // status?: string | number;
}

export type NavItemType = {
    id?: string;
    icon?: GenericCardProps['iconPrimary'];
    target?: boolean;
    external?: boolean;
    url?: string | undefined;
    type?: string;
    title?: ReactNode | string;
    color?: 'primary' | 'secondary' | 'default' | undefined;
    caption?: ReactNode | string;
    breadcrumbs?: boolean;
    disabled?: boolean;
    chip?: ChipProps;
    children?: NavItemType[];
    elements?: NavItemType[];
    search?: string;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';
export type NavItemTypeObject = { children?: NavItemType[]; items?: NavItemType[]; type?: string };
