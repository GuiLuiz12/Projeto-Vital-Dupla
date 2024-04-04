import { useEffect, useState } from "react"
import { Container, ContainerLocal, ContainerLocalEndereco, ContainerRow, ContainerSpace } from "../../Components/Container/Style"
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

    const [clinica, setClinica] = useState({})

    const VoltarHome = () => {
        navigation.navigate("Main")
    }

    async function BuscarClinica() {

        await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)
            .then(response => {
                setClinica(response.data)
            })
            .catch(error => {
                console.log(error);
            })

    }

    useEffect(() => {
        if (clinica == null) {
            BuscarClinica()
        }
    }, [clinica])
    return (

        <Container>
            {
                clinica != null ? (
                    <>
                        <ContainerSpace>

                            <Mapa>
                                <Maps />
                            </Mapa>

                            <Title>Clínica Natureh</Title>

                            <SubTitle>São Paulo, SP</SubTitle>

                            <ContainerLocalEndereco>
                                <TitleComponent>Endereço</TitleComponent>

                                <InputCinza
                                    placeholder="Rua Vicenso Silva, 987"
                                />
                            </ContainerLocalEndereco>

                            <ContainerRow>
                                <ContainerLocal>

                                    <TitleComponent>Número</TitleComponent>
                                    <InputCinzaMenor
                                        placeholder="578"
                                    />
                                </ContainerLocal>
                                <ContainerLocal>

                                    <TitleComponent>Bairro</TitleComponent>
                                    <InputCinzaMenor
                                        placeholder="Moema-SP"
                                    />
                                </ContainerLocal>
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