import { useEffect, useState } from "react"
import { Container, ContainerLocal, ContainerLocalEndereco, ContainerLocal_Nome, ContainerRow, ContainerSpace } from "../../Components/Container/Style"
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { InputCinza, InputCinzaMenor } from "../../Components/InputCinza/Style"
import { Mapa } from "../../Components/Mapa/Style"
import Maps from "../../Components/Maps/Maps"
import { SubTitle } from "../../Components/SubTitle/Style"
import { Title } from "../../Components/Title/Style"
import { TitleComponent } from "../../Components/TitleComponent/TitleComponent"
import api from '../../Service/Service';
import { ActivityIndicator } from "react-native"

export const Local = ({ navigation, route }) => {

    const [clinica, setClinica] = useState(null)

    const VoltarHome = () => {
        navigation.navigate("Main")
    }

    async function BuscarClinica() {

        await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)
            .then(response => {
                setClinica(response.data)
                console.log(clinica);
            })
            .catch(error => {
                console.log(error);
            })

    }

    useEffect(() => {
        BuscarClinica()
    }, [])
    return (

        <Container>
            {
                clinica != null ? (
                    <>
                        <ContainerSpace>

                            <Mapa>
                                <Maps 
                                    latitude={clinica.endereco.latitude}
                                    longitude={clinica.endereco.longitude}
                                />
                            </Mapa>

                            <Title>Clínica Natureh</Title>

                            <SubTitle>São Paulo, SP</SubTitle>

                            <ContainerLocalEndereco>
                                <TitleComponent>Endereço</TitleComponent>

                                <InputCinza
                                    value={`${clinica.endereco.logradouro}, ${clinica.endereco.numero}`}
                                />
                            </ContainerLocalEndereco>

                            <ContainerRow>
                                <ContainerLocal>
                                    <TitleComponent>cidade</TitleComponent>
                                    <InputCinzaMenor
                                        value={`${clinica.endereco.cidade}`}
    
                                    />
                                </ContainerLocal>
                                <ContainerLocal_Nome>

                                    <TitleComponent>Nome</TitleComponent>
                                    <InputCinzaMenor
                                        value={`${clinica.nomeFantasia}`}
                                    />
                                </ContainerLocal_Nome>
                            </ContainerRow>


                            <ContentAccount onPress={() => VoltarHome()}>
                                <TextAccountLink>Voltar</TextAccountLink>
                            </ContentAccount>

                        </ContainerSpace>
                    </>
                ) : (
                    <ActivityIndicator/>
                )
            }

        </Container>
    )
}