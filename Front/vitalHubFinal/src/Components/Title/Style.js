import styled from "styled-components";
import { MontserratAlternates_600SemiBold } from "@expo-google-fonts/montserrat-alternates";

export const Title = styled.Text`
    font-size: 20px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #33303E;
    /* text-shadow: 1px 2px 2px #33303E; */
`

export const TitleProntuario = styled.Text`
    font-size: 16px;
    font-family: "Quicksand_600SemiBold";
    color: #33303E;
`

export const TitleClinica = styled(Title)`
    font-size: 16px;
`

export const TitleData = styled(Title)`
    color: #5F5C6B;
`

export const SubTitleData = styled(TitleProntuario)`
    font-size: 14px;
    color: #000000;
`

export const ModalSubTitle = styled(TitleProntuario)`
    font-size: 16px;
    color: #000000;
`

export const ModalContentSubTitle = styled(TitleProntuario)`
    font-size: 16px;
    color: #33303E;
`

export const ModalInfo = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_500Medium";
    color: #4E4B59;
`
