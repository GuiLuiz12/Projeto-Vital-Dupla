import { AntDesign } from '@expo/vector-icons';
import { ButtonCard, ButtonText, ClockCard, ContainerCardsList, ContentCard, DataProfileCard, ProfileData, ProfileImage, ProfileName, TextAge, TextBold, ViewRow } from './Style';
import { useEffect, useState } from 'react';
import moment from 'moment';

export const AppointmentCard = ({
    situacao = "pendente",
    onPressCancel,
    onPressAppointment,
    prioridade,
    nome,
    idade,
    data,
    user
}) => {
    return (
        <ContainerCardsList>

            <ProfileImage
                source={{ uri: user.paciente.idNavigation.foto }}
            />


            <ContentCard>
                <DataProfileCard>

                    <ProfileName>{nome}</ProfileName>

                    <ProfileData>
                        <TextAge>{idade} anos</TextAge>
                        <TextBold>{prioridade == "3" ? "Urgência" : prioridade == "2" ? "Exame" : "Rotina"}</TextBold>
                    </ProfileData>

                </DataProfileCard>


                <ViewRow>

                    <ClockCard situacao={situacao}>
                        <AntDesign name="clockcircle" size={14} color={situacao == "pendente" ? "#49b3ba" : "#8c8a97"} />
                        <TextBold situacao={situacao}>{moment(data).format("HH:mm")}</TextBold>
                    </ClockCard>

                    {
                        situacao == "cancelado" ? (
                            <>
                            </>
                        ) : situacao == "pendente" ? (
                            <ButtonCard onPress={onPressCancel}>
                                <ButtonText situacao={situacao}>Cancelar</ButtonText>
                            </ButtonCard>
                        ) : (
                            <ButtonCard onPress={onPressAppointment}>
                                <ButtonText situacao={situacao}>Ver prontuário</ButtonText>
                            </ButtonCard>
                        )
                    }

                </ViewRow>
            </ContentCard>

        </ContainerCardsList>
    )
}
export const AppointmentCardDr = ({
    navigation,
    situacao = "pendente",
    onPressCancel,
    nome,
    crm,
    prioridade,
    data,
    foto
}) => {

    return (
        <ContainerCardsList>

            <ProfileImage
                source={{ uri: foto }}
            />


            <ContentCard>
                <DataProfileCard>

                    <ProfileName>Dr. {nome}</ProfileName>

                    <ProfileData>
                        <TextAge>{crm}</TextAge>
                        <TextBold>{prioridade == "3" ? "Urgência" : prioridade == "2" ? "Exame" : "Rotina"}</TextBold>
                    </ProfileData>

                </DataProfileCard>


                <ViewRow>

                    <ClockCard situacao={situacao}>
                        <AntDesign name="clockcircle" size={14} color={situacao == "pendente" ? "#49b3ba" : "#8c8a97"} />
                        <TextBold situacao={situacao}>{moment(data).format("HH:mm")}</TextBold>
                    </ClockCard>

                    {
                        situacao == "cancelado" ? (
                            <>
                            </>
                        ) : situacao == "pendente" ? (
                            <ButtonCard onPress={onPressCancel}>
                                <ButtonText situacao={situacao}>Cancelar</ButtonText>
                            </ButtonCard>
                        ) : (
                            <ButtonCard onPress={navigation}>
                                <ButtonText situacao={situacao}>Ver prontuário</ButtonText>
                            </ButtonCard>
                        )
                    }

                </ViewRow>
            </ContentCard>

        </ContainerCardsList>
    )
}