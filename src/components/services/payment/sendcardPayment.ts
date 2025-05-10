'use server'

export default async function enviarCartao(formData : FormData) {
    fetch("http://127.0.0.1:8080/accessv4/pagamentos/cartao",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-api-key":"rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c=",
                "Authorization": `Bearer TOKEN`, // aqui vc vai passar o token de autenticacao
            }, 
            body: JSON.stringify({formData})
        }
    )
    console.log("Dados do cartão enviados com sucesso");
}