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
    <div class="flex flex-col items-center justify-center gap-4 mt-5 mb-10">
        <h1 class="text-[#A7943D] tracking-wider font-cinzelReg text-2xl mb-5">
            Wedding is in..
        </h1>

        <div class="flex flex-row items-center justify-between text-black text-sm gap-10">
            <div>
            <h2 class="text-5xl font-thin">{{ days }}</h2>
            <p>Days</p>
            </div>

            <div>
            <h2 class="text-5xl font-thin">{{ hours }}</h2>
            <p>Hours</p>
            </div>

            <div>
            <h2 class="text-5xl font-thin">{{ minutes }}</h2>
            <p>Minutes</p>
            </div>

            <div>
            <h2 class="text-5xl font-thin">{{ seconds }}</h2>
            <p>Seconds</p>
            </div>
        </div>
    </div>
</template>


