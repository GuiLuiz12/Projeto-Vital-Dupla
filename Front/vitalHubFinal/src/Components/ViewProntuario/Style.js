import styled from "styled-components";

export const CaixaProntuario = styled.View`
    width:100%;
    height:121px;
    padding:16px;
    margin-top:15px;
    background-color: #F5F3F3;
    justify-content: center;
    /* align-items: center; */

    /* border: 2px solid; */
    border-radius:5px;
`

export const TextCaixaProntuario = styled.Text`
    font-size: 14px;
    font-family: "MontserratAlternates_500Medium";
    color: #4E4B59;
`

export const CaixaProntuarioMenor = styled(CaixaProntuario)`
    height: 63px;
`

export const CaixaProntuarioRow = styled(CaixaProntuario)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`

export const Divider = styled.View`
    width: 95%;
    height: 1px;
    background-color: #8C8A97;
`