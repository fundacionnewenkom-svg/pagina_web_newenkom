# NewenKom + Barbería El Paisa → WordPress · Guía de instalación

## Paso 1 — Generar los archivos de la app

En la carpeta del proyecto, ejecuta en PowerShell:

```powershell
npm run build:wp
```

Esto genera la carpeta `wordpress-export/` con:

| Archivo | Contenido |
|---------|-----------|
| `assets/nk-app.js` | App React principal (todas las rutas) |
| `assets/nk-CursoIA.js` | Chunk lazy de la landing Curso IA |
| `assets/nk-BarberiaPaisa.js` | Chunk lazy de Barbería El Paisa (página) |
| `assets/nk-BarberiaLanding.js` | Chunk lazy de Barbería El Paisa (landing conversión) |
| `assets/nk-index-wp.css` | Todos los estilos |

---

## Paso 2 — Subir los archivos al servidor

Sube la carpeta `wordpress-export/` completa al directorio de tu tema activo y renómbrala `newenkom-app`.

La estructura final debe quedar:
```
/wp-content/themes/TU-TEMA/newenkom-app/
  assets/
    nk-app.js
    nk-CursoIA.js
    nk-BarberiaPaisa.js
    nk-BarberiaLanding.js
    nk-index-wp.css
  favicon.svg
```

> Reemplaza `TU-TEMA` por el nombre real de tu tema activo (ej. `twentytwentyfour`).

---

## Paso 3 — Instalar los templates PHP

Sube los 4 archivos PHP a la carpeta raíz de tu tema:

```
/wp-content/themes/TU-TEMA/page-home.php
/wp-content/themes/TU-TEMA/page-curso-ia.php
/wp-content/themes/TU-TEMA/page-barberia-paisa.php
/wp-content/themes/TU-TEMA/page-barberia-landing.php
```

---

## Paso 4 — Crear las páginas en WordPress Admin

### Página principal (Newenkom)
1. **Páginas → Añadir nueva**
2. Título: `Inicio`
3. Atributos → **Plantilla**: `NewenKom – Página Principal`
4. Publicar

### Landing Curso IA
1. **Páginas → Añadir nueva**
2. Título: `Curso IA para Docentes`
3. Atributos → **Plantilla**: `NewenKom – Curso IA (Landing Page)`
4. Publicar

### Barbería El Paisa — Página principal
1. **Páginas → Añadir nueva**
2. Título: `Barbería El Paisa`
3. Atributos → **Plantilla**: `Barbería El Paisa – Página Principal`
4. Publicar

### Barbería El Paisa — Landing de conversión
1. **Páginas → Añadir nueva**
2. Título: `Barbería Landing`
3. Atributos → **Plantilla**: `Barbería El Paisa – Landing de Conversión`
4. Publicar

---

## Paso 5 — Configurar la página de inicio

**Ajustes → Lectura:**
- Selecciona "Una página estática"
- Página principal: **Inicio**

---

## URLs resultantes

| Página | URL WordPress | Hash interno |
|--------|--------------|--------------|
| Sitio principal Newenkom | `https://tudominio.com/` | `#/` |
| Landing Curso IA | `https://tudominio.com/curso-ia/` | `#/curso-ia` |
| Barbería El Paisa | `https://tudominio.com/barberia-el-paisa/` | `#/barberia-paisa` |
| Landing conversión Barbería | `https://tudominio.com/barberia-landing/` | `#/barberia-landing` |

> La landing de conversión (`/barberia-landing/`) es ideal para campañas de **Google Ads, Meta Ads o links de WhatsApp**.

---

## Actualizar las páginas (cuando hagas cambios)

Cada vez que modifiques el código React:

```powershell
npm run build:wp
```

Luego reemplaza los archivos en `/wp-content/themes/TU-TEMA/newenkom-app/assets/` con los nuevos.
Los archivos PHP no cambian — solo los `.js` y `.css`.

---

## Solución de problemas

**La app no carga nada:**
- Verifica que la ruta `newenkom-app/assets/nk-app.js` exista en el servidor
- Abre F12 → Consola y revisa si hay errores 404

**El tema WordPress aparece encima de la app:**
- El template PHP debe suprimir el header/footer del tema
- Verifica que el archivo PHP está correctamente asignado a la página

**Las fuentes no cargan:**
- Asegúrate de que el servidor tenga acceso a `fonts.googleapis.com`

**La página carga pero muestra Home en vez de la ruta correcta:**
- El script de redirección hash debe ir ANTES del `nk-app.js`
- Verifica el orden en el template PHP

**Imágenes de Unsplash no cargan en producción:**
- Son URLs externas — el servidor debe tener acceso a `images.unsplash.com`
- Para producción real, descarga las fotos y súbelas a la Biblioteca de Medios de WordPress
- Reemplaza las URLs en `src/pages/BarberiaLanding.tsx` objeto `PH`, luego rebuildeá
