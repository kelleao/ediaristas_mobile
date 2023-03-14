import { FormValues } from 'data/@types/forms/FormValue';
import useCities from 'data/hooks/useCities';
import { LocationService } from 'data/services/LocationService';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from 'data/contexts/UserContext';

export default function useAddressForm() {
    const {
            register,
            control,
            watch,
            setValue,
            formState: { errors },
        } = useFormContext<FormValues>(),
        { userAddress } = useContext(UserContext).userState;

    const [addressState, addressCity, addressCep] = watch([
            'endereco.estado',
            'endereco.cidade',
            'endereco.cep',
        ]),
        estados = LocationService.estados(),
        listaCidades = useCities(addressState),
        opcoesCidades = useMemo(
            () => listaCidades.map((item) => item.cidade),
            [listaCidades]
        );

    useEffect(() => {
        register('endereco.codigo_ibge');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (addressCity) {
            const cidade = listaCidades.find(
                (item) => item.cidade === addressCity
            );

            if (cidade) {
                setValue('endereco.codigo_ibge', cidade.codigo_ibge);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressCity]);

    useEffect(() => {
        const cep = (addressCep || '').replaceAll('_', '');
        if (cep.length === 10) {
            LocationService.cep(cep).then((newAddress) => {
                if (newAddress) {
                    newAddress.uf && setValue('endereco.estado', newAddress.uf);
                    newAddress.localidade &&
                        setValue('endereco.cidade', newAddress.localidade);
                    newAddress.ibge &&
                        setValue(
                            'endereco.codigo_ibge',
                            newAddress.ibge as any
                        );
                    newAddress.bairro &&
                        setValue('endereco.bairro', newAddress.bairro);
                    newAddress.logradouro &&
                        setValue('endereco.logradouro', newAddress.logradouro);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressCep]);

    return {
        // userAddress,
        // user,
        control,
        errors,
        estados,
        opcoesCidades,
        addressState,
        addressCity,
        addressCep,
        register,
        userAddress,
    };
}
