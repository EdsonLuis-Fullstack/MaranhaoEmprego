export default async function enviarCartao(formData : any) {

    console.log("Dados do formulário enviados:", formData);
    const resposta = await fetch("http://127.0.0.1:8080/accessv4/dash/pagamento/cartao",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-api-key":"rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c=",
                "authorization": `Bearer ${formData.tokenAuth}`, // aqui vc vai passar o token de autenticacao
            }, 
            body: JSON.stringify({
                nome_completo: formData.cardholderName,
                nomeBandeira:formData.paymentMethodId, // tipo da bandeira, master visa etc
                documentoTipo: formData.identificationType,
                documentoNumero: formData.identificationNumber,
                token_Pag : formData.token,
                bandeiraID: formData.issuerId, // se necessário // identificador da bandeira do cartão
                parcelas: formData.installments, // numero de parcelas 
                planoEscolhido: "" // aqui vc vai passar o plano escolhido
        }
    )})
    return resposta.json();
}