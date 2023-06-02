export interface Transfer {
    fromAccount: string;
    dniToTransfer: string;
    accountToTransfer: string;
    amountToTransfer: number;
}

export interface TransferResponse {
    status: number;
    message: string;
}