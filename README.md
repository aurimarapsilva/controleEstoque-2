# estoque

Instruções:
    Obrigatórias:
        instalar dependencias
            yarn
        
        Criar base de dados
            yarn sequelize db:create

        Criar tabelas no banco
            yarn sequelize db:migrate
    
    Conhecimento:
        Criar migrations
            yarn sequelize migration:create --name=create-products

        Voltar migrate
            yarn sequelize db:migrate:undo