<script setup>
import { ref, computed } from 'vue';

const supabase = useSupabaseClient();
const hasSubmitted = ref(false);
const rsvp = ref([]);

useHead({ title: 'RSVP: Haizat & Maisarah' })


async function getData(){
    const {data} = await supabase.from('rsvp_attendance').select();
    rsvp.value = data;
    console.log(rsvp.value);
}

const nikahSpots = computed(() => {
    if (!rsvp.value) return 0;
    return rsvp.value
        .filter(entry => entry.attendanceTime === 'Nikah' && entry.attendance === true)
        .reduce((total, entry) => total + (entry.additionalGuests || 0), 0);
})

const receptionSpots = computed(() => {
    if (!rsvp.value) return 0;
    return rsvp.value
        .filter(entry => entry.attendanceTime === 'Reception' && entry.attendance === true)
        .reduce((total, entry) => total + (entry.additionalGuests || 0), 0);
})

const nikahAvailable = computed(() => 110 - nikahSpots.value);
const receptionAvailable = computed(() => 170 - receptionSpots.value);

const isNikahFull = computed(() => nikahAvailable.value <=0);
const isReceptionFull = computed(() => receptionAvailable.value <=0);

onMounted(()=>{
    if (localStorage.getItem("rsvp_submitted") === "true") {
    hasSubmitted.value = true;
    }
    getData();
    const channel = supabase
        .channel('rsvp_changes')
        .on('postgres_changes', 
            { 
                event: '*', 
                schema: 'public', 
                table: 'rsvp_attendance' 
            }, 
            (payload) => {
                console.log('Change received!', payload);
                getData();
            }
        )
        .subscribe();
    
    onUnmounted(() => {
        supabase.removeChannel(channel);
    });
});

const form = ref({
  name: '',
  phone: '',
  attendance: true,
  attendanceTime: null,
  additionalGuests: 1,
  wishes: ''
});

function selectTimeSlot(slot) {
    if (slot === 'Nikah' && isNikahFull.value) {
        alert('Sorry, Nikah session is fully booked!');
        return;
    }
    if (slot === 'Reception' && isReceptionFull.value) {
        alert('Sorry, Reception session is fully booked!');
        return;
    }
    form.value.attendanceTime = slot;
}

const isPhoneValid = computed(() => {
  const phone = form.value.phone.trim();
  if (!phone) return true; 
  const phoneRegex = /^[0-9]{8,15}$/;
  return phoneRegex.test(phone);
});

const isFormValid = computed(() => {
  const hasName = form.value.name.trim() !== '';
  const hasPhone = form.value.phone.trim() !== '';
  const hasAttendance = form.value.attendance !== null;

  if (!hasPhone || !isPhoneValid.value) {
    return false;
  }
  
  if (form.value.attendance === true) {
    const hasTimeSlot = form.value.attendanceTime !== null;
    const hasGuests = form.value.additionalGuests !== null;
    return hasName && hasPhone && hasAttendance && hasTimeSlot && hasGuests;
  }

  return hasName && hasPhone && hasAttendance;
});

async function onSubmit() {
    if (!isFormValid.value) return;

    console.log('Form submitted:', form.value);

    // prevents accidental double submit
    if (localStorage.getItem("rsvp_submitted") === "true") {
        hasSubmitted.value = true;
        return;
    }

    if (form.value.attendance === true) {
        if (form.value.attendanceTime === 'Nikah' && isNikahFull.value) {
            alert('Sorry, Nikah session is now fully booked! Please select another time.');
            return;
        }
        if (form.value.attendanceTime === 'Reception' && isReceptionFull.value) {
            alert('Sorry, Reception session is now fully booked! Please select another time.');
            return;
        }
    }

    const { data: existing, error: checkError } = await supabase
        .from('rsvp_attendance')
        .select('*')
        .or(`phone.eq.${form.value.phone}`);

    if (checkError) {
        console.error("Error checking duplicates:", checkError);
        return;
    }

    if (existing && existing.length > 0) {
        alert("You have already submitted your RSVP.");
        localStorage.setItem("rsvp_submitted", "true"); 
        hasSubmitted.value = true;
        return;
    }

    const { data, error } = await supabase
        .from('rsvp_attendance')
        .insert([
            {
            name: form.value.name,
            phone: form.value.phone,
            attendance: form.value.attendance,
            attendanceTime: form.value.attendanceTime,
            additionalGuests: form.value.additionalGuests,
            wishes: form.value.wishes
            }
        ]);

        if (error) {
            console.error('Error submitting RSVP:', error);
            console.error('Details:', error.message);
            return;
        }

        console.log('RSVP submitted successfully:', data);

        localStorage.setItem("selected_slot", form.value.attendanceTime);
        localStorage.setItem("is_attending", form.value.attendance.toString());
        localStorage.setItem("rsvp_submitted", "true");
        hasSubmitted.value = true;

        form.value = {
        name: '',
        phone: '',
        attendance: true,
        attendanceTime: null,
        additionalGuests: 0,
        wishes: ''
        };

        await getData();

}
</script>

