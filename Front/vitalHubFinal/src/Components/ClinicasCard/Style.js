import styled from 'styled-components/native'

export const CardClinica = styled.TouchableOpacity`
    width: 100%;
    height: 84px;
    /* border: 2px; */
    border-color: #496BBA;
    border-radius: 5px;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    elevation: 3;
`

export const ConteudoCardClinica = styled.View`
    flex-direction: row;
    justify-content: space-between;

`

export const CidadeClinica = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_600SemiBold";
    color: #4E4B59;
`

export const Avaliacao = styled.View`
    flex-direction: row;
    justify-content: center;
`

export const AvaliacaoText = styled.Text`
    color: #F9A620;
    font-size: 14px;
    font-family: "Quicksand_600SemiBold";
`

export const DiaSemana = styled.TouchableOpacity`
    padding: 5px;
    align-items: center;
    gap: 5px;
    flex-direction: row;
    background-color: #E8FCFD;
    border-radius: 5px;
`

export const DiaSemanaText = styled.Text`
    color: #49B3BA;
    font-size: 14px;
    font-family: "Quicksand_600SemiBold";
`

