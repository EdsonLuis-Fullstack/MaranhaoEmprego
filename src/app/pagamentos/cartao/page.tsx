'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import './style_cartao.css';
import enviarCartao from '@/components/services/payment/sendcardPayment';

export default function PaymentForm() {
  const [mpLoaded, setMpLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [selectedTab, setSelectedTab] = useState<'cartao' | 'pix'>('cartao');
  const [amount] = useState('100.00'); // Preço fixo por enquanto

  useEffect(() => {
    if (selectedTab === 'cartao' && mpLoaded && window.MercadoPago) {
      try {
        const mp = new window.MercadoPago('TEST-0c82a5f0-f1de-47ca-9020-8324dd0120b2');

        mp.cardForm({
          amount,
          autoMount: true,
          paymentMethod: { id: paymentMethod },
          form: {
            id: 'form-checkout',
            cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Nome no cartão' },
            cardholderEmail: { id: 'form-checkout__cardholderEmail', hidden: true },
            cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número do cartão' },
            expirationDate: { id: 'form-checkout__expirationDate', placeholder: 'MM/YY' },
            securityCode: { id: 'form-checkout__securityCode', placeholder: 'CVV' },
            identificationType: { id: 'form-checkout__identificationType' },
            identificationNumber: { id: 'form-checkout__identificationNumber', placeholder: 'Documento' },
            issuer: { id: 'form-checkout__issuer-hidden', hidden: true },
            installments: { id: 'form-checkout__installments-hidden', hidden: true },
          },
          callbacks: {
            onFormMounted: () => console.log('Formulário montado com sucesso'),
            onSubmit: (event) => {
              event.preventDefault();
              try {
                const cardData = mp.cardForm().getCardFormData();
                console.log('Dados do cartão/token:', cardData);
                enviarCartao(cardData);
              } catch (error) {
                console.error('Erro ao processar pagamento:', error);
                alert('Erro no pagamento. Tente novamente.');
              }
            },
            onFetching: (resource) => console.log(`Buscando recurso: ${resource}`),
            onError: (error) => console.error('Erro no formulário:', error),
          },
        });
      } catch (error) {
        console.error('Erro ao inicializar MercadoPago:', error);
      }
    }
  }, [mpLoaded, paymentMethod, amount, selectedTab]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="conteinerPay">
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpLoaded(true)}
      />

      {/* Abas */}
      <div className="tabs">
        <button
          className={`tab-btn ${selectedTab === 'cartao' ? 'active' : ''}`}
          onClick={() => setSelectedTab('cartao')}
        >
          Cartão
        </button>
        <button
          className={`tab-btn ${selectedTab === 'pix' ? 'active' : ''}`}
          onClick={() => setSelectedTab('pix')}
        >
          Pix
        </button>
      </div>

      {/* Formulário de Cartão */}
      {selectedTab === 'cartao' && (
        <form id="form-checkout" className="form-checkout">
          <h2>Cartão</h2>
          <div className="Preço">Preço do plano: <span className="PrecoPlano">R$ {amount}</span></div>

          <div className="form-group">
            <label htmlFor="form-checkout__cardholderName">Nome no cartão</label>
            <input id="form-checkout__cardholderName" />
          </div>

          <div style={{ display: 'none' }} className="form-group">
            <label htmlFor="form-checkout__cardholderEmail">Email</label>
            <input id="form-checkout__cardholderEmail" type="email" />
          </div>

          <div className="form-group">
            <label htmlFor="form-checkout__cardNumber">Número do cartão</label>
            <input id="form-checkout__cardNumber" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="form-checkout__securityCode">CVV</label>
              <input id="form-checkout__securityCode" />
            </div>
            <div className="form-group">
              <label htmlFor="form-checkout__expirationDate">Validade</label>
              <input id="form-checkout__expirationDate" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="form-checkout__identificationType">Tipo de documento</label>
            <select id="form-checkout__identificationType" />
          </div>

          <div className="form-group">
            <label htmlFor="form-checkout__identificationNumber">Número do documento</label>
            <input id="form-checkout__identificationNumber" />
          </div>

          <div className="payment-method-group">
            <label>Tipo de cartão:</label>
            <select onChange={handlePaymentMethodChange} value={paymentMethod} className="payment-method">
              <option value="credit">Crédito</option>
              <option value="debit">Débito</option>
            </select>
          </div>

          {/* Campos ocultos para o SDK */}
          <div style={{ display: 'none' }}>
            <select id="form-checkout__issuer-hidden"></select>
            <select id="form-checkout__installments-hidden"></select>
          </div>

          <button type="submit" className="btn-submit">Pagar</button>
        </form>
      )}

      {/* Formulário de Pix */}
      {selectedTab === 'pix' && (
        <form className="form-pix" onSubmit={(e) => {
          
          e.preventDefault();
          const nome = e.target.nome.value;
          const email = e.target.email.value;
          console.log('Pix enviado:', { nome, email });
          alert('Solicitação de pagamento via Pix enviada!');
        }}>
          <h2>Pagamento via Pix</h2>
          <div className="Preço">Preço do plano: <span className="PrecoPlano">R$ {amount}</span></div>
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input id="nome" name="nome" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" required />
          </div>
          <button type="submit" className="btn-submit">Gerar QR Code Pix</button>
        </form>
      )}
    </div>
  );
}
