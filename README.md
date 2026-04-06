# TechNova Store

Aplicacion movil de comercio electronico para tecnologia y gadgets. Incluye onboarding, autenticacion, catalogo con categorias, carrito de compras, detalle de producto y gestion de perfil.

## Funcionalidades principales
- Onboarding con bienvenida, beneficios, uso responsable y acceso.
- Registro e inicio de sesion con JWT.
- Catalogo con banners, categorias y productos destacados.
- Filtros por categoria.
- Detalle de producto con descripcion, rating visual y productos relacionados.
- Carrito de compras con agregar, actualizar cantidad, eliminar y vaciar.
- Resumen de pedido y simulacion de checkout.
- Perfil de usuario editable (nombre, telefono, direccion, rol).
- Persistencia de sesion y estado de onboarding en AsyncStorage.

## Flujo de navegacion
- Si el onboarding no esta completado, inicia en `Onboarding`.
- Si hay token valido, inicia en `Home`.
- Si no hay token, inicia en `Auth`.

## Pantallas
- `Welcome`: introduccion y acceso a beneficios.
- `Benefits`: resumen de ventajas de la app.
- `Permissions`: uso responsable y terminos basicos.
- `Access`: entrada a autenticacion.
- `Login`: inicio de sesion.
- `Register`: creacion de cuenta.
- `Home`: inicio con banners, categorias y productos.
- `ProductDetail`: detalle con descripcion y productos sugeridos.
- `Pedidos` (tab en Home): carrito con resumen y acciones.
- `Entrega` (tab en Home): vista informativa de seguimiento.
- `Usuario` (tab en Home): perfil editable.

## Datos y persistencia
- Tokens y usuario se guardan en AsyncStorage.
- Claves usadas: `auth_token`, `refresh_token`, `auth_username`, `onboarding_done`.

## Servicios API
Configurados con Axios en `src/services/api.ts`.

Endpoints utilizados:
- `POST /register/` registro de usuarios.
- `POST /login/` inicio de sesion.
- `POST /token/refresh/` refresh de token (servicio disponible, no integrado en UI).
- `GET /products/` listado de productos (con `category_id`).
- `GET /categories/` listado de categorias.
- `GET /banners/` banners promocionales.
- `GET /cart/` obtener carrito.
- `POST /cart/` agregar producto al carrito.
- `PATCH /cart/` actualizar cantidad.
- `DELETE /cart/` eliminar item o vaciar carrito.
- `GET /cart/count/` contador de items.
- `GET /me/` perfil del usuario.
- `PATCH /me/` actualizar perfil.

## Configuracion de backend
Edita la base URL en `src/services/api.ts`:
- Android emulator: `http://10.0.2.2:8000/`
- iOS simulator o backend local: `http://localhost:8000/`
- Dispositivo fisico: `http://<TU-IP-LAN>:8000/`

## Arquitectura
- Presentacion en `src/presentation/screens`.
- Navegacion en `src/navigation`.
- ViewModels en `src/viewmodel` (MVVM simple).
- Servicios HTTP en `src/services`.
- Modelos en `src/model`.
- Persistencia en `src/shared/storage`.
- Assets en `src/shared/assets`.

## Scripts
- `npm start` inicia Metro.
- `npm run android` ejecuta en Android.
- `npm run ios` ejecuta en iOS.
- `npm test` corre pruebas.
- `npm run lint` ejecuta ESLint.
