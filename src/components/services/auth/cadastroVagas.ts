'use server'

import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function cadastroVagas(formData: any) {
        // Transform form data to match backend expected structure
        const payload = {
            titulo: formData.titulo,
            categoria: formData.categoria,
            cidade: formData.cidade,
            vagas: formData.vagas,
            contato: formData.whatsapp, // Frontend uses "whatsapp", backend expects "contato"
            email: formData.email,
            nome_Empresa: formData.nome_Empresa || null, // Handle optional field
            sobre: formData.sobre || null, // Handle optional field
            requisitos: formData.requisitos,
            atividades: formData.atividades || null,
            beneficios: formData.beneficios || null,
            tipo: formData.tipo,
            'tipoSalario': formData['tipoSalario'],
            // Handle salary based on type
            salario: formData['tipo-salario'] === 'valor' ? formData['valor-salario'] : 'A combinar',
            // Add missing fields that backend expects with default values
            horarios: 'Horário comercial', // This field is required in backend but missing in frontend
        };

        console.log('Processed payload:', payload);

        // Get the auth token from cookies
        const cookieStore = await cookies();
        const authToken = cookieStore.get('authToken')?.value;

        if (!authToken) {
            throw new Error('Token de autenticação não encontrado nos cookies');
        }

        // Make API request to backend
        const response = await fetch('http://127.0.0.1:8080/accessv4/dash/vagas/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${process.env.API_KEY_SECRET}`,
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload),
            credentials: 'include', // Include cookies for authentication
        });

        return await response.json();

}

export default cadastroVagas;