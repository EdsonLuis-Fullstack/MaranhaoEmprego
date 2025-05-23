'use client';
import React, { useState } from 'react';
import './filtro.css';

const cidadesMaranhao = [
  "Açailândia", "Alcântara", "Aldeias Altas", "Altamira do Maranhão", "Alto Alegre do Maranhão",
  "Alto Alegre do Pindaré", "Alto Parnaíba", "Amarante do Maranhão", "Anajatuba", "Anapurus",
  "Apicum-Açu", "Araguanã", "Araioses", "Arame", "Arari", "Axixá", "Bacabal", "Bacabeira", "Bacuri",
  "Bacurituba", "Balsas", "Barão de Grajaú", "Barra do Corda", "Barreirinhas", "Bela Vista do Maranhão",
  "Belágua", "Benedito Leite", "Bequimão", "Bernardo do Mearim", "Boa Vista do Gurupi", "Bom Jardim",
  "Bom Jesus das Selvas", "Bom Lugar", "Brejo", "Brejo de Areia", "Buriti", "Buriti Bravo", "Buriticupu",
  "Buritirana", "Cachoeira Grande", "Cajapió", "Cajari", "Campestre do Maranhão", "Cândido Mendes",
  "Cantanhede", "Capinzal do Norte", "Carolina", "Carutapera", "Caxias", "Cedral", "Central do Maranhão",
  "Centro do Guilherme", "Centro Novo do Maranhão", "Chapadinha", "Cidelândia", "Codó", "Coelho Neto",
  "Colinas", "Conceição do Lago-Açu", "Coroatá", "Cururupu", "Davinópolis", "Dom Pedro", "Duque Bacelar",
  "Esperantinópolis", "Estreito", "Feira Nova do Maranhão", "Fernando Falcão", "Formosa da Serra Negra",
  "Fortaleza dos Nogueiras", "Fortuna", "Godofredo Viana", "Gonçalves Dias", "Governador Archer",
  "Governador Edson Lobão", "Governador Eugênio Barros", "Governador Luiz Rocha", "Governador Newton Bello",
  "Governador Nunes Freire", "Graça Aranha", "Grajaú", "Guimarães", "Humberto de Campos", "Icatu",
  "Igarapé do Meio", "Igarapé Grande", "Imperatriz", "Itaipava do Grajaú", "Itapecuru Mirim", "Itinga do Maranhão",
  "Jatobá", "Jenipapo dos Vieiras", "João Lisboa", "Joselândia", "Junco do Maranhão", "Lago da Pedra",
  "Lago do Junco", "Lago dos Rodrigues", "Lago Verde", "Lagoa do Mato", "Lagoa Grande do Maranhão", "Lajeado Novo",
  "Lima Campos", "Loreto", "Luís Domingues", "Magalhães de Almeida", "Maracaçumé", "Marajá do Sena", "Maranhãozinho",
  "Mata Roma", "Matinha", "Matões", "Matões do Norte", "Milagres do Maranhão", "Mirador", "Miranda do Norte", "Mirinzal",
  "Monção", "Montes Altos", "Morros", "Nina Rodrigues", "Nova Colinas", "Nova Iorque", "Nova Olinda do Maranhão",
  "Olho d'Água das Cunhãs", "Olinda Nova do Maranhão", "Paço do Lumiar", "Palmeirândia", "Paraibano", "Parnarama",
  "Passagem Franca", "Pastos Bons", "Paulino Neves", "Paulo Ramos", "Pedreiras", "Pedro do Rosário", "Penalva",
  "Peri Mirim", "Peritoró", "Pindaré-Mirim", "Pinheiro", "Pio XII", "Pirapemas", "Poção de Pedras", "Porto Franco",
  "Porto Rico do Maranhão", "Presidente Dutra", "Presidente Juscelino", "Presidente Médici", "Presidente Sarney",
  "Presidente Vargas", "Primeira Cruz", "Raposa", "Riachão", "Ribamar Fiquene", "Rosário", "Sambaíba", "Santa Filomena do Maranhão",
  "Santa Helena", "Santa Inês", "Santa Luzia", "Santa Luzia do Paruá", "Santa Quitéria do Maranhão", "Santa Rita",
  "Santana do Maranhão", "Santo Amaro do Maranhão", "Santo Antônio dos Lopes", "São Benedito do Rio Preto",
  "São Bento", "São Bernardo", "São Domingos do Azeitão", "São Domingos do Maranhão", "São Félix de Balsas",
  "São Francisco do Brejão", "São Francisco do Maranhão", "São João Batista", "São João do Carú", "São João do Paraíso",
  "São João do Soter", "São João dos Patos", "São José de Ribamar", "São José dos Basílios", "São Luís",
  "São Luís Gonzaga do Maranhão", "São Mateus do Maranhão", "São Pedro da Água Branca", "São Pedro dos Crentes",
  "São Raimundo das Mangabeiras", "São Raimundo do Doca Bezerra", "São Roberto", "São Vicente Ferrer", "Satubinha",
  "Senador Alexandre Costa", "Senador La Rocque", "Serrano do Maranhão", "Sítio Novo", "Sucupira do Norte",
  "Sucupira do Riachão", "Tasso Fragoso", "Timbiras", "Timon", "Trizidela do Vale", "Tufilândia", "Tuntum",
  "Turiaçu", "Turilândia", "Tutóia", "Urbano Santos", "Vargem Grande", "Viana", "Vila Nova dos Martírios",
  "Vitória do Mearim", "Vitorino Freire", "Zé Doca"
];

export default function FiltroVagas({ onFiltrar }) {
  const [cidade, setCidade] = useState('');
  const [area, setArea] = useState('');
  const [cargo, setCargo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFiltrar({ cidade, area, cargo });
  };

  return (
    <form className="filtro-vagas" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Cargo ou profissão"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        className="filtro-input"
      />
      <select value={cidade} onChange={(e) => setCidade(e.target.value)} className="filtro-select">
        <option value="">Todas as cidades</option>
        {cidadesMaranhao.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select value={area} onChange={(e) => setArea(e.target.value)} className="filtro-select">
        <option value="">Todas as áreas</option>
        <option value="Comercial">Comercial</option>
        <option value="Tecnologia">Tecnologia</option>
        <option value="Educação">Educação</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button type="submit" className="filtro-button">Filtrar</button>
    </form>
  );
}
