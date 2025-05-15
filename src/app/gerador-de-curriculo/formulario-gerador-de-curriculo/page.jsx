"use client";
import React, { useState } from "react";
import './Form.css'
export default function FormGerador(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [curso, setCurso] = useState('');
    const [instituicao, setInstituicao] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [cargo, setCargo] = useState('');
    const [periodoExp, setPeriodoExp] = useState('');
    const [atividades, setAtividades] = useState('');
    const [habilidade, setHabilidade] = useState('');
    const [certificacao, setCertificacao] = useState('');
    const [instituicaoCert, setInstituicaoCert] = useState('');
    const [ano, setAno] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [outrasRedes, setOutrasRedes] = useState('');
    return(
        <section className='FormGerador'>
            <div className='formularioForm'>
                <h1 className='tituloForm'>Preencha suas informações</h1>
                <div className="form">
            
                <form className="formulario">
                    <h3 className='subtituloForm'>Informações Pessoais</h3>
                    <label className="label-nome">Nome completo*</label>
                    <input type="text" className="input-nome" placeholder="Seu nome completo" onChange={(e) => setNome(e.target.value)} />

                    <label className="label-email">E-mail*</label>
                    <input type="email" className="input-email" placeholder="seuemail@exemplo.com" onChange={(e) => setEmail(e.target.value)} />

                    <label className="label-telefone">Telefone*</label>
                    <input type="tel" className="input-telefone" placeholder="(99) 99999-9999" onChange={(e) => setTelefone(e.target.value)} />

                    <label className="label-endereco">Endereço</label>
                    <input type="text" className="input-endereco" placeholder="Seu endereço" onChange={(e) => setEndereco(e.target.value)} />
                </form>

                <form className="formulario02">
                    <h3 className='subtituloForm'>Objetivo Profissional</h3>
                    <textarea className="input-objetivo" placeholder="Descreva seu objetivo profissional" onChange={(e) => setObjetivo(e.target.value)}></textarea>
                </form>

                <form className="formulario03">
                    <h3 className='subtituloForm'>Formação Acadêmica</h3>
                    <label className="label-curso">Curso*</label>
                    <input type="text" className="input-curso" placeholder="Nome do curso" onChange={(e) => setCurso(e.target.value)} />

                    <label className="label-instituicao">Instituição*</label>
                    <input type="text" className="input-instituicao" placeholder="Nome da instituição" onChange={(e) => setInstituicao(e.target.value)} />

                    <label className="label-periodo">Período*</label>
                    <input type="text" className="input-periodo" placeholder="Ex: 2018 - 2022" onChange={(e) => setPeriodo(e.target.value)} />
                </form>

                <form className="formulario04">
                    <h3 className='subtituloForm'>Experiências Profissionais</h3>
                    <label className="label-empresa">Empresa*</label>
                    <input type="text" className="input-empresa" placeholder="Nome da empresa" onChange={(e) => setEmpresa(e.target.value)} />

                    <label className="label-cargo">Cargo*</label>
                    <input type="text" className="input-cargo" placeholder="Cargo ocupado" onChange={(e) => setCargo(e.target.value)} />

                    <label className="label-periodo-exp">Período*</label>
                    <input type="text" className="input-periodo-exp" placeholder="Ex: Jan 2020 - Presente" onChange={(e) => setPeriodoExp(e.target.value)} />

                    <label className="label-atividades">Atividades</label>
                    <textarea className="input-atividades" placeholder="Descreva suas atividades" onChange={(e) => setAtividades(e.target.value)}></textarea>
                </form>

                <form className="formulario05">
                    <h3 className='subtituloForm'>Habilidades</h3>
                    <input type="text" className="input-habilidade" placeholder="Ex: Trabalho em equipe" onChange={(e) => setHabilidade(e.target.value)} />
                </form>

                <form className="formulario06">
                    <h3 className='subtituloForm'>Cursos e Certificações</h3>
                    <label className="label-certificacao">Curso/Certificação</label>
                    <input type="text" className="input-certificacao" placeholder="Nome do curso ou certificação" onChange={(e) => setCertificacao(e.target.value)} />

                    <label className="label-instituicao-cert">Instituição</label>
                    <input type="text" className="input-instituicao-cert" placeholder="Nome da instituição" onChange={(e) => setInstituicaoCert(e.target.value)} />

                    <label className="label-ano">Ano</label>
                    <input type="text" className="input-ano" placeholder="Ano de conclusão" onChange={(e) => setAno(e.target.value)} />
                </form>

                <form className="formulario07">
                    <h3 className='subtituloForm'>Redes Sociais Profissionais</h3>
                    <label className="label-linkedin">LinkedIn</label>
                    <input type="url" className="input-linkedin" placeholder="URL do seu perfil" onChange={(e) => setLinkedin(e.target.value)} />

                    <label className="label-github">GitHub (se aplicável)</label>
                    <input type="url" className="input-github" placeholder="URL do seu perfil" onChange={(e) => setGithub(e.target.value)} />

                    <label className="label-outras-redes">Outras redes</label>
                    <input type="url" className="input-outras-redes" placeholder="URL da rede social" onChange={(e) => setOutrasRedes(e.target.value)} />
                </form>

            
            </div>
            <button type="submit" className="btn-proximo">Proximo: Escolher Modelo</button>
            </div>            
            <div className='FormPreview'>
            <h1 className='tituloPreview'>Pré-visualização do currículo</h1>
            <div className="preview">
            <h2>{nome || "Nome Completo"}</h2>
                    <p>{email || "E-mail"}</p>
                    <p>{telefone || "Telefone"}</p>
                    <p>{endereco || "Endereço"}</p>
                    <p>{objetivo || "Objetivo Profissional"}</p>
                    <p>{curso || "Curso"}</p>
                    <p>{instituicao || "instituição"}</p>
                    <p>{periodo|| "Período"}</p>
                    <p>{empresa|| "Empresa"}</p>
                    <p>{cargo || "Cargo"}</p>
                    <p>{periodoExp || "Período de Experiência"}</p>
                    <p>{atividades || "Atividades"}</p>
                    <p>{habilidade || "Habilidade"}</p>
                    <p>{certificacao|| "Certificação"}</p>
                    <p>{instituicaoCert|| "Instituição"}</p>
                    <p>{ano|| "Ano"}</p>
                    <p>{linkedin|| "LinkedIn"}</p>
                    <p>{github|| "GitHub"}</p>
                    <p>{outrasRedes|| "Outras Redes"}</p>
            </div>
            </div>
        </section>
    )
}