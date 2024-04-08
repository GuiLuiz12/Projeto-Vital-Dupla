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
import api from "../../Service/Service";

export const Perfil = ({ navigation, route }) => {
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
        const tokenDecode = await userDecodeToken();

        if (tokenDecode) {
            BuscarUsuario(tokenDecode)

            setToken(tokenDecode)
        }
    }

    async function BuscarUsuario(tokenUsuario) {
        const url = (tokenUsuario.role == 'Medico' ? 'Medicos' : "Pacientes")
        console.log(tokenUsuario.role);

        const response = await api.get(`/${url}/BuscarPorId?id=${tokenUsuario.jti}`)
        setBuscarId(response.data)
        console.log("oi");
        console.log(response.data);
    }

    useEffect(() => {
        ProfileLoad();
        EditarFunction();
    }, [])

    // useEffect(() => {

    //     console.log(buscarId);
    // }, [])

    // useEffect(() => {
    //     BuscarUsuario();
    // }, [])

    return (
        <ScrollView>
            {buscarId != null ?
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

                    <Title>{token.name}</Title>

                    <SubTitle>{token.email}</SubTitle>

                    <ContainerLeft>
                        <TitleComponent>Nome</TitleComponent>

                        <InputCinza
                            placeholder="04/05/1999"
                        />
                    </ContainerLeft>


                    <TitleComponent>Data de nascimento</TitleComponent>

                    <InputCinza
                        placeholder="04/05/1999"
                    />

                    <Title>{buscarId.idNavigation.nome}</Title>

                    <SubTitle>{token.email}</SubTitle>
                    {token.role === "Medico" ?
                        <>
                            <ContainerLeft>
                                <TitleComponent>Especialidade</TitleComponent>
                                <InputCinza placeholder={buscarId.especialidade.especialidade1} />
                            </ContainerLeft>

                            <ContainerLeft>
                                <TitleComponent>CRM</TitleComponent>
                                <InputCinza placeholder={buscarId.crm} />
                            </ContainerLeft>


                            <FotoPerfil
                                source={require('../../Assets/Images/Richard.png')}
                            />


                            {
                                token.role == "Medico" ?

                                    <>
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


                                        <ContainerLeft>
                                            <TitleComponent>Especialidade</TitleComponent>
                                            <InputCinza placeholder={buscarId.especialidade.especialidade1} />
                                        </ContainerLeft>

                                        <ContainerLeft>
                                            <TitleComponent>CRM</TitleComponent>
                                            <InputCinza placeholder={buscarId.crm} />
                                        </ContainerLeft>


                                    </>
                                    :
                                    <>
                                        <ContainerLeft>
                                            <TitleComponent>Nome</TitleComponent>
                                            <InputCinza placeholder={buscarId.idNavigation.nome} />
                                        </ContainerLeft>

                                        <ContainerLeft>
                                            <TitleComponent>RG</TitleComponent>
                                            <InputCinza placeholder={buscarId.rg} />
                                        </ContainerLeft>

                                        <ContainerLeft>
                                            <TitleComponent>Data de nascimento</TitleComponent>
                                            <InputCinza placeholder={buscarId.dataNascimento} />
                                        </ContainerLeft>

                                        <ContainerLeft>
                                            <TitleComponent>CPF</TitleComponent>
                                            <InputCinza placeholder={buscarId.cpf} />
                                        </ContainerLeft>
                                    </>

                            }
                            <ContainerRow>
                                <ContainerLocal>
                                    <TitleComponent>Logradouro</TitleComponent>
                                    <InputCinzaMenor placeholder={buscarId.endereco.logradouro} />
                                </ContainerLocal>


                                <ContainerLocal>
                                    <TitleComponent>Número</TitleComponent>
                                    <InputCinzaMenor placeholder={`${buscarId.endereco.numero}`} />
                                </ContainerLocal>
                            </ContainerRow >

                            <ContainerRow>
                                <ContainerLocal>
                                    <TitleComponent>CEP</TitleComponent>
                                    <InputCinzaMenor placeholder={buscarId.endereco.cep} />
                                </ContainerLocal>

                                <ContainerLocal>
                                    <TitleComponent>Cidade</TitleComponent>
                                    <InputCinzaMenor placeholder={buscarId.endereco.cidade} />
                                </ContainerLocal>
                            </ContainerRow>

                            <Button onPress={() => SalvarFunction} disbled={!oqueFazer}>
                                <ButtonTitle>Salvar</ButtonTitle>
                            </Button>

                            <Button onPress={() => EditarFunction} disbled={oqueFazer}>
                                <ButtonTitle>Editar</ButtonTitle>
                            </Button>

                            <ButtonCinzaPequeno onPress={() => Logout()} disabled={desativarNavigation}>
                                <ButtonTitle>Sair do APP</ButtonTitle>
                            </ButtonCinzaPequeno>


                        </>
                        :
                        <></>

                    }
                </Container >
                :
                <></>
            }

            <ButtonCinzaPequeno onPress={() => Logout()} disabled={false}>
                <ButtonTitle>Sair do APP</ButtonTitle>
            </ButtonCinzaPequeno>
        </ScrollView >
    )
}