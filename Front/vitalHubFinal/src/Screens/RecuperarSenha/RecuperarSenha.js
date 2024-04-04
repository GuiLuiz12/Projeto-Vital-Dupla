import { Container, ContainerSpace } from "../../Components/Container/Style"
import { Logo } from "../../Components/Logo/Style"
import { Title } from "../../Components/Title/Style"
import { Input } from "../../Components/Input/Style"
import { Button } from "../../Components/Button/Style"
import { ButtonTitle } from "../../Components/ButtonTitle/Style"
import { SubTitle } from "../../Components/SubTitle/Style"

export const RecuperarSenha = () => {
    return (
        <Container>
            <ContainerSpace>

                <Logo
                    source={require('../../Assets/Images/VitalHub_Logo.png')}
                />

                <Title>Recuperar Senha</Title>

                <SubTitle>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</SubTitle>

                <Input
                    placeholder="Usuário ou E-mail"
                />

            </ContainerSpace>

            <Button>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>



        </Container>
    )
}
