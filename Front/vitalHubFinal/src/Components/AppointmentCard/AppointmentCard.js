import { AntDesign } from '@expo/vector-icons';
import { ButtonCard, ButtonText, ClockCard, ContainerCardsList, ContentCard, DataProfileCard, ProfileData, ProfileImage, ProfileName, TextAge, TextBold, ViewRow } from './Style';
import { useState } from 'react';

export const AppointmentCard = ({
    situacao = "pendente",
    onPressCancel,
    onPressAppointment
}) => {
    
    return(
            <ContainerCardsList>

                <ProfileImage
                    source={require('../../Assets/Images/Niccole.png')}
                />

                
                <ContentCard>
                    <DataProfileCard>

                        <ProfileName>Niccole Sarga</ProfileName>

                        <ProfileData>
                            <TextAge>19 anos</TextAge>
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
    onPressAppointment
}) => {
    const [profile, setProfile] = useState("Paciente")
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
                                    <ButtonCard onPress={profile !== "Paciente" ? onPressAppointment : () => navigation.replace("Prontuario")}>
                                        <ButtonText situacao={situacao}>Ver prontuário</ButtonText>
                                    </ButtonCard>
                                )
                            }
                       
                        </ViewRow>    
                </ContentCard>

            </ContainerCardsList>
    )
}