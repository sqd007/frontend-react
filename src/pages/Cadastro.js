import React from 'react';
import { Link } from 'react-router-dom'; 

const Cadastro = () => {
    return (
        <div className="container text-center mt-5">
            <div className="row">

                <div className="col-12">
                    <h5 className="p-4 fw-light">Selecione como deseja iniciar</h5>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <Link to="/cadastro_candidato" className="btn btn-primary btn-lg d-block mb-3 w-100 text-light">
                            Sou Pessoa Candidata
                        </Link>
                        <Link to="/cadastro_recrutador" className="btn btn-primary btn-lg d-block mb-3 w-100 text-light">
                            Sou Pessoa Recrutadora
                        </Link>
                        <Link to="/login">Já tenho cadastro</Link>
                    </div>
                    <p className="mt-5 mb-3 text-muted">© 2023-2023</p>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
