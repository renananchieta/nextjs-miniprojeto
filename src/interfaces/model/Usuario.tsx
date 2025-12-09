export interface Usuario {
    id: number;
    nome: string;
    email: string;
    login: string;
    senha: string;
    ativo: number;
    dtNascimento: string;
}

export interface PerfilUsuario {
    id: number;
    perfil: string;
}
