# Diretrizes de projeto

## Regras de negócio para estoques
- Entrou uma nota fiscal nova no sistema
- A partir do momento que salvar a nota fiscal, podemos inserir produtos no estoque e associar a nota fiscal previamente cadastrada
- O valor total do produto cadastrada é o preço unitário * quantidade
- O método de venda é baseado na consulta ao estoque
- Sempre utilizar o modelo FIFO, pois o mesmo produto pode estar cadastrado diversas vezes em períodos diferentes e notas diferentes.
- O valor de venda é definido apenas no momento da venda, o estoque guarda apenas o valor de compra

## Regras para cadastro de vendas
- O cliente é opcional
- A venda sempre consulta os produtos em estoque
- O método de consulta do produto é SEMPRE FIFO, ou seja, primeiro que entra, primeiro que sai de estoque
- O valor unitário do produto é cadastrado ali na hora da venda
- A data da venda é preenchida automaticamente
- O valor total da venda é calculado automaticamente

## Controle de autorizações
- Administrador pode fazer tudo no sistema
- Vendedor pode fazer tudo no sistema, com exceção do controle de usuários
- Estoquista pode adicionar, editar e visualizar notas fiscais e seus produtos associados
- Um usuário pode editar sua própria senha e informações apenas
- Somente o administrador pode fazer todas as ações de usuários, inclusive alterar a senha dos outros

## Frontend
### Ferramentas
- Nextjs
- Typescript
- MaterialUI
- Axios

### Layout
- Todo layout organizado em src/components/layout
- Configuração de comunicação com api em src/api
- Não usar o layout padrão do nextjs que já vem iniciado
- **Navbar**:
  - Fixo no topo da tela
  - Responsivo
  - Cor azul e fonte branca
  - Menus:
    - HLP-Market (Home)
    - Produtos
      - Fabricantes
      - Categorias
      - Produtos
    - Notas Fiscais
      - Notas Fiscais
      - Estoque
    - Vendas
      - Clientes
      - Vendas
    - Configurações
      - Usuários
    - Meu perfil (apresentar nome do usuário autenticado)
      - Alterar informações
      - Sair (logout)
- **Layout central:**
  - Todo conteúdo apresentado no centro da tela
  - Conteúdo responsivo
  - Conteúdo dentro de card sempre com título da página no topo
- **Apresentação de lista:**
  - Todo conteúdo listado, em tabelas responsivas
  - A tabela sempre deve conter as informações essenciais e uma coluna extra de ações
  - A coluna ações deve ter as opções: editar, excluir e exibir detalhes
  - Ao excluir, sempre solicitar confirmação
  - Ao fim da tabela sempre um botão de "novo" e exibir um modal com formulário.
  - Ao salvar atualizar a tabela dinamicamente

### Máscaras
- tudo que for valor, no banco é registrado como por exemplo 129.87, porém deve ser exibido como R$ 129,87
- todas as datas devem ser exibidas apenas dd/mm/yyyy, exemplo: 12/10/2025