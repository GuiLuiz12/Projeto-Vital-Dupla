import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonView, TextButtonIcon } from './Style';

export const ButtonFooter = ({
    isPerfil,
    selected,
    title,

}) => {
    return (
        <ButtonView Clicked={selected}>
            {
                isPerfil ?
                <Ionicons name="person-circle-outline" color={selected ? "#607EC5" : "#4E4B59"} size={22} />
                    :
                <MaterialCommunityIcons name="calendar-check" size={24} color={selected ? "#607EC5" : "#4E4B59"}/>
            }

            {
                selected ?
                <TextButtonIcon>{title}</TextButtonIcon>
                :
                <></>
            }
            
        </ButtonView>
    )
}