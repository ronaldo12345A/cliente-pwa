# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Seguridad en producción

* **Entorno Laravel:** `APP_ENV=production` y `APP_DEBUG=false` (aplicar solo al desplegar a producción; mantener `APP_DEBUG=true` durante el desarrollo local)
* **Orígenes CORS:** Configurar dominios reales explícitos en `config/cors.php` (`allowed_origins`), sin comodín `'*'`[cite: 18]
* **URL del API en el cliente:** `VITE_API_URL` apuntando al dominio real con `https://`[cite: 18]
* **Capacitor (`capacitor.config.json`):** Sin bloque `server` ni `cleartext` habilitado en producción[cite: 18]
* **Caducidad de tokens Sanctum:** `expiration` definida en `config/sanctum.php` (`60 * 8` minutos = 8 horas)[cite: 18]