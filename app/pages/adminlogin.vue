<script setup>
const supabase = useSupabaseClient();
const email = ref('');
const password = ref('');

useHead ({ title: "RSVP Admin Login" })

const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    if (error) alert(error.message)
    else navigateTo('/adminview')
}
</script>

<template>
    <div class="flex justify-center items-center w-screen mx-auto min-h-screen bg-gray-100 px-6 py-8 text-gray-700">
        <header class="fixed top-0 z-50 shadow bg-white">
            <div class="w-screen h-20 mx-auto flex justify-left items-center pl-10">
                <img src="~/assets/images/MH.png" class="w-15 h-15 m-4">
                <h1 class="font-bold text-xl">
                    maisarahaizat.my
                </h1>
            </div>
        </header>
        <form @submit.prevent = "handleLogin" class="flex flex-col bg-white p-8 shadow-md rounded-md w-100">
            <h1 class="font-bold text-2xl text-center mb-8">
            Admin Login
            </h1>
            <label class="text-sm font-semibold mb-1 text-gray-500">
                Email Address
            </label>
            <input v-model="email" type="email" class="rounded-md border border-gray-300 p-2 mb-3 focus:outline-none focus:ring-1 lg:p-3 focus:ring-gray-400"> 
            <label class="text-sm font-semibold mb-1 text-gray-500">
                Password
            </label>
            <input v-model="password" type="password" class="rounded-md border border-gray-300 p-2 mb-8 focus:outline-none focus:ring-1 lg:p-3 focus:ring-gray-400"> 
            <button type="submit" class="w-40 p-2 self-center rounded-lg shadow-md bg-slate-900 text-md text-[#FEFEFE] cursor-pointer hover:bg-slate-700">
            Login
            </button>
        </form>
    </div>
    <footer class="bg-white border-t border-gray-300 bottom-0">
    <div class="w-screen px-6 py-4 text-sm text-gray-500 text-center">
    ©2025 Developed by Nabil Azmi
    </div>
    </footer>
</template>