import styled, { css } from "styled-components";

export const Button = styled.TouchableOpacity`
    width: 90%;
    height: 44px;

    background-color: #496bba;
    border: 1px solid #496bba;
    margin-top: 30px;
    padding: 12px 8px 12px 8px;
    border-radius: 5px;

    align-items: center;
    justify-content: center;
`;

export const ButtonGoogle = styled(Button)`
    background-color: #FAFAFA;
    flex-direction: row;
    gap: 27px;
`

export const ButtonMenor = styled.TouchableHighlight`
    padding: 12px 14px;
    border-radius: 5px;
    
    ${props => props.clickButton ? css`
        background-color: #496bba;
    `: css`
        background-color: transparent;
        border: 2px solid #607ec5;
        `}
`

export const ButtonMenorBranco = styled(ButtonMenor)`
    background-color: #FBFBFB;
    border: #607EC5;
`

export const ButtonModal = styled(Button)`
    width: 90%;
`

export const ButtonSecondary = styled(Button)`
    background-color: transparent;
    border: none;
    margin-bottom: 15px;
    margin-top: 30px;
`
export const ButtonCinza = styled(Button)`
    background-color: #ACABB7;
    border: none;
`

export const IconModal = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    align-items: end;
`

export const ImagemBotao = styled.ImageBackground`
    width: 60px;
    height: 60px;
`

export const ViewIcon = styled.View`
    position: fixed;
    left: 150px;
    bottom: 30px;
`

export const CameraButton = styled.TouchableOpacity`
    width: 172px;
    height: 44px;
    background-color: #49B3BA;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5px;
`

export const CancelarButton = styled.TouchableOpacity`
    font-size: 12px;
    color: #C81D25;
    font-family: "MontserratAlternates_500Medium";
`

export const CancelarText = styled.Text`
    font-size: 12px;
    color: #C81D25;
    font-family: "MontserratAlternates_500Medium";
`

export const ButtonCinzaPequeno = styled(ButtonCinza)`
    width: 189px;
`

export const ButtonPerfil = styled(Button)`
     ${props => props.color ? 
    css`
        background-color: #ACABB7;
    `
    : 
    css`
        background-color: #496bba;
    `}
    border: 1px solid transparent;
`

export const IconBox = styled.TouchableOpacity`
    margin-top: 20px;
    height: 30px;
    width: 30px;
    background-color: rgba(73, 179, 186, .15);
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    margin-left: 20px;
    margin-top: 20px;
`