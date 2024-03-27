import { TouchableOpacity } from "react-native"
import { Container } from "../../Components/Container/Style"
import { Logo } from "../../Components/Logo/Style"
import { Title } from "../../Components/Title/Style"
import { Input } from "../../Components/Input/Style"
import { Button } from "../../Components/Button/Style"
import { ButtonTitle, ButtonTitleGoogle } from "../../Components/ButtonTitle/Style"
import { ButtonGoogle } from "../../Components/Button/Style"
import { LinkMedium } from "../../Components/Link/Style"
import { AntDesign } from '@expo/vector-icons';
import { ContentAccount, TextAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { useState } from "react"
import Spinner from "../../Components/Spinner/Spinner"

import AsyncStorage from '@react-native-async-storage/async-storage'

import api from "../../Service/Service"



export const Login = ({navigation}) => {

    const [email, setEmail] = useState('cleber@email.com')
    const [senha, setSenha] = useState('12345')
    const [showSpinner, setShowSpinner] = useState(false)
    const [press, setPress] = useState(false) 

    async function LoginFunct(){
        setShowSpinner(true)
        setPress(true)
        await api.post('/Login', {
            email : email,
            senha : senha
        }).then(async response => {
            await AsyncStorage.setItem("token", JSON.stringify(response.data))
            navigation.navigate("Main")
        }).catch(error => {
            console.log(error);
        })
        setPress(false)
        setShowSpinner(false)
    }

    const ForgotSenha = () => {
        navigation.navigate("RecuperarSenha")
    }

    const LinkCriarConta = () => {
        navigation.navigate("CriarConta")
    }

    return (
        <Container>
            { showSpinner ? <Spinner/> : null}

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
            <TouchableOpacity onPress={() => ForgotSenha()} disabled={press}>
                <LinkMedium>Esqueceu sua senha?</LinkMedium>
            </TouchableOpacity>

            <Button onPress={(e) => LoginFunct()} disabled={press}>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>

            <ButtonGoogle disabled={press}>
                <AntDesign name="google" size={18} color="#496bba" />
                <ButtonTitleGoogle>Entrar com Google</ButtonTitleGoogle>
            </ButtonGoogle>

            <ContentAccount disabled={press}>
                <TextAccount>Não tem conta?</TextAccount>
                <TouchableOpacity onPress={() => LinkCriarConta()}>
                    <TextAccountLink >Crie uma conta agora!</TextAccountLink>
                </TouchableOpacity>
            </ContentAccount>

        </Container>
    )
}