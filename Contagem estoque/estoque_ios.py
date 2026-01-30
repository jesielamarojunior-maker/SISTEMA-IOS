import json
import csv
import os
from datetime import datetime
from collections import defaultdict
import pandas as pd

class EstoqueCamisetas:
    def __init__(self):
        self.data_file = 'estoque_ios.json'
        self.tamanhos = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG', 'ESP']
        self.dados = self.carregar_dados()
        
        # Verificar se já existem unidades configuradas
        if 'unidades' not in self.dados:
            self.dados['unidades'] = {}
            self.salvar_dados()
        
        # Selecionar ou criar unidade
        self.selecionar_unidade()

    def selecionar_unidade(self):
        """Seleciona ou cria uma unidade"""
        self.limpar_tela()
        self.mostrar_header(sem_unidade=True)
        
        print("SELEÇÃO DE UNIDADE")
        print("-" * 30)
        
        # Listar unidades existentes
        if self.dados['unidades']:
            print("Unidades disponíveis:")
            for i, unidade in enumerate(self.dados['unidades'].keys(), 1):
                print(f"{i}. {unidade}")
            print()
            print("N. Nova unidade")
            
            opcao = input("Selecione uma unidade ou 'N' para nova: ").strip()
            
            if opcao.lower() == 'n':
                self.criar_nova_unidade()
            else:
                try:
                    idx = int(opcao) - 1
                    self.unidade = list(self.dados['unidades'].keys())[idx]
                    print(f"Unidade selecionada: {self.unidade}")
                    input("Pressione Enter para continuar...")
                except (ValueError, IndexError):
                    print("Seleção inválida!")
                    input("Pressione Enter para continuar...")
                    self.selecionar_unidade()
        else:
            print("Nenhuma unidade cadastrada.")
            self.criar_nova_unidade()

    def criar_nova_unidade(self):
        """Cria uma nova unidade"""
        print("\nCRIAÇÃO DE NOVA UNIDADE")
        print("-" * 30)
        
        nome_unidade = input("Digite o nome da nova unidade: ").strip()
        while not nome_unidade:
            print("O nome da unidade é obrigatório!")
            nome_unidade = input("Digite o nome da nova unidade: ").strip()
        
        # Adicionar número de vagas
        vagas = 0
        while True:
            try:
                vagas = int(input("Número de vagas nesta unidade: "))
                if vagas <= 0:
                    print("O número de vagas deve ser maior que zero!")
                    continue
                break
            except ValueError:
                print("Por favor, digite apenas números!")
    
        if nome_unidade in self.dados['unidades']:
            print("Esta unidade já existe!")
            opcao = input("Deseja selecionar esta unidade? (s/n): ").strip().lower()
            if opcao == 's':
                self.unidade = nome_unidade
                return
            else:
                self.criar_nova_unidade()
                return
        
        # Criar nova unidade com estrutura inicial
        self.dados['unidades'][nome_unidade] = {
            'estoque_atual': {},
            'historico_semestres': [],
            'ultima_atualizacao': datetime.now().isoformat(),
            'vagas': vagas
        }
        
        self.unidade = nome_unidade
        self.salvar_dados()
        
        print(f"\nUnidade '{nome_unidade}' criada com sucesso com {vagas} vagas!")
        input("Pressione Enter para continuar...")

    def carregar_dados(self):
        """Carrega dados salvos ou inicializa estrutura vazia"""
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                pass
        
        return {
            'unidades': {}
        }

    def salvar_dados(self):
        """Salva dados no arquivo JSON"""
        try:
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump(self.dados, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Erro ao salvar dados: {str(e)}")
            input("Pressione Enter para continuar...")
    
    def limpar_tela(self):
        """Limpa a tela do terminal"""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def mostrar_header(self, sem_unidade=False):
        """Mostra cabeçalho do sistema"""
        print("=" * 60)
        print("    INSTITUTO DA OPORTUNIDADE SOCIAL")
        if hasattr(self, 'unidade') and not sem_unidade:
            print(f"    Unidade: {self.unidade}")
        print("    Sistema de Controle de Estoque v1.0")
        print("=" * 60)
        print()
    
    def menu_principal(self):
        """Menu principal do sistema"""
        while True:
            self.limpar_tela()
            self.mostrar_header()
            
            print("MENU PRINCIPAL")
            print("-" * 30)
            print("1. Entrada Manual do Estoque")
            print("2. Planejamento de Compras")
            print("3. Consultar Estoque")
            print("4. Histórico de Semestres")
            print("5. Exportar Dados")
            print("6. Configurações")
            print("0. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                self.menu_entrada_estoque()
            elif opcao == '2':
                self.planejamento_compras()
            elif opcao == '3':
                self.consultar_estoque()
            elif opcao == '4':
                self.gerenciar_historico()
            elif opcao == '5':
                self.menu_exportacao()
            elif opcao == '6':
                self.configuracoes()
            elif opcao == '0':
                print("\nObrigado por usar o Sistema IOS!")
                print("Dados salvos automaticamente.")
                break
            else:
                input("\nOpção inválida! Pressione Enter para continuar...")
    
    def menu_entrada_estoque(self):
        """Submenu para entrada de estoque"""
        while True:
            self.limpar_tela()
            self.mostrar_header()
            
            print("ENTRADA MANUAL DO ESTOQUE")
            print("-" * 30)
            print("Escolha o tipo de entrada:")
            print("1. Cadastrar novos parceiros/cursos")
            print("2. Adicionar um parceiro/curso ao estoque")
            print("3. Ajustar quantidades de parceiro existente")
            print("0. Voltar")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                self.entrada_estoque_completo()
            elif opcao == '2':
                self.adicionar_parceiro_individual()
            elif opcao == '3':
                self.ajustar_estoque_especifico()
            elif opcao == '0':
                break
            else:
                input("\nOpção inválida! Pressione Enter para continuar...")
    
    def entrada_estoque_completo(self):
        """Entrada completa do estoque"""
        print("\n" + "="*50)
        print("ENTRADA DE ESTOQUE COMPLETO")
        print("="*50)
        
        estoque = {}
        
        while True:
            # Obter parceiros para cada curso
            parceiros = self.obter_parceiros()
            if not parceiros:
                return
            
            # Criar chave única para a combinação de parceiros
            chave_estampa = f"{parceiros['costas']}_{parceiros['manga']}"
            
            # Verificar se já existe esta combinação
            if chave_estampa in estoque:
                print(f"\nATENÇÃO: Já existe estoque para {parceiros['costas']} + {parceiros['manga']}")
                sobrescrever = input("Deseja sobrescrever? (s/n): ").strip().lower()
                if sobrescrever != 's':
                    continue
            
            estoque[chave_estampa] = {}
            
            print(f"\n--- ESTAMPA: {parceiros['costas']} (costas) + {parceiros['manga']} (manga) ---")
            
            for tamanho in self.tamanhos:
                while True:
                    try:
                        qtd = input(f"Quantidade tamanho {tamanho}: ").strip()
                        if qtd == '':
                            qtd = 0
                        else:
                            qtd = int(qtd)
                        estoque[chave_estampa][tamanho] = qtd
                        break
                    except ValueError:
                        print("Por favor, digite apenas números!")
            
            # Mostrar resumo atual
            print(f"\n--- RESUMO ATUAL ---")
            total_parcial = 0
            for est, tam in estoque.items():
                costas, manga = est.split('_')
                total = sum(tam.values())
                total_parcial += total
                print(f"{costas} + {manga}: {total} unidades")
            print(f"Total até agora: {total_parcial} camisetas")
            
            # Perguntar se quer adicionar mais parceiros
            adicionar_mais = input("\nDeseja adicionar outro parceiro/curso? (s/n): ").strip().lower()
            if adicionar_mais != 's':
                break
        
        if not estoque:
            print("\nNenhum estoque foi cadastrado!")
            input("Pressione Enter para continuar...")
            return
        
        # Confirmar dados finais
        print("\n" + "="*50)
        print("RESUMO FINAL DO ESTOQUE")
        print("="*50)
        
        total_geral = 0
        for estampa, tamanhos in estoque.items():
            costas, manga = estampa.split('_')
            total_estampa = sum(tamanhos.values())
            total_geral += total_estampa
            print(f"\n{costas} (costas) + {manga} (manga): {total_estampa} unidades")
            
            for tamanho, qtd in tamanhos.items():
                if qtd > 0:
                    print(f"  {tamanho}: {qtd}")
    
        print(f"\nTOTAL GERAL: {total_geral} camisetas")
        print(f"Total de parceiros/cursos: {len(estoque)}")
        
        print("\n0. Cancelar")
        print("1. Confirmar e salvar")
        confirma = input("\nEscolha uma opção: ")

        if confirma == '1':
            # Garantir que a estrutura de dados esteja correta
            if 'unidades' not in self.dados:
                self.dados['unidades'] = {}
                
            if self.unidade not in self.dados['unidades']:
                self.dados['unidades'][self.unidade] = {}
                
            # Salvar o estoque (substituindo ou mesclando conforme necessário)
            estoque_atual = self.dados['unidades'][self.unidade].get('estoque_atual', {})
            
            # Mesclar com estoque existente
            for chave, tamanhos in estoque.items():
                estoque_atual[chave] = tamanhos
            
            self.dados['unidades'][self.unidade]['estoque_atual'] = estoque_atual
            self.dados['unidades'][self.unidade]['ultima_atualizacao'] = datetime.now().isoformat()
            self.salvar_dados()
            print(f"\nEstoque salvo com sucesso!")
            print(f"Total de parceiros/cursos na unidade: {len(estoque_atual)}")
        else:
            print("\nOperação cancelada!")
        
        input("\nPressione Enter para continuar...")
    
    def ajustar_estoque_especifico(self):
        """Ajustar itens específicos do estoque"""
        # Verificar se a unidade atual tem estoque
        if not self.dados['unidades'][self.unidade].get('estoque_atual'):
            print("\nNenhum estoque cadastrado ainda!")
            print("Use primeiro a opção 'Estoque inicial completo'")
            input("\nPressione Enter para continuar...")
            return
        
        print("\n" + "="*50)
        print("AJUSTE DE ITENS ESPECÍFICOS")
        print("="*50)
        
        # Mostrar estoque atual
        print("\nESTOQUE ATUAL:")
        self.mostrar_estoque_resumido()
        
        # Selecionar estampa
        estampas = list(self.dados['unidades'][self.unidade]['estoque_atual'].keys())
        print(f"\nESTAMPAS DISPONÍVEIS:")
        for i, estampa in enumerate(estampas, 1):
            costas, manga = estampa.split('_')
            print(f"{i}. {costas} (costas) + {manga} (manga)")
        
        print("0. Voltar")
        opcao = input("\nEscolha a estampa (número) ou 0 para voltar: ")
        
        if opcao == '0':
            return
        
        try:
            idx = int(opcao) - 1
            estampa_selecionada = estampas[idx]
        except (ValueError, IndexError):
            print("Seleção inválida!")
            input("Pressione Enter para continuar...")
            return
        
        # Selecionar tamanho
        print(f"\nTAMANHOS DISPONÍVEIS:")
        for i, tamanho in enumerate(self.tamanhos, 1):
            qtd_atual = self.dados['unidades'][self.unidade]['estoque_atual'][estampa_selecionada].get(tamanho, 0)
            print(f"{i}. {tamanho}: {qtd_atual} unidades")
        
        try:
            idx = int(input("\nEscolha o tamanho (número): ")) - 1
            tamanho_selecionado = self.tamanhos[idx]
        except (ValueError, IndexError):
            print("Seleção inválida!")
            input("Pressione Enter para continuar...")
            return
        
        # Definir nova quantidade
        qtd_atual = self.dados['unidades'][self.unidade]['estoque_atual'][estampa_selecionada].get(tamanho_selecionado, 0)
        print(f"\nQuantidade atual: {qtd_atual}")
        
        print("Opções:")
        print("1. Definir nova quantidade")
        print("2. Adicionar à quantidade atual")
        print("3. Remover da quantidade atual")
        
        opcao = input("Escolha: ").strip()
        
        try:
            if opcao == '1':
                nova_qtd = int(input("Nova quantidade: "))
            elif opcao == '2':
                adicionar = int(input("Quantidade a adicionar: "))
                nova_qtd = qtd_atual + adicionar
            elif opcao == '3':
                remover = int(input("Quantidade a remover: "))
                nova_qtd = max(0, qtd_atual - remover)
            else:
                print("Opção inválida!")
                input("Pressione Enter para continuar...")
                return
        except ValueError:
            print("Por favor, digite apenas números!")
            input("Pressione Enter para continuar...")
            return
        
        # Confirmar alteração
        costas, manga = estampa_selecionada.split('_')
        print(f"\nALTERAÇÃO:")
        print(f"Estampa: {costas} (costas) + {manga} (manga)")
        print(f"Tamanho: {tamanho_selecionado}")
        print(f"Quantidade atual: {qtd_atual}")
        print(f"Nova quantidade: {nova_qtd}")
        
        confirma = input("\nConfirmar alteração? (s/n): ").strip().lower()
        if confirma == 's':
            self.dados['unidades'][self.unidade]['estoque_atual'][estampa_selecionada][tamanho_selecionado] = nova_qtd
            self.salvar_dados()
            print("\nAlteração salva com sucesso!")
        else:
            print("\nOperação cancelada!")
        
        input("\nPressione Enter para continuar...")
    
    def obter_parceiros(self):
        """Obtém o parceiro das costas e da manga"""
        print("\nCADASTRO DE PARCEIROS")
        print("-" * 25)
        
        # Parceiro das costas
        print("\nParceiro das COSTAS:")
        parceiro_costas = input("Nome do parceiro das costas: ").strip()
        while not parceiro_costas:
            print("O parceiro das costas é obrigatório!")
            parceiro_costas = input("Nome do parceiro das costas: ").strip()
        
        # Parceiro da manga
        print("\nParceiro da MANGA:")
        parceiro_manga = input("Nome do parceiro da manga: ").strip()
        while not parceiro_manga:
            print("O parceiro da manga é obrigatório!")
            parceiro_manga = input("Nome do parceiro da manga: ").strip()
        
        return {'costas': parceiro_costas, 'manga': parceiro_manga}
    
    def planejamento_compras(self):
        """Realiza planejamento de compras para novo semestre"""
        self.limpar_tela()
        self.mostrar_header()
        
        print("PLANEJAMENTO DE COMPRAS")
        print("-" * 30)
        
        # Obter informações básicas do semestre
        print("\nINFORMAÇÕES DO SEMESTRE")
        print("-" * 30)
        
        semestre = input("Nome/Período do semestre: ").strip()
        curso = input("Nome do curso: ").strip()
        
        # Usar o número de vagas da unidade atual
        vagas_unidade = self.dados['unidades'][self.unidade].get('vagas', 0)
        if vagas_unidade <= 0:
            print(f"\nATENÇÃO: A unidade {self.unidade} não tem um número de vagas definido!")
            try:
                vagas_unidade = int(input(f"Informe o número de vagas para {self.unidade}: "))
                # Atualizar o número de vagas da unidade
                self.dados['unidades'][self.unidade]['vagas'] = vagas_unidade
                self.salvar_dados()
            except ValueError:
                print("Número inválido. Operação cancelada.")
                input("Pressione Enter para continuar...")
                return
        
        print(f"Vagas na unidade {self.unidade}: {vagas_unidade}")
        
        # Perguntar se deseja usar um número diferente para este curso específico
        usar_vagas_especificas = input(f"Deseja especificar um número diferente de vagas para o curso '{curso}'? (s/n): ").lower()
        
        if usar_vagas_especificas == 's':
            try:
                vagas_curso = int(input(f"Informe o número de vagas para o curso '{curso}': "))
                if vagas_curso <= 0:
                    print("O número de vagas deve ser maior que zero. Usando o valor da unidade.")
                    vagas_curso = vagas_unidade
            except ValueError:
                print("Valor inválido. Usando o número de vagas da unidade.")
                vagas_curso = vagas_unidade
        else:
            vagas_curso = vagas_unidade
        
        # Continuar com o resto do código existente
        try:
            num_unidades = int(input("Número de unidades: "))
        except ValueError:
            print("Valor inválido. Operação cancelada.")
            input("Pressione Enter para continuar...")
            return
        
        # Parceiros do semestre
        print("\nPARCEIROS DESTE SEMESTRE")
        print("-" * 25)
        
        parceiros = self.obter_parceiros()
        if not parceiros:
            return
        
        # Distribuição por tamanho
        print("\nDISTRIBUIÇÃO POR TAMANHO")
        print("-" * 25)
        print("Digite a porcentagem esperada para cada tamanho:")
        
        distribuicao = {}
        total_percent = 0
        
        # Usar distribuição do histórico como sugestão
        sugestao = self.calcular_sugestao_tamanhos()
        
        for tamanho in self.tamanhos:
            sugestao_tamanho = sugestao.get(tamanho, 0)
            if sugestao_tamanho > 0:
                prompt = f"{tamanho} (sugestão: {sugestao_tamanho:.1f}%): "
            else:
                prompt = f"{tamanho}: "
            
            while True:
                try:
                    percent = input(prompt).strip()
                    if percent == '' and sugestao_tamanho > 0:
                        percent = sugestao_tamanho
                    else:
                        percent = float(percent)
                    
                    if percent < 0 or percent > 100:
                        print("Porcentagem deve estar entre 0 e 100!")
                        continue
                    
                    distribuicao[tamanho] = percent
                    total_percent += percent
                    break
                except ValueError:
                    print("Por favor, digite um número válido!")
        
        if abs(total_percent - 100) > 0.1:
            print(f"\nATENÇÃO: Total da distribuição é {total_percent:.1f}%")
            print("Recomenda-se que seja exatamente 100%")
            continuar = input("Continuar mesmo assim? (s/n): ").strip().lower()
            if continuar != 's':
                input("Pressione Enter para continuar...")
                return
        
        # Calcular necessidades
        total_alunos = vagas_curso * num_unidades
        necessidades = self.calcular_necessidades(total_alunos, distribuicao, parceiros)
        
        # Mostrar relatório
        self.mostrar_relatorio_compras(semestre, curso, necessidades, total_alunos)
        
        # Salvar no histórico
        salvar = input("\nSalvar este planejamento no histórico? (s/n): ").strip().lower()
        if salvar == 's':
            registro = {
                'semestre': semestre,
                'curso': curso,
                'data': datetime.now().isoformat(),
                'vagas_por_unidade': vagas_curso,
                'num_unidades': num_unidades,
                'total_alunos': total_alunos,
                'parceiros': parceiros,
                'distribuicao_tamanhos': distribuicao,
                'necessidades': necessidades
            }
            
            self.dados['unidades'][self.unidade]['historico_semestres'].append(registro)
            self.salvar_dados()
            print("Planejamento salvo no histórico!")
        
        input("\nPressione Enter para continuar...")
    
    def calcular_necessidades(self, total_alunos, distribuicao, parceiros):
        """Calcula quantas camisetas são necessárias"""
        necessidades = {}
        estoque_atual = self.dados['unidades'][self.unidade].get('estoque_atual', {})
        
        # Usar apenas uma combinação de parceiros
        chave_estampa = f"{parceiros['costas']}_{parceiros['manga']}"
        necessidades[chave_estampa] = {}
        
        for tamanho in self.tamanhos:
            # Calcular necessidade baseada na distribuição
            necessidade = int((total_alunos * distribuicao[tamanho]) / 100)
            
            # Verificar estoque atual
            estoque_disponivel = estoque_atual.get(chave_estampa, {}).get(tamanho, 0)
            
            # Calcular o que precisa comprar
            precisa_comprar = max(0, necessidade - estoque_disponivel)
            
            necessidades[chave_estampa][tamanho] = {
                'necessidade': necessidade,
                'estoque_atual': estoque_disponivel,
                'comprar': precisa_comprar
            }
        
        return necessidades
    
    def mostrar_relatorio_compras(self, semestre, curso, necessidades, total_alunos):
        """Mostra relatório detalhado de compras"""
        print("\n" + "="*60)
        print("RELATÓRIO DE COMPRAS")
        print("="*60)
        print(f"Semestre: {semestre}")
        print(f"Curso: {curso}")
        print(f"Total de alunos: {total_alunos}")
        print()
        
        total_comprar = 0
        total_estoque_usado = 0
        
        for estampa, tamanhos in necessidades.items():
            costas, manga = estampa.split('_')
            print(f"\n--- {costas} (costas) + {manga} (manga) ---")
            print("Tam. | Necessário | Estoque | Comprar")
            print("-" * 40)
            
            for tamanho in self.tamanhos:
                dados = tamanhos[tamanho]
                necessario = dados['necessidade']
                estoque = dados['estoque_atual']
                comprar = dados['comprar']
                
                if necessario > 0 or estoque > 0 or comprar > 0:
                    print(f"{tamanho:4} | {necessario:10} | {estoque:7} | {comprar:7}")
                    total_comprar += comprar
                    total_estoque_usado += min(necessario, estoque)
        
        print("\n" + "="*60)
        print("RESUMO GERAL")
        print("="*60)
        print(f"Total a comprar: {total_comprar} camisetas")
        print(f"Estoque que será usado: {total_estoque_usado} camisetas")
        print(f"Investimento necessário: R$ {total_comprar * 25:.2f} (estimado R$ 25/camiseta)")
    
    def calcular_sugestao_tamanhos(self):
        """Calcula sugestão de tamanhos baseada no histórico"""
        historico = self.dados['unidades'][self.unidade].get('historico_semestres', [])
        if not historico:
            return {}
        
        # Média das distribuições dos últimos semestres
        distribuicoes = []
        for semestre in historico[-3:]:  # Últimos 3 semestres
            if 'distribuicao_tamanhos' in semestre:
                distribuicoes.append(semestre['distribuicao_tamanhos'])
        
        if not distribuicoes:
            return {}
        
        sugestao = {}
        for tamanho in self.tamanhos:
            valores = [d.get(tamanho, 0) for d in distribuicoes]
            sugestao[tamanho] = sum(valores) / len(valores)
        
        return sugestao
    
    def consultar_estoque(self):
        """Menu de consulta de estoque"""
        self.limpar_tela()
        self.mostrar_header()
        
        print("CONSULTA DE ESTOQUE")
        print("-" * 30)
        
        # Verificar se há estoque cadastrado
        estoque = self.dados['unidades'][self.unidade].get('estoque_atual', {})
        if not estoque:
            print("\nNenhum estoque cadastrado para esta unidade!")
            input("Pressione Enter para continuar...")
            return
        
        print("1. Resumo do estoque")
        print("2. Estoque detalhado")
        print("0. Voltar")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == '1':
            self.limpar_tela()
            self.mostrar_header()
            print("RESUMO DO ESTOQUE")
            print("-" * 30)
            self.mostrar_estoque_resumido()
            input("\nPressione Enter para continuar...")
        elif opcao == '2':
            self.limpar_tela()
            self.mostrar_header()
            print("ESTOQUE DETALHADO")
            print("-" * 30)
            self.mostrar_estoque_detalhado()
            input("\nPressione Enter para continuar...")
        elif opcao == '0':
            return
        else:
            print("\nOpção inválida!")
            input("Pressione Enter para continuar...")

    def mostrar_estoque_resumido(self):
        """Mostra resumo do estoque"""
        estoque = self.dados['unidades'][self.unidade].get('estoque_atual', {})
        total_geral = 0
        
        # Verificar se o estoque está vazio
        if not estoque:
            print("Nenhum item em estoque!")
            return
        
        print(f"Parceiros/Cursos cadastrados: {len(estoque)}")
        print("-" * 50)
        
        for i, (estampa, tamanhos) in enumerate(estoque.items(), 1):
            costas, manga = estampa.split('_')
            total = sum(tamanhos.values())
            total_geral += total
            print(f"{i:2}. {costas} + {manga}: {total} unidades")
        
        print("-" * 50)
        print(f"TOTAL GERAL: {total_geral} camisetas")

    def mostrar_estoque_detalhado(self):
        """Mostra estoque detalhado"""
        estoque = self.dados['unidades'][self.unidade].get('estoque_atual', {})
        total_geral = 0
        
        # Verificar se o estoque está vazio
        if not estoque:
            print("Nenhum item em estoque!")
            return
        
        for estampa, tamanhos in estoque.items():
            costas, manga = estampa.split('_')
            total_estampa = sum(tamanhos.values())
            total_geral += total_estampa
            
            print(f"\n--- {costas} (costas) + {manga} (manga) ---")
            print(f"Total: {total_estampa} unidades")
            print("Tam. | Qtd")
            print("-" * 10)
            
            for tamanho in self.tamanhos:
                qtd = tamanhos.get(tamanho, 0)
                if qtd > 0:
                    print(f"{tamanho:4} | {qtd}")
    
        print(f"\nTOTAL GERAL: {total_geral} camisetas")
    
    def gerenciar_historico(self):
        """Gerencia histórico de semestres"""
        self.limpar_tela()
        self.mostrar_header()
        
        print("HISTÓRICO DE SEMESTRES")
        print("-" * 30)
        
        if not self.dados['unidades'][self.unidade].get('historico_semestres'):
            print("Nenhum semestre no histórico ainda!")
            input("\nPressione Enter para continuar...")
            return
        
        # Mostrar lista de semestres
        print("SEMESTRES CADASTRADOS:")
        for i, semestre in enumerate(self.dados['unidades'][self.unidade]['historico_semestres'], 1):
            data = datetime.fromisoformat(semestre['data']).strftime('%d/%m/%Y')
            print(f"{i}. {semestre['semestre']} - {semestre['curso']} ({data})")
        
        print(f"\n0. Voltar")
        
        try:
            opcao = int(input("\nEscolha um semestre para ver detalhes (0 para voltar): "))
            if opcao == 0:
                return
            
            semestre_selecionado = self.dados['unidades'][self.unidade]['historico_semestres'][opcao - 1]
            self.mostrar_detalhes_semestre(semestre_selecionado)
            
        except (ValueError, IndexError):
            print("Seleção inválida!")
            input("Pressione Enter para continuar...")
    
    def mostrar_detalhes_semestre(self, semestre):
        """Mostra detalhes de um semestre específico"""
        self.limpar_tela()
        self.mostrar_header()
        
        data = datetime.fromisoformat(semestre['data']).strftime('%d/%m/%Y às %H:%M')
        
        print(f"DETALHES DO SEMESTRE")
        print("=" * 40)
        print(f"Semestre: {semestre['semestre']}")
        print(f"Curso: {semestre['curso']}")
        print(f"Data do planejamento: {data}")
        print(f"Vagas por unidade: {semestre['vagas_por_unidade']}")
        print(f"Número de unidades: {semestre['num_unidades']}")
        print(f"Total de alunos: {semestre['total_alunos']}")
        
        print(f"\nParceiro das costas: {semestre['parceiros']['costas']}")
        print(f"Parceiro da manga: {semestre['parceiros']['manga']}")
        
        print(f"\nDistribuição por tamanho:")
        for tamanho, percent in semestre['distribuicao_tamanhos'].items():
            if percent > 0:
                print(f"  {tamanho}: {percent}%")
        
        # Resumo de compras
        total_comprar = 0
        for estampa, tamanhos in semestre['necessidades'].items():
            for tamanho, dados in tamanhos.items():
                total_comprar += dados['comprar']
        
        print(f"\nTotal de camisetas a comprar: {total_comprar}")
        
        input("\nPressione Enter para continuar...")
    
    def configuracoes(self):
        """Menu de configurações"""
        self.limpar_tela()
        self.mostrar_header()
        
        print("CONFIGURAÇÕES")
        print("-" * 30)
        print("1. Trocar Unidade")
        print("2. Gerenciar Unidades")
        print("0. Voltar")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == '1':
            self.selecionar_unidade()
        elif opcao == '2':
            self.gerenciar_unidades()
        elif opcao == '0':
            return
        else:
            print("Opção inválida!")
            input("Pressione Enter para continuar...")

    def gerenciar_unidades(self):
        """Gerencia as unidades cadastradas"""
        self.limpar_tela()
        self.mostrar_header()
        
        print("GERENCIAMENTO DE UNIDADES")
        print("-" * 30)
        
        if not self.dados['unidades']:
            print("Nenhuma unidade cadastrada!")
            input("Pressione Enter para continuar...")
            return
        
        # Listar unidades
        print("Unidades cadastradas:")
        for i, unidade in enumerate(self.dados['unidades'].keys(), 1):
            print(f"{i}. {unidade}")
        
        print("\nOpções:")
        print("N. Adicionar nova unidade")
        print("R. Remover unidade")
        print("0. Voltar")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao.lower() == 'n':
            self.criar_nova_unidade()
        elif opcao.lower() == 'r':
            self.remover_unidade()
        elif opcao == '0':
            return
        else:
            try:
                idx = int(opcao) - 1
                unidade_selecionada = list(self.dados['unidades'].keys())[idx]
                self.mostrar_info_unidade(unidade_selecionada)
            except (ValueError, IndexError):
                print("Opção inválida!")
                input("Pressione Enter para continuar...")

    def remover_unidade(self):
        """Remove uma unidade"""
        print("\nREMOÇÃO DE UNIDADE")
        print("-" * 30)
        
        # Listar unidades
        for i, unidade in enumerate(self.dados['unidades'].keys(), 1):
            print(f"{i}. {unidade}")
        
        try:
            idx = int(input("\nSelecione a unidade a remover (0 para cancelar): ")) - 1
            if idx == -1:
                return
            
            unidade_remover = list(self.dados['unidades'].keys())[idx]
            
            # Confirmar remoção
            print(f"\nATENÇÃO: Você está prestes a remover a unidade '{unidade_remover}'")
            print("Esta ação não pode ser desfeita e todos os dados da unidade serão perdidos.")
            
            confirmacao = input(f"Digite o nome da unidade para confirmar a remoção: ").strip()
            
            if confirmacao == unidade_remover:
                # Se a unidade atual for removida, precisamos trocar
                eh_atual = unidade_remover == self.unidade
                
                # Remover a unidade
                del self.dados['unidades'][unidade_remover]
                self.salvar_dados()
                
                print(f"\nUnidade '{unidade_remover}' removida com sucesso!")
                
                # Se removeu a unidade atual, selecionar outra
                if eh_atual:
                    if self.dados['unidades']:
                        print("Como a unidade atual foi removida, selecione outra:")
                        self.selecionar_unidade()
                    else:
                        print("Não há mais unidades. Criando uma nova:")
                        self.criar_nova_unidade()
            else:
                print("Nome incorreto. Operação cancelada.")
        
        except (ValueError, IndexError):
            print("Seleção inválida!")
    
        input("Pressione Enter para continuar...")

    def mostrar_info_unidade(self, unidade):
        """Mostra informações detalhadas de uma unidade"""
        self.limpar_tela()
        self.mostrar_header()
        
        print(f"INFORMAÇÕES DA UNIDADE: {unidade}")
        print("=" * 40)
        
        dados_unidade = self.dados['unidades'][unidade]
        
        # Informações básicas
        print(f"Número de vagas: {dados_unidade.get('vagas', 'Não informado')}")
        print(f"Última atualização: {datetime.fromisoformat(dados_unidade['ultima_atualizacao']).strftime('%d/%m/%Y às %H:%M')}")
        
        # Estoque
        total_estoque = 0
        for estampa, tamanhos in dados_unidade.get('estoque_atual', {}).items():
            total_estoque += sum(tamanhos.values())
        
        print(f"Total de camisetas em estoque: {total_estoque}")
        
        # Histórico
        print(f"Semestres no histórico: {len(dados_unidade.get('historico_semestres', []))}")
        
        # Opção para selecionar esta unidade
        if unidade != self.unidade:
            print("\n1. Selecionar esta unidade")
            print("2. Alterar número de vagas")
        else:
            print("\n1. Alterar número de vagas")
    
        print("0. Voltar")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == '1' and unidade != self.unidade:
            self.unidade = unidade
            print(f"Unidade alterada para: {self.unidade}")
            input("Pressione Enter para continuar...")
        elif (opcao == '2' and unidade != self.unidade) or (opcao == '1' and unidade == self.unidade):
            self.alterar_vagas_unidade(unidade)

    def alterar_vagas_unidade(self, unidade):
        """Altera o número de vagas de uma unidade"""
        dados_unidade = self.dados['unidades'][unidade]
        vagas_atuais = dados_unidade.get('vagas', 0)
        
        print(f"\nNúmero atual de vagas: {vagas_atuais}")
        
        try:
            novas_vagas = int(input("Novo número de vagas: "))
            if novas_vagas <= 0:
                print("O número de vagas deve ser maior que zero!")
                input("Pressione Enter para continuar...")
                return
            
            dados_unidade['vagas'] = novas_vagas
            self.salvar_dados()
            
            print(f"Número de vagas alterado para: {novas_vagas}")
            input("Pressione Enter para continuar...")
        except ValueError:
            print("Por favor, digite apenas números!")
            input("Pressione Enter para continuar...")
    
    def menu_unidades(self):
        """Menu para acesso direto às unidades"""
        self.limpar_tela()
        self.mostrar_header()
        
        print("ACESSO DIRETO ÀS UNIDADES")
        print("-" * 30)
        
        if not self.dados['unidades']:
            print("Nenhuma unidade cadastrada!")
            input("Pressione Enter para continuar...")
            return
        
        # Listar unidades com informações resumidas
        print("Unidades disponíveis:")
        print("Nº | Nome da Unidade | Vagas | Camisetas em Estoque")
        print("-" * 60)
        
        for i, unidade in enumerate(self.dados['unidades'].keys(), 1):
            dados = self.dados['unidades'][unidade]
            
            # Calcular total de camisetas
            total_camisetas = 0
            for estampa, tamanhos in dados.get('estoque_atual', {}).items():
                total_camisetas += sum(tamanhos.values())
            
            # Obter número de vagas
            vagas = dados.get('vagas', 'N/D')
            
            # Determinar unidade atual
            marcador = "→" if unidade == self.unidade else " "
            
            print(f"{marcador} {i:2} | {unidade:15} | {vagas:5} | {total_camisetas:6}")
        
        print("\nN. Nova unidade")
        print("0. Voltar")
        
        opcao = input("\nSelecione uma unidade, 'N' para nova ou '0' para voltar: ").strip()
        
        if opcao.lower() == 'n':
            self.criar_nova_unidade()
        elif opcao == '0':
            return
        else:
            try:
                idx = int(opcao) - 1
                unidade_selecionada = list(self.dados['unidades'].keys())[idx]
                self.mostrar_info_unidade(unidade_selecionada)
            except (ValueError, IndexError):
                print("Seleção inválida!")
                input("Pressione Enter para continuar...")

    def menu_exportacao(self):
        """Menu para exportação de dados"""
        self.limpar_tela()
        self.mostrar_header()
        
        print("EXPORTAÇÃO DE DADOS")
        print("-" * 30)
        print("1. Exportar estoque atual para CSV")
        print("2. Exportar estoque atual para Excel")
        print("3. Exportar histórico de semestres")
        print("0. Voltar")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == '1':
            self.exportar_estoque_csv()
        elif opcao == '2':
            self.exportar_estoque_excel()
        elif opcao == '3':
            self.exportar_historico()
        elif opcao == '0':
            return
        else:
            print("\nOpção inválida!")
            input("Pressione Enter para continuar...")

    def exportar_estoque_csv(self):
        """Exporta o estoque atual para CSV"""
        estoque = self.dados['unidades'][self.unidade].get('estoque_atual', {})
        
        if not estoque:
            print("\nNenhum estoque para exportar!")
            input("Pressione Enter para continuar...")
            return
        
        try:
            nome_arquivo = f"estoque_{self.unidade}_{datetime.now().strftime('%Y%m%d_%H%M')}.csv"
            
            # Preparar dados para CSV
            linhas = []
            cabecalho = ['Parceiro Costas', 'Parceiro Manga'] + self.tamanhos + ['Total']
            
            for estampa, tamanhos in estoque.items():
                costas, manga = estampa.split('_')
                linha = [costas, manga]
                
                # Adicionar quantidades por tamanho
                for tamanho in self.tamanhos:
                    linha.append(tamanhos.get(tamanho, 0))
                
                # Adicionar total
                linha.append(sum(tamanhos.values()))
                linhas.append(linha)
            
            # Escrever CSV
            with open(nome_arquivo, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(cabecalho)
                writer.writerows(linhas)
            
            print(f"\nEstoque exportado com sucesso para '{nome_arquivo}'")
            input("Pressione Enter para continuar...")
        
        except Exception as e:
            print(f"\nErro ao exportar: {str(e)}")
            input("Pressione Enter para continuar...")

    def exportar_estoque_excel(self):
        """Exporta o estoque atual para Excel"""
        estoque = self.dados['unidades'][self.unidade].get('estoque_atual', {})
        
        if not estoque:
            print("\nNenhum estoque para exportar!")
            input("Pressione Enter para continuar...")
            return
        
        try:
            nome_arquivo = f"estoque_{self.unidade}_{datetime.now().strftime('%Y%m%d_%H%M')}.xlsx"
            
            # Preparar dados para DataFrame
            dados = []
            for estampa, tamanhos in estoque.items():
                costas, manga = estampa.split('_')
                linha = {'Parceiro Costas': costas, 'Parceiro Manga': manga}
                
                # Adicionar quantidades por tamanho
                for tamanho in self.tamanhos:
                    linha[tamanho] = tamanhos.get(tamanho, 0)
                
                # Adicionar total
                linha['Total'] = sum(tamanhos.values())
                dados.append(linha)
            
            # Criar DataFrame e exportar
            df = pd.DataFrame(dados)
            df.to_excel(nome_arquivo, index=False)
            
            print(f"\nEstoque exportado com sucesso para '{nome_arquivo}'")
            input("Pressione Enter para continuar...")
        
        except Exception as e:
            print(f"\nErro ao exportar: {str(e)}")
            input("Pressione Enter para continuar...")

    def exportar_historico(self):
        """Exporta o histórico de semestres"""
        historico = self.dados['unidades'][self.unidade].get('historico_semestres', [])
        
        if not historico:
            print("\nNenhum histórico para exportar!")
            input("Pressione Enter para continuar...")
            return
        
        try:
            nome_arquivo = f"historico_{self.unidade}_{datetime.now().strftime('%Y%m%d_%H%M')}.xlsx"
            
            # Criar planilha Excel com várias abas
            with pd.ExcelWriter(nome_arquivo) as writer:
                # Aba de resumo
                resumo = []
                for semestre in historico:
                    # Contar total de camisetas compradas
                    total_comprar = 0
                    for estampa, tamanhos in semestre.get('necessidades', {}).items():
                        for tamanho, dados in tamanhos.items():
                            total_comprar += dados.get('comprar', 0)
                    
                    resumo.append({
                        'Semestre': semestre.get('semestre', ''),
                        'Curso': semestre.get('curso', ''),
                        'Data': datetime.fromisoformat(semestre.get('data', '')).strftime('%d/%m/%Y'),
                        'Total Alunos': semestre.get('total_alunos', 0),
                        'Total Camisetas': total_comprar
                    })
                
                pd.DataFrame(resumo).to_excel(writer, sheet_name='Resumo', index=False)
                
                # Uma aba para cada semestre com detalhes
                for i, semestre in enumerate(historico):
                    nome_aba = f"Semestre_{i+1}"
                    
                    # Dados detalhados das compras
                    detalhes = []
                    for estampa, tamanhos in semestre.get('necessidades', {}).items():
                        costas, manga = estampa.split('_')
                        for tamanho, dados in tamanhos.items():
                            if dados.get('comprar', 0) > 0:
                                detalhes.append({
                                    'Parceiro Costas': costas,
                                    'Parceiro Manga': manga,
                                    'Tamanho': tamanho,
                                    'Necessário': dados.get('necessidade', 0),
                                    'Estoque': dados.get('estoque_atual', 0),
                                    'Comprar': dados.get('comprar', 0)
                                })
                    
                    pd.DataFrame(detalhes).to_excel(writer, sheet_name=nome_aba, index=False)
            
            print(f"\nHistórico exportado com sucesso para '{nome_arquivo}'")
            input("Pressione Enter para continuar...")
        
        except Exception as e:
            print(f"\nErro ao exportar: {str(e)}")
            input("Pressione Enter para continuar...")
    
    def adicionar_parceiro_individual(self):
        """Adiciona um único parceiro/curso ao estoque existente"""
        print("\n" + "="*50)
        print("ADICIONAR PARCEIRO/CURSO")
        print("="*50)
        
        # Mostrar estoque atual se existir
        estoque_atual = self.dados['unidades'][self.unidade].get('estoque_atual', {})
        if estoque_atual:
            print("\nPARCEIROS/CURSOS JÁ CADASTRADOS:")
            for i, (chave, _) in enumerate(estoque_atual.items(), 1):
                costas, manga = chave.split('_')
                print(f"{i}. {costas} (costas) + {manga} (manga)")
            print()
        
        # Obter dados do novo parceiro
        parceiros = self.obter_parceiros()
        if not parceiros:
            return
        
        chave_estampa = f"{parceiros['costas']}_{parceiros['manga']}"
        
        # Verificar se já existe
        if chave_estampa in estoque_atual:
            print(f"\nATENÇÃO: Já existe estoque para {parceiros['costas']} + {parceiros['manga']}")
            opcao = input("Deseja:\n1. Sobrescrever\n2. Somar às quantidades existentes\n3. Cancelar\nOpção: ").strip()
            
            if opcao == '3':
                print("Operação cancelada!")
                input("Pressione Enter para continuar...")
                return
            elif opcao not in ['1', '2']:
                print("Opção inválida!")
                input("Pressione Enter para continuar...")
                return
        else:
            opcao = '1'  # Novo parceiro
        
        print(f"\n--- ESTAMPA: {parceiros['costas']} (costas) + {parceiros['manga']} (manga) ---")
        
        # Coletar quantidades
        novas_quantidades = {}
        for tamanho in self.tamanhos:
            while True:
                try:
                    qtd_atual = estoque_atual.get(chave_estampa, {}).get(tamanho, 0)
                    if opcao == '2' and qtd_atual > 0:
                        prompt = f"Quantidade tamanho {tamanho} (atual: {qtd_atual}): "
                    else:
                        prompt = f"Quantidade tamanho {tamanho}: "
                    
                    qtd = input(prompt).strip()
                    if qtd == '':
                        qtd = 0
                    else:
                        qtd = int(qtd)
                    
                    # Se for somar, adicionar à quantidade existente
                    if opcao == '2':
                        qtd = qtd_atual + qtd
                    
                    novas_quantidades[tamanho] = qtd
                    break
                except ValueError:
                    print("Por favor, digite apenas números!")
        
        # Mostrar resumo
        total_novo = sum(novas_quantidades.values())
        print(f"\n--- RESUMO ---")
        print(f"Parceiro: {parceiros['costas']} + {parceiros['manga']}")
        print(f"Total de camisetas: {total_novo}")
        for tamanho, qtd in novas_quantidades.items():
            if qtd > 0:
                print(f"  {tamanho}: {qtd}")
        
        # Confirmar
        confirma = input(f"\nConfirmar {'adição' if opcao == '2' else 'cadastro'}? (s/n): ").strip().lower()
        if confirma == 's':
            # Salvar no estoque
            if 'estoque_atual' not in self.dados['unidades'][self.unidade]:
                self.dados['unidades'][self.unidade]['estoque_atual'] = {}
            
            self.dados['unidades'][self.unidade]['estoque_atual'][chave_estampa] = novas_quantidades
            self.dados['unidades'][self.unidade]['ultima_atualizacao'] = datetime.now().isoformat()
            self.salvar_dados()
            
            print(f"\nParceiro/curso {'adicionado' if opcao == '2' else 'cadastrado'} com sucesso!")
            
            # Mostrar total de parceiros na unidade
            total_parceiros = len(self.dados['unidades'][self.unidade]['estoque_atual'])
            print(f"Total de parceiros/cursos na unidade: {total_parceiros}")
        else:
            print("\nOperação cancelada!")
        
        input("\nPressione Enter para continuar...")
def main():
    app = EstoqueCamisetas()
    app.menu_principal()

if __name__ == "__main__":
    main()
