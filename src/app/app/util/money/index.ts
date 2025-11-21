// Converte string no formato brasileiro para número decimal
export const converterEmBigDecimal = (value: string | undefined | null): number => {
    if (!value) return 0;

    const normalizado = value
        .replace(/\./g, '') // remove pontos de milhar
        .replace(',', '.'); // troca vírgula por ponto

    return Number(normalizado) || 0;
};


// Formata número ou string para o padrão brasileiro: 1.234,56
export const formatReal = (valor: number | string): string => {
    if (valor === null || valor === undefined) return '0,00';

    const numero = typeof valor === 'number'
        ? valor
        : Number(valor.replace(/\D/g, '')) / 100;

    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};
