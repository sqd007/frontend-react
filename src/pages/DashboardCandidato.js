import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardCandidato = () => {
    const [vagasMatch, setVagasMatch] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const location = useLocation();
    const candidatoId = location.state && location.state.candidatoId;

    useEffect(() => {
        if (candidatoId) {
            fetch(`https://app-matchwork-fb428e5e6c00.herokuapp.com/api/matchwork/candidatos/${candidatoId}/vagas/match`)
                .then(response => response.json())
                .then(data => setVagasMatch(data))
                .catch(error => console.error('Erro ao carregar vagas de match:', error));
        }
    }, [candidatoId]);

    const mostrarMensagemSucesso = () => {
        setSuccessMessage('Registro de interesse na vaga efetuado com sucesso!');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mb-4">
                <div className="container-fluid">
                    <button className="btn btn-primary me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar">
                        <i className="fas fa-bars"></i>
                        Menu
                    </button>
                    <Link className="navbar-brand" to="/">
                        <img src="/img/logo.png" className="img-fluid" style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="Logo" />
                        Matchwork
                    </Link>
                    <div className="d-flex flex-row">
                        <ul className="navbar-nav d-flex flex-row">
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="#">
                                    <i className="fas fa-bell"></i>
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="#">
                                    <i className="fas fa-cog"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <img src="/img/user1.png" alt="Foto do Usuário" className="img-fluid rounded-circle" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 bg-primary vh-100 text-white offcanvas offcanvas-start" tabIndex="-1">
                        <div className="position-sticky">
                            <ul className="nav flex-column mt-4">
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/dashboard_candidato">
                                        <i className="fas fa-home"></i> Início
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/match">
                                        <i className="fas fa-handshake"></i> Matchs
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/dicas">
                                        <i className="fas fa-lightbulb"></i> Dicas
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/cursos">
                                        <i className="fas fa-book"></i> Cursos
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
                            <h2 className="mb-4">Veja as vagas que deram match com o seu perfil</h2>
                            <div id="vagasCarousel" className="carousel slide d-flex align-items-center" data-bs-ride="carousel">
                                {/* Renderização dinâmica das vagas */}
                                {vagasMatch.length > 0 ? (
                                    <>
                                        <button className="carousel-control-prev bg-primary me-3" type="button" data-bs-target="#vagasCarousel" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Anterior</span>
                                        </button>
                                        <div className="carousel-inner">
                                            {vagasMatch.map((vaga, index) => (
                                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={vaga.id}>
                                                    <div className="card w-100 text-center p-5" style={{ width: '24rem' }}>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{vaga.titulo}</h5>
                                                            <p className="card-text">{vaga.descricao}</p>
                                                            <button className="btn btn-primary" onClick={mostrarMensagemSucesso}>Tenho Interesse</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="carousel-control-next bg-primary ms-3" type="button" data-bs-target="#vagasCarousel" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Próximo</span>
                                        </button>
                                    </>
                                ) : (
                                    <p>Nenhuma vaga de match disponível no momento.</p>
                                )}
                            </div>
                            <div className="alert alert-success mt-3" role="alert" id="alertaSucesso">
                                {successMessage}
                            </div>
                        </div>
                        <div className="container mt-5">
                            <h2>#DicaDeHoje: Dicas profissionais</h2>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Como se destacar em uma entrevista</h5>
                                    <p className="card-text">Aqui vai um resumo do post sobre a dica do dia.</p>
                                </div>
                            </div>
                            <Link className="btn btn-outline-primary mt-3" to="#">Veja Mais</Link>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardCandidato;
