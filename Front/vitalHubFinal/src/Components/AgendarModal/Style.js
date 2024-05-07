import styled, { css } from "styled-components";

export const AppointmentModal = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.60);
`

export const ButtonConsulta = styled.TouchableOpacity`
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 40px;

    ${props => props.clickButton ? css`
        background-color: #60BFC5;
        text-decoration-color: white;
    `: css`
        background-color: white;
        border: 2px solid #60BFC5;
        text-decoration-color: white;
    `}
`

export const SubTitleModal = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_600SemiBold";
    color: #000000;
    margin-top: 10px;
    align-self: flex-start;
    margin-top: 17px;
`

export const ButtonTextConsulta = styled.Text`
    font-size: 14px;
    font-family: "MontserratAlternates_600SemiBold";
    
    ${props => props.clickButton ? css`
        color: white;
    `: css`
        color: #34898F;
    `}
`

export const AppointmentModalView = styled.View`
    align-items: center;
    background-color: #FBFBFB;
    width: 100%;
    height: 450px;
    padding: 20px;
`