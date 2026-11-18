<script setup>
import { ref } from 'vue'
const API = import.meta.env.VITE_API_URL
const email = ref('ana@test.pe')
const password = ref('secreto123')
const pedidos = ref([])

async function entrar() {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
  const json = await res.json()
  localStorage.setItem('token', json.token)  // VULNERABLE a propósito
  cargar()
}

async function cargar() {
  const res = await fetch(`${API}/pedidos`, { headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}` } })
  pedidos.value = await res.json()
}

function salir() {
  localStorage.removeItem('token')  // VULNERABLE: no revoca el token en el servidor
  pedidos.value = []
}
</script>

<template>
  <section>
    <input v-model="email" /> <input v-model="password" type="password" />
    <button @click="entrar">Entrar</button> <button @click="salir">Salir</button>
    <ul>
      <li v-for="p in pedidos" :key="p.id" v-html="p.descripcion"></li> <!-- VULNERABLE -->
    </ul>
  </section>
</template>