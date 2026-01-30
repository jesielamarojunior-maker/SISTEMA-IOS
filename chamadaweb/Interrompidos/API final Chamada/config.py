import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'sua-chave-secreta-super-segura-aqui')
    DATABASE_URL = os.getenv('DATABASE_URL')
    
    # Configurações específicas do IOS
    MAX_TURMAS_POR_PROFESSOR = 4
    TIPOS_PROFESSOR = ['instrutor', 'monitor', 'pedagoga']