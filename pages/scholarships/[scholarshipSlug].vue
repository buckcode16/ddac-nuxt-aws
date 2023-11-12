<template>
  <div v-if="scholarship">
    {{ scholarship.title }}

    <UButton @click="handlePostApplication" :disabled="isDisabled">
      Apply
    </UButton>
  </div>
</template>

<script setup lang="ts">
const { scholarships } = await useScholarshipStore()
const route = useRoute()

const scholarship = computed(() => {
  return scholarships.find(
    (scholarship) => scholarship.slug == route.params.scholarshipSlug,
  )
})

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: token } = await useFetch('/api/auth/token', { headers })
const userId = token.value?.id

const { data: applications } = await useFetch(
  `/api/users/${userId}/applications`,
)

const isDisabled = ref(false)
onMounted(() => {
  if (applications.value) {
    const application = applications.value.find(
      (application) => application.scholarshipId === scholarship.value.id,
    )

    if (application) {
      isDisabled.value = true
    }
  }
})

if (!scholarship.value) {
  throw createError({
    statusCode: 404,
    message: `Scholarship with the title of ${route.params.scholarshipSlug} does not exist`,
  })
}

const handlePostApplication = async () => {
  const body = {
    scholarshipId: scholarship.value.id,
    userId: userId,
  }

  try {
    const { data, status, error } = await useFetch('/api/applications/', {
      method: 'post',
      body,
    })

    if (status.value === 'success') {
      // Disable the button
      isDisabled.value = true
    } else {
      // Handle the error
      console.error('Error updating scholarship status:', error)
    }
  } catch (err) {}
}
</script>

<style lang="scss" scoped></style>
