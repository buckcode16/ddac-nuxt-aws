<template>
  <div
    class="p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center"
  >
    <div class="mb-12">
      <h1><span class="font-bold">Eduscholar</span></h1>
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div class="mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col">
        <div v-if="!loggedIn">
          <NuxtLink to="/login">Log In</NuxtLink>
        </div>
        <div v-else>
          <h3>Profile</h3>
          <NuxtLink href="/"><h3>Scholarships</h3></NuxtLink>
          <NuxtLink to="/applications"><h3>Applications</h3></NuxtLink>
          <div v-show="isAdmin">
            <NuxtLink to="/applications/create"><h3>Create</h3></NuxtLink>
          </div>
          <hr class="mt-5" />
          <button class="mt-5" @click="signOut"><h3>Log out</h3></button>
        </div>
      </div>

      <div class="p-12 bg-white rounded-md w-[100ch] flex flex-wrap">
        <div class="flex flex-col">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { status, signOut } = useAuth()
const loggedIn = computed(() => status.value === 'authenticated')

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: token } = await useFetch('/api/auth/token', { headers })
const isAdmin = computed(() => token.value?.role === 'ADMIN')
</script>

<style lang="scss" scoped></style>
