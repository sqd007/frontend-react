import React from 'react';

const Footer = () => {
  return ( 
    <div>
      <footer className="bg-dark text-white">
        <div className="container p-4">
          <div className="row">
            <div className="col-md-4">
              <h5>Saiba mais</h5>
              <p>Sobre nós</p>
              <p>Squad 007</p>
            </div>
            <div className="col-md-4">
              <h5>Contato</h5>
              <p>e-mail: contato@matchwork.com</p>
              <p>telefone: (21)3333-3333</p>
            </div>
            <div className="col-md-4">
              <h5>Parceria</h5>
              <img src="/img/recode.jpeg" alt="recode" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
