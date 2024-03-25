import { Button } from "../../Components/Button/Style"
import { ButtonTitle } from "../../Components/ButtonTitle/Style"
import { CardMedico, CardMedicoContent, ImagemCardMedico, TextCardMedico } from "../../Components/CardMedico/Style"
import { Container, ContainerClinicas, ContainerSpace } from "../../Components/Container/Style"
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { Title, TitleClinica } from "../../Components/Title/Style"
import { SelecionarClinica } from "../SelecionarClinica/SelecionarClinica"
import { SelecionarData } from "../SelecionarData/SelecionarData"
import { useNavigation } from "@react-navigation/native"

export const SelecionarMedico = () => {

    const Navigation = useNavigation();

    const Continuar = () => {
        Navigation.navigate(SelecionarData)
    }
    const Voltar = () => {
        Navigation.navigate(SelecionarClinica)
    }

    return (
        <Container>
            <ContainerSpace>


                <Title>Selecionar Médico</Title>

                <ContainerClinicas>
                    <CardMedico>
                        <ImagemCardMedico
                            source={require('../../Assets/Images/DraAlessandra.png')}
                        />
                        <CardMedicoContent>

                            <TitleClinica>Dra Alessandra</TitleClinica>

                            <TextCardMedico>Demartologa, Esteticista</TextCardMedico>
                        </CardMedicoContent>
                    </CardMedico>
                    <CardMedico>
                        <ImagemCardMedico
                            source={require('../../Assets/Images/DrKumushiro.png')}
                        />
                        <CardMedicoContent>

                            <TitleClinica>Dr Kumushiro</TitleClinica>

                            <TextCardMedico>Cirurgião, Cardiologista</TextCardMedico>
                        </CardMedicoContent>
                    </CardMedico>
                    <CardMedico>
                        <ImagemCardMedico
                            source={require('../../Assets/Images/DrRodrigo.png')}
                        />
                        <CardMedicoContent>

                            <TitleClinica>Dr Rodrigo Santos</TitleClinica>

                            <TextCardMedico>Clínico, Pediatra</TextCardMedico>
                        </CardMedicoContent>
                    </CardMedico>
                </ContainerClinicas>

                <Button onPress={Continuar}>
                    <ButtonTitle>Continuar</ButtonTitle>
                </Button>

                <ContentAccount onPress={Voltar}>
                    <TextAccountLink>Cancelar</TextAccountLink>
                </ContentAccount>

            </ContainerSpace>
        </Container>
    )
}