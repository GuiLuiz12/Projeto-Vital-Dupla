import { Modal } from "react-native"
import { ConfirmarConteudoView, ConfirmarModalTitleView, ConfirmarModalView } from "./Style"
import { ModalContentConfirmar, PatientModal } from "../CancelationModal/Style"
import { ModalContentSubTitle, ModalInfo, ModalSubTitle, Title } from "../Title/Style"
import { Button, ButtonSecondary } from "../Button/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import moment from "moment"
import api from "../../Service/Service"
import { userDecodeToken } from "../../Utils/Auth"
import { useEffect, useState } from "react"

export const ConfirmarModal = ({
    visible,
    setShowModalConfirm,
    agendamento,
    navigation,
    ...rest
}) => {
    const [profile, setProfile] = useState()

    async function profileLoad() {
        const token = await userDecodeToken()

        if (token) {
            setProfile(token);
        }
    }

    async function handleConfirm(){
        await api.post("/Consultas/Cadastrar", {
            ...agendamento,
            pacienteId: profile.jti,
            situacaoId: "E11B5D10-E9FF-4827-ACDA-B25FF3AE27DB"
        }).then( async () => {
            await setShowModalConfirm(false);

            navigation.replace("Main")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        profileLoad()
    }, [visible])

    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <PatientModal>
                <ConfirmarModalView>
                    <ModalContentConfirmar>

                        <ConfirmarModalTitleView>
                            <Title>Agendar Consulta</Title>
                            <ModalSubTitle>Consulte os dados selecionados para a sua consulta</ModalSubTitle>
                        </ConfirmarModalTitleView>

                        <ConfirmarConteudoView>

                            <ModalContentSubTitle>Data da consulta</ModalContentSubTitle>
                            <ModalInfo>{ moment(agendamento.dataConsulta).format("DD/MM/YYYY HH:mm")}</ModalInfo>

                        </ConfirmarConteudoView>

                        <ConfirmarConteudoView>
                            <ModalContentSubTitle>Médico(a) da consulta</ModalContentSubTitle>
                            <ModalInfo>{agendamento.medicoLabel}</ModalInfo>
                            <ModalInfo>{agendamento.medicoEspecialidade}</ModalInfo>
                        </ConfirmarConteudoView>

                        <ConfirmarConteudoView>
                            <ModalContentSubTitle>Local da consulta</ModalContentSubTitle>
                            <ModalInfo>{agendamento.localizacao}</ModalInfo>
                        </ConfirmarConteudoView>

                        <ConfirmarConteudoView>
                            <ModalContentSubTitle>Tipo da consulta</ModalContentSubTitle>
                            <ModalInfo>{agendamento.prioridadeLabel}</ModalInfo>
                        </ConfirmarConteudoView>

                        <Button onPress={() => handleConfirm()}>
                            <ButtonTitle>Confirmar</ButtonTitle>
                        </Button>

                        <ButtonSecondary onPress={() => setShowModalConfirm(false)}>
                            <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                        </ButtonSecondary>

                    </ModalContentConfirmar>
                </ConfirmarModalView>
            </PatientModal>

        </Modal>
    )
}