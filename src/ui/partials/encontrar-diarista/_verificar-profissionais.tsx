import { useTheme } from '@emotion/react';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import Button from 'ui/components/inputs/Button/Button';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import TextInputMask from 'ui/components/inputs/TextInputMask/TextInputMask';
import {
    FormContainer,
    TextContainer,
    ErrorText,
    ResponseContainer,
} from './_verificar-profissionais.style';
import useVerificarProfissionais from 'data/hooks/pages/useVerificarProfissionais.page';
import useVerificarProfissionaiMobile from 'data/hooks/pages/useVerificarProfissionais.page.mobile';

interface VerificarProfissionaisProps {
    onContratarProfissional: () => void;
}

const VerificarProfissionais: React.FC<VerificarProfissionaisProps> = (
    props
) => {
    const { colors } = useTheme(),
        {
            cep,
            setCep,
            cepValido,
            buscarProfissionais,
            erro,
            diaristas,
            buscaFeita,
            carregando,
            diaristasRestantes,
        } = useVerificarProfissionais(),
        { cepAutomatico } = useVerificarProfissionaiMobile();

    useEffect(() => {
        if (cepAutomatico && !cep) {
            setCep(cepAutomatico);
            buscarProfissionais(cepAutomatico);
        }
    }, [cepAutomatico]);

    return (
        <ScrollView>
            <PageTitle
                title={'Conheça os profissionais'}
                subtitle={
                    'Preencha seu endereço e veja todos os profissionais da sua localidade'
                }
            ></PageTitle>
            <FormContainer>
                <TextInputMask
                    label={'Digite seu CEP'}
                    mask={'99999-999'}
                    value={cep}
                    onChangeText={setCep}
                    keyboardType={'number-pad'}
                />

                {erro ? <ErrorText>{erro}</ErrorText> : null}

                <Button
                    color={colors.accent}
                    mode={'contained'}
                    onPress={() => buscarProfissionais(cep)}
                    loading={carregando}
                    disabled={!cepValido || carregando}
                    fullWidth
                    style={{ marginTop: 32 }}
                >
                    Buscar
                </Button>
            </FormContainer>

            {buscaFeita &&
                (diaristas.length > 0 ? (
                    <ResponseContainer>
                        {diaristas.map((item, index) => (
                            <UserInformation
                                key={index}
                                name={item.nome_completo}
                                rating={item.reputacao || 0}
                                picture={item.foto_usuario || ''}
                                description={item.cidade}
                                darker={index % 2 === 1}
                            />
                        ))}

                        {diaristasRestantes > 0 && (
                            <TextContainer>
                                ... mais {diaristasRestantes}{' '}
                                {diaristasRestantes > 1
                                    ? 'profissionais atendem'
                                    : 'profissional atende'}{' '}
                                ao seu endereço
                            </TextContainer>
                        )}
                        <Button
                            color={colors.accent}
                            mode={'contained'}
                            fullWidth
                            style={{ marginTop: 32 }}
                        >
                            Contratar um profissional
                        </Button>
                    </ResponseContainer>
                ) : (
                    <TextContainer>
                        Ainda não temos nenhum(a) diarista disponível em sua
                        região
                    </TextContainer>
                ))}
        </ScrollView>
    );
};

export default VerificarProfissionais;
