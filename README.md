# COTIZADOR DE PARA CAMBIO DE MONEDA

## Instalación y configuración

### Requisitos del sistema

Para desarrollar y ejecutar este proyecto, necesitas los siguientes componentes:

- Node.js (v18.17.0)
- npm (v9.0.0 o superior)

### Dependencias

Las principales librerías del proyecto son las siguientes:

- vue: 3.5.18
- typescript: 5
- firebase: 12
- pinia: 3
- tailwindCSS: 4

> Consultar el archivo `package.json` para ver la lista completa de dependencias.

### Instrucciones de instalación

1. Descargue el proyecto o clone el repositorio.
2. Instale las dependencias ejecutando el siguiente comando:
   ```bash
   npm install
   ```
3. Configure las variables de entorno. Para esto, copie el archivo `.env.template` y reenombrar el archivo a `.env` y llenar con las credenciales:
   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

### Variables de entorno

Las siguientes variables de entorno son necesarias para ejecutar el proyecto:

- NEXT_PUBLIC_API_URL: URL base de las APIs a consumir

### Ejecutar el proyecto en desarrollo

Para iniciar el proyecto en modo desarrollo, ejecute el siguiente comando:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173.

### Compilación para producción

Para compilar el proyecto para producción, ejecute el siguiente comando:

```bash
npm run build
```

## Estructura del proyecto

La estructura del proyecto sigue un enfoque modular, donde cada módulo contiene su propia lógica y componentes, junto con una carpeta shared que concentra los recursos reutilizables.

```
currency-challenge/
├── public/
├── src/
│   ├── App.vue
│   └── modules/
│       ├── home/
│       │   ├── adapter/
│       │   ├── compossables/
│       │   └── ui/
│       └── shared/
│           ├── components/
│           ├── config/
│           ├── icons/
│           ├── interfaces/
│           ├── store/
│           └── type/
```

### Explicación de carpetas y archivos principales

#### Carpetas:

- **public/:** Contiene recursos públicos que se sirven estáticamente _(imágenes y tipografías)_.
- **src/modules/:** Carpeta principal que organiza los módulos de la aplicación.
- **adapters/:** Contiene adaptadores para la integración con las APIs.
- **composables/:** Hooks con lógica reutilizable propia del módulo.
- **ui/:** Componentes de interfaz del módulo.
- **shared/:** Contiene elementos reutilizables por todos los módulos.
- **components/:** Componentes genéricos de la interfaz (inputs, modales, layouts).
- **config/:** Configuración global y constantes.
- **icons/:** Contiene componentes de iconos.
- **interfaces/:** Interfaces y modelos de datos (cuando se usa TypeScript).
- **store/:** Estado global administrado con Pinia.
- **type/:** Definiciones de tipos globales reutilizables.

#### Archivos:

- **App.vue:** Componente raíz de Vue que sirve como punto de entrada de la UI.
- **main.ts:** Archivo de inicialización de la app: crea la instancia de Vue, monta el router y registra el store.
- **index.html:** Plantilla base usada por Vite para montar la aplicación.
