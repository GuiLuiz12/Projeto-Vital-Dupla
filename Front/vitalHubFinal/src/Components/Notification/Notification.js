import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//importar recursos do expo-notifications
import * as Notifications from 'expo-notifications';

//solicita permissoes de notificacao do app
Notifications.requestPermissionsAsync();

//define como as notificacoes devem ser tratadas quando recebidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({

    //mostrar o alerta quando a notificacao for recebida
    shouldShowAlert: true,

    //produz som ao receber notificacao
    shouldPlaySound: true,

    //numero de notificacoes no icone do app
    shouldSetBadge: true
  })
});

export default function Notificacao() {

  //funcao para lidar com a chamada de notificacao
  const handleCallNotifications = async () => {

    //obtem o status da permissao
    const { status } = await Notifications.getPermissionsAsync();

    //verifica se o usuario concedeu permissão
    if (status !== "granted") {
      alert("voce nao deixou as notificacoes ativas")
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Bem vindo ao SENAI!",
        body: "Notificação recebida."
      },
      trigger: null
    })

  }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleCallNotifications}>
//         <Text style={styles.text}>Clique aqui!</Text>
//       </TouchableOpacity>
//       <StatusBar style="auto" />
//     </View>
//   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "magenta",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 24
  }
});
