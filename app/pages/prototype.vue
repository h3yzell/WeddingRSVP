<script setup>
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient();
const isOpened = ref(false);
const expanded = ref(false);
const clickOnCall = ref(false);
const clickOnCalendar = ref(false);
const clickOnQR = ref(false);
const clickOnLocation = ref(false);
const wishes = ref([]);

let lastScrollTime = Date.now();

useHead({ title: 'Wedding of Haizat & Maisarah' })

async function getWishes() {
  const { data } = await supabase.from('rsvp_attendance').select('wishes').not('wishes', 'is', null);
  wishes.value = data
    .filter(item => item.wishes && item.wishes.trim() !== '')
    .map(item => ({ text: item.wishes }));
}

onMounted(() => { 
  getWishes();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)  => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-show');
      } else {
        entry.target.classList.remove('animate-show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.animate-hidden');
  hiddenElements.forEach((el)=> observer.observe(el));
});

const openDoors = () => {
  isOpened.value = true

  setTimeout(() => {
    expanded.value = true;
    startInfiniteScroll();
  }, 2000);
};

const startInfiniteScroll = () => {
  const pixelsPerSecond = 75; 
  const idleDelay = 1500; 
  let animationId;
  
  const scroll = () => {
    const timeSinceLastScroll = Date.now() - lastScrollTime;
    
    if (timeSinceLastScroll > idleDelay) {
      window.scrollBy(0, pixelsPerSecond / 60);
    }
    
    animationId = requestAnimationFrame(scroll);
  };
  
  const updateScrollTime = () => {
    lastScrollTime = Date.now();
  };
  
  animationId = requestAnimationFrame(scroll);
  window.addEventListener('wheel', updateScrollTime, { passive: true });
  window.addEventListener('touchmove', updateScrollTime, { passive: true });
  window.addEventListener('keydown', updateScrollTime);
};

  const callPopup = () => {
    clickOnCall.value = true;
  }
  const calendarPopup = () => {
    clickOnCalendar.value = true;
  }
  const qrPopup = () => {
    clickOnQR.value = true;
  }
  const locationPopup = () => {
    clickOnLocation.value = true;
  }
</script>

