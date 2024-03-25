import { Modal } from "react-native"
import { AppointmentModal, AppointmentModalView, ButtonConsulta, ButtonTextConsulta, SubTitleModal } from "./Style"
import { Title } from "../Title/Style"
import { FilterAppointment } from "../FilterAppointment/FilterAppointment"
import { ProntuarioInputMenor } from "../Input/Style"
import { Button, ButtonSecondary } from "../Button/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { ButtonCard, ButtonText } from "../AppointmentCard/Style"
import { useNavigation } from "@react-navigation/native"
import { SelecionarClinica } from "../../Screens/SelecionarClinica/SelecionarClinica"
import { useState } from "react"

export const AgendarModal = ({
    navigation,
    visible = true,
    setShowModalAgendar,
    ...rest
}) => {

    const [tipoConsulta, setTipoConsulta] = useState('')

    const Navigation = useNavigation();

    async function handleClose(){
        await setShowModalAgendar(false)

        Navigation.replace("SelecionarClinica")
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


                    <FilterAppointment>
                        <ButtonConsulta>
                            <ButtonTextConsulta>Rotina</ButtonTextConsulta>
                        </ButtonConsulta>
                        <ButtonConsulta>
                            <ButtonTextConsulta>Exame</ButtonTextConsulta>
                        </ButtonConsulta>
                        <ButtonConsulta>
                            <ButtonTextConsulta>Urgência</ButtonTextConsulta>
                        </ButtonConsulta>
                    </FilterAppointment>

                    <SubTitleModal>Informe a localização desejada</SubTitleModal>

                    <ProntuarioInputMenor
                        placeholder="Informe a localização"
                    />

                    <Button onPress={() => handleClose()}>
                        <ButtonTitle>Continuar</ButtonTitle>
                    </Button>

                    <ButtonSecondary onPress={e => setShowModalAgendar(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </AppointmentModalView>
            </AppointmentModal>


        </Modal>
    )
}