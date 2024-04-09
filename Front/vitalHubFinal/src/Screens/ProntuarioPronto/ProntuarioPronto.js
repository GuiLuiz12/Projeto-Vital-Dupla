import { ScrollView } from "react-native"
import { ButtonCard, ButtonText, TextAge } from "../../Components/AppointmentCard/Style"
import { Container, ContainerLeft, ContainerRow, ContainerRowButtons, ContainerSpace } from "../../Components/Container/Style"
import { FotoPerfil } from "../../Components/FotoPerfil/Style"
import { SubTitle } from "../../Components/SubTitle/Style"
import { Title, TitleProntuario } from "../../Components/Title/Style"
import { CaixaProntuario, CaixaProntuarioMenor, CaixaProntuarioRow, Divider, TextCaixaProntuario } from "../../Components/ViewProntuario/Style"
import { SimpleLineIcons } from '@expo/vector-icons';
import { CameraButton, CancelarButton, CancelarText } from "../../Components/Button/Style"
import { CameraButtonTitle } from "../../Components/ButtonTitle/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { useEffect, useState } from "react"

import { Image } from "react-native"
import { userDecodeToken } from "../../Utils/Auth"


export const ProntuarioPronto = ({ navigation, route }) => {

    const [token, setToken] = useState({})
    const [buscarId, setBuscarId] = useState(null)
    const [especialidade, setEspecialidade] = useState(null)

    const [savePhoto, setSavePhoto] = useState(null)

    const [showCamera, setShowCamera] = useState(false);

    const Voltar = () => {
        navigation.navigate("Main")
    }

    const handleOpenCamera = () => {
        navigation.navigate('CameraProntuario');
    };

    async function ProfileLoad() {
        const tokenDecode = await userDecodeToken();
        console.log(tokenDecode);

        if (tokenDecode) {
            BuscarProntuario(tokenDecode)

            setToken(tokenDecode)
        }
    }

    // async function BuscarProntuario(tokenConsulta) {
    //     // const url = (tokenUsuario.role == 'Medico' ? 'Medicos' : "Pacientes")
    //     const response = await api.get(`http://172.16.39.103:4466/api/Consultas?idPaciente=F1EC6D56-4F7C-4EEA-AAB4-763AF058000F`)
    //     setBuscarId(response.data)
    //     console.log("oi");
    //     console.log(response.data);
    // }
    // async function BuscarEspecialidade(tokenEspecialidade) {
    //     const url = (tokenUsuario.role == 'Medico' ? 'Medicos' : "Pacientes")
    //     const response2 = await api.get(`/${url}/Medicos/BuscarPorId?id=${tokenEspecialidade.jti}`)
    //     setEspecialidade(response2.data)
    //     // console.log("oi");
    //     console.log(response2.data);
    // }

    useEffect(() => {
        // async function xpto  ()  {
        if (route.params != undefined) {
            setSavePhoto(route.params.photo)
        }
        // };

        // xpto()
    }, [route])

    useEffect(() => {
        ProfileLoad()
        // BuscarEspecialidade()
        // BuscarProntuario()
        // console.log(token.role == "Medico");
        // console.log(buscarId);
    }, [])


    return (
        <ScrollView>

            <Container>
                <ContainerSpace>

                    <FotoPerfil
                        source={require('../../Assets/Images/MaskGroup.png')}
                    />

                    <Title>{token.name}</Title>
                    <ContainerRow>
                        {/* <TextAge>{especialidade.medicoClinica.medico.especialidade1}</TextAge> */}
                        {/* <SubTitle>{buscarId.medicoClinica.medico.crm}</SubTitle> */}
                    </ContainerRow>

                    <ContainerLeft>
                        <TitleProntuario>Descrição da consulta</TitleProntuario>
                        <CaixaProntuario>
                            <TextCaixaProntuario>O paciente possui uma infecção no
                                ouvido. Necessário repouso de 2 dias
                                e acompanhamento médico constante</TextCaixaProntuario>
                        </CaixaProntuario>
                    </ContainerLeft>

                    <ContainerLeft>

                        <TitleProntuario>Diagnóstico do paciente</TitleProntuario>
                        <CaixaProntuarioMenor>
                            <TextCaixaProntuario>Infecção no ouvido</TextCaixaProntuario>
                        </CaixaProntuarioMenor>
                    </ContainerLeft>
                    <ContainerLeft>

                        <TitleProntuario>Prescrição médica</TitleProntuario>
                        <CaixaProntuario>
                            <TextCaixaProntuario>Medicamento: Advil</TextCaixaProntuario>
                            <TextCaixaProntuario>Dosagem: 50 mg</TextCaixaProntuario>
                            <TextCaixaProntuario>Frequência: 3 vezes ao dia</TextCaixaProntuario>
                            <TextCaixaProntuario>Duração: 3 dias</TextCaixaProntuario>
                        </CaixaProntuario>
                    </ContainerLeft>

                    <ContainerLeft>

                        <TitleProntuario>Exames médicos</TitleProntuario>
                        <CaixaProntuarioRow>
                            {
                                savePhoto != null
                                    ? (<Image style={{ width: '100%', height: 100 }} source={{ uri: route.params.photo }} />)
                                    : (<>
                                        <SimpleLineIcons name="exclamation" size={24} color="black" />
                                        <TextCaixaProntuario>Nenhuma foto informada</TextCaixaProntuario>
                                    </>)
                            }

                        </CaixaProntuarioRow>
                    </ContainerLeft>

                    <ContainerRowButtons>
                        <CameraButton onPress={handleOpenCamera}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
                            <CameraButtonTitle>Enviar</CameraButtonTitle>
                        </CameraButton>
                        <CancelarButton onPress={() => setSavePhoto(null)}>
                            <CancelarText>Cancelar</CancelarText>
                        </CancelarButton>
                    </ContainerRowButtons>

                    <Divider></Divider>
                    <ContainerLeft>


                        <CaixaProntuario>
                            <TextCaixaProntuario>Resultado do exame de sangue:</TextCaixaProntuario>
                            <TextCaixaProntuario>tudo normal</TextCaixaProntuario>
                        </CaixaProntuario>
                    </ContainerLeft>

                    <ContentAccount onPress={Voltar}>
                        <TextAccountLink>Voltar</TextAccountLink>
                    </ContentAccount>
                </ContainerSpace>
            </Container>
        </ScrollView>
    )
}