import { Container, ContainerLeft, ContainerLocal, ContainerLocalEderecoP, ContainerLocalNumeroP, ContainerRowInputs } from "../../Components/Container/Style";
import { FotoPerfil } from "../../Components/FotoPerfil/Style";
import { SubTitle } from "../../Components/SubTitle/Style";
import { Title } from "../../Components/Title/Style";
import { TitleComponent } from "../../Components/TitleComponent/TitleComponent";
import { InputCinza, InputCinzaMenor } from "../../Components/InputCinza/Style";
import { Button, ButtonCinzaPequeno, ButtonPerfil } from "../../Components/Button/Style";
import { ButtonTitle } from "../../Components/ButtonTitle/Style";
import { Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth";
import api from "../../Service/Service";
import { invalid } from "moment";

export const Perfil = ({ navigation, route }) => {
    const [token, setToken] = useState({})
    const [editing, setEditing] = useState(false)
    const [desativarNavigation, setDesativarNavigation] = useState(false)
    const [oqueFazer, setOqueFazer] = useState(false)
    const [buscarId, setBuscarId] = useState(null)
    const [baseUser, setBaseUser] = useState({
        rg: null,
        cpf: null,
        dataNascimento: null,
        cep: null,
        logradouro: null,
        numero: null,
        cidade: null,
        nome: null,
        especialidade: null,
        crm: null
    })
    const [attUser, setAttUser] = useState({})

    function EditarFunction() {
        setEditing(true)
        setOqueFazer(true)
        setDesativarNavigation(true)
    }

    async function Logout() {
        await AsyncStorage.removeItem("token")
        navigation.navigate("Login")
    }

    async function ProfileLoad() {
        const tokenDecode = await userDecodeToken();
        if (tokenDecode != null) {
            BuscarUsuario()
            setToken(tokenDecode)
        }
    }

    async function BuscarUsuario() {
        const url = (token.role == 'Medico' ? 'Medicos' : "Pacientes")

        const response = await api.get(`/${url}/BuscarPorId?id=${token.jti}`).catch((error) => { console.log(error); })

        setBuscarId(response.data)

        setBaseUser({
            rg: buscarId.rg,
            cpf: buscarId.cpf,
            dataNascimento: buscarId.dataNascimento,
            cep: buscarId.endereco.cep,
            logradouro: buscarId.endereco.logradouro,
            numero: buscarId.endereco.numero,
            cidade: buscarId.endereco.cidade,
            especialidade: buscarId.especialidade.especialidade1,
            crm: buscarId.crm
        })
    }

    async function SalvarFunction(tokenUsuario) {
        setAttUser(baseUser)
        const response = await api.put(`/Pacientes?idUsuario=${token.jti}`, {
            rg: attUser.rg,
            cpf: attUser.cpf,
            dataNascimento: attUser.dataNascimento,
            cep: attUser.cep,
            logradouro: attUser.logradouro,
            numero: attUser.numero,
            cidade: attUser.cidade,
        })
        console.log(response.data);

        setEditing(false)
        setOqueFazer(false)
        setDesativarNavigation(false)
        navigation.navigate("main")
    }

    useEffect(() => {
        ProfileLoad();
    }, [editing])

    return (
        <ScrollView>
            {baseUser != null ?
                <Container>

                    <FotoPerfil
                        source={require('../../Assets/Images/Richard.png')}
                    />

                    <Title>{token.name}</Title>
                    <SubTitle>{token.email}</SubTitle>

                    <ContainerLeft>
                        <TitleComponent>Data de nascimento</TitleComponent>

                        <InputCinza
                            value={baseUser.dataNascimento === invalid ? new Date(baseUser.dataNascimento).toLocaleDateString() : null}
                            editable={editing}
                            onChangeText={(txt) => setBaseUser({dataNascimento: txt, ...baseUser})}
                            autoComplete={"Birthday"}
                            keyboardType={"numeric"}
                        />
                    </ContainerLeft>

                    {token.role === "Médico" ?
                        <>
                            <ContainerLeft>
                                <TitleComponent>Especialidade</TitleComponent>
                                <InputCinza
                                    value={baseUser.especialidade}
                                    editable={editing}
                                    onChangeText={(txt) => {
                                        setBaseUser({ especialidade: txt, ...baseUser})
                                    }}
                                    autoComplete={"off"}
                                />
                            </ContainerLeft>

                            <ContainerLeft>
                                <TitleComponent>CRM</TitleComponent>
                                <InputCinza
                                    value={baseUser.crm}
                                    editable={editing}
                                    onChangeText={(txt) => {
                                        setBaseUser({ crm: txt, ...baseUser})
                                    }}
                                    keyboardType={"numeric"}
                                    autoComplete={"off"}
                                />
                            </ContainerLeft>
                        </>
                        :
                        <>
                            <ContainerLeft>
                                <TitleComponent>RG</TitleComponent>
                                <InputCinza
                                    value={baseUser.rg}
                                    editable={editing}
                                    onChangeText={(txt) => {
                                        setBaseUser({ rg: txt, ...baseUser})
                                    }}
                                    keyboardType={"numeric"}
                                    autoComplete={"off"}
                                />
                            </ContainerLeft>

                            <ContainerLeft>
                                <TitleComponent>CPF</TitleComponent>
                                <InputCinza
                                    value={baseUser.cpf}
                                    editable={editing}
                                    onChangeText={(txt) => setBaseUser({ cpf: txt, ...baseUser })}
                                    keyboardType={"numeric"}
                                    autoComplete={"off"}
                                />
                            </ContainerLeft>
                        </>
                    }
                    <ContainerRowInputs>

                        <ContainerLocalEderecoP>

                            <TitleComponent>Rua/Logadouro</TitleComponent>

                            <InputCinzaMenor
                                value={baseUser.logradouro}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ logradouro: txt, ...baseUser })
                                }}
                                autoComplete={"off"}
                            />
                        </ContainerLocalEderecoP>

                        <ContainerLocalNumeroP>

                            <TitleComponent>Número</TitleComponent>

                            <InputCinzaMenor
                                value={baseUser.numero != undefined ? `${baseUser.numero}` : ""}
                                editable={editing}
                                onChangeText={(txt) =>setBaseUser({ numero: txt, ...baseUser })
                                }
                                keyboardType={"numeric"}
                                autoComplete={"off"}
                            />
                        </ContainerLocalNumeroP>

                    </ContainerRowInputs>

                    <ContainerRowInputs>
                        <ContainerLocal>
                            <TitleComponent>CEP</TitleComponent>
                            <InputCinzaMenor
                                value={baseUser.cep}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ cep: txt, ...baseUser })
                                }}
                                keyboardType={"numeric"}
                                autoComplete={"off"}
                            />
                        </ContainerLocal>

                        <ContainerLocal>
                            <TitleComponent>Cidade</TitleComponent>
                            <InputCinzaMenor
                                value={baseUser.cidade}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ cidade: txt, ...baseUser })
                                }}
                                autoComplete={"off"}
                            />
                        </ContainerLocal>
                    </ContainerRowInputs>

                    <ButtonPerfil onPress={() => SalvarFunction(token)} disabled={!editing} color={!editing}>
                        <ButtonTitle>Salvar</ButtonTitle>
                    </ButtonPerfil>

                    <ButtonPerfil onPress={() => EditarFunction()} disabled={editing} color={editing}>
                        <ButtonTitle>Editar</ButtonTitle>
                    </ButtonPerfil>

                    <ButtonCinzaPequeno onPress={() => Logout()} disabled={false}>
                        <ButtonTitle>Sair do APP</ButtonTitle>
                    </ButtonCinzaPequeno>

                </Container >
                :
                <></>
            }


        </ScrollView >
    )
}