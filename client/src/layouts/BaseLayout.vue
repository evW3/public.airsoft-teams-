<template>
    <div>
        <header>
            <nav>
                <button
                    v-for="tab in tabs"
                    :key="tab.name"
                    :href="tab.to"
                    :class="{ 'links_active': currentTab === tab.name, [tab.icon]: true }"
                ></button>
            </nav>
        </header>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
    export default {
        name: "BaseLayout",
        data: () => ({
            currentTab: 'Home',
            tabs: [{ name: "Teams", to: "/teams", icon: '' }]
        }),
    }
</script>

<style scoped>

</style>