# 🌐 Checklist CAIDI - Aplicação Web

**Ferramenta de Observação e Apoio para Alunos com Sinais de PEA**

Desenvolvido por: Joana Miguel e Joana Carvalho (NIDCAIDI/CAIDI)  
Para: Agrupamento de Escolas Padre Vitor Melícias

---

## 📋 O que é isto?

Esta é uma **aplicação web gratuita** que permite aos professores:
- ✅ Preencher a checklist online (computador, tablet ou telemóvel)
- ✅ Gerar relatório automaticamente
- ✅ Guardar como PDF
- ✅ Tudo funciona no navegador - **dados ficam privados** (não vão para servidor)

---

## 🚀 Como Hospedar no GitHub (GRÁTIS!)

### **PASSO 1: Criar Conta no GitHub**

1. Vai a https://github.com
2. Clica em "Sign up" (Registar)
3. Escolhe um username (ex: `caidi-nidcaidi` ou `joana-caidi`)
4. Usa o teu email
5. Cria uma password forte
6. Verifica o email

**💰 Custo: €0** ✅

---

### **PASSO 2: Criar Repositório**

1. Depois de fazer login, clica no **+** no canto superior direito
2. Escolhe **"New repository"**
3. Preenche:
   - **Nome do repositório:** `checklist-pea` (ou outro nome)
   - **Descrição:** "Checklist de Observação e Apoio - PEA (CAIDI)"
   - Marca como **Public** (tem que ser público para GitHub Pages grátis)
   - Marca **"Add a README file"**
4. Clica **"Create repository"**

🎉 Repositório criado!

---

### **PASSO 3: Upload dos Ficheiros**

1. No teu repositório, clica em **"Add file"** → **"Upload files"**

2. Arrasta TODOS estes ficheiros para a janela:
   ```
   ✅ index.html
   ✅ style.css
   ✅ dados.js
   ✅ app.js
   ✅ logo-caidi.png
   ```

3. Escreve uma mensagem (ex: "Primeira versão da checklist")

4. Clica **"Commit changes"**

⏱️ Os ficheiros vão fazer upload (pode demorar 1-2 minutos)

---

### **PASSO 4: Ativar GitHub Pages**

1. No teu repositório, clica em **"Settings"** (⚙️ Definições)

2. No menu lateral esquerdo, procura **"Pages"**

3. Em **"Source"** (Fonte):
   - Escolhe **"Deploy from a branch"**
   - Em **"Branch"**: escolhe **"main"**
   - Em **"Folder"**: deixa **"/ (root)"**

4. Clica **"Save"**

5. **AGUARDA 2-3 MINUTOS** ⏰

6. Refresca a página

7. Verás uma mensagem verde no topo:
   ```
   ✅ Your site is live at https://[teu-username].github.io/checklist-pea/
   ```

---

## 🎊 PRONTO! A aplicação está online!

O teu URL será algo como:
```
https://caidi-nidcaidi.github.io/checklist-pea/
```

Podes partilhar este link com todos os professores do agrupamento!

---

## 📱 Como Usar a Aplicação

### **Para Professores:**

1. Abre o link no navegador
2. Preenche os dados do aluno
3. Vai avaliando cada sinal (0, 1 ou 2)
4. Clica em **"📊 Gerar Relatório"**
5. Revê o relatório
6. Clica em **"💾 Guardar como PDF"** → isto abre a janela de impressão
7. Escolhe **"Guardar como PDF"** em vez de imprimir

### **Privacidade:**
- ✅ Todos os dados ficam no navegador do professor
- ✅ NADA é enviado para servidores
- ✅ Cada professor tem os seus dados separados
- ✅ Completamente privado e seguro

---

## 🔧 Fazer Alterações Depois

Se quiseres mudar algo (cores, texto, etc):

1. Vai ao teu repositório no GitHub
2. Clica no ficheiro que queres editar (ex: `style.css`)
3. Clica no ✏️ (ícone de lápis) no canto superior direito
4. Faz as mudanças
5. Clica **"Commit changes"**
6. Aguarda 2-3 minutos
7. Refresca a página da aplicação

As mudanças aparecem automaticamente!

---

## 💡 Domínio Personalizado (Opcional)

Se o CAIDI tiver domínio próprio (ex: `caidi.pt`), podes configurar:

**Em vez de:** `https://caidi-nidcaidi.github.io/checklist-pea/`  
**Ter:** `https://checklist.caidi.pt/`

**Como fazer:**
1. No GitHub Settings → Pages
2. Em "Custom domain", escreve `checklist.caidi.pt`
3. No painel do teu domínio (onde compraste), adiciona:
   - **Tipo:** CNAME
   - **Nome:** checklist
   - **Valor:** `caidi-nidcaidi.github.io`
4. Aguarda propagação (pode demorar 24h)

Mas isto é **OPCIONAL** - o link do GitHub funciona perfeitamente!

---

## 🆘 Preciso de Ajuda?

### **Não consigo fazer upload dos ficheiros**
→ Certifica-te que o ficheiro se chama exatamente `index.html` (não `index.html.txt`)

### **A página não aparece**
→ Aguarda 5 minutos e refresca. O GitHub Pages demora um bocado na primeira vez.

### **O logo não aparece**
→ Verifica se o ficheiro `logo-caidi.png` está na mesma pasta que os outros ficheiros.

### **Quero mudar as cores**
→ Edita o ficheiro `style.css` no GitHub, procura por `:root` no início e muda os valores das cores.

---

## 📊 Estatísticas de Uso (Opcional)

Se quiseres ver quantas pessoas usam:

1. Regista-te no Google Analytics (grátis)
2. Copia o código de tracking
3. Cola no final do ficheiro `index.html` antes de `</body>`
4. Faz commit

Assim consegues ver:
- Quantos acessos
- De que dispositivos (computador/tablet/telemóvel)
- Quais os sinais mais avaliados

---

## ✅ Vantagens desta Solução

| Característica | Valor |
|---------------|-------|
| 💰 Custo | €0 / ano |
| 📱 Dispositivos | Todos (computador, tablet, telemóvel) |
| 🔒 Privacidade | Total (dados não saem do navegador) |
| 🌍 Acesso | Qualquer lugar com internet |
| 📄 Relatório PDF | Sim |
| 🔄 Atualizações | Fáceis (editar no GitHub) |
| ⚡ Velocidade | Muito rápida |
| 📊 Offline | Não (precisa internet) |

---

## 🎨 Personalizar Cores CAIDI

Se quiseres ajustar as cores:

1. Edita `style.css`
2. Procura por `:root` no início
3. Muda os valores:

```css
:root {
    --caidi-primary: #45A29B;  /* Verde água principal */
    --caidi-light: #B8D8D5;    /* Verde água claro */
    --caidi-dark: #2D6A63;     /* Verde escuro */
}
```

---

## 📞 Suporte

Criado por **Joana Miguel e Joana Carvalho**  
NIDCAIDI - Núcleo de Investigação e Desenvolvimento  
CAIDI - Centro de Apoio e Intervenção no Desenvolvimento Infantil

---

## 📜 Licença

© CAIDI 2024 - Todos os direitos reservados  
Uso exclusivo: Agrupamento de Escolas Padre Vitor Melícias

---

**🎉 Parabéns! Tens agora uma aplicação web profissional e gratuita!**
