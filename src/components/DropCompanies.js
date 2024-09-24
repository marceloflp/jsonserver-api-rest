import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"

const DropCompanies = ({ companiesId, handleValue }) => {
	const [companies, setCompanies] = useState(null) // State para armazenar a lista de empresas
	const [company, setCompany] = useState(companiesId) // State para armazenar a empresa selecionada

	const url = "http://localhost:5000/companies" // URL da API para obter a lista de empresas
	const api = httpHelper()

	useEffect(() => {
		api
			.get(url)
			.then(res => {
				setCompanies([{ id: 0, name: "Select Company" }, ...res]) // Adiciona uma opção padrão "Select Company" à lista de empresas
			})
			.catch(err => console.log(err))
	}, [])

	// Se a lista de empresas ainda não foi carregada, retorna null
	if (!companies) return null

	return (
		// Renderiza um elemento <select> (dropdown)
		<select
			name='companiesId' // Define o nome do campo
			value={company} // Define o valor selecionado com base no state 'company'
			// Define o evento de alteração ao selecionar uma opção
			onChange={e => { 
				// Atualiza o state 'company' com o valor selecionado
				setCompany(e.target.value)
				// Chama a função 'handleValue' passando o evento como argumento
				handleValue(e)
			}}
		>
			{/* cria uma nova a lista de empresas usando o método map*/}
			{companies.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}

// Exporta o componente DropCompanies
export default DropCompanies
