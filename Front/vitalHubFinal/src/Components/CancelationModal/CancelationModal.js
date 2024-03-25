import {Modal} from "react-native"
import { Title } from "../Title/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { ModalContent, ModalText, PatientModal } from "./Style"
import { ButtonModal, ButtonSecondary } from "../Button/Style"
import * as Notifications from 'expo-notifications';



export const CancelationModal = ({
    visible,
    setShowModalCancel,
    ...rest
}) => {

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
        title: "Consulta cancelada",
        body: "Notificação recebida."
      },
      trigger: null
    })

  }
    return(
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
                    <ButtonModal onPress={handleCallNotifications}>
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

