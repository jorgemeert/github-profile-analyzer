from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/buscaUsuario', methods = ['GET'])
def buscar_usuario():

    dados = request.args.get('usuario')

    if dados:
        nome_usuario = dados.replace(' ','')
        url = f'https://api.github.com/users/{nome_usuario}'
        url_repos = f'https://api.github.com/users/{nome_usuario}/repos'

        resposta = requests.get(url)
        resposta_repos = requests.get(url_repos)

        if resposta.status_code == 200:
            if resposta_repos.status_code == 200:

                dados_juntos = {
                    'perfil': resposta.json(),
                    'repos' : resposta_repos.json()
                }

                return jsonify (dados_juntos)



app.run(port=5001)
