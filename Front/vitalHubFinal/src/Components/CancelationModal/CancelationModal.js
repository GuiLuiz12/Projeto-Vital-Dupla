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

  useEffect(() => {
    ( async () => {
      const status = await Notifications.getPermissionsAsync();
      setStatusNotification(status)
  
      //verifica se o usuario concedeu permissão
  
      if (status != "granted") {
        alert("voce nao deixou as notificacoes ativas")
      }else{
        await Notifications.getPermissionsAsync();
      }
    })()
  }, [])

  //funcao para lidar com a chamada de notificacao
  const handleCallNotifications = async () => {

    // do {
      //obtem o status da permissao
      const status = await Notifications.getPermissionsAsync();
      setStatusNotification(status)

      //verifica se o usuario concedeu permissão

      if (status != "granted") {
        alert("voce nao deixou as notificacoes ativas")
      }
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

