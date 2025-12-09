'use client';

import { Usuario } from "@/interfaces/model/Usuario";

export interface FormUsuarioProps {
    usuario: Partial<Usuario>;
    cancelar: () => void;
    editarUsuario: (usuario: Partial<Usuario>) => void;
}

export default function FormUsuario(props: FormUsuarioProps) {

    const { usuario, editarUsuario, cancelar } = props;

    return (
        <div className="flex flex-col gap-4 mx-2">
            <h1 className="text-center mt-5 mb-2 font-bold text-3xl">{ usuario.id ? 'Edição' : 'Cadastro'} de Usuário</h1>

            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label>Nome</label>
                    <input 
                    type="text" 
                    value={usuario.nome ?? ""} 
                    onChange={(e) => 
                        editarUsuario({ ...usuario, nome: e.target.value })
                    }
                    className="input" />
                </div>
                <div className="flex flex-col gap-1">
                    <label>E-mail</label>
                    <input 
                    type="text" 
                    value={usuario.email ?? ""} 
                    onChange={(e) => 
                        editarUsuario({ ...usuario, email: e.target.value })
                    }
                    className="input" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label>Nascimento</label>
                    <input 
                    type="text" 
                    value={usuario.dtNascimento ?? ""} 
                    onChange={(e) => 
                        editarUsuario({ ...usuario, dtNascimento: e.target.value })
                    }
                    className="input" />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Login</label>
                    <input 
                    type="text" 
                    value={usuario.login ?? ""} 
                    onChange={(e) => 
                        editarUsuario({ ...usuario, login: e.target.value })
                    }
                    className="input" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label>Senha</label>
                    <input 
                    type="password" 
                    value={usuario.senha ?? ""} 
                    onChange={(e) => 
                        editarUsuario({ ...usuario, senha: e.target.value })
                    }
                    className="input" />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Confirmar Senha</label>
                    <input 
                    type="password" 
                    value={usuario.senha ?? ""} 
                    onChange={(e) => 
                        editarUsuario({ ...usuario, senha: e.target.value })
                    }
                    className="input" />
                </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row justify-end w-full">
                <button className="botao azul">{usuario.id ? 'Alterar' : 'Salvar'}</button>
                <button className="botao cinza" onClick={() => cancelar()}>Cancelar</button>
            </div>
        </div>
    );
}