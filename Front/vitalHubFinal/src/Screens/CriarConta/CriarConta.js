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
import { Login } from "../Login/Login"

export const CriarConta = () => {

    const Navigation = useNavigation();

    const Cancelar = () => {
        Navigation.navigate(Login)
    }


    return (
        <Container>
            <ContainerSpace>

                <Logo
                    source={require('../../Assets/Images/VitalHub_Logo.png')}
                />

                <Title>Criar Conta</Title>

                <SubTitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</SubTitle>

                </ContainerSpace>
                <Input
                    placeholder="Usuário ou email"
                />

                <Input
                    placeholder="Senha"
                />

                <Input
                    placeholder="Confirmar senha"
                />

                <Button>
                    <ButtonTitle>Cadastrar</ButtonTitle>
                </Button>


                <ContentAccount onPress={Cancelar}>
                    <TextAccountLink>Cancelar</TextAccountLink>
                </ContentAccount>

        </Container>
    )
}
