# MapApp - Gerenciador de Localizações

Um aplicativo React moderno para gerenciar e explorar localizações em tempo real usando Google Maps, com suporte a tema claro/escuro e persistência de dados.

## Sobre o Projeto

**MapApp** é um gerenciador de localizações interativo que permite:
- Clicar no mapa para selecionar coordenadas
- Buscar endereços via geocoding
- Salvar localizações favoritas com persistência
- Trocar entre tema claro e escuro
- Layout totalmente responsivo (mobile, tablet, desktop)

Ideal para explorar locais, definir pontos de interesse e gerenciar uma lista de endereços salvos.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| **React** | 19.2.0 | Framework UI |
| **Vite** | 7.3.1 | Build tool |
| **TailwindCSS** | 4.1.18 | Styling |
| **Zustand** | 4.5.5 | State management |
| **Google Maps API** | weekly | Mapa interativo |
| **React Query** | 5.90.21 | Data fetching |

---

## Como Instalar

### Requisitos
- **Node.js** 20.19+ ou 22.12+
- **npm** 9+

### Passo 1: Clonar o Repositório
```bash
git clone <seu-repositorio>
cd project-frontend
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
VITE_GOOGLE_MAPS_KEY=seu_google_maps_api_key_aqui
```

Para obter a chave:
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a **Google Maps JavaScript API**
4. Crie uma chave de API (restricione por domínios)
5. Cole a chave no `.env.local`

### Passo 4: Rodar em Desenvolvimento
```bash
npm run dev
```

Abra `http://localhost:5174/` no navegador.

---

## Como Usar

### Usando o Mapa
- **Clique** em qualquer ponto do mapa para marcar uma localização
- Um **marcador** aparecerá com as coordenadas (latitude/longitude)
- As coordenadas são exibidas em tempo real no painel inferior

### Salvar Favoritos
- Após clicar no mapa, clique no botão **"Salvar Local"**
- Digite um nome para o local (ex: "Casa", "Trabalho")
- O local é salvo e aparece na barra de **Favoritos** (lado direito)

### Buscar Endereços
- Digite um endereço na **barra de busca** (ex: "Rua Principal, São Paulo")
- Pressione Enter ou clique no botão de busca
- O mapa centra automaticamente no local encontrado

### Acessar Favoritos
- Clique em qualquer favorito na lista **Favoritos**
- O mapa centra e exibe um marcador do local
- Clique no ícone de lixo para deletar um favorito

### Trocar Tema
- Clique no ícone **Lua/Sol** no header
- App alterna entre tema claro e escuro
- O tema é salvo automaticamente

---

## Estrutura de Pastas

```
project-frontend/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Map.jsx          # Componente do mapa
│   │   ├── SearchBar.jsx    # Barra de busca
│   │   └── FavoritesPanel.jsx # Painel de favoritos
│   ├── store/               # Estado global (Zustand)
│   │   ├── favoriteStore.js
│   │   └── themeStore.js
│   ├── App.jsx              # Componente principal
│   ├── main.jsx
│   ├── index.css            # Estilos globais
│   └── assets/
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Funcionalidades Principais

### Mapa Interativo
- Clique para selecionar coordenadas
- Visualização em tempo real de latitude/longitude
- Animação de marcadores (DROP animation)
- Tema ajustável (claro/escuro)

### Busca Geocoding
- Busca dinâmica de endereços
- Integração com Google Geocoding API
- Loading e tratamento de erros
- Auto-centralização do mapa

### Favoritos Persistentes
- Salve localizações com nomes personalizados
- Armazenamento em localStorage
- Sincronização com o mapa
- Deletar favoritos facilmente

### Tema Claro/Escuro
- Toggle visual no header
- Sincronização com Google Maps (estilos dark)
- Persistência com localStorage
- Transições suaves entre temas

### Layout Responsivo
- Design mobile-first
- Adapta para tablet e desktop
- Grid automático (1 coluna mobile → 3 colunas desktop)
- Sidebar retrátil em mobile

---

## Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

Os arquivos gerados estarão em `dist/`.

---

## Troubleshooting

### Mapa não aparece
- Verifique se a chave Google Maps está correta em `.env.local`
- Confirme que a API está habilitada no Google Cloud Console
- Abra o DevTools (F12) e verifique erros no console

### Busca retorna erro
- Verifique se tem conexão com a internet
- Confirme que o endereço existe
- Tente buscar com um intervalo maior de informação

### Favoritos não persistem
- Abra DevTools (F12) → Application → LocalStorage
- Verifique se há dados salvos
- Limpe cache: `Ctrl+Shift+Delete` e tente novamente

### Tema não muda
- Recarregue a página (F5)
- Limpe o localStorage: abra console e execute `localStorage.clear()`
- Recarregue novamente

---

## Próximas Melhorias

- [ ] Exportar favoritos como CSV/JSON
- [ ] Compartilhar favoritos via link
- [ ] Histórico de buscas recentes
- [ ] Categorizar favoritos
- [ ] Autocomplete ao digitar endereço
- [ ] Geolocalização automática

