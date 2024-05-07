import { TouchableOpacity } from "react-native"
import { Container, ContainerSpace } from "../../Components/Container/Style"
import { Logo } from "../../Components/Logo/Style"
import { Title } from "../../Components/Title/Style"
import { Input } from "../../Components/Input/Style"
import { useNavigation } from "@react-navigation/native"
import { Button, IconBox } from "../../Components/Button/Style"
import { ButtonTitle, ButtonTitleGoogle } from "../../Components/ButtonTitle/Style"
import { ButtonGoogle } from "../../Components/Button/Style"
import { LinkMedium } from "../../Components/Link/Style"
import { AntDesign } from '@expo/vector-icons';
import { ContentAccount, TextAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { RecuperarSenha } from "../RecuperarSenha/RecuperarSenha"
import { SubTitle } from "../../Components/SubTitle/Style"
import { InputCodigo } from "../../Components/InputCodigo/Style"
import { ContainerRow } from "../../Components/ContainerRow/Style"
import { EmailText } from "../../Components/EmailText/Style"
import { useRef, useState } from "react"

import api from "../../Service/Service"

export const CodigoEmail = ({ navigation, route }) => {

    const [load, setLoad] = useState(false);
    const [codigo, setCodigo] = useState("")
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    function focusNextInput(index) {
        //verificar se o index e menor do que a quantidade de campos
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus()
        }
    }

    function focusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus()
        }
    }

    async function ValidarCodigo() {
        await api.post(`/RecuperarSenha/VerificationCode?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
            .then(() => {
                navigation.replace("RedefinirSenha", { emailRecuperacao: route.params.emailRecuperacao })
            }).catch((error) => {
                console.log(error);
            })
    }

    async function ReenviarEmail() {
        await api.post(`/RecuperarSenha?email=${route.params.emailRecuperacao}`)
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Container>
            <ContainerSpace>

                <IconBox onPress={() => navigation.navigate("RecSenha")}>
                    <AntDesign name="close" size={22} color="#34898F" />
                </IconBox>

                <Logo
                    source={require('../../Assets/Images/VitalHub_Logo.png')}
                />

                <Title>Verifique seu e-mail</Title>

                <SubTitle>Digite o código de 4 dígitos enviado para <EmailText>{route.params.emailRecuperacao}</EmailText></SubTitle>

                <ContainerRow>
                    {
                        [0, 1, 2, 3].map((index) => (
                            <InputCodigo
                                key={index}
                                ref={inputs[index]}

                                keyboardType="numeric"
                                placeholder="0"
                                maxlength={1}
                                caretHidden={true}

                                onChangeText={(txt) => {
                                    //Verificar se o campo e vazio
                                    if (txt == "") {
                                        focusPrevInput(index)
                                    } else {
                                        //verificar se o campo foi preenchido
                                        const codigoInformado = [...codigo]
                                        codigoInformado[index] = txt
                                        setCodigo(codigoInformado.join(''))

                                        focusNextInput(index)
                                    }

                                }}
                            />
                        ))
                    }
                </ContainerRow>

                <Button onPress={() => ValidarCodigo()}>
                    <ButtonTitle>Entrar</ButtonTitle>
                </Button>

                <ContentAccount onPress={() => ReenviarEmail()}>
                    <TextAccountLink>Reenviar código</TextAccountLink>
                </ContentAccount>

            </ContainerSpace>


        </Container>
    )
}