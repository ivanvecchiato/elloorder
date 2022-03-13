<template>
<b-navbar type="light" class='toolbar'>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-button variant="light" @click="$router.go(-1)" size="sm"><b-icon thumbnail icon="arrow-left-circle" ></b-icon></b-button>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<style scoped>
.toolbar {
  background: transparent;
}
</style>