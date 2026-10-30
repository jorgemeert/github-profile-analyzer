# GitHub Profile Analyzer

Aplicação web para explorar informações públicas de perfis do GitHub. Digite um nome de usuário e veja um resumo do perfil, estatísticas e os repositórios atualizados mais recentemente.

🔗 **Acesse a aplicação:** [github-profile-analyzer-gtb5.vercel.app](https://github-profile-analyzer-gtb5.vercel.app/)

📦 **Repositório:** [github.com/jorgemeert/github-profile-analyzer](https://github.com/jorgemeert/github-profile-analyzer)

## Funcionalidades

- Consulta informações de um perfil público do GitHub.
- Exibe avatar, nome, biografia e localização quando disponíveis.
- Apresenta total de repositórios públicos, seguidores e estrelas.
- Conta as linguagens utilizadas nos repositórios e indica a mais frequente.
- Mostra os cinco repositórios atualizados mais recentemente, com links para abri-los no GitHub.

## Tecnologias

- **Front-end:** HTML, CSS e JavaScript.
- **Back-end:** Python.
- **Dados:** API REST do GitHub.

## Como funciona

O navegador envia o nome de usuário para o back-end em Python. O back-end consulta a API do GitHub e devolve os dados do perfil e dos repositórios em JSON. O JavaScript organiza essas informações e atualiza os elementos da página.

## Executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/jorgemeert/github-profile-analyzer.git
   cd github-profile-analyzer
   ```

2. Instale as dependências de Python listadas pelo projeto, se houver um arquivo `requirements.txt`.

3. Inicie o back-end usando o comando definido no projeto. A página espera que a API esteja disponível em:

   ```text
   http://127.0.0.1:5001/buscaUsuario?usuario=NOME_DO_USUARIO
   ```

4. Sirva os arquivos do front-end localmente e abra a página no navegador.

> O endereço usado pelo front-end deve apontar para o endereço em que o back-end está rodando. Se você alterar host ou porta, atualize a URL do `fetch` no JavaScript.

## Exemplo de uso

Digite um nome de usuário do GitHub no campo de busca e clique em **Analisar**. A aplicação consulta os dados públicos disponíveis e apresenta os resultados na página.

## Melhorias futuras

- Adicionar mensagens visuais para usuário inexistente ou falha na API.
- Permitir ordenar os repositórios por atualização, estrelas ou nome.
- Exibir mais detalhes de cada repositório, como descrição e linguagem.
- Melhorar a acessibilidade e adicionar testes para os cálculos das estatísticas.

## Autor

**Jorge Meert**

- [GitHub](https://github.com/jorgemeert)
- [LinkedIn](https://www.linkedin.com/in/jorge-meert/)
