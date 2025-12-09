export interface Post {
    id: number;
    title: string;
    date: string;
    thanks: string;
    last_comments: string;
    status: boolean;
    deleted_at: string | null;
    owner: number;
    usuario: UsuarioPostagem; 
    flags: Flag[]; 
    image_main: File | null;
}

export interface UsuarioPostagem {
    id: number;
    nome: string;
}

export interface Flag {
    id: number;
    description: string;
    pivot: {
        post_id: number;
        flag_id: number;
    }
}
