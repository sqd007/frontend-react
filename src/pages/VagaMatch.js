import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const VagaMatchs = () => {
    const location = useLocation();
    const recrutadorId = location.state && location.state.recrutadorId;
    const [vagas, setVagas] = useState([]);
    const [selectedVagaId, setSelectedVagaId] = useState(null);

    useEffect(() => {
        const carregarVagas = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/matchwork/recrutadores/${recrutadorId}/vagas/match`);
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                const data = await response.json();
                setVagas(data);
            } catch (error) {
                console.error('Erro ao carregar vagas:', error);
            }
        };
        if (recrutadorId) {
            carregarVagas();
        }
    }, [recrutadorId]);

    const toggleCandidatos = (vagaId) => {
        if (selectedVagaId === vagaId) {
            setSelectedVagaId(null);
        } else {
            setSelectedVagaId(vagaId);
        }
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
                <h2 className="mb-4 text-center">Matchs</h2>
                {vagas.map((vaga) => (
                    <div className="card mb-4" key={vaga.id}>
                        <div className="card-body">
                        <h5 className="card-title">Vaga: {vaga.titulo}</h5>
                            <p className="card-text">Descrição: {vaga.descricao}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => toggleCandidatos(vaga.id)}
                            >
                                Ver matchs
                            </button>
                            {selectedVagaId === vaga.id && (
                                <div>
                                    <h6 className="mt-3">Candidatos</h6>
                                    <ul className="list-group">
                                        {vaga.matchCandidatos.map((candidato) => (
                                            <li key={candidato.id} className="list-group-item">{candidato.nome}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VagaMatchs;
