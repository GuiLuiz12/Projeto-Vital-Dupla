import { Modal } from "react-native"
import { ConfirmarConteudoView, ConfirmarModalTitleView, ConfirmarModalView } from "./Style"
import { ModalContent, ModalContentConfirmar } from "../CancelationModal/Style"
import { ModalContentSubTitle, ModalInfo, ModalSubTitle, Title } from "../Title/Style"
import { Button, ButtonSecondary } from "../Button/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { ContentAccount, TextAccountLink } from "../ContentAccount/Style"
import { useNavigation } from "@react-navigation/native"
import { Perfil } from "../../Screens/Perfil/Perfil"

export const ConfirmarModal = ({
    visible,
    setShowModalConfirm,
    ...rest
}) => {
    const Navigation = useNavigation();

    const ConfirmarPerfil = () => {
        Navigation.navigate(Perfil)
    }
    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <ConfirmarModalView>
                <ModalContentConfirmar>
                    <ConfirmarModalTitleView>

                    <Title>Agendar Consulta</Title>

                    <ModalSubTitle>Consulte os dados selecionados para a sua consulta</ModalSubTitle>
                    </ConfirmarModalTitleView>

                    <ConfirmarConteudoView>

                    <ModalContentSubTitle>Data da consulta</ModalContentSubTitle>
                    <ModalInfo>1 de Novembro de 2023</ModalInfo>

                    </ConfirmarConteudoView>

                    <ConfirmarConteudoView>
                    <ModalContentSubTitle>Médico(a) da consulta</ModalContentSubTitle>
                    <ModalInfo>Dra Alessandra</ModalInfo>
                    <ModalInfo>Demartologa, Esteticista</ModalInfo>
                    </ConfirmarConteudoView>

                    <ConfirmarConteudoView>
                    <ModalContentSubTitle>Local da consulta</ModalContentSubTitle>
                    <ModalInfo>São Paulo, SP</ModalInfo>
                    </ConfirmarConteudoView>

                    <ConfirmarConteudoView>
                    <ModalContentSubTitle>Tipo da consulta</ModalContentSubTitle>
                    <ModalInfo>Rotina</ModalInfo>
                    </ConfirmarConteudoView>

                    <Button>
                        <ButtonTitle>Confirmar</ButtonTitle>
                    </Button>

                    <ButtonSecondary onPress={() => setShowModalConfirm(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                    
                </ModalContentConfirmar>
            </ConfirmarModalView>

        </Modal>
    )
}