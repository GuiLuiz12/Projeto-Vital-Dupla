import { TouchableOpacity } from "react-native"
import { Container, ContainerSpace } from "../../Components/Container/Style"
import { Logo } from "../../Components/Logo/Style"
import { Title } from "../../Components/Title/Style"
import { Input } from "../../Components/Input/Style"
import { useNavigation } from "@react-navigation/native"
import { Button } from "../../Components/Button/Style"
import { ButtonTitle, ButtonTitleGoogle } from "../../Components/ButtonTitle/Style"
import { ButtonGoogle } from "../../Components/Button/Style"
import { LinkMedium } from "../../Components/Link/Style"
import { AntDesign } from '@expo/vector-icons';
import { ContentAccount, TextAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { RecuperarSenha } from "../RecuperarSenha/RecuperarSenha"
import { SubTitle } from "../../Components/SubTitle/Style"
import { InputCodigo } from "../../Components/InputCodigo/Style"
import { ContainerRow } from "../../Components/ContainerRow/Style"

export const CodigoEmail = () => {
    return (
        <Container>
            <ContainerSpace>

            <Logo
                source={require('../../Assets/Images/VitalHub_Logo.png')}
                />

            <Title>Verifique seu e-mail</Title>

            <SubTitle>Digite o código de 4 dígitos enviado para username@email.com</SubTitle>

            <ContainerRow>
            <InputCodigo>0</InputCodigo>
            <InputCodigo>0</InputCodigo>
            <InputCodigo>0</InputCodigo>
            <InputCodigo>0</InputCodigo>
            </ContainerRow>

            <Button>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>

            <ContentAccount>
                <TextAccountLink>Reenviar código</TextAccountLink>
            </ContentAccount>

                </ContainerSpace>
                

        </Container>
    )
}