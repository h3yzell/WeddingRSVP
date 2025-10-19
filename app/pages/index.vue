<template>
  <div class="flex items-center justify-center h-full min-h-screen bg-gray-50">
    <div
      class="relative w-[90vw] max-w-md aspect-[9/16] bg-gray-100 shadow-lg"
    >
      <div
        :class="[
          ' absolute top-0 left-0 w-1/2 h-full bg-[#F2F2F2] shadow-[20px_10px_15px_-3px_rgba(0,0,0,0.1125),_-2px_10px_15px_-3px_rgba(0,0,0,0.3)] transition-transform duration-700 z-20',
          isOpened ? '-translate-x-full' : 'translate-x-0',
        ]"
      ></div>

      <div
        :class="[
          'absolute top-0 right-0 w-1/2 h-full bg-[#F2F2F2] shadow-[2px_10px_15px_-3px_rgba(0,0,0,0.3),_-20px_10px_15px_-3px_rgba(0,0,0,0.1125)] transition-transform duration-700 z-20',
          isOpened ? 'translate-x-full' : 'translate-x-0',
        ]"
      ></div>

      <div
        class=" absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/5 z-30 cursor-pointer transition-opacity duration-700 "
        :class="{ 'opacity-0 pointer-events-none': isOpened }"
        @click="openDoors"
      >
        <div
          class="flex flex-col items-center justify-center rounded-full bg-white shadow-2xl/40 
          sm:h-[140px] sm:w-[140px] md:h-[150px] md:w-[150px] gap-5"
        >
        <p
            class="font-cinzelDeco text-center text-[19px] leading-5 text-[#595959] sm:text-base mt-6"
          >
            Siti MaisaRah <br />
            HaiZat KamiL
          </p>
          <p
            class="font-spartan text-[14px] font-light tracking-wider text-[#595959]"
          >
            BUKA
          </p>
          
        </div>
      </div>

      <div
        class="
        min-h-screen bg-cover bg-center bg-no-repeat 
        bg-[url('~/assets/images/floralDecoration.png')]
        absolute inset-0 flex flex-col items-center justify-top text-center 
        transition-opacity duration-1000 mt-10 pt-25"
        :class="{ 'opacity-100 z-10': isOpened, 'opacity-0 z-0': !isOpened }"
      >
        <h2 class="font-cinzelReg mt-5 text-[18px] text-[#A7943D] tracking-[0.13rem]">
          YOU ARE INVITED
        </h2>
        <h2 class="font-cormorant mt-6 text-[18px] text-[#A7943D] tracking-[0.13rem]">
          to the wedding ceremony of
        </h2>
        <h1 class="font-cinzelDeco mt-17 text-[35px] text-[#D37B9C]">
          Siti MaisaRah <br/>
          & <br/>
          HaiZat KamiL
        </h1>
        <h2 class="font-cinzelReg mt-21 text-[15px] text-[#A7943D] tracking-[0.13rem]">
          14 FEBRUARY 2026
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpened = ref(false)
const openDoors = () => {
  isOpened.value = true
}
</script>