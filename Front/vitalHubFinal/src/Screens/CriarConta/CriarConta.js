import { Container, ContainerSpace } from "../../Components/Container/Style"
import { Logo } from "../../Components/Logo/Style"
import { Title } from "../../Components/Title/Style"
import { Input } from "../../Components/Input/Style"
import { Button } from "../../Components/Button/Style"
import { ButtonTitle } from "../../Components/ButtonTitle/Style"
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { SubTitle } from "../../Components/SubTitle/Style"
import { useState } from "react"
import api from "../../Service/Service"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const CriarConta = ({ navigation }) => {

    const [email, setEmail] = useState("edu@email.com")
    const [senha, setSenha] = useState("12345")
    const [confirmSenha, setConfirmSenha] = useState("12345")
    const [nome, setNome] = useState("Eduardo")

    const Cancelar = () => {
        navigation.navigate("Login")
    }

    async function Cadastrar() {
        if (senha == confirmSenha) {
            await CadastroApi()
            await LoginFunct()
            navigation.navigate("Perfil")
        } else {
            alert("Senhas não iguais")
        }
    }

    async function CadastroApi() {
        await AsyncStorage.removeItem("token")

        const form = new FormData()
        form.append("Nome", nome)
        form.append("Email", email)
        form.append("Senha", senha)
        form.append("IdTipoUsuario", "DBF30A27-F042-455E-B1B4-7EDE58D6DF29")

        

        await api.post("/Pacientes", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {

        })
            .catch(error => {
                console.log(error);
            })
    }

    async function LoginFunct() {
        try {
            const response = await api.post('/Login', { email: email, senha: senha });
            await AsyncStorage.setItem("token", JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
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
                value={email}
            />

            <Input
                placeholder="Senha"
                onChangeText={(event) => setSenha(event)}
                value={senha}
            />

            <Input
                placeholder="Confirmar senha"
                onChangeText={(event) => setConfirmSenha(event)}
                value={confirmSenha}
            />

            <Input
                placeholder="Nome"
                onChangeText={(event) => setNome(event)}
                value={nome}
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
