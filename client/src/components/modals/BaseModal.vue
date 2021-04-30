<template>
    <div class="modal">
        <slot />
    </div>
</template>

<script>
    export default {
        name: "BaseModal"
    }
</script>

<style scoped lang="scss">
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        z-index: 1000;
        background: rgba(51, 51, 51, 0.5);
    }
</style>