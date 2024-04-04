import { Container, ContainerSpace } from "../../Components/Container/Style"
import { Logo } from "../../Components/Logo/Style"
import { Title } from "../../Components/Title/Style"
import { Input } from "../../Components/Input/Style"
import { Button } from "../../Components/Button/Style"
import { ButtonTitle} from "../../Components/ButtonTitle/Style"
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { SubTitle } from "../../Components/SubTitle/Style"
import { useState } from "react"
import api from "../../Service/Service"

export const CriarConta = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmSenha, setConfirmSenha] = useState("")

    const Cancelar = () => {
        navigation.navigate("Login")
    }

    async function Cadastrar() {
        if (senha == confirmSenha) {
            CadatroApi()
            console.log("ok");
            navigation.navigate("Perfil")
        }else{
            alert("Senhas não iguais")
        }
    }

    async function CadatroApi() {
        await api.post("/Pacientes", {
            rg: null,
            cpf: null,
            dataNascimento: null,
            cep: null,
            logradouro: null,
            numero: null,
            cidade: null,
            nome: null,
            email: email,
            senha: senha,
            idTipoUsuario: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
          })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
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
                    onChangeText={(event) => setEmail(event)}
                />

                <Input
                    placeholder="Senha"
                    onChangeText={(event) => setSenha(event)}
                />

                <Input
                    placeholder="Confirmar senha"
                    onChangeText={(event) => setConfirmSenha(event)}
                />

                <Button onPress={() => Cadastrar()}>
                    <ButtonTitle>Cadastrar</ButtonTitle>
                </Button>


                <ContentAccount onPress={() => Cancelar()}>
                    <TextAccountLink>Cancelar</TextAccountLink>
                </ContentAccount>

        </Container>
    )
}
