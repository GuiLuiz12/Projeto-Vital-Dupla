import {Modal, TouchableOpacity} from "react-native"
import { Title } from "../Title/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { IdadeEmail, ImagemProntuario, TextoProntuario } from "./Style"
import { ButtonModal, ButtonSecondary } from "../Button/Style"
import { ModalContent, PatientModal } from "../CancelationModal/Style"
import { ProntuarioPronto } from "../../Screens/ProntuarioPronto/ProntuarioPronto"
import { useNavigation } from "@react-navigation/native"

export const ProntuarioModal = ({
    visible,
    setShowModalAppointment,
    ...rest
}) => {
    const Navigation = useNavigation();

    const Prontuario = () => {
        Navigation.navigate(ProntuarioPronto)
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
                        source={require('../../Assets/Images/Niccole.png')}
                    />

                    <Title>Niccole Sarga</Title>

                    <IdadeEmail>
                        <TextoProntuario>22 anos</TextoProntuario>
                        <TextoProntuario>niccole.sarga@gmail.com</TextoProntuario>
                    </IdadeEmail>

                    {/* button */}
                    <ButtonModal onPress={Prontuario}>
                       
                        <ButtonTitle>Inserir prontuário</ButtonTitle>
                       
                    </ButtonModal>

                    {/* button cancel */}
                    <ButtonSecondary onPress={() => setShowModalAppointment(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ModalContent>
            </PatientModal>
        </Modal>
    )
}