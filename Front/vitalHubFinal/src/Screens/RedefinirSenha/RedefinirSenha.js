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
import { useState } from "react"
import api from "../../Service/Service"

export const RedefinirSenha = ({navigation, route}) => {

    const [load, setLoad] = useState(false)

    const [senha, setSenha] = useState('')
    const [confirmar, setConfirmar] = useState('')

    async function AlterarSenha(){
        if (senha === confirmar) {
            
            await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
                senhaNova : senha
            }).then(() => {
                navigation.replace("Login")
            }).catch(error => {
                console.log(error);
            })
        }else{
            alert("Senhas incompatíveis")
        }
    }

    return (
        <Container>
            <ContainerSpace>

                <Logo
                    source={require('../../Assets/Images/VitalHub_Logo.png')}
                />

                <Title>Redefinir senha</Title>

                <SubTitle>Insira e confirme a sua nova senha</SubTitle>

                <Input
                    secureTextEntry={true}
                    placeholder="Nova senha"

                    value={senha}
                    onChangeText={(txt) => setSenha(txt)}
                />

                <Input
                    secureTextEntry={true}
                    placeholder="Confirmar nova senha"

                    value={confirmar}
                    onChangeText={(txt) => setConfirmar(txt)}
                />

                <Button onPress={() => AlterarSenha()}>
                    <ButtonTitle>Comfirmar nova senha</ButtonTitle>
                </Button>

            </ContainerSpace>
        </Container>
    )
}
