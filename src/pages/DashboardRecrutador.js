import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DashboardRecrutador = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const recrutadorId = location.state && location.state.recrutadorId;
    const [vagasCadastradas, setVagasCadastradas] = useState([]);
    const [vagasAbertas, setVagasAbertas] = useState([]);
    const [vagasEncerradas, setVagasEncerradas] = useState([]);

    const handleCadastrarVagaClick = () => {
        navigate(`/vagas_recrutador`, { state: { recrutadorId } });
    };

    const navigateToVagasRecrutador = (recrutadorId) => {
        navigate(`/matchs`, { state: { recrutadorId } });
    };

    useEffect(() => {

        const carregarVagas = async () => {
            try {

                const response = await fetch(`http://localhost:8080/api/matchwork/recrutadores/${recrutadorId}/vagas`);
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                const data = await response.json();
                setVagasCadastradas(data);

                const vagasAbertas = data.filter((vaga) => vaga.status === 'ABERTA');
                setVagasAbertas(vagasAbertas);

                // Filtrar vagas encerradas
                const vagasEncerradas = data.filter((vaga) => vaga.status === 'FECHADA');
                setVagasEncerradas(vagasEncerradas);
            } catch (error) {
                console.error('Erro ao carregar vagas:', error);
            }
        };

        if (recrutadorId) {
            carregarVagas();
        }
    }, [recrutadorId]);

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
                        <button
                            className="nav-link text-white"
                            onClick={() => navigateToVagasRecrutador(recrutadorId)}>
                            <i className="fas fa-suitcase"></i> matchs
                        </button>
        
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
            <main className="px-md-4">
                <div className="container mt-5">
                    <h2 className="mb-4">Veja suas vagas criadas, recrutador!</h2>
                    <div id="vagasCarousel" className="carousel slide d-flex align-items-center" data-bs-ride="carousel">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Vagas cadastradas</h5>
                                            <h1 className="text-primary">{vagasCadastradas.length}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Vagas abertas</h5>
                                            <h1 className="text-primary">{vagasAbertas.length}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Vagas encerradas</h5>
                                            <h1 className="text-primary">{vagasEncerradas.length}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 text-center">
                                    <button className="btn btn-primary mt-4" type="button" onClick={handleCadastrarVagaClick}>
                                        Clique aqui para cadastrar uma nova vaga
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-5">
                        <h2>#DicaDoDia: Fique por dentro das novidades e dicas do mundo Rh!</h2>

                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Como construir um time mais diversos? PapoRH</h5>
                                <p className="card-text">Fique por dentro das novidades e dicas do mundo RH!.</p>
                            </div>
                        </div>
                        <Link to="#" className="btn btn-outline-primary mt-3 mb-3">Veja Mais</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardRecrutador;
