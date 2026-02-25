const catalogData = [
  {
    pasta: 'Tratamento de Dados',
    servicos: [
      {
        nome: 'Limpar Linhas Vazias',
        resumo: 'Remove registros vazios de uma lista em memória.',
        descricao:
          'Exemplo executável no navegador: filtra linhas em branco de uma tabela simulada.',
        codigo: `linhas = [
    {'nome': 'Ana', 'email': 'ana@empresa.com'},
    {'nome': '', 'email': ''},
    {'nome': 'Carlos', 'email': 'carlos@empresa.com'},
    {'nome': '', 'email': ''}
]

linhas_limpas = [linha for linha in linhas if any(valor.strip() for valor in linha.values())]

print('Registros válidos:')
for linha in linhas_limpas:
    print(linha)`
      },
      {
        nome: 'Padronizar Colunas',
        resumo: 'Converte nomes para snake_case sem dependências externas.',
        descricao:
          'Demonstra como normalizar nomes de colunas para facilitar integrações.',
        codigo: `import re

colunas = ['Nome Cliente', 'Data de Nascimento', 'Telefone (Principal)', 'Total R$']

def normalizar(coluna):
    coluna = coluna.strip().lower()
    coluna = re.sub(r'[^a-z0-9]+', '_', coluna)
    return coluna.strip('_')

colunas_normalizadas = [normalizar(col) for col in colunas]
print('Antes:', colunas)
print('Depois:', colunas_normalizadas)`
      }
    ]
  },
  {
    pasta: 'Scripts de Redes',
    servicos: [
      {
        nome: 'Validador de IP',
        resumo: 'Verifica se os IPs seguem o padrão IPv4.',
        descricao:
          'Exemplo local: percorre uma lista de IPs e informa quais são válidos.',
        codigo: `ips = ['192.168.0.10', '10.0.0.256', '172.16.5.4', 'abc.1.2.3']

def ip_valido(ip):
    partes = ip.split('.')
    if len(partes) != 4:
        return False
    for parte in partes:
        if not parte.isdigit():
            return False
        numero = int(parte)
        if numero < 0 or numero > 255:
            return False
    return True

for ip in ips:
    status = 'VÁLIDO' if ip_valido(ip) else 'INVÁLIDO'
    print(f'{ip}: {status}')`
      },
      {
        nome: 'Resumo de Portas',
        resumo: 'Monta um relatório com portas e seus serviços.',
        descricao:
          'Mostra como gerar uma saída amigável para auditorias de rede.',
        codigo: `portas = {
    22: 'SSH',
    53: 'DNS',
    80: 'HTTP',
    443: 'HTTPS',
    3306: 'MySQL'
}

print('Relatório de portas monitoradas')
for porta, servico in portas.items():
    print(f'Porta {porta}: {servico}')`
      }
    ]
  },
  {
    pasta: 'Utilidades de Sistema',
    servicos: [
      {
        nome: 'Limpeza de Temporários (Simulação)',
        resumo: 'Simula remoção de arquivos antigos com base em dias.',
        descricao:
          'Executa uma simulação local para decidir quais arquivos seriam removidos.',
        codigo: `arquivos = [
    {'nome': 'cache.tmp', 'dias_sem_uso': 10},
    {'nome': 'sessao.tmp', 'dias_sem_uso': 2},
    {'nome': 'relatorio.log', 'dias_sem_uso': 15}
]

limite_dias = 7
remover = [arq for arq in arquivos if arq['dias_sem_uso'] > limite_dias]

print(f'Arquivos para remover (>{limite_dias} dias):')
for arquivo in remover:
    print('-', arquivo['nome'])`
      }
    ]
  }
];
