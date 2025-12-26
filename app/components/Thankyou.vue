<script setup>
import { ref, computed } from 'vue';

const submittedSlot = ref(localStorage.getItem('selected_slot'));
const isAttending = ref(localStorage.getItem('is_attending') === 'true');

const timeSlots = {
  'Nikah': '9:00 AM — 11:00 AM',
  'Reception': '11:00 AM — 1:00 PM'
};

const selectedTime = computed(() => timeSlots[submittedSlot.value] || '9:00 AM — 1:00 PM');
async function saveAsPDF() {
  try {
    window.print();
  } catch (error) {
    console.error('Error saving PDF:', error);
  }
}
</script>

<template>
  <div class="flex justify-center py-10 px-4 min-h-screen bg-[#F3F4F6]">
    <div class="mx-auto max-w-3xl w-full">
      
      <div class="bg-white p-8 md:p-12 rounded-lg shadow-md text-center space-y-6">
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="text-rose-800"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>

        <!-- Thank You Message -->
        <div class="space-y-4">
          <h2 class="font-crimson text-3xl md:text-4xl text-rose-800">
            {{ isAttending ? 'Thank You!' : 'We Understand' }}
          </h2>
          <div class="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            <p v-if="isAttending">
              Your RSVP has been received successfully. We're thrilled to celebrate this special day with you!
            </p>
            <p v-else>
              Thank you for letting us know. We're sad you can't make it, but we understand and appreciate you taking the time to respond. You'll be missed on our special day!
            </p>
          </div>
        </div>

        
        <div class="w-24 h-0.5 bg-rose-800 mx-auto my-6"></div>

        
        <div class="space-y-4 text-gray-600 text-sm md:text-base">
          <p>
            A confirmation has been noted. If you have any questions or need to make changes to your RSVP, please feel free to contact us.
          </p>
          
          <!-- Event Reminder -->
          <div v-if="isAttending" class="bg-rose-50 p-6 rounded-lg mt-6 space-y-3 text-left">
            <h3 class="font-medium text-gray-900 text-center mb-4">Event Details</h3>
            
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 flex-shrink-0 mt-0.5 text-rose-800">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <p class="text-sm text-gray-700">Saturday, February 14th, 2026</p>
            </div>
            
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 flex-shrink-0 mt-0.5 text-rose-800">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p class="text-sm text-gray-700">Laman Gaharu Emas, Shah Alam</p>
            </div>

            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 flex-shrink-0 mt-0.5 text-rose-800">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <p class="text-sm text-gray-700">{{ submittedSlot }}, {{ selectedTime }}</p>
            </div>
          </div>
        </div>

        
        <div v-if="isAttending" class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button 
            @click="saveAsPDF"
            class="px-6 py-3 bg-rose-700 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium border-2 border-rose-700 hover:border-rose-600 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>