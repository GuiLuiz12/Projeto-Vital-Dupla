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

export const RedefinirSenha = () => {
    return (
        <Container>
            <ContainerSpace>

                <Logo
                    source={require('../../Assets/Images/VitalHub_Logo.png')}
                />

                <Title>Redefinir senha</Title>

                <SubTitle>Insira e confirme a sua nova senha</SubTitle>

                <Input
                    placeholder="Nova senha"
                />

                <Input
                    placeholder="Confirmar nova senha"
                />

                <Button>
                    <ButtonTitle>Comfirmar nova senha</ButtonTitle>
                </Button>

            </ContainerSpace>
        </Container>
    )
}
