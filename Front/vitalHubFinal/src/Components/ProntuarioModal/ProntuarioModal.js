import { Modal, TouchableOpacity } from "react-native"
import { Title } from "../Title/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { IdadeEmail, ImagemProntuario, TextoProntuario } from "./Style"
import { ButtonModal, ButtonSecondary } from "../Button/Style"
import { ModalContent, PatientModal } from "../CancelationModal/Style"
import { idadeCalc } from "../../Utils/Auth"
import { useEffect } from "react"
import api from "../../Service/Service"

export const ProntuarioModal = ({
    visible,
    setShowModalAppointment,
    navigation,
    consulta,
    roleUsuario,
    clinicaId,
    setSituacaoConsultaAlterada,
    ...rest
}) => {

    function HandlePress(rota) {
        navigation.navigate(rota, { consulta: consulta })
        setShowModalAppointment(false)
    }

    async function setarRealizado() {
        await api.put(`/Consultas/Status?idConsulta=${consulta.id}&status=realizado`)
        .then(() => {
            setSituacaoConsultaAlterada("BD931B57-2311-454A-BFBF-E61DB5C8FAFA")
        })
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
                            source={{ uri: consulta.paciente.idNavigation.foto }}
                        />

                        <Title>{consulta.paciente.idNavigation.nome}</Title>
                        <IdadeEmail>
                            <TextoProntuario>{idadeCalc(consulta.paciente.dataNascimento)} anos</TextoProntuario>
                            <TextoProntuario>{consulta.paciente.idNavigation.email}</TextoProntuario>
                        </IdadeEmail>

                        {/* button */}
                        <ButtonModal onPress={() => {
                            setarRealizado()
                            HandlePress('Prontuario')
                        }}>

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