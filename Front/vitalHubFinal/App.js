import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Login } from './src/Screens/Login/Login';
import { Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { useFonts, MontserratAlternates_600SemiBold, MontserratAlternates_500Medium, MontserratAlternates_700Bold } from "@expo-google-fonts/montserrat-alternates"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RecuperarSenha } from './src/Screens/RecuperarSenha/RecuperarSenha';
import { CodigoEmail } from './src/Screens/CodigoEmail/CodigoEmail';
import { RedefinirSenha } from './src/Screens/RedefinirSenha/RedefinirSenha';
import { CriarConta } from './src/Screens/CriarConta/CriarConta';
import { Perfil } from './src/Screens/Perfil/Perfil';
import { Local } from './src/Screens/Local/Local';
import { SelecionarClinica } from './src/Screens/SelecionarClinica/SelecionarClinica';
import { SelecionarMedico } from './src/Screens/SelecionarMedico/SelecionarMedico';
import { SelecionarData } from './src/Screens/SelecionarData/SelecionarData';
import { ProntuarioPronto } from './src/Screens/ProntuarioPronto/ProntuarioPronto';
import CameraProntuario from './src/Components/Camera/Camera';
import { Main } from './src/Screens/Main/Main';
import { Home } from './src/Screens/Home/Home';
import { Prontuario } from './src/Screens/Prontuario/Prontuario';
const Stack = createNativeStackNavigator();

// import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications

//criar conta, local da clinica, marcar consulta, notification

export default function App() {

  const[fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_700Bold,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold
  })

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    
    //Container - envolve toda a estrutura de navegação
      //Navigator - componente para a navegação
        //Screen - tela
          //name: nome da tela
          //component: componente que será chamado
          //options(title)

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: "Login", headerShown: false}}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{title: "RecuperarSenha", headerShown: false}}
        />
        <Stack.Screen
          name="CodigoEmail"
          component={CodigoEmail}
          options={{title: "CodigoEmail", headerShown: false}}
        />
        <Stack.Screen
          name="RedefinirSenha"
          component={RedefinirSenha}
          options={{title: "RedefinirSenha", headerShown: false}}
        />
        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
          options={{title: "CriarConta", headerShown: false}}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{title: "Perfil", headerShown: false}}
        />
        <Stack.Screen
          name="Local"
          component={Local}
          options={{title: "Local", headerShown: false}}
        />
        <Stack.Screen
          name="Prontuario"
          component={Prontuario}
          options={{title: "Prontuario", headerShown: false}}
        />
        <Stack.Screen
          name="SelecionarClinica"
          component={SelecionarClinica}
          options={{title: "SelecionarClinica", headerShown: false}}
        />
        <Stack.Screen
          name="SelecionarMedico"
          component={SelecionarMedico}
          options={{title: "SelecionarMedico", headerShown: false}}
        />
        <Stack.Screen
          name="SelecionarData"
          component={SelecionarData}
          options={{title: "SelecionarData", headerShown: false}}
        />
        <Stack.Screen
          name="ProntuarioPronto"
          component={ProntuarioPronto}
          options={{title: "ProntuarioPronto", headerShown: false}}
        />
        <Stack.Screen
          name="CameraProntuario"
          component={CameraProntuario}
          options={{title: "CameraProntuario", headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{title: "Main", headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: "Home", headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
