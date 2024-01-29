import React from 'react';
import './Contato.css'; 

const Contato = () => {
  return (
    <div className="Contato">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center flex-column p-3">
          <section className="mb-4">
              <h2 className="h1-responsive font-weight-bold text-center my-4">Fale Conosco</h2>
              <p className="text-center mx-auto mb-5">
                Estamos aqui para ajudar! Use o formulário abaixo para nos enviar uma mensagem e nossa equipe entrará em
                contato em breve.
              </p>
              <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                <div className="md-form mb-0">
                  <input type="text" id="name" name="name" className="form-control mb-3" placeholder="Digite seu nome" />
                </div>
                <div className="md-form mb-0">
                  <input type="text" id="email" name="email" className="form-control mb-3" placeholder="Digite seu e-mail" />
                </div>
                <div className="md-form mb-0">
                  <input type="text" id="subject" name="subject" className="form-control mb-3" placeholder="Digite o assunto" />
                </div>
                <div className="md-form">
                  <textarea id="message" name="message" rows="2" className="form-control md-textarea" placeholder="Digite sua mensagem"></textarea>
                </div>
                <div className="text-center mt-4 mb-2">
                  <button className="btn btn-primary text-light">Enviar mensagem</button>
                </div>
              </form>
            </section>
          </div>
          <div className="col-md-6 image-container mt-5">
            <img src='/img/contato.jpeg' className='w-75' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contato;
