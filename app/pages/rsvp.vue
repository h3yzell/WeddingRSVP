<template>
    <div class="flex justify-center py-10 px-4 min-h-screen bg-[#F3F4F6]">
        <div class="mx-auto max-w-3xl">
            <div class="flex-col text-center mb-8 p-8 rounded-lg shadow-md bg-white">
                <!-- Header -->
                <h1 class="font-inter text-base text-black mb-2">GRAND WEDDING CELEBRATION</h1>

                <p class="font-cormorant italic text-3xl text-black mb-4">Haizat & Maisarah</p>

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
                        <p class="font-inter text-center text-sm text-gray-700 leading-6 sm:text-base">RSVP by Sunday, February 1st, 2026</p>
                    </div>
                </div>
                
                
                <!-- Dress Code TBD -->
                <div class="mt-6 text-left border-t pt-4">
                    <h3 class="mb-2 font-medium text-sm text-gray-700"> Dress Code: Malaysian Elegance</h3>

                    <div class="flex items-start">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="mr-2 flex-shrink-0 mt-0.5 text-rose-800" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M225.124 33.908c-1 0-3.118.68-5.855 3.05-2.74 2.373-5.792 6.186-8.43 10.58-5.273 8.79-8.716 20.37-8.716 25.37s3.68 21.406 9.272 34.455c2.796 6.525 6.08 12.466 9.042 16.22 2.964 3.753 5.186 4.325 4.686 4.325h64c-.5 0 1.722-.572 4.686-4.326 2.963-3.753 6.246-9.694 9.043-16.22 5.592-13.048 9.27-29.454 9.27-34.454s-3.442-16.58-8.716-25.37c-2.637-4.394-5.69-8.207-8.428-10.58-2.738-2.37-4.856-3.05-5.856-3.05h-64zm7.22 112l-8.452 38.03 62.966-15.74-4.953-22.29h-49.562zm58.42 39.867l-71.238 17.81-10.693 48.12 91.5-22.875-9.568-43.055zm13.473 60.63l-99.77 24.945-10.693 48.12 120.032-30.01-9.57-43.054zm13.475 60.632L189.41 339.113l-10.694 48.12 148.564-37.14-9.568-43.056zm13.473 60.633L174.35 406.88l-3.103 13.96 35.193 23.463 134.313-33.578-9.568-43.055zm-7.084 65.77l-97.42 24.355 30.444 20.297 66.977-44.65z"></path></svg>
                        <p class="text-sm sm:text-base leading-6 text-gray-700">Baju Melayu, lounge suit, or batik shirt</p>
                    </div>
                    <div class="flex items-start">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="mr-2 flex-shrink-0 mt-0.5 text-rose-800" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M95.605 53.618C59.398 91.634-.277 129.436 23.022 165.38c29.725 42.452 55.624 70.193 100.27 95.33 33.935 20.864 52.875 61.208 67.35 93.078 8.437 19.378 14.978 35.68 22.847 47.905 3.68 5.72 16.17 10.824 33.27 14.64 19.66 4.387 45.662 6.826 73.856 8.027 55.43 2.362 119.31.07 163.98.313 10.655-18.24 6.73-26.878-2.402-30.22-46.818-17.135-97.9-23.76-133.024-68.236-17.576 7.758-51.442 6.62-72.373-5.514C183.724 266.746 153.233 145.19 95.605 53.618zM50.725 227.55c38.173 105.505 31.883 229.52 35.69 230.832h18.07c.865-9.313-7.227-140.064 9.887-182.422-25.577-14.43-45.698-30.095-63.647-48.41zM230.74 430.493c22.236 32 33.7 26.59 40.543 27.89h195.404l8.528-16.058c-43.404.074-102.725 1.926-155.352-.316-28.733-1.224-55.45-3.637-76.95-8.434-4.238-.946-8.304-1.96-12.173-3.082z"></path></svg>
                        <p class="text-sm sm:text-base leading-6 text-gray-700">Baju Kurung, Kebaya, or evening dress</p>
                    </div>
                    
                </div>
            </div>

            <!-- RSVP Form -->
            <form class="space-y-8 bg-white p-8 rounded-lg shadow-md" style="opacity: 1; transform: none;">
  
                <!-- Your Name -->
                <div class="space-y-1 mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input class="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-800 focus:border-rose-800" 
                        required="" 
                        value="">
                </div>

                <!-- Phone Number -->
                <div class="space-y-1 mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input class="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-800 focus:border-rose-800" 
                    required="" 
                    placeholder="+60123456789" 
                    value="">
                </div>

                <!-- Will you be attending? -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Will you be attending?</label>
                    <div class="flex space-x-4">
                    
                    <!-- Yes, I'll be there -->
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                        <input class="sr-only" type="checkbox" checked="">
                        <div class="w-5 h-5 text-rose-800">
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
                            <input class="sr-only" type="checkbox">
                            <div class="w-5 h-5 text-gray-300">
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

                <!-- Select Preferred Time -->
                <div class="space-y-4" style="opacity: 1;">
                    <div class="space-y-4 undefined">
                        <label class="block text-sm font-medium text-gray-700">Select Preferred Time</label>
                        <div class="grid gap-4">
                            
                            <!-- Lunch Reception -->
                            <button type="button" class="relative p-4 border rounded-lg text-left transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50">
                                <div class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock flex-shrink-0 w-5 h-5 mt-1 text-rose-600">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <div class="flex-grow">
                                        <div class="text-sm text-gray-700">12:00 PM - 2:00 PM</div>
                                        <div class="text-sm text-gray-600 font-medium mt-1">Lunch Reception</div>
                                        <div class="text-sm text-gray-500 mt-1">67/100 spots taken</div>
                                    </div>
                                </div>
                            </button>

                            <!-- Dinner Reception -->
                            <button type="button" class="relative p-4 border rounded-lg text-left transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50">
                                <div class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock flex-shrink-0 w-5 h-5 mt-1 text-rose-600">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <div class="flex-grow">
                                        <div class="text-sm text-gray-700">6:00 PM - 8:00 PM</div>
                                        <div class="text-sm text-gray-600 font-medium mt-1">Dinner Reception</div>
                                        <div class="text-sm text-gray-500 mt-1">89/150 spots taken</div>
                                    </div>
                                </div>
                            </button>

                            <!-- Evening Reception -->
                            <button type="button" class="relative p-4 border rounded-lg text-left transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50">
                                <div class="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock flex-shrink-0 w-5 h-5 mt-1 text-rose-600">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <div class="flex-grow">
                                        <div class="text-sm text-gray-700">8:30 PM - 10:30 PM</div>
                                        <div class="text-sm text-gray-600 font-medium mt-1">Evening Reception</div>
                                        <div class="text-sm text-gray-500 mt-1">79/80 spots taken</div>
                                    </div>
                                </div>
                            </button>

                        </div>
                    </div>
                </div>

                <!-- Additional Guests (REQUIRES SCRIPT) -->
                <div class="space-y-4" style="opacity: 1;">
                    <div class="relative">
                        <label for="additionalGuests" class="block text-sm font-medium text-gray-700">Additional Guests (Maximum: 3)</label>
                        <div class="mt-1 relative rounded-md shadow-sm cursor-pointer">
                            <div class="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 rounded-md">
                                No additional guests
                            </div>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-5 w-5 text-gray-400">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Meal Choice TBD -->
                <div class="space-y-6" style="opacity: 1;">
                    <div class="jsx-c8189bbae4a67f30 space-y-4">
                    <label class="jsx-c8189bbae4a67f30 block text-sm font-medium text-gray-700">
                        Your Meal Choice
                        <span class="jsx-c8189bbae4a67f30 text-rose-500 ml-1">*</span>
                    </label>
                    <div class="jsx-c8189bbae4a67f30 grid gap-4">
                        
                        <!-- Nasi Minyak with Ayam Percik -->
                        <label class="jsx-c8189bbae4a67f30 relative p-4 border rounded-lg cursor-pointer transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50">
                        <div class="jsx-c8189bbae4a67f30 flex items-start gap-3">
                            <input required="" class="jsx-c8189bbae4a67f30 flex-shrink-0 mt-1 h-4 w-4 border-gray-300 focus:ring-rose-800" type="radio" value="meal-1" name="main-guest-meal">
                            <div class="jsx-c8189bbae4a67f30 flex-grow">
                            <div class="jsx-c8189bbae4a67f30 text-sm font-medium text-gray-900">Nasi Minyak with Ayam Percik</div>
                            <div class="jsx-c8189bbae4a67f30 text-sm text-gray-500 mt-1">Ghee rice with grilled chicken marinated in spiced coconut milk sauce</div>
                            </div>
                        </div>
                        </label>

                        <!-- Grilled Lamb with Mint Sauce -->
                        <label class="jsx-c8189bbae4a67f30 relative p-4 border rounded-lg cursor-pointer transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50">
                        <div class="jsx-c8189bbae4a67f30 flex items-start gap-3">
                            <input required="" class="jsx-c8189bbae4a67f30 flex-shrink-0 mt-1 h-4 w-4 border-gray-300 focus:ring-rose-800" type="radio" value="meal-2" name="main-guest-meal">
                            <div class="jsx-c8189bbae4a67f30 flex-grow">
                            <div class="jsx-c8189bbae4a67f30 text-sm font-medium text-gray-900">Grilled Lamb with Mint Sauce</div>
                            <div class="jsx-c8189bbae4a67f30 text-sm text-gray-500 mt-1">Premium lamb chops served with traditional mint sauce and buttered vegetables</div>
                            </div>
                        </div>
                        </label>

                        <!-- Seafood Platter -->
                        <label class="jsx-c8189bbae4a67f30 relative p-4 border rounded-lg cursor-pointer transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50">
                        <div class="jsx-c8189bbae4a67f30 flex items-start gap-3">
                            <input required="" class="jsx-c8189bbae4a67f30 flex-shrink-0 mt-1 h-4 w-4 border-gray-300 focus:ring-rose-800" type="radio" value="meal-3" name="main-guest-meal">
                            <div class="jsx-c8189bbae4a67f30 flex-grow">
                            <div class="jsx-c8189bbae4a67f30 text-sm font-medium text-gray-900">Seafood Platter</div>
                            <div class="jsx-c8189bbae4a67f30 text-sm text-gray-500 mt-1">Selection of tiger prawns, grilled fish, and calamari with sambal sauce</div>
                            </div>
                        </div>
                        </label>

                        <!-- Vegetarian Curry -->
                        <label class="jsx-c8189bbae4a67f30 relative p-4 border rounded-lg cursor-pointer transition-all border-gray-200 hover:border-rose-300 hover:bg-rose-50/50">
                        <div class="jsx-c8189bbae4a67f30 flex items-start gap-3">
                            <input required="" class="jsx-c8189bbae4a67f30 flex-shrink-0 mt-1 h-4 w-4 border-gray-300 focus:ring-rose-800" type="radio" value="meal-4" name="main-guest-meal">
                            <div class="jsx-c8189bbae4a67f30 flex-grow">
                            <div class="jsx-c8189bbae4a67f30 text-sm font-medium text-gray-900">Vegetarian Curry</div>
                            <div class="jsx-c8189bbae4a67f30 text-sm text-gray-500 mt-1">Mixed vegetables and tofu in a rich Malaysian curry, served with steamed rice</div>
                            </div>
                        </div>
                        </label>

                    </div>
                    </div>
                </div>

                <!-- Wishes for the Couple (REQUIRES SCRIPT) -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Wishes for the Couple</label>
                    <textarea 
                    rows="4" 
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700 focus:ring-1 focus:ring-rose-800 focus:border-rose-800" 
                    placeholder="Share your wishes for the couple️">
                    </textarea>
                </div>

                <!-- Digital Money Gift Section -->
                <div class="bg-white p-6 rounded-lg shadow-sm mt-8 mb-4" style="opacity: 1; transform: none;">
                    <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">Digital Money Gift</h3>
                    <p class="text-sm font-medium text-gray-700 mb-6 text-center">
                        Your presence is gift enough, but if you wish to give something, a contribution to our new life together would be much appreciated.
                    </p>
                    <div class="flex justify-center mb-4">
                        <div class="relative w-64 h-64 border border-gray-200 rounded-lg overflow-hidden">
                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                                <img 
                                    src="~/assets/images/qrCode.png" 
                                    alt="QR Code" 
                                    class="w-full h-full object-contain"/>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 text-center">Scan the QR code</p>
                </div>

                <!-- Submit Button (REQUIRES SCRIPT) -->
                <button 
                    class="font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-black bg-white px-4 py-2 block hover:opacity-90 mx-auto border-2 border-rose-800 rounded-lg hover:border-rose-700 focus:ring-rose-700" 
                    disabled="" 
                    type="submit">
                    Submit
                </button>

            </form>

        </div>
    </div>
</template>
<script setup>
</script>