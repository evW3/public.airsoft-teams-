<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>

<script>
    import EmptyLayout from "./layouts/EmptyLayout";
    import BaseLayout from "./layouts/BaseLayout";

    export default {
        computed: {
            layout() {
                return (this.$route.meta.layout || "empty") + "-layout";
            }
        },
        components: {
            EmptyLayout,
            BaseLayout
        }
    };
</script>