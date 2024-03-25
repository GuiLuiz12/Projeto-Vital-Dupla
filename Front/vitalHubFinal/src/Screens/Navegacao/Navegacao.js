import { View, Button } from "react-native"

export const Navegacao = ({navigation}) => {
    return(
        <View>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button
                title="Recuperar"
                onPress={() => navigation.navigate("RecuperarSenha")}
            />
            <Button
                title="CodigoEmail"
                onPress={() => navigation.navigate("CodigoEmail")}
            />
            <Button
                title="RedefinirSenha"
                onPress={() => navigation.navigate("RedefinirSenha")}
            />
            <Button
                title="CriarConta"
                onPress={() => navigation.navigate("CriarConta")}
            />
            <Button
                title="HomeMedico"
                onPress={() => navigation.navigate("HomeMedico")}
            />
            <Button
                title="Perfil"
                onPress={() => navigation.navigate("Perfil")}
            />
            <Button
                title="Local"
                onPress={() => navigation.navigate("Local")}
            />
            <Button
                title="Prontuario"
                onPress={() => navigation.navigate("Prontuario")}
            />
            <Button
                title="HomePaciente"
                onPress={() => navigation.navigate("HomePaciente")}
            />
            <Button
                title="SelecionarClinica"
                onPress={() => navigation.navigate("SelecionarClinica")}
            />
            <Button
                title="SelecionarMedico"
                onPress={() => navigation.navigate("SelecionarMedico")}
            />
            <Button
                title="SelecionarData"
                onPress={() => navigation.navigate("SelecionarData")}
            />
            <Button
                title="ProntuarioPronto"
                onPress={() => navigation.navigate("ProntuarioPronto")}
            />
        </View>
    )
}