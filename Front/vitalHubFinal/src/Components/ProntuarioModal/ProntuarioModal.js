import { Modal, TouchableOpacity } from "react-native"
import { Title } from "../Title/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { IdadeEmail, ImagemProntuario, TextoProntuario } from "./Style"
import { ButtonModal, ButtonSecondary } from "../Button/Style"
import { ModalContent, PatientModal } from "../CancelationModal/Style"
import { idadeCalc } from "../../Utils/Auth"
import { useEffect } from "react"

export const ProntuarioModal = ({
    visible,
    setShowModalAppointment,
    navigation,
    consulta,
    roleUsuario,
    clinicaId,
    ...rest
}) => {

    function HandlePress(rota) {
        navigation.navigate(rota, { consulta: consulta })
    }
    return (
        consulta == null ?

            <></>
            :
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
                            source={{uri : consulta.paciente.idNavigation.foto}}
                        />

                        <Title>{consulta.paciente.idNavigation.nome}</Title>
                        <IdadeEmail>
                            <TextoProntuario>{idadeCalc(consulta.paciente.dataNascimento)} anos</TextoProntuario>
                            <TextoProntuario>{consulta.paciente.idNavigation.email}</TextoProntuario>
                        </IdadeEmail>

                        {/* button */}
                        <ButtonModal onPress={() => HandlePress('Prontuario')}>

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