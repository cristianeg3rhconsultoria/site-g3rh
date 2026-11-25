# Site institucional | G3RH Consultoria & Treinamento

Site de página única da G3RH Consultoria & Treinamento, administrada por Cristiane Almeida.
Feito com React 19, Vite 7, TypeScript, Tailwind CSS 4 e Lucide, com pré-renderização
(o HTML já sai pronto do build, o que ajuda o Google a ler o conteúdo).

## Como o site é publicado

O código fica no GitHub da G3RH e a Cloudflare Pages está ligada a ele. Toda alteração
salva no GitHub (pelo painel ou por um programador) é publicada sozinha em 1 a 3 minutos.
Se uma alteração quebrar o build, a Cloudflare mantém no ar a última versão que funcionou.

Configuração do projeto na Cloudflare Pages:

| Campo | Valor |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Variável de ambiente | `NODE_VERSION` = `22` |

Para rodar no computador:

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # gera dist/ já pré-renderizado, com sitemap.xml
npm run preview   # serve o build localmente
```

## Estrutura da página

Faixa superior (WhatsApp, e-mail, redes, atalho do currículo) → menu fixo no topo →
capa → Sobre a G3RH → Para empresas (serviços, como trabalhamos, necessidades × soluções)
→ Para profissionais → Cristiane Almeida (cargos e atuação) → Na prática (fotos) →
Metodologia M.EAG → Cadastro de currículo → Perguntas frequentes → Contato → rodapé.
Botão flutuante do WhatsApp em todas as telas. Política de privacidade em `/#privacidade`.

## Onde editar

**Textos, contatos, serviços e fotos:** pelo painel em https://app.pagescms.org, sem
programar. O painel é configurado em `.pages.yml` e grava nos arquivos de `conteudo/`:

| Tela do painel | Arquivo |
| --- | --- |
| 1. Contatos e dados gerais (WhatsApp, e-mails, redes, nome, cargo) | `conteudo/geral.json` |
| 2. Capa | `conteudo/inicio.json` |
| 3. Sobre a G3RH | `conteudo/g3rh.json` |
| 4. Serviços (empresas, profissionais, etapas, tabela, chamada) | `conteudo/servicos.json` |
| 5. Cristiane Almeida | `conteudo/cristiane.json` |
| 6. Fotos dos treinamentos | `conteudo/fotos.json` |
| 7. Metodologia M.EAG | `conteudo/metodologia.json` |
| 8. Cadastro de currículo | `conteudo/curriculo.json` |
| 9. Perguntas frequentes | `conteudo/perguntas.json` |
| 10. Política de privacidade | `conteudo/privacidade.json` |

As fotos enviadas pelo painel ficam em `public/images/`. Os arquivos em `src/content/`
só leem esses JSON e preparam os dados para as seções; se uma foto ficar vazia por
engano, o site usa a foto padrão.

**Ícones:** os nomes disponíveis estão em `src/lib/icons.ts` e na lista do `.pages.yml`.
Para acrescentar um, inclua nos dois lugares.

**Só com programador:** cores e fontes (`src/styles/index.css`), layout das seções
(`src/sections/`), menu e endereço do site (`src/config/site.ts`), título e descrição para
o Google (`index.html`).

## Formulários (currículo e proposta)

Os formulários são enviados por e-mail pelo [FormSubmit](https://formsubmit.co),
serviço gratuito, sem cadastro. Cada um vai para um endereço, editável no painel
(tela “Contatos e dados gerais”, arquivo `conteudo/geral.json`):

| Formulário | Campo | E-mail |
| --- | --- | --- |
| Cadastre seu currículo | `emailCurriculos` | g3rhconsultoria.recrutamento@gmail.com |
| Solicite uma proposta | `email` | cristiane.g3rhconsultoria@gmail.com |

O currículo chega anexado (PDF ou Word, até 5 MB). O e-mail de currículos também
aparece na seção do candidato, como alternativa ao formulário.

1. Publique o site e envie um teste de **cada** formulário.
2. O FormSubmit manda um e-mail de ativação para cada endereço: clique em “Activate”
   nos dois (confira a caixa de spam).
3. Sempre que um desses e-mails for trocado, o primeiro envio gera uma nova ativação.

Os dois formulários pedem consentimento (LGPD) e linkam a política de privacidade.
O texto da política fica em `conteudo/privacidade.json`.

## Google: aparecer como G3RH e com Cristiane como administradora

O site já envia ao Google dados estruturados (`src/components/JsonLd.tsx`) dizendo que a
G3RH é uma empresa de serviços profissionais e que Cristiane Almeida é a administradora,
além das perguntas frequentes. Para isso aparecer nas buscas:

1. Cadastre o domínio no Google Search Console e envie o `sitemap.xml`.
2. Crie o Perfil da Empresa no Google (Google Business Profile) da G3RH, com o site,
   telefone, categoria “Consultoria de recursos humanos” e fotos.
3. No LinkedIn da Cristiane, coloque a G3RH como experiência atual, cargo “Administradora”,
   e o link do site.
4. O endereço https://g3rh.com.br já está configurado em `site.url`, `canonical`, `og:url` e `og:image`.

## Imagens

- Fotos do site (editáveis pelo painel): `public/images/`, em WebP. Para manter o site
  leve, envie fotos com até 1.600 px de largura.
- A foto da Cristiane na capa precisa ter fundo transparente (PNG ou WebP).
- Logotipo (não editável pelo painel): `src/assets/images/logo-*.webp` e `simbolo-*.webp`.

## Estrutura do código

```
src/
├── assets/        fontes e imagens
├── components/    peças reutilizáveis (Logo, formulários, WhatsApp, política, JSON-LD…)
├── config/        configurações gerais e menu
├── content/       leitura do conteúdo (os textos ficam em conteudo/*.json)
├── hooks/         seção ativa no menu, estado de rolagem
├── lib/           formulários, ícones, fotos padrão
├── sections/      TopBar, Header, Hero, Brand, Business, Individuals, Founder,
│                  Gallery, Method, Careers, Faq, Contact, Footer
├── styles/        CSS global e tokens de design
├── entry-server.tsx  renderização no build (pré-renderização)
└── main.tsx       entrada do navegador
conteudo/          textos, contatos e listas editados pelo painel
public/images/     fotos editadas pelo painel
.pages.yml         configuração do painel (Pages CMS)
scripts/prerender.mjs  injeta o HTML pronto em dist/index.html e gera o sitemap
```

## Acessibilidade e desempenho

Link para pular ao conteúdo, foco visível, um único h1, menu e submenu operáveis pelo
teclado (Esc fecha), formulários com rótulos e mensagens de erro, animações que respeitam
`prefers-reduced-motion`, fontes locais e imagens em WebP.
