import styled, { css } from "styled-components";

export const TextButtonIcon = styled.Text`
    font-size: 12px;
    font-family: "Quicksand_500Medium";
    color: #607EC5;
`

export const ButtonView = styled.View`
    width: 92px;
    height: 33px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2px;
    border-radius: 20px;

    ${ props => props.Clicked ? 
        css`
            background-color: #ECF2FF;
        `
        :
        css`
            background-color: transparent;
        `
    }
`