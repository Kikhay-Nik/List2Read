<script setup lang="ts">

</script>

<template>
    <transition appear :duration="500">
        <div class="loader">
            <div class="loader__text">Loading...</div>
        </div>
    </transition>
</template>

<style scoped>
.loader {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-background-soft);
    opacity: 0.9;
    z-index: 10;
}

.loader__text {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-heading);
    animation: flashing 1s infinite;
}

@keyframes flashing {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
}
</style>