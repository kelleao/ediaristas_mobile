import axios, { AxiosError } from 'axios';
import { UserShortInformationInterface } from 'data/@types/UserInterface';
import { ApiService } from 'data/services/ApiService';
import { ValidationService } from 'data/services/ValidationService';
import { useState, useMemo } from 'react';

export default function useVerificarProfissionais() {
    const [cep, setCep] = useState(''),
        cepValido = useMemo(() => {
            return ValidationService.cep(cep);
        }, [cep]),
        [erro, setErro] = useState(''),
        [buscaFeita, setBuscaFeita] = useState(false),
        [carregando, setCarregando] = useState(false),
        [diaristas, setDiaristas] = useState(
            [] as UserShortInformationInterface[]
        ),
        [diaristasRestantes, setDiaristasRestantes] = useState(0);

    async function buscarProfissionais(cep: string) {
        setBuscaFeita(false);
        setCarregando(true);
        setErro('');
        try {
            const { data } = await ApiService.get<{
                diaristas: UserShortInformationInterface[];
                quantidade_diaristas: number;
            }>(`/api/diaristas/localidades?cep=02221000`);

            setBuscaFeita(true);
            setDiaristas(data.diaristas);
            setDiaristasRestantes(data.quantidade_diaristas);
            setCarregando(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErro(`${(error as AxiosError).response?.status}`);
            } else {
                setErro(`erro inesperado: ${(error as any).message}`);
            }
            setCarregando(false);
        }
    }

    return {
        cep,
        setCep,
        cepValido,
        buscarProfissionais,
        erro,
        diaristas,
        buscaFeita,
        carregando,
        diaristasRestantes,
    };
}
