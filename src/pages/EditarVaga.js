import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditarVaga = () => {
    const { recrutadorId, vagaId } = useParams();
    const navigate = useNavigate(); // Usando useNavigate para navegação
    const [vaga, setVaga] = useState({
        titulo: '',
        descricao: '',
        competencias: [],
    });

    useEffect(() => {
        const carregarVaga = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/matchwork/recrutadores/${recrutadorId}/vagas/${vagaId}`);
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                const data = await response.json();
                setVaga(data);
            } catch (error) {
                console.error('Erro ao carregar vaga:', error);
            }
        };
        carregarVaga();
    }, [recrutadorId, vagaId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVaga({ ...vaga, [name]: value });
    };

    const salvarAlteracoes = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/matchwork/recrutadores/${recrutadorId}/vagas/${vagaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo: vaga.titulo,
                    descricao: vaga.descricao,
                }),
            });
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            
            // Redirecionar para /vagas_recrutador com o id do recrutador no estado
            navigate('/vagas_recrutador', {
                state: { recrutadorId },
            });
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
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
                <h2 className="mb-4 text-center">Editar Vaga</h2>

                <div className="mb-4">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="vagaTitulo" className="form-label">Título da Vaga</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vagaTitulo"
                                name="titulo"
                                value={vaga.titulo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="vagaDescricao" className="form-label">Descrição</label>
                            <textarea
                                className="form-control"
                                id="vagaDescricao"
                                name="descricao"
                                rows="3"
                                value={vaga.descricao}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={salvarAlteracoes}>
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarVaga;
