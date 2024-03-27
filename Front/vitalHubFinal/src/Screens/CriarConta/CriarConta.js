import { Container, ContainerSpace } from "../../Components/Container/Style"
import { Logo } from "../../Components/Logo/Style"
import { Title } from "../../Components/Title/Style"
import { Input } from "../../Components/Input/Style"
import { Button } from "../../Components/Button/Style"
import { ButtonTitle} from "../../Components/ButtonTitle/Style"
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { SubTitle } from "../../Components/SubTitle/Style"

export const CriarConta = ({navigation}) => {

    const Cancelar = () => {
        navigation.navigate("Login")
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


                <ContentAccount onPress={() => Cancelar()}>
                    <TextAccountLink>Cancelar</TextAccountLink>
                </ContentAccount>

        </Container>
    )
}
