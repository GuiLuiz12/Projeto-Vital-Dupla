import { AntDesign } from '@expo/vector-icons';
import { ButtonCard, ButtonText, ClockCard, ContainerCardsList, ContentCard, DataProfileCard, ProfileData, ProfileImage, ProfileName, TextAge, TextBold, ViewRow } from './Style';
import { useState } from 'react';

export const AppointmentCard = ({
    situacao = "pendente",
    onPressCancel,
    onPressAppointment,
    prioridade,
    nome,
    idade,
}) => {
    
    return(
            <ContainerCardsList>

                <ProfileImage
                    source={require('../../Assets/Images/Niccole.png')}
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
                                <TextBold situacao={situacao}>14:00</TextBold>
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
    onPressAppointment,
    profile
}) => {
    return(
            <ContainerCardsList>

                <ProfileImage
                    source={require('../../Assets/Images/MaskGroup.png')}
                />

                
                <ContentCard>
                    <DataProfileCard>

                        <ProfileName>Dr. Claudio</ProfileName>

                        <ProfileData>
                            <TextAge>22 anos</TextAge>
                            <TextBold>Rotina</TextBold>
                        </ProfileData>

                    </DataProfileCard>


                        <ViewRow>
                           
                            <ClockCard situacao={situacao}>
                                <AntDesign name="clockcircle" size={14} color={situacao == "pendente" ? "#49b3ba" : "#8c8a97"} />
                                <TextBold situacao={situacao}>14:00</TextBold>
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
                                    <ButtonCard onPress={profile != "comum" ? onPressAppointment : navigation}>
                                        <ButtonText situacao={situacao}>Ver prontuário</ButtonText>
                                    </ButtonCard>
                                )
                            }
                       
                        </ViewRow>    
                </ContentCard>

            </ContainerCardsList>
    )
}