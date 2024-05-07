import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Perfil } from '../Perfil/Perfil';
import { ButtonFooter } from '../../Components/ButtonFooter/ButtonsFooter';
import { Home } from '../Home/Home';

const Tab = createBottomTabNavigator();

export function Main({route}) {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarActiveTintColor: "#607EC5",
                tabBarInactiveTintColor: "#4E4B59",
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: "Quicksand_500Medium"
                },
                headerShown: false,
            }}
            initialRouteName='Home'
            backBehavior='initialRoute'
            detachInactiveScreens={true}
        >
            <Tab.Screen name="Agenda" component={Home} options={{
                tabBarIcon:
                    ({ focused }) => (
                        <ButtonFooter
                            selected={focused}
                            isPerfil={false}
                            title={"Agenda"}
                        />
                    ),
                tabBarLabelStyle: { color: 'transparent' }
            }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{
                tabBarIcon:
                    ({ focused }) => (
                        <ButtonFooter
                            selected={focused}
                            isPerfil={true}
                            title={"Perfil"}
                        />
                    ),
                tabBarLabelStyle: { color: 'transparent' }
            }} />
        </Tab.Navigator>
    );
}