<template>
  <audio autoplay loop v-if="isOpened">
    <source src="~/assets/audios/springSnow.mp3" type="audio/mp3">
  </audio>
  
  <div class="flex justify-center min-h-screen bg-gray-100">
    <div
      :class="[
        'relative max-w-md bg-gray-50 shadow-xl transition-all duration-700 overflow-x-hidden pb-22',
        expanded ? 'min-h-screen overflow-y-auto' : 'h-screen overflow-hidden',
      ]"
    >
      <!-- LEFT DOOR -->
      <div 
        class="
          absolute top-0 left-0 w-1/2 h-full bg-[#F2F2F2] z-20 
          shadow-[20px_10px_15px_-3px_rgba(0,0,0,0.1125),-2px_10px_15px_-3px_rgba(0,0,0,0.3)]
          transition-all duration-1500 ease-out
          "
        :class="{
          '-translate-x-full opacity-0 delay-400' : isOpened,
          'translate-x-0 opacity-100 delay-0' : !isOpened,
        }" 
      ></div>
      <!-- RIGHT DOOR -->
      <div
        class="
          absolute top-0 right-0 w-1/2 h-full bg-[#F2F2F2] z-10
          shadow-[2px_10px_15px_-3px_rgba(0,0,0,0.3),-20px_10px_15px_-3px_rgba(0,0,0,0.1125)] 
          transition-all duration-1500 ease-out
        "
        :class="{
          'translate-x-full opacity-0 delay-400' : isOpened,
          'translate-x-0 opacity-100 delay-0' : !isOpened,
        }"
      ></div>
      <!-- CIRCLE -->
      <div
        class=" 
        fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/5 z-30 
        cursor-pointer transition-opacity duration-500 "
        :class="{ 'opacity-0 pointer-events-none': isOpened }"
        @click="openDoors"
      >
        <div
          class="flex flex-col items-center justify-center rounded-full bg-[#FEFEFE] shadow-2xl/40 
          w-37 h-37 gap-5
          animate-pulse-scale"
        >
        <p
            class="font-cinzelDeco text-center text-base leading-5 text-[#595959] mt-6"
          >
            HaiZat <br>
            & <br>
            MaisaRah 
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
        min-h-screen bg-[#FCFBFB] w-screen max-w-md
        flex flex-col items-center justify-top text-center 
        transition-opacity duration-1000 "
        :class="{ 'opacity-100 z-10': isOpened, 'opacity-0 z-0': !isOpened }"
      >
        <!-- FIRST PAGE -->
        <section v-show="isOpened" class="
          w-full flex flex-col items-center justify-start tracking-[0.13rem] pb-20
          bg-local bg-position-[top_10px_center] bg-no-repeat bg-[url(~/assets/images/floralDecoration.png)]
        ">
        <div class="mt-35">
          <h2 class="font-cinzelReg mt-5 text-[18px] text-[#A7943D] stagger animate-hidden">
            YOU ARE INVITED
          </h2>
          <h2 class="font-cormorant mt-6 text-[18px] text-[#A7943D] stagger animate-hidden">
            to the wedding ceremony of
          </h2>
          <h1 class="font-cinzelDeco mt-17 text-[35px] text-[#D37B9C] tracking-[0rem] stagger animate-hidden">
            HaiZat <br />
            & <br />
            MaisaRah
          </h1>
          <h2 class="font-cinzelReg mt-21 text-[15px] text-[#A7943D] stagger animate-hidden">
            14 FEBRUARY 2026
          </h2>
        </div>
        </section>

        <!-- SECOND PAGE -->
        <section class="
          flex flex-col items-center justify-start tracking-[0.09rem]
        ">

          <h2 class="mt-20 flex justify-center items-center font-cinzelReg text-[20px] text-[#D37B9C] mb-2 animate-hidden">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ
          </h2>

          <h2 class="
            flex justify-center items-center font-crimson font-semibold italic 
            tracking-[0.09rem] text-[15px] text-[#D37B9C] mb-5 animate-hidden
            ">
              Assalamualaikum and warm greetings,
          </h2>
          
          <h1 class="
            flex flex-col justify-between items-center gap-1 font-crimson font-semibold
            tracking-[0.15rem] text-[18px] text-[#D37B9C] mb-5 animate-hidden
            ">
              AZMI AWANG
            <p class="font-cinzelReg">
              &
            </p>
              SURIANI TASREF
          </h1>

          <h2 class="
            flex justify-center items-center font-crimson font-semibold italic
            tracking-[0.09rem] text-[15px] text-[#D37B9C] mb-5 animate-hidden
          ">
            Together with
          </h2>

          <h1 class="
            flex justify-center items-center gap-1 font-crimson font-semibold
            tracking-[0.15rem] text-[18px] text-[#D37B9C] mb-5 animate-hidden
            ">
            OUR FAMILIES
          </h1>
          
          <h2 class="
            flex justify-center items-center font-crimson font-semibold italic
            tracking-[0.09rem] text-[15px] text-[#D37B9C] mb-5 animate-hidden
          ">
            With full hearts, we joyfully invite you to <br />
            the wedding ceremony of our beloved
          </h2>
          
          <h1 class="
            flex flex-col justify-between gap-2 mb-3
            font-cinzelDeco  text-[28px] text-[#A7943D]
            ">
              <p class="stagger2 animate-hidden">Siti MaisaRah</p>
              <p class="text-[18px] stagger2 animate-hidden">&</p>
              <p class="stagger2 animate-hidden">HaiZat Kamil Shafiq</p>
          </h1>
          

          <div class="
            flex flex-col justify-center items-center mt-5
            font-crimson font-semibold italic
            tracking-[0.15rem] text-[15px] text-[#D37B9C] animate-hidden">
              <p class="not-italic ">SATURDAY</p>
              <p class="text-[18px]">14 . 02 . 2026</p>
              <p>9:00am - 1:00pm</p>
          </div>
        </section>

        <!-- TIMER SECTION -->
        <section class="pt-10">
          <div class="flex justify-center py-8 animate-hidden">
            <img class="w-4/5" src="~/assets/images/divider.png" alt="divider">
          </div>

          <Timer class="animate-hidden"/>

          <div class="flex justify-center py-8 animate-hidden">
            <img class="w-4/5" src="~/assets/images/divider.png" alt="divider">
          </div>
        </section>

        <!-- IMAGE SECTION -->
         <section class="grid grid-cols-2 gap-x-2">
          <img 
            class="w-40 rounded-lg shadow-lg mb-2 animate-hidden"
            src="~/assets/images/img1.JPG" 
          >
          <img 
            class="w-40 rounded-lg shadow-lg mb-2 animate-hidden"
            src="~/assets/images/img4.JPG" 
          >
          <img 
            class="w-40 rounded-lg shadow-lg mb-2 animate-hidden"
            src="~/assets/images/img3.JPG" 
          >
          <img 
            class="w-40 rounded-lg shadow-lg mb-2 animate-hidden"
            src="~/assets/images/img2.JPG" 
          >
         </section>
        
        <!-- WISH SECTION -->
        <section class="my-10">
          <div class="flex justify-center animate-hidden">
            <img class="w-4/5" src="~/assets/images/divider.png" alt="divider">
          </div>
          <h1 class="text-[#A7943D] tracking-wider font-cinzelReg text-2xl animate-hidden">
            Your Wishes...
          </h1>
          <UCarousel
            class="max-w-md p-5 animate-hidden"
            v-slot="{ item }"
            loop
            :autoplay="{ delay: 2000 }"
            :items="wishes"
          >
          <div class="flex items-center justify-center w-full h-50 p-10 bg-gray-50 shadow-lg">
            <p 
              class="text-gray-700 font-mono text-left text-sm italic tracking-wide">
              "{{ item.text }}"
          </p>
          </div>
          </UCarousel>
          <div class="flex justify-center animate-hidden">
            <img class="w-4/5" src="~/assets/images/divider.png" alt="divider">
          </div>
        </section>

        <!-- FOOTER -->
        <footer>
          <div class="mt-20 flex flex-col">
            <!--
            <img class="mx-auto size-30" src="https://media.tenor.com/UxY74nL3V4EAAAAe/hehe-cat-cute-hehe.png" alt="troll"></img>
            -->
            <p class="text-gray-500 text-xs tracking-wide">Wedding of Haizat & Maisarah</p>
            <p class="mb-1 text-gray-500 text-xs tracking-wide">©2025 Developed by Nabil Azmi</p>
          </div>
        </footer>
        
        <!-- NAVBAR -->
        <div class="fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center w-screen max-w-md text-gray-700 bg-[#FBFBFB] z-40 h-[4.4rem] shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
  
          <div @click="callPopup" 
            :class="['flex-1 flex flex-col items-center justify-center cursor-pointer', clickOnCall ? 'text-[#d44a7d]' : 'text-gray-700']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <p class="text-xs">Contact</p>
          </div>

          <div @click="calendarPopup" 
            :class="['flex-1 flex flex-col items-center justify-center cursor-pointer', clickOnCalendar ? 'text-[#d44a7d]' : 'text-gray-700']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <p class="text-xs">Calendar</p>
          </div>

          <NuxtLink target="_blank" to="/rsvp" class="flex-1 flex justify-center cursor-pointer">
            <div class="bg-[#FBFBFB] rounded-full w-20 h-20 flex items-center justify-center -mt-4 pb-1 shadow-[0_-10px_17px_rgba(0,0,0,0.05)]">
              <div class="bg-[#D37B9C] hover:bg-[#E08FB0] rounded-full text-[#FEFEFE] w-16 h-16 flex flex-col items-center justify-center transition-all duration-200 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6 mb-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                </svg>
                <p class="text-[11px]">RSVP</p>
              </div>
            </div>
          </NuxtLink>

          <div @click="qrPopup" 
            :class="['flex-1 flex flex-col items-center justify-center cursor-pointer', clickOnQR ? 'text-[#d44a7d]' : 'text-gray-700']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
            <p class="text-xs">Gift</p>
          </div>

          <div @click="locationPopup" 
            :class="['flex-1 flex flex-col items-center justify-center cursor-pointer', clickOnLocation ? 'text-[#d44a7d]' : 'text-gray-700']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <p class="text-xs">Location</p>
          </div>
        </div>

        <!-- POPUP -->
        <!-- Contact Button -->
        <div @click.self="clickOnCall = false" v-if="clickOnCall" class="w-screen h-screen fixed top-0 left-0 flex z-50 justify-center items-center bg-black/40">
          <transition
            appear
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="scale-50 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-50 opacity-0"
          >
          <div class="bg-white shadow-lg rounded-lg p-5 w-80">
            <p class="text-xl font-semibold text-center text-black mb-4">Contact</p>
            <hr>
            
            <div class="flex items-center my-2 mt-4">
              <div class="flex-1"><p class="text-base text-black text-left tracking-wide">Suriani</p></div>
              
              <a class = "group relative" target="_blank" href="https://wa.me/60123547685">
                <img class="h-8 opacity-100 hover:opacity-70 transition-opacity duration-200" src="~/assets/images/ws-icon.png" alt="Whatsapp Icon">
                <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Open in WhatsApp
                </span>
              </a>
            </div>
            <div class="flex items-center my-2 mt-4">
              <div class="flex-1"><p class="text-base text-black text-left tracking-wide">Maisarah</p></div>
              
              <a class = "group relative" target="_blank" href="https://wa.me/60122843650">
                <img class="h-8 opacity-100 hover:opacity-70 transition-opacity duration-200" src="~/assets/images/ws-icon.png" alt="Whatsapp Icon">
                <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Open in WhatsApp
                </span>
              </a>
            </div>
            <div class="flex items-center my-2 mt-4">
              <div class="flex-1"><p class="text-base text-black text-left tracking-wide">Haizat</p></div>
              
              <a class = "group relative" target="_blank" href="https://wa.me/60123180816">
                <img class="h-8 opacity-100 hover:opacity-70 transition-opacity duration-200" src="~/assets/images/ws-icon.png" alt="Whatsapp Icon">
                <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Open in WhatsApp
                </span>
              </a>
            </div>
          </div>
          </transition>
        </div>
        <!-- Calendar Button -->
        <div @click.self="clickOnCalendar = false" v-if="clickOnCalendar" class="w-screen h-screen fixed top-0 left-0 flex z-50 justify-center items-center bg-black/40">
          <transition
            appear
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="scale-50 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-50 opacity-0"
          >
          <div class="bg-white shadow-lg rounded-lg p-5 w-80">
            <p class="text-xl font-semibold text-center text-black mb-4">Calendar</p>
            <hr class="mb-4">
              
            <div class="flex-col text-center text-md my-5 font-sans text-gray-800">
              <p class="text-lg">Wedding of Haizat & Maisarah</p>
              <p>9.00am - 1.00pm</p>
              <p>Saturday, 14 February 2026</p>
            </div>

              
            <a 
              class="group relative items-center block mt-3" 
              target="_blank"
              href="
                https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding of Haizat & Maisarah
                &dates=20260214T090000Z/20260214T130000Z
                &details=
                &location=Laman Gaharu Emas, Lot 53572, Seksyen 29, Jln Lombong Emas 2, Kampung Lombong, 40460 Shah Alam, Selangor, Malaysia
                &sf=true&output=xml"
              > 
              <div class="flex items-center border p-2 rounded group border-gray-700 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <GoogleCalendaricon />
                <p class="font-medium text-md flex-1 text-black">Save to Google Calendar</p>
                <ArrowRightIcon />
                <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Add to Google Calendar
                </span>
              </div>
            </a>
            
            <!-- APPLE -->
            <!--
            <a 
              class="group relative items-center block mt-3" 
              target="_blank" 
              href="/wedding-mai-haizat.ics"
            > 
              <div class="flex items-center border p-2 rounded group border-gray-700 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <AppleIcon />  
                <p class="font-medium text-md flex-1 text-black">Save to Apple Calendar</p>
                <ArrowRightIcon />
                <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Add to Apple Calendar
                </span>
              </div>
            </a>
            -->
          </div>
          </transition>
        </div>
        <!-- Gift Button -->
        <div @click.self="clickOnQR = false" v-if="clickOnQR" class="w-screen h-screen fixed top-0 left-0 flex z-50 justify-center items-center bg-black/40">
          <transition
            appear
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="scale-50 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-50 opacity-0"
        >
          <div class="bg-white shadow-lg rounded-lg p-5 w-80">
            <div>
              <p class="text-xl font-semibold text-center text-black mb-4">Digital Money Gift</p>
              <hr class="mb-4">
              
              <div class="flex items-center justify-center gap-2 mb-2">
                <div class="flex items-center gap-2 px-8 py-2 bg-linear-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-full">
                  <img class="h-6 w-auto" src="~/assets/images/maybank.png" alt="Maybank Icon">
                  <span class="text-base font-semibold text-black tracking-wide">Maybank</span>
                </div>
              </div>

              <img src="~/assets/images/QRCode.png" alt="QR Code" class="w-full h-full object-contain mb-2"/>
            </div>

            <div class="flex items-center mb-4">
              <hr class="grow border-gray-300">
              <span class="mx-3 text-gray-700">or</span>
              <hr class="grow border-gray-300">
            </div>

            
            <div 
              @click="copyAccountNumber"
              class="group relative flex items-center justify-between w-full px-2 py-2 rounded border border-gray-700 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
              <div> 
                <p class="text-xs text-gray-500 font-medium mb-0.5">Account Number</p>
                <p id="bankAcc" class="font-bold text-gray-800 text-base tracking-wider font-mono ml-2">164801122348</p>
              </div>

              <div class="shrink-0 group-hover:transition-all duration-200">
                <svg 
                  fill="currentColor" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 32 32" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="text-gray-400 group-hover:text-gray-700 transition-colors duration-200"
                >
                  <path d="M 4 4 L 4 24 L 11 24 L 11 22 L 6 22 L 6 6 L 18 6 L 18 7 L 20 7 L 20 4 Z M 12 8 L 12 28 L 28 28 L 28 8 Z M 14 10 L 26 10 L 26 26 L 14 26 Z"></path>
                </svg>

                <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Copy Account Number
                </span>
              </div>
            </div>
          </div>
          </transition>
        </div>
        <!-- Location Button -->
        <div @click.self="clickOnLocation = false" v-if="clickOnLocation" class="w-screen h-screen fixed top-0 left-0 flex z-50 justify-center items-center bg-black/40">
          <transition
            appear
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="scale-50 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-50 opacity-0"
          >
          <div class="bg-white shadow-lg rounded-lg p-5 w-80">
            <p class="text-xl font-semibold text-center text-black mb-4">Location</p>
            <hr class="mb-4">

            <div class="relative w-full h-64">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.474215979355!2d101.54778727572578!3d2.9658352542505937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb3c325f93bb3%3A0x5e4665dbddd03c5b!2sLaman%20Gaharu%20Emas!5e0!3m2!1sen!2smy!4v1762937004702!5m2!1sen!2smy" 
              allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              class="absolute rounded-lg w-full h-full top-0 left-0">
              </iframe>
            </div>

            <div class="my-5">
              <p class="font-medium text-center text-lg text-gray-700 mb-2">Laman Gaharu Emas</p>
              <p class="font-medium text-center text-sm text-gray-700 mb-5">
                Lot 53572, Seksyen 29, 
                <br>
                Jln Lombong Emas 2, 
                <br>
                Kampung Lombong, 40460 Shah Alam
              </p>
            </div>
            <a class="items-center block mt-5" href="https://maps.app.goo.gl/TygxU9dP23yNnG7S7?g_st=ipc" target="_blank"> 
              <div class="group relative flex items-center border p-2 rounded border-gray-700 group hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <GoogleMapIcon />
                <p class="font-medium text-md flex-1 text-black">Google Map</p>

                <ArrowRightIcon />
                <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Open in Google Map
                </span>
              </div>
            </a>
            <a class="items-center block mt-3" href="https://waze.com/ul/hw280ygftn" target="_blank"> 
              <div class="group relative flex items-center border p-2 rounded border-gray-700 group hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <WazeIcon/>
                
                <p class="font-medium text-md flex-1 text-black">Waze</p>

                <ArrowRightIcon />
                <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Open in Waze
                </span>
              </div>
            </a>
          </div>
          </transition>
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
.animate-hidden {
  opacity: 0;
  transform: translateY(100px);
  filter: blur(1px);
  transition: opacity 0.7s ease, transform 2s ease, filter 2s ease;
}

.animate-show {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .animate-hidden {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }

  .animate-show {
    transition: none;
  }
}

.stagger:nth-child(1) {
  transition-delay: 0.2s;
}
.stagger:nth-child(2) {
  transition-delay: 0.4s;
}
.stagger:nth-child(3) {
  transition-delay: 0.6s;
}
.stagger:nth-child(4) {
  transition-delay: 0.8s;
}

.stagger2:nth-child(1) {
  transition-delay: 0.2s;
}
.stagger2:nth-child(2) {
  transition-delay: 0.4s;
}
.stagger2:nth-child(3) {
  transition-delay: 0.6s;
}
</style>