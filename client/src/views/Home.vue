<template>
    <div class="home">
        <Loader v-if="isLoading" />
        <div v-else>Home</div>
    </div>
</template>

<script>
  import Loader from "../components/Loader";
  export default {
      name: "Home",
      components: { Loader },
      data: () => ({
          isLoading: true
      }),
  }
</script>