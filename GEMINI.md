# Diretrizes de projeto

## Regras de negócio para estoques
- Entrou uma nota fiscal nova no sistema
- A partir do momento que salvar a nota fiscal, podemos inserir produtos no estoque e associar a nota fiscal previamente cadastrada
- O valor total do produto cadastrada é o preço unitário * quantidade
- O método de venda é baseado na consulta ao estoque
- Sempre utilizar o modelo FIFO, pois o mesmo produto pode estar cadastrado diversas vezes em períodos diferentes e notas diferentes.
- O valor de venda é definido apenas no momento da venda, o estoque guarda apenas o valor de compra