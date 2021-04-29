<template>
    <div>
        <Loader v-if="isLoading" />
        <div>Home</div>
    </div>
</template>

<script>
  export default {
      name: "Home",
      data: () => ({
          isLoading: true
      }),
  }
</script>