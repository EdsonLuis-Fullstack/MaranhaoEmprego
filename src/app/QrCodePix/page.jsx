'use client'
import { useEffect, useState } from 'react';
import './PagamentoPix.css';

export default function PagamentoPix() {
  const [pixCode, setPixCode] = useState('00020126580014br.gov.bcb.pix0136email@seudominio.com.br...');
  const [qrCodeUrl, setQrCodeUrl] = useState('/img/qrcode-exemplo.png'); // Substituir com URL gerada
  const [valor, setValor] = useState('R$ 10,00'); // Substituir com valor dinâmico

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      alert('Código Pix copiado com sucesso!');
    } catch (err) {
      alert('Erro ao copiar o código.');
    }
  };

  return (
    <div className="pagina-pix">
      <div className="pix-box">
        <h2 className="titulo">Pagamento via Pix</h2>
        <p className="descricao">Valor a pagar: <strong>{valor}</strong></p>

        <div className="qrcode-container">
          <img src={qrCodeUrl} alt="QR Code Pix" className="qrcode-img" />
        </div>

        <div className="codigo-container">
          <label htmlFor="pixCode">Código Pix (copia e cola):</label>
          <textarea
            id="pixCode"
            readOnly
            value={pixCode}
            rows="4"
            className="pix-textarea"
          />
          <button className="btn-copiar" onClick={copiarCodigo}>Copiar código</button>
        </div>
      </div>
    </div>
  );
}
