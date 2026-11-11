<script setup>
import { ref, onMounted } from 'vue'
import { Network } from '@capacitor/network'
import { Camera, CameraResultType } from '@capacitor/camera'

const API = import.meta.env.VITE_API_URL
const items = ref([])
const estado = ref('Cargando…')
const actualizado = ref(null)
const enLinea = ref(true)
const foto = ref(null)

async function cargar() {
  try {
    const res = await fetch(`${API}/alumnos`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    items.value = json.data ?? json
    actualizado.value = new Date().toLocaleString()
    estado.value = ''
  } catch (e) {
    estado.value = 'No se pudo conectar con la API'
  }
}

async function tomarFoto() {
  const img = await Camera.getPhoto({ resultType: CameraResultType.Uri, quality: 80 })
  foto.value = img.webPath
}

onMounted(async () => {
  cargar()
  enLinea.value = (await Network.getStatus()).connected
  Network.addListener('networkStatusChange', (s) => {
    enLinea.value = s.connected
  })
})
</script>

<template>
  <main>
    <h1>Mi app - Alumnos</h1>

    <!-- Aviso de conexión -->
    <p v-if="!enLinea" style="color: red; font-weight: bold;">
      Sin conexión. Se muestran los últimos datos guardados.
    </p>

    <!-- AQUÍ ESTÁ EL BOTÓN DE LA CÁMARA -->
    <button @click="tomarFoto" style="margin-bottom: 10px; padding: 6px 12px; cursor: pointer;">Tomar foto</button>
    
    <!-- Vista previa de la foto tomada -->
    <div v-if="foto" style="margin-bottom: 10px;">
      <img :src="foto" width="240" alt="Foto tomada" />
    </div>

    <p v-if="estado">{{ estado }}</p>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.nombre }} - {{ item.codigo }} ({{ item.carrera }})
      </li>
    </ul>
    <small v-if="actualizado">Actualizado: {{ actualizado }}</small>
  </main>
</template>