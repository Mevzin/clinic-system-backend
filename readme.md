# Clinic system API Rest Node Ts
Desenvolvido por [Thiago Torres](https://github.com/mevzin)

#### Projeto desenvolvido com Node Ts

### Tecnologias utilizadas
- [Express](https://www.npmjs.com/package/express)
- [Typescript](https://github.com/Microsoft/TypeScript)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Mongoose](https://www.npmjs.com/package/mongoose)

### Como rodar o projeto

1 - Clone o repositório

2 - Instale as dependeências
    
    npm install
    yarn

3 - Crie um aquivo ".env" e o preencha com os seguintes campos

    PORT=
    MONGO_URI=
    SALT=
    PRIVATE_KEY_JWT=

4 - Execute o projeto

    npm start
    yarn start

#### Requisitos
##### Usuario
[x] - Usuario deve ser cadastrado como medico com validação de email, senha e nome.</br>
[x] - Usuario deve conseguir cadastrar um paciente.</br>
[-] - Usuario deve conseguir deletar um paciente.</br>
[-] - Usuario deve conseguir atualizar os dados de um paciente.</br>
[-] - Usuario deve criar um agendamento para um paciente.</br>
[-] - Usuario deve mudar os status de um agendamento de um paciente.</br>

##### Agendamento

[-] - Um agendamento só pode ser criado para o dia seguinte.</br>
[-] - Um agendamento deve atualizar para "Invalido" no seus status apos passar da data marcada.</br>

##### Consultas

[-] - Uma consulta deve ser gerada de um agendamento.</br>
[-] - Uma consulta deve possuir todos os dados do medico e do paciente.</br>
[-] - Uma consulta deve gerar uma lista de exames solicitados.</br>
[-] - uma consulta deve possuir data e hora do atendimento.</br>