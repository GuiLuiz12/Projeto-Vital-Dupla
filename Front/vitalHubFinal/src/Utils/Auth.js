import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";
import moment from "moment";

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export const userDecodeToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("token")).token;
    if (token === null) {
        return null
    }
    const decoded = jwtDecode( token )
    return {
        name: decoded.name,
        role: decoded.role,
        email: decoded.email,
        jti: decoded.jti,
        token: token
    }
}

export function idadeCalc(Data) {
    const  dataSeparada = Data.split(" ")

    const dataAniversario = dataSeparada[0].split("-")

    const anoNiver = dataAniversario[0]
    const mesNiver = dataAniversario[1]
    const diaNiver = dataAniversario[2]

    var d = new Date,
        anoAtual = d.getFullYear(),
        mesAtual = d.getMonth() + 1,
        diaAtual = d.getDate()

        idade = anoAtual - anoNiver;

    if (mesAtual < mesNiver || mesAtual == mesNiver && diaAtual < diaNiver) {
            idade--;
    }
    
    return idade < 0 ? 0 : idade;
}

export function inverterData(data) {
    
    const dataSplit = data.split("T")[0]
    const dataInvertida = dataSplit.split("-")
    if (dataInvertida[2] != undefined || dataInvertida[1] != undefined || dataInvertida[0] != undefined )  {
        const dataFinal  = `${dataInvertida[2]}/${dataInvertida[1]}/${dataInvertida[0]}`
        return dataFinal
    }
    else{
        return ""
    }
}