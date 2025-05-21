import './Detalhe.css';
import Link from "next/link";
import getUuid from "@/components/services/allJob/getUuid";


export default async function Detalhe({ params }: { params: Promise<{ uuid: string }> }) {
  const resolvedParams = await params;

  const uuid = resolvedParams.uuid;
  
  const vaga = await getUuid(uuid);



  // Retornando a estrutura HTML conforme especificado
  return (
    <section className='Detalhe'>
      <div className='DetalheVaga'>
        <h3 id='TituloDetalhes'>{vaga.titulo} | {vaga.cidade} | {vaga.vagas} vaga(s)</h3>
        
        <h4 id='Requistos'>Requistos</h4>
        <p id='DetalheRequistos'>
          - {vaga.requisitos}
        </p>
        
        <h4 id='Atividades'>Atividades</h4>
        <p id='DetalheAtividades'>
          - {vaga.atividades}
        </p>
        
        <h4 id='Salario'>Salario</h4>
        <p id='DetalheSalario'>R$ {vaga.salario}</p>
        
        <h4 id='Beneficios'>Beneficios</h4>
        <p id='DetalheBeneficios'>
          - {vaga.beneficios || 'Não informado'}
        </p>
        
        <h4 id='Horarios'>Horários</h4>
        <p id='DetalheHorarios'>- {vaga.horarios}</p>
        <h4 id='TotalVagas'>Localização</h4>
        <p id='DetalheVagas'>- Cidade : {vaga.cidade} </p>
        <p id='DetalheVagas'>- {vaga.endereco} </p>
        <p id='DetalheVagas'>- Bairro : {vaga.bairro} </p>
        
        
        <h4 id='Observacoes'>Observações</h4>
        <p id='DetalheObservacoes'>– {vaga.tipo} | {vaga.endereco || 'Não informado'}</p>
        
        <h4 id='TotalVagas'>Total de vagas</h4>
        <p id='DetalheVagas'>- {vaga.vagas} vaga(s)</p>
        
        <h4 id='Contato'>Contato</h4>
        <p id='DetalheContato'>
          <strong>WhatsApp: <Link href={`https://wa.me/55${vaga.contato?.replace(/\D/g, '')}`}>Link</Link></strong><br />
          <strong>Rede Social: <Link href={vaga.rede_social || '#'}>Link</Link></strong><br />
          <strong>Email: <Link href={`mailto:${vaga.email}`}>{vaga.email}</Link></strong><br />
        </p>
      </div>
    </section>
  );
}