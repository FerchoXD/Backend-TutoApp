export function generarCodigo(length: number): string {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[randomIndex];

        if ((i + 1) % 4 === 0 && i < length - 1) {
            codigo += '-';
        }
    }

    return codigo;
}