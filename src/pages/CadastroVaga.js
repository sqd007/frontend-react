import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CadastroVaga = () => {
    const location = useLocation();
    const recrutadorId = location.state && location.state.recrutadorId;
    const [vaga, setVaga] = useState({
        titulo: '',
        descricao: '',
        competenciasTecnicas: [],
        competenciasComportamentais: [],
    });
    const [competencias, setCompetencias] = useState([]);
    const [competenciasTecnicasSelecionadas, setCompetenciasTecnicasSelecionadas] = useState([]);
    const [competenciasComportamentaisSelecionadas, setCompetenciasComportamentaisSelecionadas] = useState([]);
    const [vagasExistentes, setVagasExistentes] = useState([]);

    // Carregar competências a partir da API
    useEffect(() => {
        const carregarCompetencias = async () => {
            try {
                const response = await fetch('https://app-matchwork-fb428e5e6c00.herokuapp.com/api/matchwork/competencias');
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                const data = await response.json();
                setCompetencias(data);
            } catch (error) {
                console.error('Erro ao carregar competências:', error);
            }
        };
        carregarCompetencias();
    }, []);

    // Carregar vagas existentes a partir da API
    useEffect(() => {
        const carregarVagasExistentes = async () => {
            try {
                const response = await fetch(`https://app-matchwork-fb428e5e6c00.herokuapp.com/api/matchwork/recrutadores/${recrutadorId}/vagas`);
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                const data = await response.json();
                setVagasExistentes(data);
            } catch (error) {
                console.error('Erro ao carregar vagas existentes:', error);
            }
        };
        if (recrutadorId) {
            carregarVagasExistentes();
        }
    }, [recrutadorId]);

    // Função para adicionar vaga
    const adicionarVaga = async (event) => {
        event.preventDefault();

        if (competenciasTecnicasSelecionadas.length < 3 || competenciasComportamentaisSelecionadas.length < 3) {
            alert('Selecione pelo menos 3 competências técnicas e 3 competências comportamentais.');
            return;
        }

        try {
            const response = await fetch(`https://app-matchwork-fb428e5e6c00.herokuapp.com/api/matchwork/recrutadores/${recrutadorId}/vagas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo: vaga.titulo,
                    descricao: vaga.descricao,
                    competenciasTecnicas: competenciasTecnicasSelecionadas,
                    competenciasComportamentais: competenciasComportamentaisSelecionadas,
                }),
            });
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            // Recarregar a lista de vagas após o cadastro
            const vagasResponse = await fetch(`https://app-matchwork-fb428e5e6c00.herokuapp.com/api/matchwork/recrutadores/${recrutadorId}/vagas`);
            if (!vagasResponse.ok) {
                throw new Error(`Erro: ${vagasResponse.status}`);
            }
            const vagasData = await vagasResponse.json();
            setVagasExistentes(vagasData);
        } catch (error) {
            console.error('Erro ao cadastrar vaga:', error);
        }
    };

    return (
        <div>
            {/* ...código do navbar... */}

            <div className="container mt-5 mb-5">
                <h2 className="mb-4 text-center">Gerencie suas vagas</h2>

                <div className="mb-4">
                    <h4>Criar nova vaga</h4>
                    <form onSubmit={adicionarVaga}>
                        <div className="mb-3">
                            <label htmlFor="vagaTitulo" className="form-label">Título da Vaga</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vagaTitulo"
                                placeholder="Ex: Desenvolvedor Front-end"
                                value={vaga.titulo}
                                onChange={(e) => setVaga({ ...vaga, titulo: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="vagaDescricao" className="form-label">Descrição</label>
                            <textarea
                                className="form-control"
                                id="vagaDescricao"
                                rows="3"
                                value={vaga.descricao}
                                onChange={(e) => setVaga({ ...vaga, descricao: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="competenciasTecnicas" className="form-label">Competências Técnicas (selecione pelo menos 3)</label>
                            <select
                                multiple
                                className="form-select"
                                id="competenciasTecnicas"
                                value={competenciasTecnicasSelecionadas}
                                onChange={(e) => setCompetenciasTecnicasSelecionadas(Array.from(e.target.selectedOptions, (option) => option.value))}
                                required
                            >
                                {competencias
                                    .filter((competencia) => competencia.tipo === 'TECNICA')
                                    .map((competencia) => (
                                        <option key={competencia.id} value={competencia.id}>
                                            {competencia.nome}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="competenciasComportamentais" className="form-label">Competências Comportamentais (selecione pelo menos 3)</label>
                            <select
                                multiple
                                className="form-select"
                                id="competenciasComportamentais"
                                value={competenciasComportamentaisSelecionadas}
                                onChange={(e) => setCompetenciasComportamentaisSelecionadas(Array.from(e.target.selectedOptions, (option) => option.value))}
                                required
                            >
                                {competencias
                                    .filter((competencia) => competencia.tipo === 'COMPORTAMENTAL')
                                    .map((competencia) => (
                                        <option key={competencia.id} value={competencia.id}>
                                            {competencia.nome}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Adicionar Vaga</button>
                    </form>
                </div>
                <h4>Vagas existentes</h4>
                <div className="row">
                    {vagasExistentes.map((vagaExistente) => (
                        <div className="col-md-4" key={vagaExistente.id}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{vagaExistente.titulo}</h5>
                                    <p className="card-text">{vagaExistente.descricao}</p>
                                    <Link to="#" className="btn btn-primary">Editar</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CadastroVaga;
