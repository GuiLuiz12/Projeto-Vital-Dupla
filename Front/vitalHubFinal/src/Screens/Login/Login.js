import { TouchableOpacity } from "react-native"
import { Container } from "../../Components/Container/Style"
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
import { CriarConta } from "../CriarConta/CriarConta"
import { HomePaciente } from "../HomePaciente/HomePaciente"
import { useState } from "react"

import AsyncStorage from '@react-native-async-storage/async-storage'

import api from "../../Service/Service"


export const Login = ({navigation}) => {

    const [email, setEmail] = useState('cleber@email.com')
    const [senha, setSenha] = useState('12345')

    async function LoginFunct(){
        await api.post('/Login', {
            email : email,
            senha : senha
        }).then(async response => {
            await AsyncStorage.setItem("token", JSON.stringify(response.data))
            console.log(response)
            Navigation.navigate("Main")
        }).catch(error => {
            console.log(error);
        })
    }

    const Navigation = useNavigation();

    const ForgotSenha = () => {
        Navigation.navigate(RecuperarSenha)
    }

    const LinkCriarConta = () => {
        Navigation.navigate(CriarConta)
    }

    const EntrarPaciente = () => {
        // Navigation.navigate(HomePaciente)
    }

    return (
        <Container>

            <Logo
                source={require('../../Assets/Images/VitalHub_Logo.png')}
            />

            <Title>Entrar ou criar conta</Title>

            <Input
                placeholder="Usuário ou E-mail"

                value={email}
                onChangeText={event => setEmail(event)}
            />

            <Input
                placeholder="Senha"
                secureTextEntry={true}

                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            />
            <TouchableOpacity onPress={ForgotSenha}>
                <LinkMedium>Esqueceu sua senha?</LinkMedium>
            </TouchableOpacity>

            <Button onPress={(e) => LoginFunct()}>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>

            <ButtonGoogle>
                <AntDesign name="google" size={18} color="#496bba" />
                <ButtonTitleGoogle>Entrar com Google</ButtonTitleGoogle>
            </ButtonGoogle>


            <ContentAccount>
                <TextAccount>Não tem conta?</TextAccount>
                <TouchableOpacity onPress={LinkCriarConta}>
                    <TextAccountLink >Crie uma conta agora!</TextAccountLink>
                </TouchableOpacity>
            </ContentAccount>


        </Container>
    )
}