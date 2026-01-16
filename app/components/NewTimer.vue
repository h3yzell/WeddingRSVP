<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const targetDate = new Date('February 14, 2026 00:00:00').getTime()

const days = ref('00')
const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')

let timer = null

onMounted(() => {
  timer = setInterval(() => {
    const now = new Date().getTime()
    const diff = targetDate - now

    if (diff <= 0) {
      clearInterval(timer)
      days.value = hours.value = minutes.value = seconds.value = "00"
      return
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((diff % (1000 * 60)) / 1000)

    days.value = String(d).padStart(2, '0')
    hours.value = String(h).padStart(2, '0')
    minutes.value = String(m).padStart(2, '0')
    seconds.value = String(s).padStart(2, '0')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
    <div class="flex items-center justify-between text-gray-900 text-sm gap-5 font-edwardian">
        <div class="w-10">
            <h2 class="text-5xl"> {{ days }}</h2>
            <p class="font-thin font-serif">Days</p>
        </div>
        <p class="text-3xl -translate-y-3 ml-2">:</p>
        <div class="w-10">
            <h2 class="text-5xl">{{ hours }}</h2>
            <p class="font-thin font-serif">Hours</p>
        </div>
        <p class="text-3xl -translate-y-3 ml-2">:</p>
        <div class="w-10">
            <h2 class="text-5xl">{{ minutes }}</h2>
            <p class="font-thin font-serif">Minutes</p>
        </div>
        <p class="text-3xl -translate-y-3 ml-2">:</p>
        <div class="w-10">
            <h2 class="text-5xl">{{ seconds }}</h2>
            <p class="font-thin font-serif">Seconds</p>
        </div>
    </div>
</template>


