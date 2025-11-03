<template>
  <div class="flex items-center justify-center h-full min-h-screen bg-gray-50">
    <div
      :class="[
        'relative w-[90vw] max-w-md bg-gray-50 shadow-lg transition-all duration-700',
        expanded ? 'overflow-y-auto' : 'overflow-hidden aspect-[9/16]'
      ]"
    >
    <!-- LEFT DOOR -->
      <div 
        class="
              absolute inset-0 top-0 left-0 w-1/2 h-full bg-[#F2F2F2] z-20
              shadow-[20px_10px_15px_-3px_rgba(0,0,0,0.1125),_-2px_10px_15px_-3px_rgba(0,0,0,0.3)]
              transition-all duration-[1500ms] ease-out"
        :class="{
          '-translate-x-full opacity-0 delay-[400ms]' : isOpened,
          'translate-x-0 opacity-100 delay-[0ms]' : !isOpened,
        }" 
      ></div>
    <!-- RIGHT DOOR -->
      <div
        class="
        absolute top-0 right-0 w-1/2 h-full bg-[#F2F2F2] z-10
        shadow-[2px_10px_15px_-3px_rgba(0,0,0,0.3),_-20px_10px_15px_-3px_rgba(0,0,0,0.1125)] 
        transition-all duration-[1500ms] ease-out
        "
        :class="{
          'translate-x-full opacity-0 delay-[400ms]' : isOpened,
          'translate-x-0 opacity-100 delay-[0ms]' : !isOpened,
        }"
      ></div>
      <!-- CIRCLE -->
      <div
        class=" 
        absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/5 z-30 
        cursor-pointer transition-opacity duration-500 "
        :class="{ 'opacity-0 pointer-events-none': isOpened }"
        @click="openDoors"
      >
        <div
          class="flex flex-col items-center justify-center rounded-full bg-white shadow-2xl/40 
          sm:h-[140px] sm:w-[140px] md:h-[150px] md:w-[150px] gap-5
          animate-pulse-scale"
        >
        <p
            class="font-cinzelDeco text-center text-[19px] leading-5 text-[#595959] sm:text-base mt-6"
          >
            Siti MaisaRah <br>
            HaiZat KamiL
          </p>
          <p
            class="font-spartan text-[14px] font-light tracking-wider text-[#595959]"
          >
            BUKA
          </p>
          
        </div>
      </div>
      <!-- INVITATION PAGE -->
      <div
        class="
        min-h-screen bg-[#FEFEFE]
        inset-0 flex flex-col items-center justify-top text-center 
        transition-opacity duration-1000"
        :class="{ 'opacity-100 z-10': isOpened, 'opacity-0 z-0': !isOpened }"
      >
        <!-- FIRST PAGE -->
        <section class="
          min-h-screen min-w-screen flex flex-col items-center justify-start mt-35 tracking-[0.13rem]
          bg-scroll bg-[position:top_-100px_center] bg- bg-no-repeat bg-[url(~/assets/images/FloralDecoration.png)]
        ">
          <h2 class="font-cinzelReg mt-5 text-[18px] text-[#A7943D]">
            YOU ARE INVITED
          </h2>
          <h2 class="font-cormorant mt-6 text-[18px] text-[#A7943D]">
            to the wedding ceremony of
          </h2>
          <h1 class="font-cinzelDeco mt-17 text-[35px] text-[#D37B9C] tracking-[0rem]">
            Siti MaisaRah <br />
            & <br />
            HaiZat KamiL
          </h1>
          <h2 class="font-cinzelReg mt-21 text-[15px] text-[#A7943D]">
            14 FEBRUARY 2026
          </h2>
        </section>

        <!-- SECOND PAGE -->
        <section class="
          min-h-screen min-w-screen flex flex-col items-center justify-start -mt-20 
          bg-scroll bg-[center_calc(100%-180px)] bg-no-repeat bg-[url(~/assets/images/FloralDecoration2.png)]
        ">
          <div>
            <h2 class="flex justify-center items-center font-cinzelReg text-[20px] text-[#D37B9C] mb-2">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ
            </h2>
            <h2 class="
              flex justify-center items-center font-crimson font-semibold italic
              tracking-[0.09rem] text-[15px] text-[#D37B9C] mb-5
              ">
                Assalamualaikum and warm greetings,
            </h2>
          </div>
          <div>
            <h1 class="
              flex flex-col justify-between items-center gap-1 font-crimson font-semibold
              tracking-[0.15rem] text-[18px] text-[#D37B9C] mb-5
              ">
                AZMI AWANG
              <p class="font-cinzelReg">
                &
              </p>
                SURIANI TASREF
            </h1>
            <h2 class="
              flex justify-center items-center font-crimson font-semibold italic
              tracking-[0.09rem] text-[15px] text-[#D37B9C] mb-5
            ">
              Together with
            </h2>
            <h1 class="
              flex justify-center items-center gap-1 font-crimson font-semibold
              tracking-[0.15rem] text-[18px] text-[#D37B9C] mb-5
              ">
              OUR FAMILIES
            </h1>
          </div>
          <h2 class="
              flex justify-center items-center font-crimson font-semibold italic
              tracking-[0.09rem] text-[15px] text-[#D37B9C] mb-5
            ">
              With full hearts, we joyfully invite you to <br />
              the wedding ceremony of our beloved
          </h2>
          <div>
            <h1 class="
              flex flex-col justify-between gap-2 mb-3
              font-cinzelDeco  text-[28px] text-[#A7943D]
              ">
                <p>Siti MaisaRah</p>
                <p class="text-[18px]">&</p>
                <p>HaiZat KamiL</p>
            </h1>
          </div>
          <div class="mt-5">
            <h2 class="
              flex flex-col justify-center items-center 
              font-crimson font-semibold italic
              tracking-[0.15rem] text-[15px] text-[#D37B9C]">
                <p class="not-italic">SATURDAY</p>
                <p class="text-[18px]">14 . 02 . 2026</p>
                <p>10:00am - 2:00pm</p>
            </h2>
          </div>
        </section>
        <!-- THIRD PAGE -->
         <section class="
          min-h-screen min-w-screen flex flex-col items-center justify-start -mt-20
          bg-contain bg-[center_calc(100%-20px)] bg-no-repeat bg-[url(~/assets/images/aturCaraPlaceholder.png)]
         ">

          <div>

          </div>
         </section>

        <!-- NAVBAR (REQUIRES SCRIPT) -->
        <div class="fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center w-screen max-w-md text-center text-white bg-gray-900 z-40 gray-glass h-[4.4rem]" style="background-color: rgba(190, 80, 113, 0.733); color: rgb(255, 255, 255);">
          <div class="flex-1 cursor-pointer">
            <p class="text-xs">Hubungi</p>
          </div>
          <div class="flex-1 cursor-pointer">
            <p class="text-xs">Kalendar</p>
          </div>
          <NuxtLink to="/rsvp" class="flex-1 cursor-pointer">
            <p class="text-xs">RSVP</p>
          </NuxtLink>
          <div class="flex-1 cursor-pointer">
            <p class="text-xs">Hadiah</p>
          </div>
          <div class="flex-1 cursor-pointer">
            <p class="text-xs">Lokasi</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes pulse-scale {
  0%, 100% { transform: scale(1);}
  50% {transform: scale(1.07);}
}

.animate-pulse-scale {
  animation: pulse-scale 2s ease-in-out infinite;
}
</style>

<script setup>
import { ref } from 'vue'
const isOpened = ref(false)
const expanded = ref(false);

const openDoors = () => {
  isOpened.value = true

  setTimeout(() => {
    expanded.value = true;   
  }, 1500);
}
</script>