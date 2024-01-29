import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroCandidato = () => {
    const [competencias, setCompetencias] = useState([]);
    const [competenciasSelecionadas, setCompetenciasSelecionadas] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [candidatoId, setCandidatoId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://app-matchwork-fb428e5e6c00.herokuapp.com/api/matchwork/competencias')
            .then(response => response.json())
            .then(data => setCompetencias(data))
            .catch(error => console.error('Erro ao carregar competências:', error));
    }, []);

    const handleCompetenciaChange = (competenciaId) => {
        const updatedSelection = competenciasSelecionadas.includes(competenciaId)
            ? competenciasSelecionadas.filter(id => id !== competenciaId)
            : [...competenciasSelecionadas, competenciaId];

        setCompetenciasSelecionadas(updatedSelection);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (competenciasSelecionadas.length !== 3) {
            setErrorMessage('Selecione exatamente 3 competências.');
            setSuccessMessage('');
            return;
        }

        const formData = new FormData(event.target);
        const candidato = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            login: formData.get('email'),
            telefone: formData.get('telefone'),
            cpf: formData.get('cpf'),
            senha: formData.get('senha'), 
            competencias: competenciasSelecionadas
        };

        try {
            const response = await fetch('https://app-matchwork-fb428e5e6c00.herokuapp.com/api/matchwork/candidatos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidato),
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const data = await response.json();

            setCandidatoId(data.id);

        } catch (error) {
            setErrorMessage('Falha ao enviar dados. Por favor, tente novamente.');
            setSuccessMessage('');
            console.error('Falha ao enviar dados:', error);
        }
    };

    useEffect(() => {
        if (candidatoId !== null) {
            setErrorMessage('');
            setSuccessMessage('Cadastro realizado com sucesso. Redirecionando para o Dashboard...');

            setTimeout(() => {
                navigate(`/dashboard_candidato`, { state: { candidatoId } });
            }, 2000);
        }
    }, [candidatoId, navigate]);

    return (
        <div className="container d-flex justify-content-center mt-5 mb-5">
            <div className="max-width-container-lg">
                <h3 className='display-7 text-center'>Cadastro de Candidatos</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input name="nome" className="form-control" placeholder="Nome completo" required />
                    </div>
                    <div className="mb-3">
                        <input name="email" className="form-control" type="email" placeholder="E-mail (usado como login)" required />
                    </div>
                    <div className="mb-3">
                        <input name="telefone" className="form-control" placeholder="Telefone" required />
                    </div>
                    <div className="mb-3">
                        <input name="cpf" className="form-control" placeholder="CPF" required />
                    </div>
                    <div className="mb-3">
                        <input name="senha" className="form-control" type="password" placeholder="Senha" required />
                    </div>
                    <div>
                        <h5>Competências</h5>
                        {competencias.map(competencia => (
                            <div key={competencia.id} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`competencia-${competencia.id}`}
                                    className="form-check-input"
                                    onChange={() => handleCompetenciaChange(competencia.id)}
                                />
                                <label htmlFor={`competencia-${competencia.id}`} className="form-check-label">
                                    {competencia.nome} - {competencia.descricao}
                                </label>
                            </div>
                        ))}
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

export default CadastroCandidato;
