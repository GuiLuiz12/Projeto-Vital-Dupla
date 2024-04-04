import { Container, ContainerRow, ContainerLeft, ContainerLocal } from "../../Components/Container/Style";
import { FotoPerfil } from "../../Components/FotoPerfil/Style";
import { SubTitle } from "../../Components/SubTitle/Style";
import { Title } from "../../Components/Title/Style";
import { TitleComponent } from "../../Components/TitleComponent/TitleComponent";
import { InputCinza, InputCinzaMenor } from "../../Components/InputCinza/Style";
import { Button, ButtonCinzaPequeno } from "../../Components/Button/Style";
import { ButtonTitle } from "../../Components/ButtonTitle/Style";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth";
import api from "../../Service/Service";

export const Perfil = ({ navigation, route }) => {
    const [token, setToken] = useState({})
    const [buscarId, setBuscarId] = useState({})

    async function Logout() {
        await AsyncStorage.removeItem("token")
        navigation.navigate("Login")
    }

    async function ProfileLoad() {
        const token  = await userDecodeToken();

        if (token) {
            console.log(token);
            setToken(token)
        }
    }

    async function BuscarUsuario() {
        const url = (token.role == 'Medico' ? 'Medicos' : "Pacientes")

        const response = await api.get(`/${url}/BuscarPorId`)
        setBuscarId(response.data)
    }

    useEffect(() => {
        ProfileLoad();
    }, [])

    useEffect(() => {
        BuscarUsuario();
    }, [])

    return (

        <ScrollView>

            <Container>

                <FotoPerfil
                    source={require('../../Assets/Images/Richard.png')}
                />

                <Title>{token.name}</Title>

                <SubTitle>{token.email}</SubTitle>

                <ContainerLeft>

                    <TitleComponent>Data de nascimento</TitleComponent>

                    <InputCinza
                        placeholder={token.data}
                    />
                </ContainerLeft>

                <ContainerLeft>

                    <TitleComponent>CPF</TitleComponent>

                    <InputCinza
                        placeholder={token.cpf}
                    />
                </ContainerLeft>

                <ContainerLeft>

                    <TitleComponent>Endereço</TitleComponent>

                    <InputCinza
                        placeholder={token.endereco}
                    />
                </ContainerLeft>

                <ContainerRow>

                    <ContainerLocal>

                        <TitleComponent>CEP</TitleComponent>

                        <InputCinzaMenor
                            placeholder={token.cep}
                        />
                    </ContainerLocal>

                    <ContainerLocal>

                        <TitleComponent>Cidade</TitleComponent>

                        <InputCinzaMenor
                            placeholder={token.cidade}
                        />
                    </ContainerLocal>

                </ContainerRow>

                <Button>
                    <ButtonTitle>Salvar</ButtonTitle>
                </Button>

                <Button>
                    <ButtonTitle>Editar</ButtonTitle>
                </Button>

                <ButtonCinzaPequeno onPress={() => Logout()}>
                    <ButtonTitle>Sair do APP</ButtonTitle>
                </ButtonCinzaPequeno>

            </Container>
        </ScrollView>
    )
}