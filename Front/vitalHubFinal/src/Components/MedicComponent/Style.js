import styled, { css } from "styled-components";

export const MedicSpecify = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_500Medium";
    color: #8c8a97;
    align-self: flex-start;
`

export const CardBoxColored = styled.View`
    width: 100%;
    height: 102px;
    background-color: #FFFFFF;
    flex-direction: row;
    gap:10px;
    justify-content: center;
    margin-top: 12px;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    margin: 0px auto;
    margin-bottom: 12px;
    border-radius: 5px;
    elevation: 4px;

    ${(props) => props.ClickButton ?
        css`
        border: 2px solid #496BBA;
    `
        :
        css`
        border: 1px solid white;
    `
    }
`

export const BoxContentMc = styled.View`
    width: 100%;
    height: 100%;
    align-items: center ;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
`

export const TitleCard = styled.Text`
    font-family: "MontserratAlternates_600SemiBold";
    color: #33303e;
    margin-bottom: 5px;
    font-size: 16px;
    margin-top: 0px;
    align-self: flex-start;
`

export const ImgPerfilHomeCard = styled.Image`
    height: 80px;
    width: 80px;
`

export const ClickerCard2 = styled.TouchableOpacity`
    padding: 10px;
    gap: 10px;
    background-color: transparent;
    width: 100%;
    height: 100%;
    flex-direction: row;
`