import { useEffect, useState } from "react";
import { Button } from "../../Components/Button/Style";
import { ButtonTitle } from "../../Components/ButtonTitle/Style";
import { Container, ContainerClinicas, ContainerSpace } from "../../Components/Container/Style"
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style";
import { ListComponent } from "../../Components/List/List";
import { Title } from "../../Components/Title/Style"

import api from '../../Service/Service'
import { ClinicCard } from "../../Components/ClinicasCard/CardClinica";

<<<<<<< HEAD
export const SelecionarClinica = ({ navigation }) => {
=======
export const SelecionarClinica = ({ navigation, route }) => {
>>>>>>> Gui-Luiz
    const [clinicaLista, setClinicaLista] = useState([])
    const [selected, setSelected] = useState("")

    const Continuar = () => {
        navigation.navigate("SelecionarMedico")
    }
    const Voltar = () => {
        navigation.navigate("Main")
    }

    async function ListarClinicas() {
<<<<<<< HEAD
        await api.get("/Clinica/ListarTodas")
=======
        await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.cidade}`)
>>>>>>> Gui-Luiz
        .then(response => {
            setClinicaLista(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        ListarClinicas();
    }, [])

<<<<<<< HEAD
=======
    useEffect(() => {
        console.log(route);
    }, [route.params])

>>>>>>> Gui-Luiz
    return (
        <Container>
            <ContainerSpace>

                <Title>Selecionar clínica</Title>

                <ContainerClinicas>
                    <ListComponent
                        data={clinicaLista}
                        renderItem={({ item }) => <ClinicCard
                            Selected={item.nomeFantasia === selected}
                            NomeFantasia={item.nomeFantasia}
                            Cidade={item.endereco.cidade}
                            OnPress={() => setSelected(item.nomeFantasia)}
                        />}
                        keyExtractor={(item) => {
                            item.id;
                        }}
                        showsVerticalScrollIndicator={false}

                    />
                </ContainerClinicas>

                <Button onPress={Continuar}>
                    <ButtonTitle>Continuar</ButtonTitle>
                </Button>

                <ContentAccount onPress={Voltar}>
                    <TextAccountLink>Cancelar</TextAccountLink>
                </ContentAccount>


            </ContainerSpace>
        </Container>
    )
}