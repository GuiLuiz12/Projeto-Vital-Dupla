import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

export const FaixaAzul = styled(LinearGradient).attrs({
    colors: ["#60BFC5", "#496BBA"],
    start: { x: -0.05, y: 1.08 },
    end: { x: 1, y: 0 },
})`
    width: 100%;
    height: 144px;
    align-items: center;
    flex-direction: row;
    border-radius: 0 0 15px 15px;
    box-shadow: 0px 4px 15px #00000014;
    padding: 20px 20px 22px 20px;
    justify-content: space-between;
`

export const ImagemTexto = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    padding: 20px 20px 22px 20px;
`
export const FotoPerfilConsulta = styled.Image`
    height: 60px;
    width: 60px;
    border-radius: 2px;
`

export const BemVindo = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_500Medium";
    color: #4E4B59;
`

export const UsuarioAtual = styled.Text`
    font-size: 16px;
    font-family: "MontserratAlternates_600SemiBold";
    color: #FBFBFB;
`

export const Sino = styled.TouchableOpacity`
    height: 25px;
    width: 25px;
    color: #ffffff;
`

export const DataUser = styled.View`
    flex-direction: column;
    gap: 3px;
`