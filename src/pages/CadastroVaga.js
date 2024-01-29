import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CadastroVaga = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const recrutadorId = location.state && location.state.recrutadorId;
    const [vaga, setVaga] = useState({
        titulo: '',
        descricao: '',
        competenciasTecnicas: [],
        competenciasComportamentais: [],
    });
    const [competencias, setCompetencias] = useState([]);
    const [vagasExistentes, setVagasExistentes] = useState([]);

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

    const adicionarVaga = async (event) => {
        event.preventDefault();

        if (vaga.competenciasTecnicas.length === 0 || vaga.competenciasComportamentais.length === 0) {
            alert('Selecione pelo menos uma competência técnica e uma competência comportamental.');
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
                    competencias: [...vaga.competenciasTecnicas, ...vaga.competenciasComportamentais],
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
            setVaga({
                titulo: '',
                descricao: '',
                competenciasTecnicas: [],
                competenciasComportamentais: [],
            });
        } catch (error) {
            console.error('Erro ao cadastrar vaga:', error);
        }
    };

    const handleCompetenciaTecnicaChange = (competenciaId) => {
        const competenciasTecnicas = vaga.competenciasTecnicas.includes(competenciaId)
            ? vaga.competenciasTecnicas.filter((id) => id !== competenciaId)
            : [...vaga.competenciasTecnicas, competenciaId];
        setVaga({ ...vaga, competenciasTecnicas });
    };

    const handleCompetenciaComportamentalChange = (competenciaId) => {
        const competenciasComportamentais = vaga.competenciasComportamentais.includes(competenciaId)
            ? vaga.competenciasComportamentais.filter((id) => id !== competenciaId)
            : [...vaga.competenciasComportamentais, competenciaId];
        setVaga({ ...vaga, competenciasComportamentais });
    };

    const editarVaga = (recrutadorId, vagaId) => {
        navigate(`/vaga_editar/${recrutadorId}/${vagaId}`);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid">
                    <button className="btn btn-primary me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar">
                        <i className="fas fa-bars"></i>
                        Menu
                    </button>
                    <Link className="navbar-brand" to="/">
                        <img src="/img/logo.png" className="img-fluid" style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="Matchwork" />
                        Matchwork
                    </Link>
                    <div className="d-flex flex-row">
                        <ul className="navbar-nav d-flex flex-row">
                            <li className="nav-item me-3">
                                <a className="nav-link" href="#">
                                    <i className="fas fa-bell"></i>
                                </a>
                            </li>
                            <li className="nav-item me-3">
                                <a className="nav-link" href="#">
                                    <i className="fas fa-cog"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <img src="/img/recrutadora.png" alt="Foto do Usuário" className="img-fluid rounded-circle" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav id="sidebar" className="col-md-3 col-lg-2 bg-primary vh-100 text-white offcanvas offcanvas-start" tabIndex="-1">
                <div className="position-sticky">
                    <ul className="nav flex-column mt-4">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/dashboard_recrutador">
                                <i className="fas fa-home"></i> Início
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/matchs">
                                <i className="fas fa-handshake"></i> Matchs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/vagas_recrutador">
                                <i className="fas fa-suitcase"></i> Vagas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/dicas">
                                <i className="fas fa-lightbulb"></i> Dicas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/login">
                                <i className="fas fa-sign-out-alt"></i> Sair
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

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
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Competências Técnicas (selecione pelo menos uma)</label>
                            {competencias
                                .filter((competencia) => competencia.tipo === 'TECNICA')
                                .map((competencia) => (
                                    <div className="form-check" key={competencia.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={competencia.id}
                                            checked={vaga.competenciasTecnicas.includes(competencia.id)}
                                            onChange={() => handleCompetenciaTecnicaChange(competencia.id)}
                                        />
                                        <label className="form-check-label">{competencia.nome}</label>
                                    </div>
                                ))}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Competências Comportamentais (selecione pelo menos uma)</label>
                            {competencias
                                .filter((competencia) => competencia.tipo === 'COMPORTAMENTAL')
                                .map((competencia) => (
                                    <div className="form-check" key={competencia.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={competencia.id}
                                            checked={vaga.competenciasComportamentais.includes(competencia.id)}
                                            onChange={() => handleCompetenciaComportamentalChange(competencia.id)}
                                        />
                                        <label className="form-check-label">{competencia.nome}</label>
                                    </div>
                                ))}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Gravar Vaga
                        </button>
                    </form>
                </div>
                <h4>Vagas existentes</h4>
                <div className="row">
                    {vagasExistentes.map((vagaExistente) => (
                        <div className="col-md-4 mb-4" key={vagaExistente.id}>
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{vagaExistente.titulo}</h5>
                                    <p className="card-text flex-grow-1 overflow-hidden">{vagaExistente.descricao}</p>
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={() => editarVaga(recrutadorId, vagaExistente.id)}
                                    >
                                        Editar
                                    </button>
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
