import styled from "styled-components";

export const ButtonTitle = styled.Text`
    color: #ffffff;
    font-size: 16px;
    text-transform: uppercase;
    font-family: "MontserratAlternates_700Bold";
`

export const ButtonTitleGoogle = styled(ButtonTitle)`
    color: #496BBA;
    
`
export const ButtonTitleMenor = styled.Text`
    font-size: 12px;
    font-family: "MontserratAlternates_600SemiBold";
    ${props => props.clickButton ? css`
        color: #fbfbfb;
    `: css`
        color: #607ec5;
        `}
`

export const ButtonTitleBranco = styled(ButtonTitleMenor)`
    color: #607EC5;
`

export const ButtonSecondaryTitle = styled(ButtonTitle)`
    text-transform: capitalize;
    text-decoration: underline;
    color: #344f8f;
`

export const CameraButtonTitle = styled.Text`
    font-size: 14px;
    font-family: "MontserratAlternates_700Bold";
    color: #FFFFFF;
`

