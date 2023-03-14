import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from 'ui/router/Router';
import VerificarProfissionais from '@partials/encontrar-diarista/_verificar-profissionais';

type NavigationProp = StackNavigationProp<
    RootStackParamList,
    'EncontrarDiarista'
>;

const EncontrarDiarista: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <>
            <VerificarProfissionais onContratarProfissional={() => {}} />
        </>
    );
};

export default EncontrarDiarista;
