const catalogData = [
  {
    pasta: 'Tratamento de Excel',
    servicos: [
      {
        nome: 'Limpar Linhas Vazias',
        resumo: 'Remove linhas totalmente nulas de planilhas usando Pandas.',
        descricao:
          'Lê uma planilha, elimina linhas vazias e salva o resultado em um novo arquivo.',
        codigo: `import pandas as pd

# Carrega planilha original
df = pd.read_excel('entrada.xlsx')

# Remove linhas totalmente vazias
df_limpo = df.dropna(how='all')

# Salva resultado
df_limpo.to_excel('saida_limpa.xlsx', index=False)`
      },
      {
        nome: 'Padronizar Colunas',
        resumo: 'Converte nomes de colunas para snake_case.',
        descricao:
          'Facilita integrações com APIs e bancos padronizando nomes e removendo acentos.',
        codigo: `import pandas as pd
import re


def normalizar(coluna):
    coluna = coluna.strip().lower()
    coluna = re.sub(r'[^a-z0-9]+', '_', coluna)
    return coluna.strip('_')


df = pd.read_excel('entrada.xlsx')
df.columns = [normalizar(c) for c in df.columns]
df.to_excel('saida_padronizada.xlsx', index=False)`
      }
    ]
  },
  {
    pasta: 'Scripts de Redes',
    servicos: [
      {
        nome: 'Teste de Portas',
        resumo: 'Verifica rapidamente portas TCP abertas em um host.',
        descricao:
          'Percorre uma lista de portas e informa quais estão acessíveis no destino.',
        codigo: `import socket

host = '192.168.0.10'
portas = [22, 80, 443, 3306]

for porta in portas:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        status = s.connect_ex((host, porta))
        if status == 0:
            print(f'Porta {porta} aberta')`
      },
      {
        nome: 'Ping em Lote',
        resumo: 'Executa ping em vários IPs e registra disponibilidade.',
        descricao:
          'Ajuda no monitoramento inicial de ativos de rede durante troubleshooting.',
        codigo: `import subprocess

ips = ['192.168.0.1', '192.168.0.20', '10.0.0.5']

for ip in ips:
    resposta = subprocess.run(['ping', '-c', '1', ip], capture_output=True)
    status = 'ONLINE' if resposta.returncode == 0 else 'OFFLINE'
    print(ip, status)`
      }
    ]
  },
  {
    pasta: 'Utilidades de Sistema',
    servicos: [
      {
        nome: 'Limpeza de Arquivos Temporários',
        resumo: 'Remove arquivos temporários antigos de um diretório.',
        descricao:
          'Varre uma pasta e remove arquivos com mais de X dias para liberar espaço.',
        codigo: `import os
import time

pasta = '/tmp'
dias = 7
limite = time.time() - (dias * 86400)

for arquivo in os.listdir(pasta):
    caminho = os.path.join(pasta, arquivo)
    if os.path.isfile(caminho) and os.path.getmtime(caminho) < limite:
        os.remove(caminho)
        print(f'Removido: {caminho}')`
      }
    ]
  }
];
