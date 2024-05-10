import { Modal } from "react-native"
import { AppointmentModal, AppointmentModalView, ButtonConsulta, ButtonTextConsulta, SubTitleModal } from "./Style"
import { Title } from "../Title/Style"
import { FilterAppointment2 } from "../FilterAppointment/FilterAppointment"
import { InputAgendamento } from "../Input/Style"
import { Button, ButtonSecondary } from "../Button/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { useState } from "react"


export const AgendarModal = ({
    navigation,
    visible = true,
    setShowModalAgendar,
    ...rest
}) => {

    const [agendamento, setAgendamento] = useState(null)
    const [selecionado, setSelecionado] = useState("")

    async function handleContinue() {
        await setShowModalAgendar(false)

        navigation.replace("SelecionarClinica", { agendamento: agendamento })
    }

    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
            animationOutTiming={0}
        >
            <AppointmentModal>
                <AppointmentModalView>

                    <Title>Agendar consulta</Title>

                    <SubTitleModal>Qual o nível da consulta</SubTitleModal>


                    <FilterAppointment2>
                        <ButtonConsulta clickButton={selecionado === "7D4FA0A2-B61C-4EC1-87F7-BC95B6D94575"} onPress={() => {
                            setAgendamento({
                                ...agendamento, //manter as infos já passadas
                                prioridadeId: "7D4FA0A2-B61C-4EC1-87F7-BC95B6D94575",
                                prioridadeLabel: "Rotina"
                            })
                            setSelecionado("7D4FA0A2-B61C-4EC1-87F7-BC95B6D94575")
                        }}>
                            <ButtonTextConsulta clickButton={selecionado === "7D4FA0A2-B61C-4EC1-87F7-BC95B6D94575"}>
                                Rotina
                            </ButtonTextConsulta>
                        </ButtonConsulta>

                        <ButtonConsulta clickButton={selecionado === "F08A52E6-D46B-45A3-82B1-EA267CDA3BB2"} onPress={() => {
                            setAgendamento({
                                ...agendamento, //manter as infos já passadas
                                prioridadeId: "F08A52E6-D46B-45A3-82B1-EA267CDA3BB2",
                                prioridadeLabel: "Exame"
                            })
                            setSelecionado("F08A52E6-D46B-45A3-82B1-EA267CDA3BB2")
                        }}>
                            <ButtonTextConsulta clickButton={selecionado === "F08A52E6-D46B-45A3-82B1-EA267CDA3BB2"}>
                                Exame
                            </ButtonTextConsulta>
                        </ButtonConsulta>

                        <ButtonConsulta clickButton={selecionado === "DD6E0928-A55A-425C-B233-E2249EEA7421"} onPress={() => {
                            setAgendamento({
                                ...agendamento, //manter as infos já passadas
                                prioridadeId: "DD6E0928-A55A-425C-B233-E2249EEA7421",
                                prioridadeLabel: "Urgência"
                            })
                            setSelecionado("DD6E0928-A55A-425C-B233-E2249EEA7421")
                        }}>

                            <ButtonTextConsulta clickButton={selecionado === "DD6E0928-A55A-425C-B233-E2249EEA7421"}>
                                Urgência
                            </ButtonTextConsulta>
                        </ButtonConsulta>
                    </FilterAppointment2>

                    <SubTitleModal>Informe a localização desejada</SubTitleModal>

                    <InputAgendamento
                        placeholder="Informe a localização"



                        value={agendamento ? agendamento.localizacao : null}
                        onChangeText={(txt) => setAgendamento({
                            ...agendamento,
                            localizacao: txt
                        })}

                    />

                    <Button onPress={() => handleContinue()}>
                        <ButtonTitle>Continuar</ButtonTitle>
                    </Button>

                    <ButtonSecondary onPress={() => setShowModalAgendar(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </AppointmentModalView>
            </AppointmentModal>
        </Modal>
    )
}