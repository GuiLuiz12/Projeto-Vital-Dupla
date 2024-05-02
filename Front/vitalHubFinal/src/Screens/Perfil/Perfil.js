import { Container, ContainerLeft, ContainerLocal, ContainerLocalEderecoP, ContainerLocalNumeroP, ContainerRowInputs } from "../../Components/Container/Style";
import { FotoPerfil } from "../../Components/FotoPerfil/Style";
import { SubTitle } from "../../Components/SubTitle/Style";
import { Title } from "../../Components/Title/Style";
import { TitleComponent } from "../../Components/TitleComponent/TitleComponent";
import { InputCinza, InputCinzaMenor } from "../../Components/InputCinza/Style";
import { ButtonCinzaPequeno, ButtonPerfil } from "../../Components/Button/Style";
import { ButtonTitle } from "../../Components/ButtonTitle/Style";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth";
import api from "../../Service/Service";
import { invalid } from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ButtonCamera } from "./Style";
import * as MediaLibrary from "expo-media-library"
import * as ImagePicker from "expo-image-picker"
import { Camera } from 'expo-camera';
import { requestForegroundPermissionsAsync } from 'expo-location';

export const Perfil = ({ navigation, route }) => {
    const [token, setToken] = useState({})
    const [photo, setPhoto] = useState(null)
    const [editing, setEditing] = useState(false)
    const [desativarNavigation, setDesativarNavigation] = useState(false)
    const [oqueFazer, setOqueFazer] = useState(false)
    const [baseUser, setBaseUser] = useState(null)
    const [attUser, setAttUser] = useState({})


    function EditarFunction() {
        setEditing(true)
        setOqueFazer(true)
        setDesativarNavigation(true)
    }

    async function Logout() {
        await AsyncStorage.removeItem("token");
        navigation.navigate("Login");
    }

    async function ProfileLoad() {
        const tokenDecode = await userDecodeToken();
        if (tokenDecode != null) {
            await setToken(tokenDecode)
            await BuscarUsuario()
        }
    }

    async function SalvarFunction() {
        setAttUser(baseUser)
        const response = await api.get(`/Especialidade/BuscarPorNome?esp=${attUser.especialidade.especialidade1}`)
        await setAttUser({ ...attUser, especialidade: { id: response.data.id, especialidade1: attUser.especialidade.especialidade1 } })

        if (token.role == "Médico") {
            await api.put("/Medicos", {
                id: token.jti,
                dataNascimento: attUser.dataNascimento,
                cep: attUser.cep,
                logradouro: attUser.logradouro,
                numero: attUser.numero,
                cidade: attUser.cidade,
                crm: attUser.crm,
                especialidade: attUser.especialidade.id
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            await api.put(`/Pacientes?idUsuario=${token.jti}`, {

                rg: attUser.rg,
                cpf: attUser.cpf,
                dataNascimento: attUser.dataNascimento,
                cep: attUser.cep,
                logradouro: attUser.logradouro,
                numero: attUser.numero,
                cidade: attUser.cidade,
            }).catch((error) => {
                console.log(error);
            })
        }
        setEditing(false)
        setOqueFazer(false)
        setDesativarNavigation(false)
    }

    function CancelFunction() {
        setEditing(false)
        setOqueFazer(false)
        setDesativarNavigation(false)
    }

    async function BuscarUsuario() {
        try {
            const url = (token.role == 'Médico' ? 'Medicos' : "Pacientes");

            const response = await api.get(`/${url}/BuscarPorId?id=${token.jti}`);

            setBaseUser(response.data);

            setPhoto(response.data.idNavigation.foto);

        } catch (error) {
            console.log(error);
        }
    }

    async function requestGaleria() {
        await MediaLibrary.requestPermissionsAsync();

        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    async function requestCamera() {
        await Camera.requestCameraPermissionsAsync();
    }

    async function requestLocation() {
        await requestForegroundPermissionsAsync();
    }

    async function AlterarFotoPerfil() {
        console.log(route);
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: route.params.photoUri,
            name: `image.${route.params.photoUri.split(".")[1]}`,
            type: `image/${route.params.photoUri.split(".")[1]}`
        });

        await api.put(`/Usuario/AlterarFotoPerfil?id=${baseUser.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }

        }).then(() => {
            setPhoto(route.params.photoUri)

        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        requestLocation();

        requestCamera();

        requestGaleria();

        ProfileLoad();
    }, [route]);

    useEffect(() => {
        if (route.params != null && baseUser) {
            AlterarFotoPerfil()
        }
    }, [route, baseUser])

    return (
        <ScrollView>
            {baseUser != null ?
                <Container>
                    <ContainerLocal>

                        <FotoPerfil
                            source={{ uri: photo }}
                        />
                        <ButtonCamera onPress={() => navigation.navigate("CameraProntuario", { screen: "Perfil" })}>
                            <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
                        </ButtonCamera>
                    </ContainerLocal>

                    <Title>{token.name}</Title>
                    <SubTitle>{token.email}</SubTitle>

                    {token.role === "Médico" ?
                        <>
                            <ContainerLeft>
                                <TitleComponent>Especialidade</TitleComponent>
                                <InputCinza
                                    value={baseUser.especialidade.especialidade1}
                                    editable={editing}
                                    onChangeText={(txt) => {
                                        setBaseUser({ ...baseUser, especialidade: { id: baseUser.especialidade.id, especialidade1: txt } })
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
                                        setBaseUser({ ...baseUser, crm: txt })
                                    }}
                                    keyboardType={"numeric"}
                                    autoComplete={"off"}
                                />
                            </ContainerLeft>
                        </>
                        :
                        <>
                            <ContainerLeft>
                                <TitleComponent>Data de nascimento</TitleComponent>

                                <InputCinza
                                    value={baseUser.dataNascimento === invalid ? new Date(baseUser.dataNascimento).toLocaleDateString() : null}
                                    editable={editing}
                                    onChangeText={(txt) => setBaseUser({ ...baseUser, dataNascimento: txt })}
                                    keyboardType={"numeric"}
                                    placeholder={"Formato de escrita: (DD-MM-YYYY)"}
                                />
                            </ContainerLeft>

                            <ContainerLeft>
                                <TitleComponent>RG</TitleComponent>
                                <InputCinza
                                    value={baseUser.rg}
                                    editable={editing}
                                    onChangeText={(txt) => {
                                        setBaseUser({ ...baseUser, rg: txt })
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
                                    onChangeText={(txt) => setBaseUser({ ...baseUser, cpf: txt })}
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
                                value={baseUser.endereco.logradouro}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ ...baseUser, logradouro: txt, })
                                }}
                                autoComplete={"off"}
                            />
                        </ContainerLocalEderecoP>

                        <ContainerLocalNumeroP>

                            <TitleComponent>Número</TitleComponent>
                            <InputCinzaMenor
                                value={baseUser.endereco.numero != undefined ? `${baseUser.endereco.numero}` : ""}
                                editable={editing}
                                onChangeText={(txt) => setBaseUser({ ...baseUser, numero: txt })
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
                                value={baseUser.endereco.cep}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ ...baseUser, cep: txt })
                                }}
                                keyboardType={"numeric"}
                                autoComplete={"off"}
                            />
                        </ContainerLocal>

                        <ContainerLocal>
                            <TitleComponent>Cidade</TitleComponent>
                            <InputCinzaMenor
                                value={baseUser.endereco.cidade}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ ...baseUser, cidade: txt })
                                }}
                                autoComplete={"off"}
                            />
                        </ContainerLocal>
                    </ContainerRowInputs>

                    <ButtonPerfil onPress={() => SalvarFunction(token)} disabled={!editing} color={!editing}>
                        <ButtonTitle>Salvar</ButtonTitle>
                    </ButtonPerfil>

                    {editing ?
                        <>
                            <ButtonPerfil onPress={() => CancelFunction()}>
                                <ButtonTitle>Cancelar</ButtonTitle>
                            </ButtonPerfil>
                        </>

                        :
                        <>
                            <ButtonPerfil onPress={() => EditarFunction()}>
                                <ButtonTitle>Editar</ButtonTitle>
                            </ButtonPerfil>
                        </>

                    }

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