'use server'
interface dadosForm{
    nome:string;
    documento_tipo:string;
    documento_numero:string;
    token :string;
}
//    let { documentoTipo, documentoNumero,nome_completo,plano_comprado } = req.body;

export async function enviarPix(Form:dadosForm) {
    console.log("Dados do formulário enviados:", Form);
    const response = await fetch(`${process.env.URL_API_SECRET}/dash/pagamento/pix`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": `${process.env.API_KEY_SECRET}`, // aqui vc vai passar a chave da api
            authorization: `Bearer ${Form.token}`, 
        },
        body: JSON.stringify({
            nome_completo: Form.nome,
            documentoTipo: Form.documento_tipo.toUpperCase(),
            documentoNumero: Form.documento_numero,
            plano_comprado: "416f9b1c-645c-465b-9991-b7c5300d609f"
        })
    });
    return response.json();
}
