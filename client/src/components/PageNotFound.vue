<template>
    <div class="not-found">
        <span class="not-found__title">404</span>
        <div class="not-found__horizontal-line"></div>
        <div class="not-found_column">
            <span>Страница не была найдена</span>
            <span>Проверте правильность написания URL</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageNotFound"
    }
</script>

<style scoped lang="scss">
    .not-found {
        width: 100%;
        display: flex;
        justify-content: center;
        user-select: none;
        align-items: center;
        height: 100vh;
        background-color: black;
        &__title {
            font-size: 70px;
            color: white;
        }
        &__horizontal-line {
            width: 2px;
            height: 150px;
            margin: 0 50px;
            background-color: white;
        }
        &_column {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            & span {
                margin-bottom: 5px;
            }
        }
    }
</style>