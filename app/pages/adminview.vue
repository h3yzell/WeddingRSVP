<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto p-4 sm:p-6">

      <header class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-12">
        <div class="flex items-center gap-3">
          <img src="~/assets/images/MH.png" alt="Logo" class="w-10 h-10">
          <h1 class="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            maisarahaizat.my
          </h1>
        </div>

        <div class="flex gap-2">
          <button
            @click="toggleDarkMode"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            class="p-2 cursor-pointer rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200
                   dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
                   opacity-70 hover:opacity-100 transition"
          >
            <MoonIcon v-if="isDarkMode" class="w-5 h-5" />
            <SunIcon v-else class="w-5 h-5" />
          </button>

          <button
            @click="logout"
            class="px-4 py-2 cursor-pointer rounded text-sm font-semibold
                   bg-gray-100 text-gray-700 hover:bg-gray-200
                   dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </header>

      <div class="flex justify-center mb-8">
        <div class="w-full sm:w-1/2 p-4 border rounded-sm shadow-sm
                    bg-gray-100 border-gray-200
                    dark:bg-gray-800 dark:border-gray-700
                    text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Submissions</p>
          <p class="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {{ guests?.length || 0 }}
          </p>
        </div>
      </div>

      <div class="overflow-x-auto rounded-sm border shadow-sm
                  bg-gray-100 border-gray-200
                  dark:bg-gray-800 dark:border-gray-700">
        <table class="w-full text-sm text-left">
          <thead class="border-b
                        bg-gray-50 text-gray-600 border-gray-200
                        dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700">
            <tr>
              <th class="p-4">Time</th>
              <th class="p-4">Name</th>
              <th class="p-4">Phone</th>
              <th class="p-4">Attending</th>
              <th class="p-4">Session</th>
              <th class="p-4">Guests</th>
              <th class="p-4">Wishes</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="guest in guests"
              :key="guest.id"
              class="transition hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="p-4 text-gray-400 dark:text-gray-500">
                {{ formatDate(guest.created_at) }}
              </td>
              <td class="p-4 font-medium text-gray-700 dark:text-gray-200">
                {{ guest.name }}
              </td>
              <td class="p-4 text-gray-600 dark:text-gray-300">
                {{ guest.phone }}
              </td>
              <td class="p-4">
                <span
                  class="px-2 py-1 rounded-full text-xs font-bold uppercase"
                  :class="guest.attendance
                    ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900'
                    : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900'"
                >
                  {{ guest.attendance ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="p-4 text-gray-600 dark:text-gray-300">
                {{ guest.attendanceTime || '-' }}
              </td>
              <td class="p-4 text-gray-600 dark:text-gray-300">
                {{ guest.additionalGuests || 0 }}
              </td>
              <td
                class="p-4 max-w-xs truncate italic
                       text-gray-500 dark:text-gray-400"
                :title="guest.wishes"
              >
                {{ guest.wishes || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>


<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const supabase = useSupabaseClient()

useHead({ title: 'Admin Page' })

const { data: guests } = await supabase
  .from('rsvp_attendance')
  .select('created_at, name, phone, attendance, attendanceTime, additionalGuests, wishes')
  .order('created_at')

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('darkMode', isDarkMode.value)
}

onMounted(() => {
  const saved = localStorage.getItem('darkMode') === 'true'
  isDarkMode.value = saved
  document.documentElement.classList.toggle('dark', saved)
})

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/adminlogin')
}
</script>