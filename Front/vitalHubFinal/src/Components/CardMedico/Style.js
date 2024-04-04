
import styled from 'styled-components/native'

export const CardMedico = styled.TouchableOpacity`
    width: 100%;
    height: 102px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    /* border: 1px; */
    border-color: #496BBA;
    border-radius: 5px;
    padding: 8px;
    elevation: 3
`

export const ImagemCardMedico = styled.Image`
    width: 77px;
    height: 80px;
    border-radius: 5px;
`

export const CardMedicoContent = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    padding-right: 150px;
`

export const TextCardMedico = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_500Medium";
    color: #8C8A97;
`