<template>
    <Thankyou v-if="hasSubmitted" />
    <div v-if="!hasSubmitted" class="flex justify-center py-10 px-4 min-h-screen bg-[#F3F4F6]">
        <div class="mx-auto">
            <div class="flex-col text-center mb-8 p-8 rounded-lg shadow-md bg-white">
                <NuxtLink to="/" class="flex-1 cursor-pointer">
                <!-- Header -->
                <h1 class="font-inter text-base text-black mb-2">WEDDING OF</h1>

                <p class="font-cormorant italic text-3xl text-black mb-4">Haizat & Maisarah</p>

                </NuxtLink>

                <div class="h-0.5 bg-rose-800 rounded-b-full"></div>
                
                <!-- Date and Details -->
                 <div class="space-y-3 text-gray-700 text-left mt-5">
                    <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar mr-2 flex-shrink-0 mt-0.5 text-rose-800"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                        <p class="font-inter text-center text-sm text-gray-700 leading-6 sm:text-base">Saturday, February 14th, 2026</p>
                    </div>
                    <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin mr-2 flex-shrink-0 mt-0.5 text-rose-800"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <p class="font-inter text-center text-sm text-gray-700 leading-6 sm:text-base">Laman Gaharu Emas, Shah Alam</p>
                    </div>
                    <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock mr-2 flex-shrink-0 mt-0.5 text-rose-800"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <p class="font-inter text-center text-sm text-gray-700 leading-6 sm:text-base">RSVP by Sunday, January 25th, 2026</p>
                    </div>
                </div>
                
                
                <!-- Dress Code TBD -->
                <div class="mt-6 text-left border-t pt-4">
                    <h3 class="mb-2 font-medium text-sm text-gray-700"> Dress Code: Formal Malay Traditional Attire</h3>

                    <div class="flex items-start">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="mr-2 shrink-0 mt-0.5 text-rose-800" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M225.124 33.908c-1 0-3.118.68-5.855 3.05-2.74 2.373-5.792 6.186-8.43 10.58-5.273 8.79-8.716 20.37-8.716 25.37s3.68 21.406 9.272 34.455c2.796 6.525 6.08 12.466 9.042 16.22 2.964 3.753 5.186 4.325 4.686 4.325h64c-.5 0 1.722-.572 4.686-4.326 2.963-3.753 6.246-9.694 9.043-16.22 5.592-13.048 9.27-29.454 9.27-34.454s-3.442-16.58-8.716-25.37c-2.637-4.394-5.69-8.207-8.428-10.58-2.738-2.37-4.856-3.05-5.856-3.05h-64zm7.22 112l-8.452 38.03 62.966-15.74-4.953-22.29h-49.562zm58.42 39.867l-71.238 17.81-10.693 48.12 91.5-22.875-9.568-43.055zm13.473 60.63l-99.77 24.945-10.693 48.12 120.032-30.01-9.57-43.054zm13.475 60.632L189.41 339.113l-10.694 48.12 148.564-37.14-9.568-43.056zm13.473 60.633L174.35 406.88l-3.103 13.96 35.193 23.463 134.313-33.578-9.568-43.055zm-7.084 65.77l-97.42 24.355 30.444 20.297 66.977-44.65z"></path></svg>
                        <p class="text-sm sm:text-base leading-6 text-gray-700">Baju Melayu / Batik / Kurta</p>
                    </div>
                    <div class="flex items-start">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="mr-2 shrink-0 mt-0.5 text-rose-800" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M95.605 53.618C59.398 91.634-.277 129.436 23.022 165.38c29.725 42.452 55.624 70.193 100.27 95.33 33.935 20.864 52.875 61.208 67.35 93.078 8.437 19.378 14.978 35.68 22.847 47.905 3.68 5.72 16.17 10.824 33.27 14.64 19.66 4.387 45.662 6.826 73.856 8.027 55.43 2.362 119.31.07 163.98.313 10.655-18.24 6.73-26.878-2.402-30.22-46.818-17.135-97.9-23.76-133.024-68.236-17.576 7.758-51.442 6.62-72.373-5.514C183.724 266.746 153.233 145.19 95.605 53.618zM50.725 227.55c38.173 105.505 31.883 229.52 35.69 230.832h18.07c.865-9.313-7.227-140.064 9.887-182.422-25.577-14.43-45.698-30.095-63.647-48.41zM230.74 430.493c22.236 32 33.7 26.59 40.543 27.89h195.404l8.528-16.058c-43.404.074-102.725 1.926-155.352-.316-28.733-1.224-55.45-3.637-76.95-8.434-4.238-.946-8.304-1.96-12.173-3.082z"></path></svg>
                        <p class="text-sm sm:text-base leading-6 text-gray-700">Baju Kurung / Kebaya</p>
                    </div>
                </div>
            </div>

            <!-- RSVP Form -->
            <form @submit.prevent="onSubmit" class="space-y-8 bg-white p-8 rounded-lg shadow-md" style="opacity: 1; transform: none;">
  
                <!-- Your Name -->
                <div class="space-y-1 mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span class="text-rose-500 ml-1">*</span>
                    </label>
                    <input 
                        class="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-800 focus:border-rose-800" 
                        v-model="form.name"
                        type="text"
                        placeholder="Full Name"
                        required="" 
                        >
                </div>

                <!-- Phone Number -->
                <div class="space-y-1 mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span class="text-rose-500 ml-1">*</span>
                    </label>
                    <input
                        v-model="form.phone" 
                        type="tel"
                        pattern="[0-9+]*"
                        inputmode="numeric"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-800 focus:border-rose-800" 
                        :class="{'border-red-500': form.phone && !isPhoneValid}"
                        placeholder="0123456789" 
                        @input="form.phone = form.phone.replace(/[^0-9+]/g, '')"
                        required
                    >
                    <p v-if="form.phone && !isPhoneValid" class="text-xs text-red-500 mt-1">
                        Please enter a valid phone number
                    </p>
                </div>

                <!-- Will you be attending? -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">
                        Will you be attending? <span class="text-rose-500 ml-1">*</span>
                    </label>
                    <div class="flex space-x-4">
                    
                    <!-- Yes, I'll be there -->
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                        <input 
                        class="sr-only" 
                        type="radio" 
                        name="attendance" 
                        :checked="form.attendance === true" 
                        @change="form.attendance = true ; form.additionalGuests = 1">
                        <div class="w-5 h-5"
                        :class="form.attendance ? 'text-rose-800' : 'text-gray-300'">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                        </div>
                        </div>
                        <span class="ml-2 text-sm text-gray-700">Yes, I'll be there</span>
                    </label>

                    <!-- Sorry, I can't make it -->
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input 
                            class="sr-only" 
                            type="radio" 
                            name="attendance" 
                            :checked="form.attendance === false" 
                            @change="form.attendance = false ; form.additionalGuests = 0">
                            <div class="w-5 h-5 text-gray-300"
                            :class="!form.attendance ? 'text-rose-800' : 'text-gray-300'">
                                <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <g><g><g>
                                    <path d="M375.026,46.268c-31.688,0-62.593,12.083-87.023,34.024c-1.109,0.995-1.989,2.215-2.588,3.579 c-0.28,0.636-0.557,1.16-0.849,1.603l-34.157,51.588c-2.315,3.497-2.315,8.039,0,11.537l34.157,51.589 c2.321,3.505,2.321,8.033,0.001,11.537l-34.158,51.592c-2.315,3.497-2.315,8.039,0,11.537l34.157,51.59 c2.321,3.505,2.321,8.033,0,11.536l-34.159,51.6c-2.314,3.497-2.314,8.039,0.001,11.537l30.229,45.663 c2.002,3.024,5.323,4.681,8.722,4.681c1.768,0,3.559-0.449,5.196-1.389c36.187-20.783,88.685-54.506,133.289-97.143 C483.685,299.547,512,246.619,512,195.613C512,113.264,450.554,46.268,375.026,46.268z M292.615,427.013l-20.964-31.668 l30.34-45.831c6.96-10.512,6.959-24.097-0.001-34.609l-30.338-45.822l30.339-45.823c6.96-10.513,6.96-24.097-0.001-34.61 l-30.338-45.821l30.336-45.817c0.529-0.797,1.02-1.626,1.483-2.501c20.342-17.651,45.672-27.346,71.556-27.346 c64.004,0.001,116.076,57.623,116.076,128.448C491.102,297.08,358.555,388.053,292.615,427.013z"></path>
                                    <path d="M225.345,401.113c-2.32-3.504-2.32-8.032,0-11.536l34.158-51.599c2.314-3.497,2.314-8.038-0.001-11.536l-34.157-51.591 c-2.321-3.505-2.321-8.033-0.001-11.537l34.158-51.592c2.315-3.497,2.315-8.039,0-11.537l-34.157-51.59 c-2.321-3.504-2.321-8.032,0-11.536l16.854-25.455c2.469-3.729,2.29-8.617-0.444-12.156 c-26.11-33.798-64.302-53.182-104.781-53.182C61.446,46.268,0,113.264,0,195.613c0,57.885,36.172,117.873,107.512,178.292 c54.559,46.209,113.524,78.786,136.342,90.649c1.528,0.794,3.179,1.178,4.815,1.178c2.892,0,5.738-1.199,7.772-3.461 c3.186-3.54,3.575-8.785,0.946-12.757L225.345,401.113z M121.017,357.958C54.582,301.692,20.898,247.071,20.898,195.613 c0-70.825,52.071-128.447,116.076-128.447c31.624,0,61.693,14.245,83.545,39.332l-12.598,19.026 c-6.962,10.514-6.962,24.098,0,34.611l30.338,45.821l-30.339,45.823c-6.96,10.513-6.96,24.097,0.001,34.61l30.338,45.823 l-30.34,45.831c-6.958,10.512-6.958,24.095,0,34.606c0,0,0,0,0,0.001l8.275,12.498 C189.269,409.099,154.276,386.125,121.017,357.958z"></path>
                                </g></g></g>
                                </svg>
                            </div>
                        </div>
                        <span class="ml-2 text-sm text-gray-700">Sorry, I can't make it</span>
                    </label>

                    </div>
                </div>

                <!-- Additional Guests -->
                <div class="space-y-4" style="opacity: 1;" v-if="form.attendance">
                    <label for="additionalGuests" class="block text-sm font-medium text-gray-700">Number of Guests (Maximum: 2) <span class="text-rose-500 ml-1">*</span></label>
                    <div class="flex space-x-4">   
                        <!-- Single Person -->
                        <label class="flex items-center cursor-pointer">
                            <div class="relative">
                            <input 
                            class="sr-only" 
                            type="radio" 
                            name="additionalGuests" 
                            :checked="form.additionalGuests === 1" 
                            @change="form.additionalGuests = 1">
                                <div class="w-5 h-5"
                                :class="form.additionalGuests === 1 ? 'text-rose-800' : 'text-gray-300'">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user size-6">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                            </div>
                            <span class="ml-2 text-sm text-gray-700">1 People</span>
                        </label>
                    
                        <!-- Two People -->
                        <label class="flex items-center cursor-pointer">
                            <div class="relative">
                            <input 
                            class="sr-only" 
                            type="radio" 
                            name="additionalGuests" 
                            :checked="form.additionalGuests === 2" 
                            @change="form.additionalGuests = 2">
                                <div class="w-5 h-5"
                                :class="form.additionalGuests === 2 ? 'text-rose-800' : 'text-gray-300'">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users size-6">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                            </div>
                            <span class="ml-2 text-sm text-gray-700">2 People</span>
                        </label>
                    </div>
                </div>

                <!-- Select Preferred Time -->
                <div class="space-y-4" style="opacity: 1;" v-if="form.attendance">
                    <div class="space-y-4 undefined">
                        <label class="block text-sm font-medium text-gray-700">
                            Select Attendance Time <span class="text-rose-500 ml-1">*</span>
                        </label>
                        <div class="grid gap-4">
                            
                            <!-- 1st Slot -->
                            <button 
                            type="button" 
                            class="relative p-4 border rounded-lg text-left cursor-pointer"
                            @click="selectTimeSlot('Nikah')"
                            :disabled="isNikahFull"
                            :class="[
                                form.attendanceTime === 'Nikah' ? 'border-rose-800 bg-rose-50' : 'transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50',
                                isNikahFull ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            ]">
                                <div class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock flex-shrink-0 w-5 h-5 mt-1 text-rose-600">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <div class="grow">
                                        <div class="text-sm text-gray-700">9:00 AM - 11:00 AM</div>
                                        <div class="text-sm text-gray-600 font-medium mt-1">Nikah</div>
                                        <div class="text-sm mt-1" :class="isNikahFull ? 'text-red-500 font-medium' : 'text-gray-500'">
                                            {{ isNikahFull ? 'FULLY BOOKED' : `${nikahSpots}/110 spots taken` }}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <!-- 2nd Slot -->
                            <button 
                            type="button" 
                            class="relative p-4 border rounded-lg text-left cursor-pointer"
                            @click="selectTimeSlot('Reception')"
                            :class="[
                                form.attendanceTime === 'Reception' ? 'border-rose-800 bg-rose-50' : 'transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50',
                                isReceptionFull ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                ]">
                                <div class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock flex-shrink-0 w-5 h-5 mt-1 text-rose-600">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <div class="grow">
                                        <div class="text-sm text-gray-700">11:00 AM - 1:30 PM</div>
                                        <div class="text-sm text-gray-600 font-medium mt-1">Reception</div>
                                        <div class="text-sm mt-1" :class="isReceptionFull ? 'text-red-500 font-medium' : 'text-gray-500'">
                                            {{ isReceptionFull ? 'FULLY BOOKED' : `${receptionSpots}/170 spots taken` }}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Wishes for the Couple -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Wishes for the Couple</label>
                    <textarea 
                    v-model.trim="form.wishes"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700 focus:ring-1 focus:ring-rose-800 focus:border-rose-800" 
                    placeholder="Share your wishes for the couple (Max 240 characters)" 
                    maxlength="240"
                    rows="4"
                    ></textarea>
                    <p class="text-sm text-right text-gray-500">{{ form.wishes.length }}/240</p>
                </div>

                <!-- Digital Money Gift Section 
                <div class="bg-white p-6 rounded-lg shadow-sm mt-8 mb-4" style="opacity: 1; transform: none;">
                    <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">Digital Money Gift</h3>
                    <p class="text-sm font-medium text-gray-700 mb-6 text-center">
                        Your presence is gift enough, but if you wish to give something, we welcome your contribution with a warm heart ❤︎ 
                    </p>
                    <div class="flex justify-center mb-4">
                        <div class="relative w-64 h-64 border border-gray-200 rounded-lg overflow-hidden">
                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                                <img 
                                    src="~/assets/images/QRCode.png" 
                                    alt="QR Code" 
                                    class="w-full h-full object-contain"/>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 text-center">Scan the QR code</p>
                </div>
                -->

                <!-- Submit Button -->
                <button 
                    class="font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 px-4 py-2 block hover:opacity-90 mx-auto border-2 border-rose-800 rounded-lg hover:border-rose-700" 
                    type="submit"
                    :disabled="!isFormValid"
                    :class="isFormValid ? ' text-white bg-rose-700 border-rose-700 hover:bg-rose-500 hover:border-rose-500 cursor-pointer' : 'bg-gray-100 border-gray-300 cursor-not-allowed'"
                    >
                    Submit
                </button>

            </form>

        </div>
    </div>
</template>