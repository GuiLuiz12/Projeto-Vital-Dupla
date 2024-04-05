import { TitleClinica } from "../Title/Style"
import { Card, CardClinica, CidadeClinica, ConteudoCardClinica, DiaSemana, DiaSemanaText } from "./Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const ClinicCard = ({ NomeFantasia, Cidade, Selected, OnPress }) => {
    return (
        <Card ClickButton={Selected}>
            <CardClinica  onPress={OnPress} >
                <ConteudoCardClinica>
                    <TitleClinica>{NomeFantasia}</TitleClinica>
                </ConteudoCardClinica>
                <ConteudoCardClinica>
                    <CidadeClinica>{Cidade}, SP</CidadeClinica>
                    <DiaSemana>
                        <MaterialCommunityIcons name="calendar" size={14} color="#49B3BA" />
                        <DiaSemanaText>Seg-Sex</DiaSemanaText>
                    </DiaSemana>
                </ConteudoCardClinica>

            </CardClinica>
        </Card>
    )
}