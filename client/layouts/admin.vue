<template>
  <div class="container">
    <div class="admin-navbar">
      <NuxtLink class="admin-navbar__item" to="/admin/users">
        Users list
      </NuxtLink>
      <NuxtLink class="admin-navbar__item" to="/"> Back </NuxtLink>
    </div>
    <div class="workspace">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  min-width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
}

.admin-navbar {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid black;
  background-color: var(--color-primary);

  &__item {
    width: 100%;
    text-align: center;
    position: relative;
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;

    transition: 0.5s ease;

    &:hover {
      background-color: var(--color-accent);
    }
  }
}

.router-link-active,
.router-link-exact-active {
  color: var(--color-secondary-btn);

  &:after {
    content: "";
    display: block;
    width: 90%;
    height: 2px;
    position: absolute;
    background-color: var(--color-secondary-btn);
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

.workspace {
  min-width: 80%;
}

@media (max-width: 820px) {
  .container {
    grid-template-columns: 1fr 2fr;
  }
}
</style>
