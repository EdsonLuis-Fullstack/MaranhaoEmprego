'use client'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import './style_cartao.css';
import enviarCartao from '@/components/services/payment/sendcardPayment';

export default function PaymentForm() {
  const [mpLoaded, setMpLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');  // 'credit' ou 'debit'
  // Estado para armazenar o valor do pagamento (não exibido na interface)
  const [amount, setAmount] = useState('100.00');

  useEffect(() => {
    if (mpLoaded && window.MercadoPago) {
      try {
        const mp = new window.MercadoPago('TEST-0c82a5f0-f1de-47ca-9020-8324dd0120b2');

        // Inicializando o cardForm depois que o SDK for carregado
        const cardForm = mp.cardForm({
          amount: amount, // Campo obrigatório para o SDK, mesmo que não queiramos exibi-lo
          autoMount: true,
          paymentMethod: {
            id: paymentMethod,  // 'credit' ou 'debit'
          },
          form: {
            id: "form-checkout",
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Nome no cartão",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: "Email",
            },
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Número do cartão",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "CVV",
            },
            identificationType: {
              id: "form-checkout__identificationType",
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: "Documento",
            },
            // A propriedade issuer e installments são necessárias para o SDK
            // mesmo que não sejam exibidas na interface
            issuer: {
              id: "form-checkout__issuer-hidden",
              hidden: true
            },
            installments: {
              id: "form-checkout__installments-hidden",
              hidden: true
            },
          },
        callbacks: {
          onFormMounted: () => {
            console.log('Formulário montado com sucesso');
          },
          onSubmit: (event) => {
            event.preventDefault();
            try {
              const cardData = cardForm.getCardFormData();
              console.log("Dados do cartão/token:", cardData);
              // Adiciona o valor ao objeto de dados do cartão
              const paymentData = {
                ...cardData,
                amount: amount
              };
              enviarCartao(paymentData); // Enviando os dados do cartão para o servidor
            } catch (error) {
              console.error("Erro ao processar pagamento:", error);
              alert("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.");
            }
          },
          onFetching: (resource) => {
            console.log(`Buscando recurso: ${resource}`);
          },
          onError: (error) => {
            console.error("Erro no formulário:", error);
          }
        }
      });
      } catch (error) {
        console.error("Erro ao inicializar o MercadoPago:", error);
      }
    }
  }, [mpLoaded, paymentMethod, amount]);
  
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);  // Mudar entre 'credit' e 'debit'
  };

  return (
    <>
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => {
          // Usando .then() após o SDK ser carregado
          new Promise((resolve) => {
            resolve();
          }).then(() => {
            setMpLoaded(true);  // Configurando o estado de carregamento do SDK
          });
        }}
      />

      <form id="form-checkout" className="form-checkout">
        <h2>Informações de Pagamento</h2>

        <div className="form-group">
          <label htmlFor="form-checkout__cardholderName">Nome no cartão</label>
          <input id="form-checkout__cardholderName" />
        </div>

        <div className="form-group">
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
          <select id="form-checkout__identificationType"></select>
        </div>

        <div className="form-group">
          <label htmlFor="form-checkout__identificationNumber">Número do documento</label>
          <input id="form-checkout__identificationNumber" />
        </div>
        
        <div className="payment-method-group">
          <label>Tipo de cartão:</label>
          <select onChange={handlePaymentMethodChange} value={paymentMethod}>
            <option value="credit">Crédito</option>
            <option value="debit">Débito</option>
          </select>
        </div>
        
        {/* Campos ocultos necessários para o SDK */}
        <div style={{ display: 'none' }}>
          <select id="form-checkout__issuer-hidden"></select>
          <select id="form-checkout__installments-hidden"></select>
        </div>
        
        <button type="submit" className="btn-submit">Pagar</button>
      </form>
    </>
  );
}