btnBuscar = document.getElementById('buscar');

btnBuscar.addEventListener('click', () => {
  document.getElementById('mensagem').classList.remove('erro');
  document.getElementById('mensagem').hidden = true;

  nomeUsuario = document.getElementById('input-usuario').value;
  dados = {
    usuario: nomeUsuario,
  };
  fetch(`http://127.0.0.1:5001/buscaUsuario?usuario=${nomeUsuario}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('resultado').hidden = false;
      document.getElementById('perfil-foto').src = data['perfil']['avatar_url'];
      document.getElementById('perfil-nome').innerText = data['perfil']['name'];
      document.getElementById('perfil-bio').innerText = data['perfil']['bio'];
      document.getElementById('perfil-local').innerText =
        data['perfil']['location'];
      document.getElementById('num-repos').innerText =
        data['perfil']['public_repos'];
      document.getElementById('num-seguidores').innerText =
        data['perfil']['followers'];
      let contador = 0;
      let linguagens = {};
      let update = {};
      for (let i = 0; i < data['repos'].length; i++) {
        contador += parseInt(data['repos'][i]['stargazers_count'], 10);
        if (data['repos'][i]['language'] in linguagens) {
          linguagens[data['repos'][i]['language']] += 1;
        } else {
          linguagens[data['repos'][i]['language']] = 1;
        }
        update[data['repos'][i]['id']] = data['repos'][i]['updated_at'];
      }
      document.getElementById('num-estrelas').innerText = contador;
      let QntMaior = 0;
      let lingMaisUsada = '';
      let listaLinguagens = '';
      let barraPorcentagem = 0;
      for (let lang in linguagens) {
        if (lang !== 'null') {
          if (linguagens[lang] > QntMaior) {
            QntMaior = linguagens[lang];
            lingMaisUsada = lang;
          }

          barraPorcentagem = (linguagens[lang] / data['repos'].length) * 100;

          listaLinguagens += `<div class="lang-linha">
                  <span>${lang}</span>
                  <div class="lang-trilho">
                    <div class="lang-barra" style="width: ${barraPorcentagem}%"></div>
                  </div>
                  <span class="lang-qtd">${linguagens[lang]}</span>
              </div>`;
        } else {
          delete linguagens[lang];
        }
      }
      document.getElementById('lista-linguagens').innerHTML = listaLinguagens;
      document.getElementById('num-linguagem').innerText = lingMaisUsada;
      const maisRecentes = Object.entries(update)
        .sort((a, b) => new Date(b[1]) - new Date(a[1]))
        .splice(0, 5);

      let listaRepos = '';
      for (let i = 0; i < data['repos'].length; i++) {
        for (let x = 0; x < maisRecentes.length; x++) {
          if (String(data['repos'][i]['id']) === maisRecentes[x][0]) {
            listaRepos += `
              <li class="repo">
                <a href="${data['repos'][i]['clone_url']}">${data['repos'][i]['name']}</a>
              </li>
              `;
          }
        }
      }
      document.getElementById('lista-repos').innerHTML = listaRepos;
    })

    .catch((error) => {
      document.getElementById('resultado').hidden = true;
      document.getElementById('mensagem').innerText =
        'Ocorreu um erro, tente novamente mais tarde';
      document.getElementById('mensagem').hidden = false;
      document.getElementById('mensagem').classList.add('erro');
    });
});
