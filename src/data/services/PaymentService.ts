import { TextColor } from 'data/@types/DiariaInterface';
import { Pagamentostatus } from 'data/@types/PagamentoInterface';
import pagarme, { CardInterface, CardValidateInterface } from 'pagarme';

const encryption_key = process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY;

export const PaymentService = {
    validate(card: CardInterface): CardValidateInterface {
        return pagarme.validate({ card }).card;
    },
    getHash(card: CardInterface): Promise<string> {
        return pagarme.client
            .connect({ encryption_key })
            .then((client) => client.security.encrypt(card));
    },

    getStatus(status: Pagamentostatus): { label: string; color: TextColor } {
        let label = '',
            color: TextColor = 'success';

        switch (status) {
            case Pagamentostatus.Aguardando_Transferencia:
                label = 'Aguardando Transferência';
                color = 'warning';
                break;
            case Pagamentostatus.Pago:
                label = 'Pago';
                break;
        }

        return { label, color };
    },
};
