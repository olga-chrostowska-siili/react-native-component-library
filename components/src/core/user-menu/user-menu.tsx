import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { BottomSheet } from './bottom-sheet';
import { useTheme, Divider } from 'react-native-paper';
import { InfoListItem, InfoListItemProps } from '../info-list-item/info-list-item';

export type UserMenuProps = {
    // Custom avatar to render as bottomsheet trigger
    avatar: JSX.Element;
    // Background color of the bottomsheet
    backgroundColor?: string;
    // Color of font for menu items
    fontColor?: string;
    // Color of icons in the bottomsheet
    iconColor?: string;
    // Custom menu to render in the bottomsheet
    menu?: JSX.Element;
    menuItems?: InfoListItemProps[];
    // Boolean to control the bottomsheet from parent component
    menuOpen?: boolean;
    menuTitle?: string;
    menuSubtitle?: string;
    // Function to toggle menuOpen prop from parent component
    toggleMenu?: () => void;
    styles?: {
        root?: ViewStyle;
        avatar?: ViewStyle;
    };
};

const useStyles = (
    theme: ReactNativePaper.Theme
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    avatar: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            backgroundColor: theme.colors.surface,
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 40,
        },
    });

export const UserMenu: React.FC<UserMenuProps> = (props) => {
    const theme = useTheme();
    const {
        avatar,
        backgroundColor,
        fontColor,
        iconColor,
        menu,
        menuTitle,
        menuSubtitle,
        menuItems,
        menuOpen = false,
        toggleMenu = (): void => {},
        styles = {},
    } = props;
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const defaultStyles = useStyles(theme);

    const openMenu = (): void => {
        setShowBottomSheet(true);
    };

    const closeMenu = (): void => {
        setShowBottomSheet(false);
    };

    const getMenu = useCallback((): JSX.Element => {
        if (menu) {
            return menu;
        }

        return (
            <>
                {menuTitle && (
                    <>
                        <InfoListItem
                            title={menuTitle || ''}
                            subtitle={menuSubtitle}
                            leftComponent={<View style={[defaultStyles.avatar, styles.avatar]}>{avatar}</View>}
                            fontColor={fontColor}
                            backgroundColor={backgroundColor}
                        />
                        <Divider />
                    </>
                )}
                {menuItems &&
                    menuItems.map((menuItem: InfoListItemProps, index: number) => (
                        <InfoListItem
                            key={index}
                            title={menuItem.title}
                            subtitle={menuItem.subtitle}
                            IconClass={menuItem.IconClass}
                            onPress={(): void => {
                                closeMenu();
                                if (menuItem.onPress) menuItem.onPress();
                            }}
                            subtitleSeparator={menuItem.subtitleSeparator}
                            info={menuItem.info}
                            iconAlign={menuItem.iconAlign}
                            iconColor={iconColor || menuItem.iconColor}
                            hidePadding={menuItem.hidePadding}
                            avatar={menuItem.avatar}
                            chevron={menuItem.chevron}
                            dense={menuItem.dense}
                            divider={menuItem.divider}
                            leftComponent={menuItem.leftComponent}
                            rightComponent={menuItem.rightComponent}
                            statusColor={menuItem.statusColor}
                            fontColor={fontColor || menuItem.fontColor}
                            backgroundColor={backgroundColor || menuItem.backgroundColor}
                            theme={menuItem.theme}
                        />
                    ))}
            </>
        );
    }, [menu, menuItems, menuTitle, menuSubtitle, iconColor, fontColor, backgroundColor]);

    return (
        <View style={[defaultStyles.root, styles.root]}>
            <TouchableWithoutFeedback
                onPress={menu ? (): void => toggleMenu() : (): void => openMenu()}
                testID={'avatar'}
            >
                <View style={[defaultStyles.avatar, styles.avatar]}>{avatar}</View>
            </TouchableWithoutFeedback>
            <BottomSheet
                show={menu ? menuOpen : showBottomSheet}
                safeAreaColor={backgroundColor}
                dismissBottomSheet={menu ? (): void => toggleMenu() : (): void => closeMenu()}
            >
                {getMenu()}
            </BottomSheet>
        </View>
    );
};
