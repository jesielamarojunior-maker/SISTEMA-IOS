#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corrigir caracteres corrompidos no App.js
"""

import re

# Mapeamento de caracteres corrompidos para corretos
REPLACEMENTS = {
    # Vogais com acentos
    'í¡': 'á',
    'í©': 'é',
    'í­': 'í',
    'í³': 'ó',
    'íº': 'ú',
    'íª': 'ê',
    'í¢': 'â',
    'í´': 'ô',
    'í£': 'ã',
    'íµ': 'õ',
    'í§': 'ç',
    
    # Outras correções
    'íƒ': 'Ã',
    'í"': 'Ó',
    'í•': 'Õ',
    'íRIA': 'ÁRIA',
    'í‡': 'Ç',
    
    # Aspas e símbolos
    '"': '"',
    '"': '"',
    ''': "'",
    'â€¢': '•',
    'âš': '⚠',
    'âŒ': '❌',
    '¸': '⚠',
    '€': '🔄',
    'Ž¯': '🔍',
    'Ž‰': '🎉',
    '"Š': '📊',
    '"„': '🔁',
    '"ˆ': '🧮',
    '¥': '📋',
    '—'': '🗑',
    
    # Emoticons específicos
    '¿½': '🔧',
    '¨': '🔍',
    '" ': '🔐 ',
    "'¡': '💡',
    '"'': '⏰',
}

def fix_file(input_path, output_path=None):
    """Corrige caracteres corrompidos no arquivo"""
    if output_path is None:
        output_path = input_path
    
    # Ler arquivo
    with open(input_path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    # Aplicar substituições
    for wrong, correct in REPLACEMENTS.items():
        content = content.replace(wrong, correct)
    
    # Salvar arquivo corrigido
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Arquivo corrigido: {output_path}")

if __name__ == "__main__":
    import sys
    
    app_js_path = r"c:\Users\Participante IOS.DESKTOP-DHQGCTG\Desktop\SISTEMA-IOS-main mongo DB\frontend\src\App.js"
    
    print("🔧 Corrigindo caracteres corrompidos no App.js...")
    fix_file(app_js_path)
    print("✅ Correção concluída!")
