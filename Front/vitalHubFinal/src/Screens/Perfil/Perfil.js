import { Container, ContainerRow, ContainerLeft, ContainerLocal, ContainerLocalEderecoP, ContainerLocalNumeroP } from "../../Components/Container/Style";
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

export const Perfil = ({ navigation }) => {
    const [token, setToken] = useState({})
    const [editing, setEditing] = useState(false)
    const [desativarNavigation, setDesativarNavigation] = useState(false)
    const [oqueFazer, setOqueFazer] = useState(false)

    function EditarFunction() {
        setEditing(false)
        setOqueFazer(true)
        setDesativarNavigation(true)
    }

    async function Logout() {
        await AsyncStorage.removeItem("token")
        navigation.navigate("Login")
    }

    async function ProfileLoad() {
        const token = await userDecodeToken();

        if (token) {
            console.log(token);
            setToken(token)
        }
    }

    useEffect(() => {
        ProfileLoad();
        EditarFunction();
    }, [])

    return (

        <ScrollView>

            <Container>

                <FotoPerfil
                    source={require('../../Assets/Images/Richard.png')}
                />

                {!editing ?
                    <>
                        <Title>{token.name}</Title>
                        <SubTitle>{token.email}</SubTitle>
                    </>
                    :
                    <ContainerLeft>
                        <TitleComponent>Nome</TitleComponent>

                        <InputCinza
                            placeholder="Miguel Moreira"
                        />
                    </ContainerLeft>
                }

                <ContainerLeft>

                    <TitleComponent>Data de nascimento</TitleComponent>

                    <InputCinza
                        placeholder="04/05/1999"
                    />
                </ContainerLeft>

                <ContainerLeft>

                    <TitleComponent>CPF</TitleComponent>

                    <InputCinza
                        placeholder="85968457319"
                    />
                </ContainerLeft>

                <ContainerLeft>

                    <TitleComponent>Rg</TitleComponent>

                    <InputCinza
                        placeholder="85968457319"
                    />
                </ContainerLeft>

                <ContainerRow>

                    <ContainerLocalEderecoP>

                        <TitleComponent>Rua/Logadouro</TitleComponent>

                        <InputCinzaMenor
                            placeholder="Rua Vicenso Silva"
                        />
                    </ContainerLocalEderecoP>

                    <ContainerLocalNumeroP>

                        <TitleComponent>Número</TitleComponent>

                        <InputCinzaMenor
                            placeholder="129"
                        />
                    </ContainerLocalNumeroP>

                </ContainerRow>

                <ContainerRow>

                    <ContainerLocal>

                        <TitleComponent>CEP</TitleComponent>

                        <InputCinzaMenor
                            placeholder="06548-909"
                        />
                    </ContainerLocal>

                    <ContainerLocal>

                        <TitleComponent>Cidade</TitleComponent>

                        <InputCinzaMenor
                            placeholder="Moema-SP"
                        />
                    </ContainerLocal>

                </ContainerRow>

                <Button onPress={() => SalvarFunction}  disbled={!oqueFazer}>
                    <ButtonTitle>Salvar</ButtonTitle>
                </Button>

                <Button onPress={() => EditarFunction} disbled={oqueFazer}>
                    <ButtonTitle>Editar</ButtonTitle>
                </Button>

                <ButtonCinzaPequeno onPress={() => Logout()} disabled={desativarNavigation}>
                    <ButtonTitle>Sair do APP</ButtonTitle>
                </ButtonCinzaPequeno>

            </Container>
        </ScrollView>
    )
}