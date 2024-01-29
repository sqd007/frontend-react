import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="About">
      <section className="container-fluid back-about text-center d-flex align-items-center justify-content-center">
        <h1 className="text-light text-shadow h1-typing">Sobre a Match Work</h1>
      </section>
      <div className="container mt-5 mb-5">
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card h-100 mb-3 p-2">
              <div className="d-flex justify-content-center">
                <img src="/img/missao.png" className="img-fluid w-50" alt="Missão" />
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title">Missão</h5>
                <p className="card-text">"Conectando Sonhos e Oportunidades": Nossa missão é conectar sonhos dos jovens com oportunidades no mercado.</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 mb-3 p-2">
              <div className="d-flex justify-content-center">
                <img src="/img/processos_tecnologicos.png" className="img-fluid w-50" alt="Processos Tecnológicos" />
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title">Processos tecnológicos</h5>
                <p className="card-text">"Inovação em Seleção: Nossa plataforma oferece entrevistas online para tornar sua experiência ainda mais acessível e eficiente."</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 mb-3 p-3">
              <div className="d-flex justify-content-center">
                <img src="/img/pesquisa_insights.png" className="img-fluid w-50" alt="Pesquisa Insights" />
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title">Pesquisa Insights</h5>
                <p className="card-text">"Explorando Tendências e Entendendo a Juventude: Equipe Match Work garante excelência em Recrutamento."</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 mb-3 p-3">
              <div className="d-flex justify-content-center">
                <img src="/img/equipe_tecnica.png" className="img-fluid w-50" alt="Equipe Técnica" />
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title">Equipe técnica</h5>
                <p className="card-text">"Experiência Técnica com um toque Humano: Nossos consultores na Match Work cuidam de cada detalhe para você."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container bg-primary p-4 text-light">
  <div className="container">
    <div className="jumbotron">
      <h2 className="display-7">Conecte-se com oportunidades</h2>
      <p className="lead">Cadastre-se agora na plataforma e comece no mundo dos "matchs" do mercado de trabalho!</p>
      <Link className="btn btn-light" to={"/cadastro"}>Começar agora</Link>
    </div>
  </div>
</div>


      <div className="container marketing text-center mb-4">
        <h1 className="text-center mb-5 mt-5">Nossa equipe</h1>
        <div className="row">
          <div className="col-lg-4">
            <img src="/img/juliana.png" className="rounded-circle" width="140" height="140"
              alt="Juliana Pires" />
            <h3>Juliana Pires</h3>
            <p>Desenvolvedora Full Stack</p>
          </div>
          <div className="col-lg-4">
            <img src="/img/josiane.png" className="rounded-circle" width="140" height="140"
              alt="Josiane Martins" />
            <h3>Josiane Martins</h3>
            <p>Desenvolvedora Full Stack</p>
          </div>
          <div className="col-lg-4">
            <img src="/img/kilderys.png" className="rounded-circle" width="140" height="140"
              alt="Kilderys Abreu" />
            <h3>Kilderys Abreu</h3>
            <p>Desenvolvedor Full Stack</p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-4">
            <img src="/img/kianny.png" className="rounded-circle" width="140" height="140"
              alt="Kianny Martinez" />
            <h3>Kianny Martinez</h3>
            <p>Desenvolvedora Full Stack</p>
          </div>
          <div className="col-lg-4">
            <img src="/img/karina.png" className="rounded-circle" width="140" height="140"
              alt="Karina Santana" />
            <h3>Karina Santana</h3>
            <p>Desenvolvedora Full Stack</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
