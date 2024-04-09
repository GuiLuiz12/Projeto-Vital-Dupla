import { Container, ContainerLeft, ContainerLocal, ContainerLocalEderecoP, ContainerLocalNumeroP, ContainerRowInputs } from "../../Components/Container/Style";
import { FotoPerfil } from "../../Components/FotoPerfil/Style";
import { SubTitle } from "../../Components/SubTitle/Style";
import { Title } from "../../Components/Title/Style";
import { TitleComponent } from "../../Components/TitleComponent/TitleComponent";
import { InputCinza, InputCinzaMenor } from "../../Components/InputCinza/Style";
import { Button, ButtonCinzaPequeno, ButtonPerfil } from "../../Components/Button/Style";
import { ButtonTitle } from "../../Components/ButtonTitle/Style";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth";
import api from "../../Service/Service";

export const Perfil = ({ navigation, route }) => {
    const [token, setToken] = useState({})
    const [editing, setEditing] = useState(false)
    const [desativarNavigation, setDesativarNavigation] = useState(false)
    const [oqueFazer, setOqueFazer] = useState(false)
    const [buscarId, setBuscarId] = useState(null)
    const [attUser, setAttUser] = useState({
        rg: null, 
        cpf: null, 
        dataNascimento: null, 
        cep: null, 
        logradouro: null,
        numero: null,
        cidade: null,
        nome: null,
        especialidade:null,
        crm: null
    })

    function EditarFunction() {
        setEditing(true)
        setOqueFazer(true)
        setDesativarNavigation(true)
    }

    async function Logout() {
        await AsyncStorage.removeItem("token")
        navigation.navigate("Login")
    }

    async function ProfileLoad() {
        const tokenDecode = await userDecodeToken();
        console.log(tokenDecode.role);
        console.log("1");

        if (tokenDecode) {
            BuscarUsuario(tokenDecode)

            setToken(tokenDecode)
        }
    }

    async function BuscarUsuario(tokenUsuario) {
        const url = (tokenUsuario.role == 'Medico' ? 'Medicos' : "Pacientes")
        console.log(url);
        const response = await api.get(`/${url}/BuscarPorId?id=${tokenUsuario.jti}`).catch((error) => {console.log(error);})
        console.log("ok");
        setBuscarId(response.data)
    }

    async function SalvarFunction(tokenUsuario) {
        await api.put(`/Pacientes?idUsuario=${tokenUsuario.jti}`,{
            rg: attUser.rg,
            cpf: attUser.cpf,
            dataNascimento: attUser.dataNascimento,
            cep: attUser.cep,
            logradouro: attUser.logradouro,
            numero: attUser.numero,
            cidade: attUser.cidade,
            nome: attUser.nome,
        })
        console.log(response.data);

        setEditing(false)
        setOqueFazer(false)
        setDesativarNavigation(false)
    }

    useEffect(() => {
        ProfileLoad();
    }, [editing])

    return (
        <ScrollView>
            {buscarId != null ?
                <Container>

                    <FotoPerfil
                        source={require('../../Assets/Images/Richard.png')}
                    />

                    {!editing ?
                        <>
                            <Title>{token.name}</Title>
                            <SubTitle>{token.email}</SubTitle>
                        </>
                        :
                        <ContainerLeft>
                            <TitleComponent>Nome</TitleComponent>

                            <InputCinza
                                value={buscarId.idNavigation.nome}
                                onChangeText={(txt) => setAttUser({nome: txt})}
                            />
                        </ContainerLeft>
                    }

                    <ContainerLeft>
                        <TitleComponent>Data de nascimento</TitleComponent>

                        <InputCinza
                            value={new Date(buscarId.dataNascimento).toLocaleDateString()}
                            editable={editing}
                            onChangeText={(txt) => setAttUser({dataNascimento: txt})}
                        />
                    </ContainerLeft>

                    {token.role === "Médico" ?
                        <>
                            <ContainerLeft>
                                <TitleComponent>Especialidade</TitleComponent>
                                <InputCinza 
                                    value={buscarId.especialidade.especialidade1}
                                    editable={editing}
                                    onChangeText={(txt) => setAttUser({especialidade: txt})}
                                />
                            </ContainerLeft>

                            <ContainerLeft>
                                <TitleComponent>CRM</TitleComponent>
                                <InputCinza 
                                value={buscarId.crm} 
                                editable={editing} 
                                onChangeText={(txt) => setAttUser({crm: txt})}
                                />
                            </ContainerLeft>
                        </>
                        :
                        <>
                            <ContainerLeft>
                                <TitleComponent>RG</TitleComponent>
                                <InputCinza 
                                value={buscarId.rg} 
                                editable={editing} 
                                onChangeText={(txt) => setAttUser({rg: txt})}
                                />
                            </ContainerLeft>

                            <ContainerLeft>
                                <TitleComponent>CPF</TitleComponent>
                                <InputCinza 
                                value={buscarId.cpf} 
                                editable={editing} 
                                onChangeText={(txt) => setAttUser({cpf: txt})}
                                />
                            </ContainerLeft>
                        </>
                    }
                    <ContainerRowInputs>

                        <ContainerLocalEderecoP>

                            <TitleComponent>Rua/Logadouro</TitleComponent>

                            <InputCinzaMenor
                                value={buscarId.endereco.logradouro}
                                editable={editing}
                                onChangeText={(txt) => setAttUser({logradouro: txt})}
                            />
                        </ContainerLocalEderecoP>

                        <ContainerLocalNumeroP>

                            <TitleComponent>Número</TitleComponent>

                            <InputCinzaMenor
                                value={`${buscarId.endereco.numero}`}
                                editable={editing}
                                onChangeText={(txt) => setAttUser({numero: txt})}
                            />
                        </ContainerLocalNumeroP>

                    </ContainerRowInputs>

                    <ContainerRowInputs>
                        <ContainerLocal>
                            <TitleComponent>CEP</TitleComponent>
                            <InputCinzaMenor 
                            value={buscarId.endereco.cep} 
                            editable={editing} 
                            onChangeText={(txt) => setAttUser({cep: txt})}
                            />
                        </ContainerLocal>

                        <ContainerLocal>
                            <TitleComponent>Cidade</TitleComponent>
                            <InputCinzaMenor 
                            value={buscarId.endereco.cidade} 
                            editable={editing} 
                            onChangeText={(txt) => setAttUser({cidade: txt})}
                            />
                        </ContainerLocal>
                    </ContainerRowInputs>

                    <ButtonPerfil onPress={() => SalvarFunction(token)} disabled={!editing} color={!editing}>
                        <ButtonTitle>Salvar</ButtonTitle>
                    </ButtonPerfil>

                    <ButtonPerfil onPress={() => EditarFunction()} disabled={editing} color={editing}>
                        <ButtonTitle>Editar</ButtonTitle>
                    </ButtonPerfil>

                    <ButtonCinzaPequeno onPress={() => Logout()} disabled={false}>
                        <ButtonTitle>Sair do APP</ButtonTitle>
                    </ButtonCinzaPequeno>

                </Container >
                :
                <></>
            }


        </ScrollView >
    )
}