<template>
    <div class="base-layout">
        <header>
            <nav>
                <router-link
                    v-for="tab in tabs"
                    :key="tab.name"
                    :to="tab.to"
                    :class="{ 'links_active': currentTab === tab.name, [tab.icon]: true }"
                >{{ tab.name }}</router-link>
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
            tabs: [
                { name: "Profile", to: "/profile", icon: '' }
            ]
        }),
        beforeMount() {

        }
    }
</script>

<style scoped lang="scss">
    button {
        background-color: transparent;
        cursor: pointer;
    }
    .base-layout {
        width: 100%;
        height: 100%;
        background-color: black;
    }

    header {
        width: 100%;
        height: 60px;
        padding: 10px 30px;
    }
</style>