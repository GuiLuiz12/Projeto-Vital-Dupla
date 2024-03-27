import { BoxContentMc, CardBoxColored, ClickerCard2, ImgPerfilHomeCard, MedicSpecify, TitleCard } from "./Style";

export const MedicComponent = ({ selected, onPress, name, specify }) => {
  return (
    <CardBoxColored ClickButton={selected}>
      <ClickerCard2 onPress={onPress}>
        <ImgPerfilHomeCard source={require("../../Assets/Images/MaskGroup.png")} />
        <BoxContentMc>
          <TitleCard>{name}</TitleCard>
          <MedicSpecify>{specify}</MedicSpecify>
        </BoxContentMc>
      </ClickerCard2>
    </CardBoxColored>
  );
};