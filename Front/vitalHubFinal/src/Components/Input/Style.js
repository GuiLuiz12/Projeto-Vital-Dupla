import styled from "styled-components";

export const Input = styled.TextInput.attrs({
    placeholderTextColor: "#34898f"
})`
    width:90%;
    height:53px;
    padding:16px;
    margin-top:15px;

    border: 2px solid #49b3ba;
    border-radius:5px;

    font-size:16px;
    font-family:'MontserratAlternates_600SemiBold';
    color:#34898f;
`

export const ProntuarioInputMaior = styled.TextInput.attrs({
    placeholderTextColor: "#34898f"
})`
    width: 94.5%;
    height: 121px;
    font-size: 14px;
    margin-top: 15px;
    padding: 16px;

    border: 2px solid #49b3ba;
    border-radius:5px;

    font-size:16px;
    font-family:'MontserratAlternates_600SemiBold';
    color:#34898f;
`

export const ProntuarioInputMenor = styled(ProntuarioInputMaior)`
    height: 53px;
`