import {Drawer,
    DrawerBody, DrawerFooter,
    DrawerHeader,
    DrawerNavGroup,
    DrawerSubheader,
    H6,
    NavItem, Subtitle,
    wrapIcon
} from "@pxblue/react-native-components";
import * as PXBColors from "@pxblue/colors";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MatIcon from "react-native-vector-icons/MaterialIcons";

// @ts-ignore
import _Humidity from '@pxblue/icons-svg/moisture.svg';
// @ts-ignore
import _Battery from '@pxblue/icons-svg/battery.svg';
import * as React from "react";
import {useState} from "react";
import { View } from "react-native";
import { Divider } from "react-native-elements";

const Battery = wrapIcon({ IconClass: _Battery });
const Humidity = wrapIcon({ IconClass: _Humidity });
const Clock = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'clock-outline' });
const MailIcon = wrapIcon({ IconClass: MatIcon, name: 'mail' });

export const navGroupItems1: NavItem[] = [
    {
        title: 'Identity Management',
        itemID: '1a',
        icon: Battery,
        onPress: () => {
            console.log('pressed');
        }
    },
    {
        title: 'Calendar',
        itemID: '2a',
        icon: Humidity,
    },
    {
        title: 'Accessibility',
        itemID: '3a',
        icon: Clock,
        chevron: true,
    },
    {
        subtitle: 'Test',
        title: 'Notifications',
        itemID: '4a',
        icon: MailIcon,
    },
];

export const navGroupItems2: NavItem[] = [
    {
        title: 'Notifications',
        subtitle: '4 new alerts',
        itemID: '1b',
        statusColor: PXBColors.yellow[500]
    },
    {
        title: 'Calendar',
        itemID: '2b',
        chevron: true,
    },
    {
        title: 'Accessibility',
        itemID: '3b',
    },
    {
        subtitle: 'Test',
        title: 'Notifications',
        itemID: '4b',
        activeItemBackgroundColor: 'red'
    },
];

export const NavigationDrawer: React.FC = () => {
    const [selected, setSelected] = useState('');
    return (
        <Drawer chevron={true} activeItem={selected} onItemSelect={(id: any): void => setSelected(id)}>
            <DrawerHeader title={'Drawer Title'} subtitle={'Drawer Subtitle'}/>
            <DrawerSubheader>
                <H6 style={{backgroundColor: 'cyan'}}>Subheader goes here</H6>
            </DrawerSubheader>
            <DrawerBody>
                <DrawerNavGroup items={navGroupItems1} title={'Group 1'} chevron={false} />
                <DrawerNavGroup items={navGroupItems2} titleContent={
                    <View>
                        <Subtitle style={{padding: 16}}>Custom Navgroup Content</Subtitle>
                        <Divider />
                    </View>
                } />
            </DrawerBody>
            <DrawerFooter>
                <H6>Footer goes here</H6>
            </DrawerFooter>
        </Drawer>
    );
};
