<template>
  <div class="card">
    <header v-if="title" class="card-header row">
      <div class="col-lg-8">
        {{title}}
      </div>
<!--      <div class="col-lg-2">-->
<!--        <button class="btn btn-primary">Add Course</button>-->
<!--      </div>-->
    </header>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props:['title']
  }
</script>

<style scoped>

</style>
