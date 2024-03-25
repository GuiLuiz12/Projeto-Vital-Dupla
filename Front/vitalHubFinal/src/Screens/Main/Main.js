import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomePaciente } from '../HomePaciente/HomePaciente';
import { useState } from 'react';
import { HomeMedico } from '../HomeMedico/HomeMedico';
import { Perfil } from '../Perfil/Perfil';
import { ButtonFooter } from '../../Components/ButtonFooter/ButtonsFooter';

const Tab = createBottomTabNavigator();

export function Main() {
    const [role, setRole] = useState("comum")
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
            initialRouteName={role === "ADM" ? "HomeMedico" : "HomePaciente"}
            backBehavior='initialRoute'
            detachInactiveScreens={true}
        >
            <Tab.Screen name="Agenda" component={role === "ADM" ? HomeMedico : HomePaciente} options={{
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