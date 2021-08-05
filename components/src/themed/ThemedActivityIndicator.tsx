import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { alternateDarkTheme } from './shared/alternateDarkTheme';

export type ThemedActivityIndicator = React.ComponentProps<typeof ActivityIndicator>;

/** 
 * ThemedActivityIndicator component
 * 
 * This component is a wrapper around the React Native Paper [ActivityIndicator](https://callstack.github.io/react-native-paper/activity-indicator.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides 
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedActivityIndicator: React.FC<ThemedActivityIndicator> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useTheme(themeOverride);

    const altDarkTheme: $DeepPartial<ReactNativePaper.Theme> = Object.assign({
        ...alternateDarkTheme(theme)
    }, themeOverride);

    return <ActivityIndicator {...other} theme={theme.dark ? altDarkTheme : themeOverride} />;
};