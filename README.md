
# 🛒 API Sou Afiliado Services

API criada para ajudar afiliados a compartilhar seus links de forma mais atrativa e profissional. Ela permite que um afiliado envie um link de produto (como do Mercado Livre, Amazon, etc.), e a API retorna informações úteis sobre o produto, incluindo uma descrição amigável gerada com ajuda de Inteligência Artificial (IA).

---

## 🚀 Objetivo

Facilitar a vida de quem trabalha com marketing de afiliados, permitindo transformar links longos e feios em descrições profissionais e compartilháveis, especialmente em plataformas como WhatsApp, redes sociais, e e-mail marketing.

---

## 🔧 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Axios
- OpenAI API (para geração de textos via IA)
- dotenv

---

## ✨ Funcionalidades

- ✅ Recebe um link de afiliado
- ✅ Extrai dados do produto via scraping ou API externa (ex: Mercado Livre)
- ✅ Envia as informações para uma IA gerar uma descrição atrativa
- ✅ Retorna o link com título, descrição e outras informações úteis

---

## 📦 Como usar

### 1. Clone o repositório
```powershell
git clone https://github.com/miguelhp373/api-sou-afiliado-services.git
cd api-sou-afiliado-services
```

### 2. Instale as dependências
```powershell
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (baseado no `.env.example`):

```env
# Chave da OpenAI para geração de descrições
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Segredo usado para autenticação via JWT
JWT_SECRET="sua_chave_secreta_super_segura"

```
### 4. Execute o servidor
```powershell
npm run dev
```

---

## 📨 Exemplo de Requisição

### `POST /api/mercado-livre/product-data`

Envia um link encurtado ou direto de afiliado do Mercado Livre e recebe informações detalhadas do produto com uma descrição gerada por IA.

#### 🔗 URL: http://localhost:3000/api/mercado-livre/product-data


#### 📥 Corpo da requisição:
```json
{
  "url": "https://mercadolivre.com/sec/2ae5S86"
}
```

#### 📥 Resposta:
```json
{
  "title": "Calça Skinny Preta Masculina Jeans Com Elastano Lycra 2023",
  "price": "R$59.00",
  "currency": "BRL",
  "productLink": "https://produto.mercadolivre.com.br/MLB-3365565438-calca-skinny-preta-masculina-jeans-com-elastano-lycra-2023-_JM#polycard_client=mshops-appearance-api&type=item&tracking_id=4e4d44a3-4339-458f-a415-b59340e54cc3&source=eshops",
  "originalLink": "https://mercadolivre.com/sec/2ae5S86",
  "summary": "👖🔥 Calça Skinny Preta Masculina com Elastano Lycra 2023! ✨ Ajuste perfeito e moderno para homens ousados! De R$59 por R$49 + Envio Grátis! 😱🔝 Garanta já a sua: https://mercadolivre.com/sec/2ae5S86 🛒👨‍💼"
}
```

### Retorno para o FrontEnd:
- 👖🔥 Calça Skinny Preta Masculina com Elastano Lycra 2023! ✨ Ajuste perfeito e moderno para homens ousados! De R$59 por R$49 + Envio Grátis! 😱🔝 Garanta já a sua: https://mercadolivre.com/sec/2ae5S86 🛒👨‍💼
---

## 📁 Estrutura do Projeto

```
/
├─ src/
│  ├─ controllers/
│  ├─ services/
│  ├─ utils/
│  └─ index.ts
├─ .env.example
├─ tsconfig.json
└─ package.json
```

---

## 🛑 Status do Projeto

🚧 **Pausado**: o desenvolvimento da API foi interrompido temporariamente, mas o repositório está disponível para consulta ou retomada futura.

---

## 📫 Contato

**Miguel Henrique Pereira**  
[GitHub](https://github.com/miguelhp373) • [LinkedIn]([https://www.linkedin.com/in/seu-perfil](https://www.linkedin.com/in/miguel-henrique-pereira-b466921b0/))

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
