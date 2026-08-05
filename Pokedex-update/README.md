# Pokedex React Native

Aplicacion movil hecha con React Native CLI y TypeScript que consume PokéAPI para listar Pokemon, consultar su detalle, buscar por nombre o numero y guardar un Pokemon favorito en almacenamiento local.

## Cobertura del assessment

- Primeros 20 Pokemon con nombre e imagen en la carga inicial.
- Navegacion tipada desde listado o busqueda hacia el detalle.
- Detalle con tipos, habilidades, estadisticas, peso, altura y experiencia base.
- Estados de carga, error, reintento y datos vacios.
- Persistencia local de un favorito y cache de detalle durante la sesion.
- Paginacion incremental, busqueda, accesibilidad basica y mensajes amigables.
- TypeScript, lint y pruebas automatizadas.

## Requisitos

- Node.js compatible con React Native 0.70
- npm
- Xcode y CocoaPods para iOS
- Android Studio / Android SDK para Android

## Instalacion

```bash
npm install
```

Para iOS:

```bash
cd ios
pod install
cd ..
```

## Ejecucion

Iniciar Metro:

```bash
npm start
```

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

## Pruebas y lint

```bash
npm test
npm run lint
npm run typecheck
```

## Funcionalidad

- Listado inicial de los primeros 20 Pokemon desde PokéAPI.
- Paginacion incremental al llegar al final del listado.
- Tarjetas con nombre, numero e imagen oficial.
- Navegacion a pantalla de detalle.
- Detalle con tipos, peso, altura, experiencia base, sprites, habilidades, movimientos y estadisticas.
- Busqueda por nombre o numero de Pokemon.
- Estados visuales de carga, error y datos vacios.
- Guardado local de un Pokemon favorito desde la pantalla de detalle.

## Arquitectura

El proyecto mantiene una separacion simple por responsabilidad:

- `src/api`: configuracion del cliente HTTP de PokéAPI.
- `src/repositories`: contrato de acceso a Pokemon e implementacion para PokéAPI.
- `src/hooks`: casos de uso de UI para paginacion, busqueda y detalle.
- `src/components`: componentes reutilizables de presentacion y estados.
- `src/screens`: pantallas conectadas a navegacion.
- `src/navigator`: stacks y tabs de React Navigation.
- `src/interfaces`: contratos TypeScript de PokéAPI y modelos usados por la UI.
- `src/storage`: abstraccion de almacenamiento local para favoritos.
- `src/utils`: mappers puros para transformar respuestas de API a modelos de pantalla.

La UI no conoce la implementacion de red ni los detalles del almacenamiento nativo. Los hooks reciben un repositorio mediante inyeccion de dependencias, coordinan datos, errores y carga; los componentes se concentran en renderizar el estado. Esta es una aplicacion pragmatica de Clean Architecture: el contrato `PokemonRepository` permite sustituir PokéAPI o usar un doble de pruebas sin modificar las pantallas.

## Persistencia local

React Native 0.70 no incluye AsyncStorage en el core. Para evitar agregar otra libreria externa, se implemento un modulo nativo pequeño:

- Android: `SharedPreferences`.
- iOS: `NSUserDefaults`.

Desde JavaScript se usa `src/storage/localStorage.ts`, lo que permite cambiar la estrategia de persistencia sin tocar pantallas.

## Librerias principales

- `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs`: navegacion entre listado, busqueda y detalle.
- `axios`: cliente HTTP con `baseURL` y timeout.
- `react-native-vector-icons`: iconografia de tabs, acciones y navegacion.
- `react-native-image-colors`: color dinamico de tarjetas a partir del arte oficial del Pokemon.
- `react-native-safe-area-context` y `react-native-screens`: soporte visual y rendimiento para navegacion.

El documento contiene dos indicaciones en tension: una seccion pide no usar librerias externas y otra permite seleccionarlas si se justifican. La aplicacion partio de una base existente con las librerias anteriores. Se conservaron para limitar el cambio y mantener una navegacion nativa estable; no se agregaron dependencias para persistencia, arquitectura, estados ni testing.

## Pruebas incluidas

- Renderizado basico de la aplicacion y navegadores.
- Transformacion de respuestas de PokéAPI al modelo de listado.
- Guardado, lectura y eliminacion del Pokemon favorito.

## Evidencia

Capturas obtenidas en Android 13, emulador Pixel 2 API 33:

<p>
  <img src="docs/screenshots/pokedex-home.png" width="280" alt="Listado inicial de Pokemon" />
  <img src="docs/screenshots/pokedex-detail.png" width="280" alt="Detalle de Bulbasaur" />
</p>

## Pendientes / mejoras futuras

- Agregar pruebas unitarias para los hooks de datos.
- Agregar skeleton loaders como mejora visual.
- Persistir cache de listado/detalle para experiencia offline mas completa.
- Centralizar mensajes de error por tipo de fallo HTTP/conectividad.
