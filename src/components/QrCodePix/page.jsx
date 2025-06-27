'use client';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import './PagamentoPix.css';


export default function PagamentoPix({ Pix_code, value }) {
  const [pixCode, setPixCode] = useState(Pix_code);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [valor, setValor] = useState(`R$ ${parseFloat(value).toFixed(2)}`);

  useEffect(() => {
    // Gera QR Code assim que Pix_code estiver disponível
    if (Pix_code) {
      QRCode.toDataURL(Pix_code)
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('Erro ao gerar QR Code:', err));
    }
  }, [Pix_code]);

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
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code Pix" className="qrcode-img" />
          ) : (
            <p>Gerando QR Code...</p>
          )}
        </div>

        <div className="codigo-container">
          <label htmlFor="pixCode">Código Pix (copia e cola):</label>
          <textarea
            id="pixCode"
            readOnly
            value={pixCode}
            rows={4}
            className="pix-textarea"
          />
          <button className="btn-copiar" onClick={copiarCodigo}>Copiar código</button>
        </div>
      </div>
    </div>
  );
}
