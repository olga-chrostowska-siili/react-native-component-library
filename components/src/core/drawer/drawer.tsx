import React, {useCallback, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {DrawerInheritableProps, inheritProps} from "./inheritable-types";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        flex: 1,
        height: '100%',
        width: '70%',
    },
});

export const Drawer: React.FC<DrawerInheritableProps> = (props) => {

    const findChildByType = useCallback((type: string): JSX.Element[] =>
        React.Children.map(props.children, (child: any) => {
            if (child && child.type) {
                const name = child.type.displayName;
                if (name && name.includes(type)) {
                    return child;
                }
            }
        }) || [], [props]);


    const getSectionByDisplayName = useCallback((displayName: string, inherit = false): JSX.Element[] =>
        findChildByType(displayName)
            .slice(0, 1)
            .map((child) => React.cloneElement(child, inherit ? inheritProps(props, child.props) : {} ))
    , [props]);

    return <View style={styles.container}>
        {getSectionByDisplayName('DrawerHeader')}
        {getSectionByDisplayName('DrawerSubheader')}
        {getSectionByDisplayName('DrawerBody', true)}
        <View style={{flex: 1, backgroundColor: 'green', height: 'auto', width: 'auto'}}/>
        {getSectionByDisplayName('DrawerFooter')}
    </View>
};
