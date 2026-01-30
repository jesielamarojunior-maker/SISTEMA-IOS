#!/usr/bin/env python3
"""
Script para demonstrar o novo fluxo de planejamento de compras
"""
import json
from estoque_ios import EstoqueCamisetas

def demo_planejamento():
    print("DEMONSTRAÇÃO DO NOVO PLANEJAMENTO DE COMPRAS")
    print("=" * 50)
    
    # Simular dados de teste
    dados_teste = {
        'unidades': {
            'Santana Geral - SP': {
                'vagas': 100,
                'estoque_atual': {
                    'IOS_REACT': {'PP': 5, 'P': 15, 'M': 25, 'G': 20, 'GG': 10, 'XG': 3, 'XXG': 1, 'ESP': 1},
                    'FLUTTER_PYTHON': {'PP': 2, 'P': 8, 'M': 12, 'G': 15, 'GG': 8, 'XG': 2, 'XXG': 1, 'ESP': 0},
                    'FIGMA_NODEJS': {'PP': 0, 'P': 5, 'M': 10, 'G': 8, 'GG': 5, 'XG': 1, 'XXG': 0, 'ESP': 0}
                },
                'historico_semestres': []
            }
        }
    }
    
    # Salvar dados de teste
    with open('estoque_ios.json', 'w', encoding='utf-8') as f:
        json.dump(dados_teste, f, indent=2, ensure_ascii=False)
    
    print("\nDados de teste criados!")
    print("Unidade: Santana Geral - SP")
    print("\nCursos disponíveis:")
    print("1. IOS + REACT")
    print("2. FLUTTER + PYTHON") 
    print("3. FIGMA + NODEJS")
    
    print("\nEstoque atual:")
    for curso, estoque in dados_teste['unidades']['Santana Geral - SP']['estoque_atual'].items():
        costas, manga = curso.split('_')
        total = sum(estoque.values())
        print(f"  {costas} + {manga}: {total} camisetas")
    
    print("\n" + "=" * 50)
    print("EXEMPLO DE USO:")
    print("1. Execute: python estoque_ios.py")
    print("2. Selecione a unidade 'Santana Geral - SP'") 
    print("3. Escolha opção '4. Planejamento de Compras'")
    print("4. Informe:")
    print("   - Semestre: 2024.2")
    print("   - Selecione cursos: todos ou 1,2,3")
    print("   - Vagas para IOS + REACT: 80")
    print("   - Vagas para FLUTTER + PYTHON: 60")
    print("   - Vagas para FIGMA + NODEJS: 40")
    print("5. O sistema calculará automaticamente:")
    print("   - Quantas camisetas são necessárias de cada tamanho")
    print("   - Quantas já tem em estoque")
    print("   - Quantas precisa comprar")
    print("6. Opção de exportar para Excel")
    
    print("\n" + "=" * 50)
    print("BENEFÍCIOS DO NOVO FLUXO:")
    print("✓ Mais simples: só precisa informar vagas")
    print("✓ Cálculo automático baseado no histórico")
    print("✓ Considera estoque existente")
    print("✓ Relatório detalhado por curso e tamanho")
    print("✓ Exportação para Excel")
    print("✓ Lista de tamanhos atualizada (inclui ESP)")

if __name__ == "__main__":
    demo_planejamento()
