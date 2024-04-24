import { Container, ContainerRow, ContainerLeft, ContainerLocal } from "../../Components/Container/Style";
import { FotoPerfil } from "../../Components/FotoPerfil/Style";
import { SubTitle } from "../../Components/SubTitle/Style";
import { Title } from "../../Components/Title/Style";
import { TitleComponent } from "../../Components/TitleComponent/TitleComponent";
import { InputCinza, InputCinzaMenor } from "../../Components/InputCinza/Style";
import { Button, ButtonCinzaPequeno } from "../../Components/Button/Style";
import { ButtonTitle } from "../../Components/ButtonTitle/Style";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth";
import api from "../../Service/Service";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ButtonCamera } from "./Style";
import CameraProntuario from "../../Components/Camera/Camera";
import * as MediaLibrary from "expo-media-library"
import * as ImagePicker from "expo-image-picker"
import { Camera } from 'expo-camera';
import { requestForegroundPermissionsAsync } from 'expo-location';

export const Perfil = ({ navigation, route }) => {
    const [token, setToken] = useState({})
    const [buscarId, setBuscarId] = useState(null)

    // async function BuscarUsuario(token) {
    //     await api.get(`/${url}/BuscarPorId?id=${tokenUsuario.jti}`)
    //     .then(response => {
    //         const responseData = response.data;

    //         let resultados = null;
    //         if (token.role === "Medico") {
    //             resultados = {
    //                 ...token,
    //                 ...responseData.endereco,
    //                 ...responseData.especialidade,
    //                 crm : responseData.crm
    //             };
    //             console.log(resultados);
    //         } else{
    //             resultados = {
    //                 ...token,
    //                 ...responseData.endereco,
    //                 cpf: responseData.cpf,
    //                 dataNascimento: responseData.dataNascimento
    //             };
    //         }
    //         setStatusEdicao({
    //             ...paciente.idNavigation,
    //             ...medicoClinicas.medico.IdNavigation
    //         })
    //     })
    // }

    async function Logout() {
        await AsyncStorage.removeItem("token")
        navigation.navigate("Login")
    }

    async function ProfileLoad() {
        const tokenDecode = await userDecodeToken();
        //console.log(tokenDecode);

        if (tokenDecode) {
            BuscarUsuario(tokenDecode)

            setToken(tokenDecode)
        }
    }

    async function BuscarUsuario(tokenUsuario) {
        const url = (tokenUsuario.role == 'Medico' ? 'Medicos' : "Pacientes")
        //console.log(tokenUsuario.role);

        const response = await api.get(`/${url}/BuscarPorId?id=${tokenUsuario.jti}`)
        setBuscarId(response.data)
        //console.log(response.data);
    }

    async function requestGaleria(){
        await MediaLibrary.requestPermissionsAsync();
      
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
      
      async function requestCamera(){
        await Camera.requestCameraPermissionsAsync();
      }
      
      async function requestLocation(){
        await requestForegroundPermissionsAsync();
      }


    async function AlterarFotoPerfil(){

        const formData = new FormData();
        formData.append("Arquivo", {
            uri : uriCameraCapture,
            name : `image.${ uriCameraCapture.split(".")[1] }`,
            type : `image/${ uriCameraCapture.split(".")[1] }`
        })

        await api.put(`/Usuario/AlterarFotoPerfil?id=${profile.user}`, formData, {
            headers: {
                "Content-Type" : ""
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }
      
    //   useEffect(() => {
    //     requestLocation();
      
    //     requestCamera();
      
    //     requestGaleria();
    //   })
      



    useEffect(() => {
        requestLocation();
      
        requestCamera();
      
        requestGaleria();

        ProfileLoad()

        console.log(route);
        //console.log(token.role == "Medico");
    }, [route.params])

    useEffect(() => {
        if (uriCameraCapture != null) {
            AlterarFotoPerfil()
        }
    }, [uriCameraCapture])

    // useEffect(() => {

    //     console.log(buscarId);
    // }, [])

    // useEffect(() => {
    //     BuscarUsuario();
    // }, [])

    return (

        <ScrollView>
            {buscarId != null ?
                <>
                    <Container>


                        <ContainerLocal>

                            <FotoPerfil
                                source={require('../../Assets/Images/Richard.png')}
                            />
                            <ButtonCamera onPress={() => CameraProntuario()}>
                                <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb"/>
                            </ButtonCamera>
                        </ContainerLocal>


                        <SubTitle>{token.email}</SubTitle>

                        {token.role == "Medico" ?

                            <>

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
                        </ContainerRow>

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
                </>
                :
                <></>
            }

        </ScrollView>
    )
}