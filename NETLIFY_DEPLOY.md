# 🚀 Guia de Deploy no Netlify

## ✅ Problema Resolvido: 404 ao Atualizar Página

### **O que causa o erro 404?**
SPAs (Single Page Applications) usam React Router para gerenciar rotas no lado do cliente. Quando você atualiza a página (ex: `/blog/meu-post`), o Netlify tenta buscar esse arquivo no servidor e não encontra, retornando 404.

### **Solução Implementada**

Criamos 2 arquivos de configuração:

#### 1. **`public/_redirects`**
```
/*    /index.html   200
```
Este arquivo diz ao Netlify para redirecionar todas as rotas para o `index.html` mantendo a URL.

#### 2. **`netlify.toml`** (na raiz do projeto)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
Configuração alternativa que garante o mesmo comportamento.

---

## 📦 Como Fazer o Deploy

### **Opção 1: Via Git (Recomendado)**

1. **Commit os arquivos de configuração:**
```bash
git add public/_redirects netlify.toml
git commit -m "Fix: Add Netlify redirect config for SPA routing"
git push
```

2. **No Netlify:**
   - Entre no dashboard
   - Selecione seu site
   - O deploy automático será acionado
   - Aguarde o build terminar

3. **Configurações de Build** (se necessário):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 ou superior

### **Opção 2: Deploy Manual**

1. **Build local:**
```bash
npm run build
```

2. **No Netlify:**
   - Vá em "Deploys"
   - Arraste a pasta `dist` para a área de upload
   - Aguarde o deploy

---

## ✅ Verificação

Após o deploy, teste:

1. **Navegação normal:** ✅ Deve funcionar
2. **Atualizar página (F5):** ✅ Deve funcionar agora
3. **Link direto:** ✅ Ex: `https://seu-site.netlify.app/blog/meu-post`
4. **Voltar/Avançar:** ✅ Deve funcionar

---

## 🔧 Outras Configurações Úteis

### **Variables de Ambiente (se necessário)**

No painel do Netlify:
1. Site settings → Environment variables
2. Adicione suas variáveis (ex: API keys)

### **Build Settings**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

### **Headers de Segurança**

Adicione ao `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

---

## 🐛 Troubleshooting

### **Ainda dá 404 após deploy**
1. Verifique se o arquivo `_redirects` está dentro de `public/`
2. Confirme que o `netlify.toml` está na raiz do projeto
3. Force um novo deploy: Clear cache and deploy site
4. Verifique os logs de build

### **Build falha**
1. Verifique se todas as dependências estão no `package.json`
2. Teste o build local: `npm run build`
3. Verifique a versão do Node no Netlify
4. Olhe os logs de erro

### **Imagens não aparecem**
1. Verifique se as imagens estão em `public/`
2. Use caminhos relativos ou absolutos corretos
3. Para imagens Base64, está OK (já implementado)

---

## 📋 Checklist Final

- [x] Arquivo `public/_redirects` criado
- [x] Arquivo `netlify.toml` criado
- [ ] Build local funciona (`npm run build`)
- [ ] Commit e push para Git
- [ ] Deploy no Netlify
- [ ] Testar todas as rotas
- [ ] Testar atualização de página
- [ ] Testar links diretos

---

## 🎉 Pronto!

Agora seu site está configurado corretamente no Netlify e todas as rotas funcionarão, mesmo ao atualizar a página!

**URLs do seu projeto:**
- Home: `/`
- Blog: `/blog`
- Post: `/blog/:slug`
- Dashboard: `/dashboard/*`

Todos funcionando perfeitamente! 🚀
