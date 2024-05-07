import { ScrollView } from "react-native"
import { ButtonCard, ButtonText, TextAge } from "../../Components/AppointmentCard/Style"
import { Container, ContainerLeft, CaxinhaSla, ContainerRowButtons, ContainerSpace } from "../../Components/Container/Style"
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
import api from "../../Service/Service"


export const ProntuarioPronto = ({ navigation, route }) => {

    const [token, setToken] = useState({})
    const [buscarId, setBuscarId] = useState(null)
    const [especialidade, setEspecialidade] = useState(null)
    const [fotoPerfil, setFotoPerfil] = useState("")

    const [savePhoto, setSavePhoto] = useState(null)

    const [descricaoExame, setDescricaoExame] = useState(null)

    const [showCamera, setShowCamera] = useState(false);

    const Voltar = () => {
        navigation.navigate("Main")
    }

    const handleOpenCamera = () => {
        navigation.navigate('CameraProntuario');
    };

    async function ProfileLoad() {
        const tokenDecode = await userDecodeToken();

        if (tokenDecode) {
            setToken(tokenDecode)
            // BuscarProntuario(tokenDecode)
        }
    };

    async function BuscarFoto(){
        const formData = new FormData();
        formData.append("Arquivo", {
            uri : route.params.photoUri,
            name : `image.${route.params.photoUri.split(".")[1] }`,
            type : `image/${route.params.photoUri.split(".")[1] }`
        });
        
        const response = await api.get(`/Usuario/BuscarPorId?id=${token.jti}`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then(() => {
            setFotoPerfil(route.params.photoUri)

        }).catch(error => {
            console.log(error);
        })
        console.log(response.data.foto);
        
    }

    async function BuscarProntuario() {
        const response = await api.get(`/Consultas/BuscarPorId?id=${route.params.idConsulta}`)
        
        setBuscarId(response.data);
        
    }

    async function BuscarEspecialidade(tokenEspecialidade) {
        // const url = (tokenUsuario.role == 'Medico' ? 'Medicos' : "Pacientes")
        const response2 = await api.get(`/Consultas/BuscarPorId?id=${route.params.idConsulta}`)
        setEspecialidade(response2.data)
        console.log("oi");
        console.log(response2.data);
    }


    async function InserirExame() {
        const formData = new FormData();
        formData.append("consultaId", prontuario.id)
        formData.append("Imagem", {
            uri: route.params,
            name: `image.${route.params.split('.').pop()}`,
            type: `image/${route.params.split('.').pop()}`
        });

        await api.post(`/Exame/Cadastrar`, formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }).then(response => {
            setDescricaoExame(descricaoExame + "/n" + response.data.descricao)
        }).catch(error => {
            console.log(error);
        })
    }

    // async function BuscarUsuario(tokenUsuario) {
    //     const url = (tokenUsuario.role == 'Medico' ? 'Medicos' : "Pacientes")
    //     //console.log(tokenUsuario.role);

    //     const response = await api.get(`/Pacientes/BuscarPorId?id=${tokenUsuario.jti}`)
    //     setBuscarId(response.data)
    //     console.log(response.data);
    // }

    // useEffect(() => {
    //     // async function xpto  ()  {
    //     if (route.params != undefined) {
    //         setSavePhoto(route.params.photo)
    //     }
    //     // };

    //     // xpto()
    // }, [route])

    useEffect(() => {

        // if (route.params) {
        //     InserirExame();
        // }

        ProfileLoad()
        BuscarFoto()
        BuscarEspecialidade()
        BuscarProntuario()
        // console.log(route.params);
        // BuscarUsuario(
        // console.log(token.role == "Medico");
        // console.log(buscarId);
    }, [route])

    return (
        <ScrollView>
            {especialidade != null && buscarId != null ?
            <>
            <Container>
                <ContainerSpace>
                    
                    <FotoPerfil
                        source={require=(fotoPerfil)}
                        />

                    <Title>{token.name}</Title>
                    <CaxinhaSla>
                        <TextAge>{especialidade.medicoClinica.medico.especialidade.especialidade1}</TextAge>
                        <SubTitle>{especialidade.medicoClinica.medico.crm}</SubTitle>
                    </CaxinhaSla>

                    <ContainerLeft>
                        <TitleProntuario>Descrição da consulta</TitleProntuario>
                        <CaixaProntuario>
                            <TextCaixaProntuario>{buscarId.descricao}</TextCaixaProntuario>
                        </CaixaProntuario>
                    </ContainerLeft>

                    <ContainerLeft>

                        <TitleProntuario>Diagnóstico do paciente</TitleProntuario>
                        <CaixaProntuarioMenor>
                            <TextCaixaProntuario>{buscarId.diagnostico}</TextCaixaProntuario>
                        </CaixaProntuarioMenor>
                    </ContainerLeft>
                    <ContainerLeft>

                        <TitleProntuario>Prescrição médica</TitleProntuario>
                        <CaixaProntuario>
                            <TextCaixaProntuario>{buscarId.receita.medicamento == null ? "Não Informado" : buscarId.receita.medicamento}</TextCaixaProntuario>
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
            </> 
            :
            <></>}
        </ScrollView>
    )
}