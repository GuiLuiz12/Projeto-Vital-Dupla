import { Container } from "../../Components/Container/Style";
import { FaixaAzul, ImagemTexto, BemVindo, UsuarioAtual, Sino, FotoPerfilConsulta, DataUser } from "../../Components/FaixaAzul/Style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TitleData } from "../../Components/TitleData/Style";
import { StyleSheet, TouchableOpacity } from 'react-native';
import moment from "moment";
import { StyledCalendarStrip } from "../../Components/Calendario/Style";
import { FilterAppointment } from "../../Components/FilterAppointment/FilterAppointment";
import { BtnListAppointment } from "../../Components/BtnListAppointment/BtnListAppointment";
import { useEffect, useState } from "react";
import { AppointmentCardDr } from "../../Components/AppointmentCard/AppointmentCard";
import { ListComponent } from "../../Components/List/List";
import { CancelationModal } from "../../Components/CancelationModal/CancelationModal";
import { ProntuarioModal } from "../../Components/ProntuarioModal/ProntuarioModal";
import { IconModal, ImagemBotao, ViewIcon } from "../../Components/Button/Style";
import { AgendarModal } from "../../Components/AgendarModal/AgendarModal";
import { LocalModal } from "../../Components/LocalModal/LocalModal";
import { userDecodeToken } from "../../Utils/Auth";

const Consultas = [
    { id: 1, nome: "Carlos", situacao: "pendente" },
    { id: 2, nome: "Carlos", situacao: "realizado" },
    { id: 3, nome: "Carlos", situacao: "cancelado" },
    { id: 4, nome: "Carlos", situacao: "realizado" },
    { id: 5, nome: "Carlos", situacao: "cancelado" },
];

const styles = StyleSheet.create({
    iconsStyle: {
        display: 'none'
    },
    calendarHeaderStyle: {
        fontSize: 22,
        textAlign: "center",
        alignSelf: 'flex-start',
        color: '#4E4B59',
        fontFamily: "MontserratAlternates_600SemiBold",
        paddingHorizontal: 16
    },
    nameDateStyle: {
        color: "#ACABB7",
        fontSize: 12,
        textTransform: 'capitalize'
    },
    numberDateStyle: {
        color: "#5F5C6B",
        fontSize: 16
    },
    selectedDateNameStyle: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textTransform: 'capitalize'
    },
    selectedDateNumberStyle: {
        color: "white",
        fontSize: 14
    },
    selectedContainerStyle: {
        backgroundColor: `#60BFC5`
    },
    selectedAnimationStyle: {
        type: "border",
        duration: 200,
        borderWidth: 2,
        borderHighlightColor: "#49B3BA"
    }
})

export const HomePaciente = ({ navigation }) => {
    const [token, setToken] = useState({})

    const [showModalCancel, setShowModalCancel] = useState(false);

    const [showModalAppointment, setShowModalAppointment] = useState(false);

    const [showModalAgendar, setShowModalAgendar] = useState(false);

    const [showModalLocal, setShowModalLocal] = useState(false);

    const handleOpenModal = () => {
        setShowModalAgendar(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModalAgendar(false);
    };
    const handleOpenModalLocal = () => {
        setShowModalLocal(true);
    };

    // Função para fechar o modal
    const handleCloseModalLocal = () => {
        setShowModalLocal(false);
    };

    const [statusLista, setStatusLista] = useState("pendente")

    //define padrão pt-br para calendário
    moment.updateLocale("pt-br", {

        //meses
        months:
            "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
                "_"
            ),

        //abreviação de meses
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),

        //dias da semana
        weekdays:
            "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
                "_"
            ),

        //abreviação dias da semana
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),

        //abreviação dias da semana 
        weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
    });

    //instância da data atual
    const currentDate = new Date();

    //define a data inicial como sendo o primeiro dia do mês
    const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    //define a data final como sendo o último dia do mês
    const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    async function ProfileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setToken(token)
        }
    }

    useEffect(() => {
        ProfileLoad();
    }, [])


    return (
        <Container>
            <FaixaAzul>
                <ImagemTexto>

                    <FotoPerfilConsulta
                        source={require('../../Assets/Images/Richard.png')}
                    />

                    <DataUser>

                        <BemVindo>Bem Vindo</BemVindo>

                        <UsuarioAtual>{token.name}</UsuarioAtual>

                    </DataUser>

                </ImagemTexto>
                <Sino>
                    <MaterialCommunityIcons name="bell" size={25} color="#fbfbfb" />
                </Sino>

            </FaixaAzul>

            <StyledCalendarStrip
                // animação e seleção de cada data
                calendarAnimation={{ type: "sequence", duration: 30 }}
                daySelectionAnimation={styles.selectedAnimationStyle}

                // seta esquerda e direita para avançar e voltar(aqui como display none)
                iconLeftStyle={styles.iconsStyle}
                iconRightStyle={styles.iconsStyle}

                // deixa uma marcação default - data atual
                selectedDate={currentDate}
                // dia que começamos a visualizar a barra
                startingDate={moment()}

                //data min e max - início do mês e final do mês
                minDate={startingDate}
                maxDate={endingDate}

                //estilização dos itens que não estão selecionados
                calendarHeaderStyle={styles.calendarHeaderStyle}
                dateNumberStyle={styles.numberDateStyle}
                dateNameStyle={styles.nameDateStyle}

                // estilização do item que está selecionado - efeito do item marcado
                highlightDateNameStyle={styles.selectedDateNameStyle}
                highlightDateNumberStyle={styles.selectedDateNumberStyle}
                highlightDateContainerStyle={styles.selectedContainerStyle}

                //tamanho do container
                iconContainer={{ flex: 0.1 }}

                //scroll da barra
                scrollable={true}
            />

            <FilterAppointment>
                <BtnListAppointment
                    textButton={"Agendadas"}
                    clickButton={statusLista === "pendente"}
                    onPress={() => setStatusLista("pendente")}
                />
                <BtnListAppointment
                    textButton={"Realizadas"}
                    clickButton={statusLista === "realizado"}
                    onPress={() => setStatusLista("realizado")}
                />
                <BtnListAppointment
                    textButton={"Canceladas"}
                    clickButton={statusLista === "cancelado"}
                    onPress={() => setStatusLista("cancelado")}
                />

            </FilterAppointment>

            <ListComponent
                data={Consultas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>

                    statusLista == item.situacao && (
                        <TouchableOpacity onPress={handleOpenModalLocal}>

                            <AppointmentCardDr
                                situacao={item.situacao}
                                navigation={navigation}
                                onPressLocal={() => setShowModalLocal(true)}
                                onPressCancel={() => setShowModalCancel(true)}
                                onPressAppointment={() => setShowModalAppointment(true)}
                                onPress={handleOpenModalLocal}
                            />
                        </TouchableOpacity>
                    )
                }
                showsVerticalScrollIndicator={false}
            />

            {/* modal cancelar */}
            <CancelationModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />

            {/* modal prontuario */}
            <ProntuarioModal
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
            />

            <LocalModal
                visible={showModalLocal}
                setShowModalLocal={setShowModalLocal}
            />

            <ViewIcon>
                <IconModal>

                    <TouchableOpacity onPress={handleOpenModal}>
                        <ImagemBotao source={require('../../Assets/Images/Estetoscopio.png')} />
                    </TouchableOpacity>

                    <AgendarModal
                        visible={showModalAgendar}
                        setShowModalAgendar={setShowModalAgendar}
                        onClose={handleCloseModal}
                    />
                </IconModal>
            </ViewIcon>


        </Container>
    )
}