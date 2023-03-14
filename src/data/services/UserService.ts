import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { ApiService } from './ApiService';
import { ObjectService } from './ObjectService';
import { TextFormatService } from './TextFormatService';
import { FieldPath, UseFormReturn, FieldValues } from 'react-hook-form';
import { CadastroUerInterface } from 'data/@types/FormInterface';
import axios from 'axios';

export const UserService = {
    async cadastrar(
        user: UserInterface,
        userType: UserType,
        link: ApiLinksInterface
    ): Promise<UserInterface | undefined> {
        ApiService.defaults.headers.common['Authorization'];

        const nascimento = TextFormatService.dateTosString(
                user.nascimento as Date
            ),
            cpf = TextFormatService.getNumberFromText(user.cpf),
            telefone = TextFormatService.getNumberFromText(user.telefone),
            userData = ObjectService.jsonToFormData({
                ...user,
                tipo_usuario: userType,
                nascimento,
                telefone,
                cpf,
            });

        const response = await ApiService.request<UserInterface>({
            url: link.uri,
            method: link.type,
            data: userData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },

    handleNewUserError(
        error: any,
        form: UseFormReturn<CadastroUerInterface>
    ): void {
        if (axios.isAxiosError(error)) {
            const errorList = error.response?.data as
                | { errors: UserInterface }
                | undefined;

            if (errorList) {
                if (errorList.errors.cpf) {
                    form.setError('usuario.cpf', {
                        type: 'cadastrado',
                        message: 'CPF já cadastrado',
                    });
                }
                if (errorList.errors.email) {
                    form.setError('usuario.email', {
                        type: 'cadastrado',
                        message: 'E-mail já cadastrado',
                    });
                }
            }
        }
    },
};
