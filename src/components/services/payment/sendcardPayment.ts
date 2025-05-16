'use server'

export default async function enviarCartao(formData : any) {

    
    fetch("http://127.0.0.1:8080/accessv4/pagamentos/cartao",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-api-key":"rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c=",
                "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTljYmZiZDMtYjVlNi00MjI5LTk0NzktMjM5ODA1NWNlZjViIiwiaWF0IjoxNzQ2OTcxNzcxLCJleHAiOjE3NDY5ODYxNzF9.4bPBRxmlKf4KnlPz179ELfJxW-TGrWX9QljBCYwa4yE`, // aqui vc vai passar o token de autenticacao
            }, 
            body: JSON.stringify({
                nome: formData.cardholderName,
                tipo:formData.paymentMethodId, // tipo da bandeira, master visa etc
                documentoTipo: formData.identificationType,
                documentoNumero: formData.identificationNumber,
                token_Pag : formData.token,
                tipoId: formData.issuerId, // se necessário // identificador da bandeira do cartão
                installments: formData.installments, // numero de parcelas 
                planoEscolhido: "" // aqui vc vai passar o plano escolhido
        }
    )})
    console.log("Dados do cartão enviados com sucesso");
}