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

import AsyncStorage from '@react-native-async-storage/async-storage'
export const CriarConta = ({navigation}) => {

    const [email, setEmail] = useState("cleitin@email.com")
    const [senha, setSenha] = useState("12345")
    const [confirmSenha, setConfirmSenha] = useState("12345")
    const [nome, setNome] = useState("cleitin")

    const Cancelar = () => {
        navigation.navigate("Login")
    }

    async function Cadastrar() {
        if (senha == confirmSenha) {
            CadatroApi()
            navigation.navigate("Perfil")
        }else{
            alert("Senhas não iguais")
        }
    }

    async function CadatroApi() {
        await AsyncStorage.removeItem("token")
        await api.post("/Pacientes", {
            rg: null,
            cpf: null,
            dataNascimento: null,
            cep: null,
            logradouro: null,
            numero: null,
            cidade: null,
            nome: nome,
            email: email,
            senha: senha,
            idTipoUsuario: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
        })
        .catch(error => {
            console.log(error);
        })
        LoginFunct(email, senha)
    }

    async function LoginFunct(email, senha) {
        try {
            const response = await api.post('/Login', { email, senha });
            await AsyncStorage.setItem("token", JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro ao fazer login. Por favor, verifique suas credenciais."); // Exibe uma mensagem de erro em caso de falha no login
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
