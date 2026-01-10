# 🎰 Roleta da Sorte - Web SPA

Uma aplicação web interativa de jogos de sorteio, começando com a Roleta da Sorte.

## 🎮 Funcionalidades

### Roleta da Sorte (Implementado)
- **Roleta Dinâmica**: A roleta é atualizada em tempo real conforme você adiciona ou remove opções
- **Personalização Completa**:
  - Editar título da roleta
  - Adicionar/remover opções (mínimo 2 opções)
  - Alterar texto de cada opção
  - Escolher cores personalizadas para cada seção
- **Animação Suave**: Baseada no código Flutter original, com rotação realista e resultado preciso
- **Design Casino**: Bordas douradas, estrela central e estilo profissional
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

### Jogos Futuros (Placeholders)
- 🍾 Girar Garrafa
- 🔢 Sorteio de Números
- 🎲 Jogar Dados
- 📝 Sorteio de Nomes

## 📁 Estrutura do Projeto

```
roleta_da_sorte_web/
├── index.html          # Estrutura HTML da SPA
├── styles.css          # Estilos e design responsivo
├── app.js              # Lógica da aplicação e animação da roleta
├── example_*.*         # Arquivos de exemplo/referência
└── README.md           # Este arquivo
```

## 🚀 Como Usar

1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Na tela inicial, clique em "Roleta da Sorte"
3. No painel da direita:
   - (Opcional) Digite um título personalizado
   - Adicione opções digitando e pressionando Enter ou clicando em "Adicionar"
   - Edite o texto clicando nos campos
   - Altere as cores clicando nos quadrados coloridos
   - Remova opções com o botão "×"
4. Clique em "GIRAR" para sortear
5. O resultado aparecerá abaixo do botão

## 🎨 Layout e Anúncios

O layout segue o padrão dos arquivos exemplo:
- **Desktop**: Anúncios laterais (esquerda e direita) + rodapé
- **Mobile**: Apenas anúncio inferior (bottom ad)
- **Estrutura**: Header → Banner promocional → Conteúdo principal → Ads

## 🛠️ Tecnologias

- HTML5 Canvas para desenho da roleta
- CSS3 com Grid e Flexbox para layout responsivo
- JavaScript Vanilla (sem frameworks)
- Animações baseadas em requestAnimationFrame

## 📱 Compatibilidade

- ✅ Chrome/Edge (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Características Técnicas

### Algoritmo da Roleta
Baseado no código Flutter original (`example_roulette_page.dart`):
- Rotação entre 5-8 voltas completas
- Curva de animação ease-out cubic
- Cálculo preciso do resultado com base no ângulo final
- Normalização de ângulos para evitar overflow

### Design Responsivo
- Grid layout adaptável
- Canvas responsivo com aspect ratio preservado
- Oculta ads laterais em telas menores
- Menu empilhado em mobile

## 🔄 Próximas Atualizações

- [ ] Implementar "Girar Garrafa"
- [ ] Implementar "Sorteio de Números"
- [ ] Implementar "Jogar Dados"
- [ ] Implementar "Sorteio de Nomes"
- [ ] Adicionar sons de rotação e resultado
- [ ] Salvar favoritos no localStorage
- [ ] Modo escuro
- [ ] Compartilhamento de roletas

## 📝 Notas do Desenvolvedor

Este projeto foi criado como uma versão web de um aplicativo Flutter existente. A lógica da roleta foi cuidadosamente adaptada para JavaScript mantendo a mesma física e comportamento do app original.

---

Desenvolvido com ❤️ para sorteios divertidos!
