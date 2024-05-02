import styled from "styled-components";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #FAFAFA;
    margin-top: 40px;
`

export const ContainerLeft = styled.View`
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding: 20px;
`

export const ContainerLeftPaddingLeft = styled(ContainerLeft)`
    padding: 0px 0px 10px 20px;
`


export const ContainerRow = styled.View`
    flex-direction: row;
    gap: 10px;
    width: 90%;
    align-items: center;
    margin-bottom: 10px;
    width: 172px;
`

export const ContainerRowButtons = styled(ContainerRow)`
    width: 90%;
    gap: 60px;
    justify-content: flex-start;
`

export const ContainerConsultas = styled.SafeAreaView`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-top: 38px;
`

export const ContainerClinicas = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin-top: 30px;
    gap: 20px;
    overflow: hidden;
`

export const ContainerSpace = styled.View`
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding-top: 30px;
`

export const ContainerLocal = styled.View`
    align-items: baseline;
    justify-content: center;
    flex-direction: column;
    width: 45%;
`

export const ContainerLocalEndereco = styled(ContainerLocal)`
    width: 370px;
`

export const ContainerLocalEderecoP = styled(ContainerLocal)`
    width: 70%;
`

export const ContainerLocalNumeroP = styled(ContainerLocal)`
    width: 25%;
`

export const ContainerRowInputs = styled(ContainerRowButtons)`
    gap: 0px;
    justify-content: space-between;
`