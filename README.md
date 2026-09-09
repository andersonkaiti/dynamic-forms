# Dynamic Forms

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?logo=biome&logoColor=white)

Formulário dinâmico de links construído com **React Hook Form** e reordenação por _drag and drop_ usando **Framer Motion**.

Permite adicionar, remover e reordenar campos de link (título + URL) de forma dinâmica, com uma área dedicada de arraste (_drag handle_) em cada item.

## ✨ Funcionalidades

| Funcionalidade         | Descrição                                                          |
| ---------------------- | ----------------------------------------------------------------- |
| Campos dinâmicos       | Adicionar no início/fim e remover links com `useFieldArray`       |
| Drag and drop          | Reordenação dos itens com uma área de arraste (_handle_) dedicada |
| Gerenciamento de estado | Validação e controle do formulário com React Hook Form           |
| Hooks reutilizáveis    | Lógica encapsulada em `useLinks` e `useDragging`                   |

## 🛠️ Tecnologias

| Tecnologia                                        | Descrição                          |
| ------------------------------------------------- | ---------------------------------- |
| [React 19](https://react.dev/)                    | Biblioteca de UI (com React Compiler) |
| [Vite](https://vite.dev/)                         | Build tool e dev server            |
| [TypeScript](https://www.typescriptlang.org/)     | Tipagem estática                   |
| [React Hook Form](https://react-hook-form.com/)   | Gerenciamento de formulários       |
| [Framer Motion](https://www.framer.com/motion/)   | Animações e drag and drop          |
| [Tailwind CSS](https://tailwindcss.com/)          | Estilização utilitária             |
| [shadcn/ui](https://ui.shadcn.com/)               | Componentes de UI                  |
| [Biome](https://biomejs.dev/)                     | Lint e formatação                  |
| [Husky](https://typicode.github.io/husky/) + [Commitlint](https://commitlint.js.org/) | Git hooks e padrão de commits (Gitmoji) |

## 🚀 Como rodar

Pré-requisitos: [Node.js](https://nodejs.org/) e [pnpm](https://pnpm.io/).

```bash
# Instalar as dependências
pnpm install

# Rodar em modo de desenvolvimento
pnpm dev
```

A aplicação ficará disponível em `http://localhost:3000`.
