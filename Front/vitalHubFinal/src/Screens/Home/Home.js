import { useEffect, useState } from 'react';
import { Container } from '../../Components/Container/Style';
import { BemVindo, DataUser, FaixaAzul, FotoPerfilConsulta, ImagemTexto, Sino, UsuarioAtual } from '../../Components/FaixaAzul/Style';
import { TitleData } from '../../Components/TitleData/Style';
import { StyledCalendarStrip } from '../../Components/Calendario/Style';
import { FilterAppointment } from '../../Components/FilterAppointment/FilterAppointment';
import { BtnListAppointment } from '../../Components/BtnListAppointment/BtnListAppointment';
import { ListComponent } from '../../Components/List/List';
import { CancelationModal } from '../../Components/CancelationModal/CancelationModal';
import { ProntuarioModal } from '../../Components/ProntuarioModal/ProntuarioModal';
import moment from "moment";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LocalModal } from '../../Components/LocalModal/LocalModal';
import { AppointmentCard, AppointmentCardDr } from '../../Components/AppointmentCard/AppointmentCard';
import { userDecodeToken } from '../../Utils/Auth';
import { IconModal, ImagemBotao, ViewIcon } from '../../Components/Button/Style';
import { AgendarModal } from "../../Components/AgendarModal/AgendarModal";
import api from '../../Service/Service';

export const Home = ({ navigation }) => {
    const [token, setToken] = useState({})
    const [showModalAgendar, setShowModalAgendar] = useState(false);
    const [showModalLocal, setShowModalLocal] = useState(false);
    const [listaConsultas, setListaConsultas] = useState([])
    const [dateConsulta, setDateConsulta] = useState("")
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalAppointment, setShowModalAppointment] = useState(false);
    const [statusLista, setStatusLista] = useState("pendente")
    const [consultaSelecionada, setConsultaSelecionada] = useState(null)



    const handleOpenModal = () => {
        setShowModalAgendar(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModalAgendar(false);
    };

    // Função para fechar o modal
    const handleCloseModalLocal = () => {
        setShowModalLocal(false);
    };
    

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

    async function ListarPacientes() {
        const url = (token.role == 'Medico' ? 'Medicos' : "Pacientes")

        const response = await api.get(`/${url}/BuscarPorData?data=${dateConsulta}&id=${token.jti}`)
        setListaConsultas(response.data)
    }

    function MostrarModal( modal, consulta) {
        setConsultaSelecionada(consulta)

        if(modal == 'cancelar'){
            setShowModalCancel(true)
        }else if (modal == 'prontuario') {
            setShowModalAppointment(true)
        }else if (modal == 'local'){
            setShowModalLocal(true)
        }else{
            setShowModalAgendar(true)
        }

    }

    useEffect(() => {
        ProfileLoad();

        ListarPacientes();
    }, [dateConsulta])

    return (
        <Container>
            <FaixaAzul>
                <ImagemTexto>

                    <FotoPerfilConsulta
                        source={require('../../Assets/Images/MaskGroup.png')}
                    />

                    <DataUser>

                        <BemVindo>Bem Vindo</BemVindo>

                        <UsuarioAtual>{token.role == "Medico" ? `Dr. ${token.name}` : `${token.name}`}</UsuarioAtual>

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

                onDateSelected={date => setDateConsulta(moment(date).format('YYYY-MM-DD'))}
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
            {token.role === "Medico" ?
                <ListComponent
                    data={listaConsultas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>

                        statusLista == item.situacao.situacao && (
                            <AppointmentCard
                                situacao={item.situacao.situacao}
                                onPressCancel={() => MostrarModal('cancelar', item)}
                                onPressAppointment={() => MostrarModal('prontuario', item)}
                                prioridade={item.prioridade.prioridade}
                                nome={item.paciente.idNavigation.nome}
                                idade={"22 anos"}
                            />
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
                :
                <ListComponent
                    data={listaConsultas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>

                        statusLista == item.situacao.situacao && (
                            <TouchableOpacity onPress={() => MostrarModal("local", item)}>
                                <AppointmentCardDr
                                    situacao={item.situacao.situacao}
                                    navigation={() => navigation.navigate("Prontuario")}
                                    onPressLocal={() => MostrarModal('local', item)}
                                    onPressCancel={() => MostrarModal('cancelar', item)}
                                    profile={token.role}
                                    nome={item.medicoClinica.medico.idNavigation.nome}
                                    crm={item.medicoClinica.medico.crm}
                                    prioridade={item.prioridade.prioridade}
                                />
                            </TouchableOpacity>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            }

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
                consulta={ consultaSelecionada }
                roleUsuario={token.role}
                navigation={navigation}
            />
            
            {token.role === "Medico" ?
                <></>
                :
                <ViewIcon>
                    <IconModal>

                        <TouchableOpacity onPress={() => MostrarModal('agendamento', null)}>
                            <ImagemBotao source={require('../../Assets/Images/Estetoscopio.png')} />
                        </TouchableOpacity>

                        <AgendarModal
                            visible={showModalAgendar}
                            setShowModalAgendar={setShowModalAgendar}
                            onClose={handleCloseModal}
                        />
                    </IconModal>
                </ViewIcon>

            }


        </Container>
    )
}

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