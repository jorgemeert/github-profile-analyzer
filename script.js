btnBuscar = document.getElementById('buscar');

btnBuscar.addEventListener('click', () => {
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
      document.getElementById('perfil-bio').innerText = data['perfil']['name'];
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
      for (let lang in linguagens) {
        if (lang !== 'null') {
          if (linguagens[lang] > QntMaior) {
            QntMaior = linguagens[lang];
            lingMaisUsada = lang;
          }
          document.getElementById('lista-linguagens').innerHTML +=
            `<div class="lang-linha">
                  <span>${lang}</span>
                  <div class="lang-trilho">
                    <div class="lang-barra" style="width: 50%"></div>
                  </div>
                  <span class="lang-qtd">${linguagens[lang]}</span>
              </div>`;
        } else {
          delete linguagens[lang];
        }
      }
      document.getElementById('num-linguagem').innerText = lingMaisUsada;
      const maisRecentes = Object.entries(update)
        .sort((a, b) => new Date(b[1]) - new Date(a[1]))
        .splice(0, 5);

      for (let i = 0; i < data['repos'].length; i++) {
        for (let x = 0; x < maisRecentes.length; x++) {
          if (String(data['repos'][i]['id']) === maisRecentes[x][0]) {
            document.getElementById('lista-repos').innerHTML += `
              <li class="repo">
                <a href="${data['repos'][i]['clone_url']}">${data['repos'][i]['name']}</a>
              </li>
              `;
          }
        }
      }
    })

    .catch((error) => {
      console.log(error);
    });
});
