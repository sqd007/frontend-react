
import React from 'react';
const Home = () => {
  return (
    <div className="Home">
      <div className="container-fluid p-5" style={{ backgroundColor: '#55D0C2' }}>
        <div className="row p-2">
          <div className="col-sm d-flex justify-content-center align-items-center flex-column text-white">
            <h2>#MatchWork: a ponte entre você e as melhores oportunidades</h2>
            <p className="">Match Work é a plataforma dedicada a transformar o cenário de empregabilidade para pessoas em
              situação de baixa renda. Nós conectamos você a vagas que se alinham às suas habilidades e
              experiências. Junte-se a nós e dê o primeiro passo em direção ao seu futuro profissional!</p>
          </div>
          <div className="col-sm">
            <img src='/img/match.png' className="img-fluid" alt="match" />
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm">
            <h2 className="text-center justify-content-center mb-5">Quem Pode Participar?</h2>
            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      1. Requisitos para Candidatos
                    </button>
                  </h5>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      <li>Baixa renda</li>
                      <li>Inscrição ativa no Cadastro Único</li>
                      <li>Acesso à Internet</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      2. Requisitos para Recrutadores
                    </button>
                  </h5>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      <li>Nome completo da empresa ou organização.</li>
                      <li>CNPJ válido ou equivalente (para empresas internacionais).</li>
                      <li>Endereço físico e informações de contato.</li>
                      <li>Descrever as vagas disponíveis, especificando competências técnicas e comportamentais desejadas.</li>
                      <li>
                        Compromisso em fornecer feedback aos candidatos, independentemente do resultado. Disponibilidade para
                        participar de entrevistas, testes ou outras etapas do processo seletivo.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


      <div id="reviewsCarousel" className="carousel slide bg-info text-light p-5" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <img src='/img/user1.png' className="rounded-circle mb-3" alt="User 1" style={{ width: '100px' }} />
                <h5>Ana Clara, 23 anos</h5>
                <p>
                  "Sempre achei difícil encontrar um emprego que se alinhasse às minhas habilidades, especialmente sendo tão jovem e sem muita experiência. A plataforma Match Work mudou isso para mim! Em menos de um mês, consegui duas entrevistas e estou otimista sobre o meu futuro. Recomendo a todos os jovens em busca de uma oportunidade!"
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <img src='/img/user2.png' alt="User 2" className="rounded-circle mb-3" style={{ width: '100px' }} />
                <h5>Rodrigo, 20 anos</h5>
                <p>
                  "O que mais me impressionou na Match Work foi a facilidade de uso. O processo de cadastro foi simples, e em pouco tempo, já estava vendo vagas que realmente combinavam com o que eu procurava. Agradeço à equipe por criar algo tão útil para nós, jovens em busca do primeiro emprego." Estou muito grato à todos!
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <img src='/img/user3.png' alt="User 3" className="rounded-circle mb-3" style={{ width: '100px' }} />
                <h5>Lívia, 24 anos</h5>
                <p>
                  "Eu estava quase desistindo de procurar emprego quando um amigo me recomendou a Match Work. Decidi tentar e fiquei surpresa com os resultados. A plataforma não só me conectou a recrutadores que valorizavam minhas habilidades, mas também me deu dicas valiosas para as entrevistas. Hoje, estou empregada e grata por ter encontrado esta plataforma!"
                </p>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#reviewsCarousel" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </a>
        <a className="carousel-control-next" href="#reviewsCarousel" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Próximo</span>
        </a>
      </div>

    </div>

  );
}


export default Home;