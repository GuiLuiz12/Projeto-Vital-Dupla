import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";
import { SubTitleData, Title} from "../../Components/Title/Style"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Container, ContainerSpace } from "../../Components/Container/Style";
import { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Button } from "../../Components/Button/Style";
import { ButtonTitle } from "../../Components/ButtonTitle/Style";
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style";
import { ConfirmarModal } from "../../Components/ConfirmarModal/ConfirmarModal";
import { SelecionarMedico } from "../SelecionarMedico/SelecionarMedico";
import moment from "moment";

export const SelecionarData = ({ navigation, route }) => {
    const [agendamento, setAgendamento] = useState(null)
    const [dataSelecionada, setDataSelecionada] = useState("")
    const [horaSelecionada, setHoraSelecionada] = useState("")
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const dataAtual = moment().format('YYYY-MM-DD')
    const [arrayOptions, setArrayOptions] = useState(null)

    async function loadOptions() {
        //captura qntd de horas restantes do meu dia
        const horasRestantes = moment(dataAtual).add(24, 'hours').diff(moment(), 'hours')

        //Criar laço que rode a qntd de horas
        const options = Array.from({ length: horasRestantes }, (_, index) => {
            let valor = new Date().getHours() + (index + 1)

            return {
                label: `${valor}:00`, value: `${valor}:00`
            }
        })

        setArrayOptions(options)
    }

    useEffect(() => {
        loadOptions()
    }, [])

    function handleContinue() {
        setAgendamento({
            ...route.params.agendamento,
            dataConsulta: `${dataSelecionada} ${horaSelecionada}`
        })

        setShowModalConfirm(true)
    }

    const currentDate = new Date();
    const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const Voltar = () => {
        navigation.navigate(SelecionarMedico)
    }

    LocaleConfig.locales["pt-br"] = {
        monthNames: [
            "Janeiro", "Fevereiro", "Março", "Abril",
            "Maio", "Junho", "Julho", "Agosto",
            "Setembro", "Outubro", "Novembro", "Dezembro",
        ],
        monthNamesShort: [
            "Jan", "Fev", "Mar", "Abr", "Mai",
            "Jun", "Jul", "Ago", "Set", "Out",
            "Nov", "Dez",
        ],
        dayNames: [
            "Domingo", "Segunda", "Terça", "Quarta",
            "Quinta", "Sexta", "Sábado",
        ],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    };
    LocaleConfig.defaultLocale = "pt-br";
    return (
        <Container>
            {arrayOptions ? (

                <ContainerSpace>


                    <Title>Selecionar data</Title>

                    <Calendar
                        style={{
                            width: 360,
                            alignSelf: 'center',
                            backgroundColor: '#FAFAFA'
                        }}

                        onDayPress={(day) => {
                            setDataSelecionada(day.dateString);
                        }}

                        markedDates={{
                            [dataSelecionada]: {
                                selected: true,
                                disableTouchEvent: true
                            },
                        }}

                        minDate={`${startingDate}`}

                        theme={{
                            calendarBackground: '#FAFAFA',
                            arrowColor: '#49B3BA',
                            textDisabledColor: '#C6C5CE',
                            todayTextColor: '#5F5C6B',
                            selectedDayTextColor: '#FAFAFA',
                            selectedDayBackgroundColor: '#60BFC5',

                            textDayFontSize: 16,
                            textMonthFontSize: 20,
                            textDayHeaderFontSize: 12,

                            textDayStyle: { "color": '#5F5C6B' },

                            textDayFontFamily: "Quicksand_600SemiBold",
                            textDayHeaderFontFamily: "Quicksand_600SemiBold",
                            textMonthFontFamily: "MontserratAlternates_600SemiBold",
                        }}
                    />

                    <SubTitleData>Selecione um horário disponível</SubTitleData>

                    <View style={{ width: '90%', border: 2, borderColor: '#34898F' }}>
                        <RNPickerSelect
                            style={style}
                            Icon={() => {
                                return <FontAwesomeIcon icon={faCaretDown} color='#34898F' size={22} />
                            }}
                            placeholder={{
                                label: 'Selecione um horário disponível',
                                value: null,
                                color: '#34898F'
                            }}
                            onValueChange={(value) => { setHoraSelecionada(value) }}
                            items={arrayOptions}
                        />
                    </View>

                    <Button onPress={() => handleContinue()}>
                        <ButtonTitle>Confirmar</ButtonTitle>
                    </Button>

                    <ContentAccount onPress={Voltar}>
                        <TextAccountLink>Cancelar</TextAccountLink>
                    </ContentAccount>
                    
                    { agendamento ? 
                        <ConfirmarModal
                        visible={showModalConfirm}
                        setShowModalConfirm={setShowModalConfirm}
                        agendamento={agendamento}
                        navigation={navigation}
                    />
                    : 
                        <></>
                    }
                    
                </ContainerSpace>
            )
                :
                (
                    <>
                    </>
                )
            }
        </Container>

    )
}


const style = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#60BFC5',
        borderRadius: 5,
        color: '#34898F',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    inputAndroid: {
        fontSize: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#60BFC5',
        borderRadius: 5,
        color: '#34898F',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    iconContainer: {
        top: '25%',
        marginRight: 10
    },
    placeholder: {
        color: '#34898F',
    }
})