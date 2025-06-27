"use server";


interface dadosForm {
  cardholderName: string;
  paymentMethodId: string;
  identificationType: string;
  identificationNumber: string;
  token: string;
  token_AUTH: string; // token de autenticação
  issuerId: string;
  installments: number;
  uuid_plan:string
}

export default async function enviarCartao(formData: dadosForm) {
  console.log("Dados do formulário enviados:", formData);
  const resposta = await fetch(
    `${process.env.URL_API_SECRET}/dash/pagamento/cartao`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": `${process.env.API_KEY_SECRET}`, // aqui vc vai passar a chave da api
        authorization: `Bearer ${formData.token_AUTH}`, // aqui vc vai passar o token de autenticacao
      },
      body: JSON.stringify({
        nome_completo: formData.cardholderName,
        nomeBandeira: formData.paymentMethodId, // tipo da bandeira, master visa etc
        documentoTipo: formData.identificationType,
        documentoNumero: formData.identificationNumber,
        token_Pag: formData.token,
        bandeiraID: formData.issuerId, // se necessário // identificador da bandeira do cartão
        parcelas: formData.installments, // numero de parcelas
        planoEscolhido: formData.uuid_plan, // aqui vc vai passar o plano escolhido
      }),
    }
  ); 
  return resposta.json();
}
