import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroRecrutador = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const recrutador = {
            nome: formData.get('nome'),
            empresa: formData.get('empresa'),
            email: formData.get('email'),
            login: formData.get('email'),
            telefone: formData.get('telefone'),
            cnpj: formData.get('cnpj'),
            senha: formData.get('senha')
        };

        try {
            const response = await fetch('http://localhost:8080/api/matchwork/recrutadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recrutador),
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const data = await response.json();

            setErrorMessage('');
            setSuccessMessage('Cadastro de recrutador realizado com sucesso. Redirecionando para o Dashboard...');

            setTimeout(() => {
                navigate('/dashboard_recrutador', { state: { recrutadorId: data.id } });
            }, 2000);

        } catch (error) {
            setErrorMessage('Falha ao enviar dados. Por favor, tente novamente.');
            setSuccessMessage('');
            console.error('Falha ao enviar dados:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5 mb-5">
            <div className="max-width-container-lg">
                <h3 className='display-7 text-center'>Cadastro de Recrutadores</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input name="nome" className="form-control" placeholder="Nome completo" required />
                    </div>
                    <div className="mb-3">
                        <input name="empresa" className="form-control" placeholder="Nome da Empresa" required />
                    </div>
                    <div className="mb-3">
                        <input name="email" className="form-control" type="email" placeholder="E-mail (usado como login)" required />
                    </div>
                    <div className="mb-3">
                        <input name="telefone" className="form-control" placeholder="Telefone" required />
                    </div>
                    <div className="mb-3">
                        <input name="cnpj" className="form-control" placeholder="CNPJ" required />
                    </div>
                    <div className="mb-3">
                        <input name="senha" className="form-control" type="password" placeholder="Senha" required />
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger mt-3">{errorMessage}</div>
                    )}
                    {successMessage && (
                        <div className="alert alert-success mt-3">{successMessage}</div>
                    )}

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mt-4 w-100">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroRecrutador;
