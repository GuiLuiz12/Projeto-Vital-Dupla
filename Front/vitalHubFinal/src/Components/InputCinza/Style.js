import styled from "styled-components";

export const InputCinza = styled.TextInput.attrs({
    placeholderTextColor: "#33303E"
})`
    width: 100%;
    height: 53px;
    padding: 16px;
    margin-top: 15px;

    border: 2px transparent;
    border-radius: 5px;

    font-size: 14px;
    font-family: "MontserratAlternates_600SemiBold";
    background-color: #F5F3F3;
`

export const InputCinzaMenor = styled(InputCinza)`
    width: 100%;
`