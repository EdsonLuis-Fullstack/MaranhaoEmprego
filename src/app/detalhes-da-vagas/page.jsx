import './Detalhe.css'
import  Link  from "next/link";

export default function Detalhe(){
    return(
        <section className='Detalhe'>
            <div className='DetalheVaga'>
                <h3 id='TituloDetalhes'>Auxiliar de Almoxarifado | Teresina – PI | 01 vaga(s)</h3>
                <h4 id='Requistos'>Requistos</h4>
                <p id='DetalheRequistos'>
                         - Trabalhar em Teresina
                         - Trabalhar em Teresina
                         - Trabalhar em Teresina
                </p>
                <h4 id='Atividades'>Atividades</h4>
                <p id='DetalheAtividades'>
                     - Receber, conferir e armazenar materiais; Controlar entradas e saídas de mercadorias; Realizar inventários e manter o estoque organizado; Auxiliar no abastecimento interno da empresa; Manter o local limpo e organizad; Dentre outras atividades inerentes a função.
                </p>
                <h4 id='Salario'>Salario</h4>
                <p id='DetalheSalario'>R$ 5.000,00</p>
                <h4 id='Beneficios'>Beneficios</h4>
                <p id='DetalheBeneficios'>
                   - Auxílio Combustível + Vale alimentação.
                </p>
                <h4 id='Horarios'>Horários</h4>
                <p id='DetalheHorarios'>- Comercial de segunda a sábado.</p>
                <h4 id='Observacoes'>Observações</h4>
                <p id='DetalheObservacoes'>– Vínculo CLT; Bairro Piçarrra.</p>
                <h4 id='TotalVagas'>Total de vagas</h4>
                <p id='DetalheVagas'>- 01 vaga(s)</p>
                <h4 id='Contato'>Contato</h4>
                <p id='DetalheContato'>
                    <strong>WhatsApp, <Link href='https://wa.me/5599999999999'>Link</Link></strong><br></br>
                    <strong>Instagram, <Link href='https://wa.me/5599999999999'>Link</Link></strong><br></br>
                    <strong>Email, <Link href='https://wa.me/5599999999999'>Link</Link></strong><br></br>
                </p>
            </div>
            <div className='SideBar'>
                <h1>Detalhes</h1>
            </div>
        </section>
    )
}