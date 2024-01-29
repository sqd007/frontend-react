import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://app-matchwork-fb428e5e6c00.herokuapp.com/api/matchwork/login/${email}/${password}`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const data = await response.json();
            if (data.autorizado) {
                if (data.tipoUsuario === 'CANDIDATO') {
                    navigate('/dashboard_candidato', { state: { candidatoId: data.id } });
                } else if (data.tipoUsuario === 'RECRUTADOR') {
                    navigate('/dashboard_recrutador', { state: { recrutadorId: data.id } });
                }
            } else {
                setErrorMessage('Usuário não autorizado.');
            }
        } catch (error) {
            setErrorMessage('Falha ao realizar login. Por favor, tente novamente.');
            console.error('Erro ao realizar login:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center text-center mt-5">
            <form className="form-signin" onSubmit={handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Faça login</h1>
                <label htmlFor="inputEmail" className="sr-only mb-3">Endereço de email</label>
                <input
                    type="email"
                    id="inputEmail"
                    className="form-control mb-3"
                    placeholder="Seu email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="inputPassword" className="sr-only mb-2">Senha</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control mb-2"
                    placeholder="Senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <div className="alert alert-danger mt-3">{errorMessage}</div>
                )}
                <button type="submit" className="btn btn-lg btn-primary btn-block w-100 mt-2 mb-3">Entrar</button>

                <div className="row p-0">
                    <p className="col-12">Ainda não tem cadastro? <Link to="/cadastro">Clique aqui</Link></p>
                    <Link className="col-12" to="/recuperacao-senha">Esqueci minha senha</Link>
                </div>
                <p className="mt-5 mb-3 text-muted">© 2023-2023</p>
            </form>
        </div>
    );
}

export default Login;
