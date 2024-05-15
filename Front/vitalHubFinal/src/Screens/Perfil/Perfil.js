import { Container, ContainerLeft, ContainerLocal, ContainerLocalEderecoP, ContainerLocalNumeroP, ContainerRowInputs, ContainerFotoPerfil } from "../../Components/Container/Style";
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
import { useCameraPermissions } from 'expo-camera';

export const Perfil = ({ navigation, route }) => {
    const [token, setToken] = useState({})
    const [baseUser, setBaseUser] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [permissionMedia, requestMediaPermission] = MediaLibrary.usePermissions();
    const [editing, setEditing] = useState(false);
    const [desativarNavigation, setDesativarNavigation] = useState(false)

    function EditarFunction() {
        setEditing(true)
        setDesativarNavigation(true)
    }

    async function Logout() {
        await AsyncStorage.removeItem("token");
        navigation.navigate("Login");
    }

    async function ProfileLoad() {
        const tokenDecode = await userDecodeToken();
        console.log(tokenDecode);
        if (tokenDecode) {
            await setToken(tokenDecode)
            await BuscarUsuario(tokenDecode)
        }
    }

    async function SalvarFunction() {
        if (token.role == "Medico") {
            const response = await api.get(`/Especialidade/BuscarPorNome?esp=${baseUser.especialidade.especialidade1}`)
            await setbaseUser({ ...baseUser, especialidade: { id: response.data.id, especialidade1: baseUser.especialidade.especialidade1 } })
        }

        if (token.role == "Medico") {
            await api.put("/Medicos", {
                id: token.jti,
                dataNascimento: baseUser.dataNascimento,
                cep: baseUser.cep,
                logradouro: baseUser.logradouro,
                numero: baseUser.numero,
                cidade: baseUser.cidade,
                crm: baseUser.crm,
                especialidade: baseUser.especialidade.id
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            await api.put(`/Pacientes?idUsuario=${token.jti}`, {

                rg: baseUser.rg,
                cpf: baseUser.cpf,
                dataNascimento: baseUser.dataNascimento,
                cep: baseUser.cep,
                logradouro: baseUser.logradouro,
                numero: baseUser.numero,
                cidade: baseUser.cidade,
            }).catch((error) => {
                console.log(error);
            })
        }
        setEditing(false)
        setDesativarNavigation(false)
    }

    function CancelFunction() {
        setEditing(false)

        setDesativarNavigation(false)
    }

    async function BuscarUsuario(tokenUser) {
        try {
            const url = (tokenUser.role == 'Medico' ? 'Medicos' : "Pacientes");

            const response = await api.get(`/${url}/BuscarPorId?id=${tokenUser.jti}`);

            setBaseUser(response.data)
            setPhoto(response.data.idNavigation.foto)

        } catch (error) {
            console.log(error);
        }
    }

    async function requestGaleria() {
        await requestMediaPermission();

        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    async function requestCamera() {
        await requestPermission();
    }

    async function AlterarFotoPerfil() {
        console.log(route);
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: route.params.photoUri,
            name: `image.${route.params.photoUri.split(".")[1]}`,
            type: `image/${route.params.photoUri.split(".")[1]}`
        });
        console.log("2");

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
        (async () => {
            if (permission && !permission.granted) {
                await requestPermission();
            }

            // const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
            if (MediaLibrary.PermissionStatus.DENIED) {
                await requestMediaPermission();
            }
        })();
    }, []);

    useEffect(() => {
        ProfileLoad();
    }, [route]);

    useEffect(() => {
        if (route.params != null && baseUser) {
            AlterarFotoPerfil()
        }
    }, [route, baseUser, photo])

    return (
        <ScrollView>
            {baseUser != null ?
                <Container>
                    <ContainerFotoPerfil>

                        <FotoPerfil
                            source={{ uri: photo }}
                        />
                        <ButtonCamera onPress={() => navigation.navigate("CameraProntuario", { screen: "Perfil" })}>
                            <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
                        </ButtonCamera>
                    </ContainerFotoPerfil>

                    <Title>{token.name}</Title>
                    <SubTitle>{token.email}</SubTitle>

                    {token.role === "Medico" ?
                        <>
                            <ContainerLeft>
                                <TitleComponent>Especialidade</TitleComponent>
                                <InputCinza
                                    value={baseUser.especialidade.especialidade1 ? baseUser.especialidade.especialidade1 : ""}
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
                                    value={baseUser.crm ? baseUser.crm : ""}
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
                                    value={baseUser.dataNascimento != invalid ? new Date(baseUser.dataNascimento).toLocaleDateString() : null}
                                    editable={editing}
                                    onChangeText={(txt) => setBaseUser({ ...baseUser, dataNascimento: txt })}
                                    keyboardType={"numeric"}
                                    placeholder={"Formato de escrita: (DD-MM-YYYY)"}
                                />
                            </ContainerLeft>

                            <ContainerLeft>
                                <TitleComponent>RG</TitleComponent>
                                <InputCinza
                                    value={baseUser.rg ? baseUser.rg : ""}
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
                                    value={baseUser.cpf ? baseUser.cpf : ""}
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
                                value={baseUser.endereco.logradouro != undefined ? baseUser.endereco.logradouro : ""}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ ...baseUser, endereco: {...baseUser.endereco, logradouro: txt}})
                                }}
                                autoComplete={"off"}
                            />
                        </ContainerLocalEderecoP>

                        <ContainerLocalNumeroP>

                            <TitleComponent>Número</TitleComponent>
                            <InputCinzaMenor
                                value={baseUser.endereco != undefined ? `${baseUser.endereco.numero}` : null}
                                editable={editing}
                                onChangeText={(txt) => setBaseUser({ ...baseUser, endereco: {...baseUser.endereco, numero: txt} })
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
                                value={baseUser.endereco != undefined ? baseUser.endereco.cep : ""}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ ...baseUser, endereco: {...baseUser.endereco, cep: txt} })
                                }}
                                keyboardType={"numeric"}
                                autoComplete={"off"}
                            />
                        </ContainerLocal>

                        <ContainerLocal>
                            <TitleComponent>Cidade</TitleComponent>
                            <InputCinzaMenor
                                value={baseUser.endereco != undefined ? baseUser.endereco.cidade : ""}
                                editable={editing}
                                onChangeText={(txt) => {
                                    setBaseUser({ ...baseUser, endereco: {...baseUser.endereco, cidade: txt}})
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