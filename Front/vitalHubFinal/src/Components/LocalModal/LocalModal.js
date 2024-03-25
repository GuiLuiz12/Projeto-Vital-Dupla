import {Modal, TouchableOpacity} from "react-native"
import { Title } from "../Title/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { IdadeEmail, ImagemProntuario, TextoProntuario } from "../ProntuarioModal/Style"
import { ButtonModal, ButtonSecondary } from "../Button/Style"
import { ModalContent, PatientModal } from "../CancelationModal/Style"
import { useNavigation } from "@react-navigation/native"
import { Local } from "../../Screens/Local/Local"

export const LocalModal = ({
    visible,
    setShowModalLocal,
    ...rest
}) => {
    const Navigation = useNavigation();

    const Local = () => {
        Navigation.navigate(Local)
    }

    async function handleClose(){
        await setShowModalLocal(false)

        Navigation.replace("Local")
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
                    <ImagemProntuario
                        source={require('../../Assets/Images/MaskGroup.png')}
                    />

                    <Title>Dr Claudio</Title>

                    <IdadeEmail>
                        <TextoProntuario>Clínico Geral</TextoProntuario>
                        <TextoProntuario>CRM - 15286</TextoProntuario>
                    </IdadeEmail>

                    {/* button */}
                    <ButtonModal onPress={() => handleClose()}>
                       
                        <ButtonTitle>Ver Local da Consulta</ButtonTitle>
                       
                    </ButtonModal>

                    {/* button cancel */}
                    <ButtonSecondary onPress={() => setShowModalLocal(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ModalContent>
            </PatientModal>
        </Modal>
    )
}