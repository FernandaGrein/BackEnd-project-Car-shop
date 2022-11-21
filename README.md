# Car Shop Project 

Neste projeto foi construido uma API para gerenciar uma concessionária de veículos utilizando o banco de dados MongoDB com o framework Mongoose

Tecnologias, linguagens e aprendizados utilizados:
- Html, Css, TypeScript
- MongoDB com Mongoose
- Docker
- Node.Js com Express
- testes unitários e  testes de integração com Mocha Chai Sinon e Supertest
- API restfull 
- Programação Orientada à Objetos

Para acessar este projeto clone este repositório e acesse a pasta seguindo os passos a baixo: 
- git clone git@github.com:FernandaGrein/BackEnd-project-Car-shop.git
- cd BackEnd-project-Car-shop
- docker-compose up -d
- docker exec -it car_shop bash
- npm install

Foram cumpridos os seguintes requisitos: 
Foram criadas rotas para que seja possível realizar um CRUD completo na rota '/cars', assim é possível cadastrar um novo carro, filtrar todos os existentes no banco ou apenas um pelo Id, atualizar um carro que exista no banco ou deletar um veiculo.
- Do mesmo modo foram criadas rotas em que é Possível realizar um crud completo para a rota '/motorcycle', cadastrando uma nova moto, filtrando todas ou uma pelo Id, atualizando ou deletando uma moto do banco.
- No mais foram feitos testes de unidade da camada service, testando cada uma das funções separadamente e foram feitos testes de integração testando todas as rotas criadas de forma completa.
