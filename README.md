
# Foreach
Frontend para cálculo de emision de C02 para la empresa BANK.

| Nombre de Tecnología | Versión |
| ---------- | ---------- |
| NodeJS   | v10.16.3   |
| Express   | v4.16.1   |
| NPM   | v6.9.0   |
| YARN   | v1.10.1   |
| React | v16.13.1 |

## Requerimientos del Sistema
- NodeJS >= v10.16.3
- ExpressJS >= v4.16.1
- YARN >= v1.22.4
- NPM >= v6.9.0
- React >= v16.13.1

## Despliegue del front Desarrollo
1. Instalar Paquetes `npm install` o `yarn install`.
2. Iniciar Aplicación `npm start` o `yarn start`.

## Despliegue del front Produccion
1. Instalar Paquetes `npm install` o `yarn install`.
2. Desplegar build `npm run build` o `yarn build`.
3. Apuntar carpeta build al root del webserver.

**NOTA**: en caso que se cambie el hostname o dominio de la API se debe cambiar la ruta en el archivo `src/global.config.js` la variable `baseUrlAPI`
```
export default {
    baseUrlAPI: "http://localhost:3010/v1", // <-- host del api
};
```
