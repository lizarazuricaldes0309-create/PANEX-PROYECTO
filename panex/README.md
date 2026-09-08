# PANEX 🍞 — Tienda de panes bolivianos

Proyecto de tienda en línea para una panadería boliviana, hecho con:

- **React + Vite** (interfaz)
- **Tailwind CSS** (estilos)
- **Supabase** (base de datos, login de clientes, reseñas, pedidos)
- **Vercel** (para publicar la página)
- **Git / GitHub** (control de versiones)

---

## 1. Estructura del proyecto

```
panex/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── .env.example          <- copiar como .env
├── supabase/
│   └── schema.sql         <- pegar en el SQL Editor de Supabase
├── public/
│   └── pan-icon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/                <- conexión a Supabase, WhatsApp, validaciones
    ├── data/                <- catálogo de panes y lista de países
    ├── context/             <- carrito de compras y sesión de usuario
    ├── components/          <- Navbar, Footer, tarjetas, carrito, mapa, etc.
    └── pages/                <- Inicio, Ingresar, Registrarse, Perfil, Reseñas, Admin
```

---

## 2. Instalar y correr en tu computadora (Visual Studio Code)

1. Abre la carpeta `panex` en Visual Studio Code.
2. Abre una terminal (`Ctrl + ñ` o `Terminal > Nueva terminal`) y ejecuta:
   ```bash
   npm install
   ```
3. Copia el archivo `.env.example` y renómbralo a `.env`. Ahí vas a pegar tus datos reales de Supabase y tu número de WhatsApp (ver paso 3).
4. Corre el proyecto:
   ```bash
   npm run dev
   ```
5. Abre el link que aparece en la terminal (normalmente `http://localhost:5173`).

---

## 3. Configurar Supabase (base de datos + login)

1. Ve a [supabase.com](https://supabase.com), crea una cuenta y crea un **New Project**.
2. Cuando esté listo, ve a **SQL Editor** → **New query**, pega **todo** el contenido de `supabase/schema.sql` y dale a **Run**. Esto crea:
   - `profiles` (clientes registrados)
   - `categories` (secciones de pan)
   - `products` (tus panes, administrables)
   - `payment_methods` (efectivo, QR, transferencia)
   - `orders` (pedidos)
   - `reviews` (reseñas de clientes)
3. Ve a **Settings → API** y copia:
   - **Project URL** → pégalo en `.env` como `VITE_SUPABASE_URL`
   - **anon public key** → pégalo en `.env` como `VITE_SUPABASE_ANON_KEY`
4. Para permitir el login con **Google**: ve a **Authentication → Providers → Google**, actívalo y sigue los pasos de Google Cloud Console que te indica Supabase.
5. Para permitir el login con **teléfono (SMS)**: ve a **Authentication → Providers → Phone** y conecta un proveedor de SMS (por ejemplo Twilio) siguiendo la guía de Supabase.
6. Para volverte administrador y poder usar `/admin`:
   - Regístrate normalmente en tu propia página.
   - Ve a **Table editor → profiles** en Supabase, busca tu usuario y cambia `is_admin` a `true`.

### Cargar el catálogo inicial de panes

El catálogo de ejemplo ya está en `src/data/breads.js` con más de 25 panes bolivianos. Para que aparezcan también en Supabase (y así poder editarlos desde `/admin`), puedes:
- Insertarlos manualmente desde el panel `/admin` de la página, o
- Escribir un `insert into public.products (...) values (...)` en el SQL Editor usando esos mismos datos.

---

## 4. Configurar tu WhatsApp y redes sociales

En tu archivo `.env`:

```
VITE_WHATSAPP_NUMBER=59171234567     # tu número, con código de país, sin "+"
VITE_TIKTOK_URL=https://www.tiktok.com/@tu_usuario
VITE_FACEBOOK_URL=https://www.facebook.com/tu_pagina
```

Cuando un cliente termina su compra, se abre WhatsApp con el pedido ya escrito (productos, cantidades y total) listo para enviarte.

---

## 5. Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Primer commit de PANEX"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/panex.git
git push -u origin main
```

> El archivo `.gitignore` ya está configurado para que tu `.env` (con tus claves privadas) **nunca** se suba a GitHub.

---

## 6. Publicar en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Dale a **Add New → Project** y elige el repositorio `panex`.
3. Vercel detecta automáticamente que es un proyecto Vite.
4. Antes de darle a **Deploy**, entra a **Environment Variables** y agrega las mismas variables de tu `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER`
   - `VITE_TIKTOK_URL`
   - `VITE_FACEBOOK_URL`
5. Dale a **Deploy**. En un par de minutos tendrás tu página en línea con un link de Vercel.

---

## 7. Reemplazar las imágenes de ejemplo

Las imágenes del catálogo usan un buscador genérico de fotos para que la página se vea completa desde el primer momento. Para poner tus propias fotos:

1. En Supabase ve a **Storage → New bucket**, créalo como público (por ejemplo `productos`).
2. Sube tus fotos ahí.
3. Copia el link público de cada imagen y pégalo en el campo "URL de la imagen" al crear o editar un producto desde `/admin`.

---

## 8. Ideas para seguir mejorando

- Conectar un proveedor real de QR de pago (Banco Unión, Tigo Money, etc.) y guardar el código en `payment_methods`.
- Agregar notificaciones por correo cuando llega un pedido nuevo (Supabase Edge Functions).
- Agregar un dominio propio en Vercel (Settings → Domains).
