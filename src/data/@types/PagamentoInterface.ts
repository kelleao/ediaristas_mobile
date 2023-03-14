export interface PagamentoInterface {
    id: number;
    status: Pagamentostatus;
    valor: number;
    valor_deposito: number;
    created_at: string;
}

export enum Pagamentostatus {
    Pago = 1,
    Aguardando_Transferencia = 2,
}
