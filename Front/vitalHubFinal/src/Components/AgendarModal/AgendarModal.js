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
                        <ButtonConsulta clickButton={selecionado === "23A27EC8-0838-40DD-9A86-D822E85C73D6"} onPress={() => {
                            setAgendamento({
                                ...agendamento, //manter as infos já passadas
                                prioridadeId: "23A27EC8-0838-40DD-9A86-D822E85C73D6",
                                prioridadeLabel: "Rotina"
                            })
                            setSelecionado("23A27EC8-0838-40DD-9A86-D822E85C73D6")
                        }}>
                            <ButtonTextConsulta clickButton={selecionado === "23A27EC8-0838-40DD-9A86-D822E85C73D6"}>
                                Rotina
                            </ButtonTextConsulta>
                        </ButtonConsulta>

                        <ButtonConsulta clickButton={selecionado === "E4870835-AC16-4288-8330-F4C80C939F3F"} onPress={() => {
                            setAgendamento({
                                ...agendamento, //manter as infos já passadas
                                prioridadeId: "E4870835-AC16-4288-8330-F4C80C939F3F",
                                prioridadeLabel: "Exame"
                            })
                            setSelecionado("E4870835-AC16-4288-8330-F4C80C939F3F")
                        }}>
                            <ButtonTextConsulta clickButton={selecionado === "E4870835-AC16-4288-8330-F4C80C939F3F"}>
                                Exame
                            </ButtonTextConsulta>
                        </ButtonConsulta>

                        <ButtonConsulta clickButton={selecionado === "AD0B07C6-2CCA-4AF2-820C-C83DC83A84B3"} onPress={() => {
                            setAgendamento({
                                ...agendamento, //manter as infos já passadas
                                prioridadeId: "AD0B07C6-2CCA-4AF2-820C-C83DC83A84B3",
                                prioridadeLabel: "Urgência"
                            })
                            setSelecionado("AD0B07C6-2CCA-4AF2-820C-C83DC83A84B3")
                        }}>

                            <ButtonTextConsulta clickButton={selecionado === "AD0B07C6-2CCA-4AF2-820C-C83DC83A84B3"}>
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

                    <Button onPress={() => handleContinue()} disabled={agendamento === null}>
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