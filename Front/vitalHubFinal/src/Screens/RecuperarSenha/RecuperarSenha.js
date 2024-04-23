import { Container, ContainerSpace } from "../../Components/Container/Style"
import { Logo } from "../../Components/Logo/Style"
import { Title } from "../../Components/Title/Style"
import { Input } from "../../Components/Input/Style"
import { Button } from "../../Components/Button/Style"
import { ButtonTitle } from "../../Components/ButtonTitle/Style"
import { SubTitle } from "../../Components/SubTitle/Style"
import { useState } from "react"
import { api } from "../../Service/Service"
import { useNavigation } from "@react-navigation/native"

export const RecuperarSenha = ({navigation}) => {

    const [email, setEmail] = useState('');

    async function EnviarEmail(){
        await api.post(`/RecuperarSenha?email=${email}`)
        .then(() =>{

            navigation.replace("CodigoEmail", { "emailRecuperacao" : email })

        }).catch(error => {
            console.log(error);
        })
    }

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

                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                />

            </ContainerSpace>

            <Button onPress={() => EnviarEmail()}>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>



        </Container>
    )
}
