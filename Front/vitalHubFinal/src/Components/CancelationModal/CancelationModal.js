import { Modal } from "react-native"
import { Title } from "../Title/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { ModalContent, ModalText, PatientModal } from "./Style"
import { ButtonModal, ButtonSecondary } from "../Button/Style"
import * as Notifications from 'expo-notifications';
import api from "../../Service/Service"
import { useEffect, useState } from "react"

export const CancelationModal = ({
  visible,
  setShowModalCancel,
  consultaCancelar,
  setSituacaoConsultaAlterada,
  ...rest
}) => {
  const [statusNotification, setStatusNotification] = useState("")

    //SOLICITA PERMISSÃO DE NOTIFICAÇÕES AO INICIAR O APP
    Notifications.requestPermissionsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        //MOSTRAR ALERTA QUANDO NOTIFICAÇÃO FOR RECEBIDA
        shouldShowAlert: true,
        //TOCAR SOM QUANDO NOTIFICAÇÃO FOR RECEBIDA
        shouldPlaySound: false,
        //NUMERO DE NOTIFICACOES NO ICONE DO APP
        shouldSetBadge: false,
      }),
    });

  useEffect(() => {
  }, [])

  //funcao para lidar com a chamada de notificacao
  const handleCallNotifications = async () => {

    // do {
      //obtem o status da permissao
      const status = await Notifications.getPermissionsAsync();
      setStatusNotification(status)

      //verifica se o usuario concedeu permissão

     
    // } while (statusNotification != "granted");

    HandleCancel()
      .then(() => {
        setShowModalCancel(false)
        setSituacaoConsultaAlterada("823cbd73-efdb-40d1-aba5-02af35d040b1")
      })
      .catch((error) => {
        console.log(error);
      })

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Consulta cancelada",
        body: "Notificação recebida."
      },
      trigger: null
    })

  }

  async function HandleCancel() {
    await api.put(`/Consultas/Status?idConsulta=${consultaCancelar.id}&status=cancelado`)
  }

  return (
    <Modal
      {...rest}
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      {/* container */}
      <PatientModal>
        {/* content */}
        <ModalContent>
          <Title>Cancelar consulta</Title>

          <ModalText>
            Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?
          </ModalText>

          {/* button */}
          <ButtonModal onPress={() => handleCallNotifications()}>
            <ButtonTitle>Confirmar</ButtonTitle>
          </ButtonModal>

          {/* button cancel */}
          <ButtonSecondary onPress={() => setShowModalCancel(false)}>
            <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
          </ButtonSecondary>

        </ModalContent>
      </PatientModal>
    </Modal>
  )
}

