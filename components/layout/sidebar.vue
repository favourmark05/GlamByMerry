<template>
  <aside>
    <div id="sidebar"  class="nav-collapse ">
      <!-- sidebar menu start-->
      <ul class="sidebar-menu" id="nav-accordion">
        <li>
          <nuxt-link activ-class="active" to="/">
            <i class="fa fa-dashboard"></i>
            <span>Dashboard</span>
          </nuxt-link>
        </li>

        <li class="sub-menu">
          <a href="javascript:;" >
            <i class="fa fa-laptop"></i>
            <span>Services</span>
          </a>
          <ul class="sub">
            <li>
              <nuxt-link :to="{name: 'services-create'}">
                Create Service
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{name: 'services'}">
                Manage Services
              </nuxt-link>
            </li>
          </ul>
        </li>

        <li class="sub-menu">
          <a href="javascript:;" >
            <i class="fa fa-book"></i>
            <span>Products</span>
          </a>
          <ul class="sub">
            <li>
              <nuxt-link :to="{name: 'products-create'}">
                Create Product
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{name: 'products'}">
                Manage Products
              </nuxt-link>
            </li>
          </ul>
        </li>

        <li class="sub-menu">
          <a href="javascript:;" >
            <i class="fa fa-cogs"></i>
            <span>Courses</span>
          </a>
          <ul class="sub">
            <li>
              <nuxt-link :to="{name: 'courses-create'}">
                Create Course
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{name: 'courses'}">
                Manage Course
              </nuxt-link>
            </li>
          </ul>
        </li>

        <li>
          <nuxt-link active-class="active" :to="{name: 'categories'}">
            <i class="fa fa-users"></i>
            <span>Manage Categories</span>
          </nuxt-link>
        </li>


        <li>
          <nuxt-link active-class="active" :to="{name: 'bookings'}">
            <i class="fa fa-tasks"></i>
            <span>Manage Bookings</span>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link active-class="active" :to="{name: 'orders'}">
            <i class="fa fa-users"></i>
            <span>Manage Orders</span>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link active-class="active" :to="{name: 'customers'}">
            <i class="fa fa-users"></i>
            <span>Manage Customers</span>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link active-class="active" :to="{name: 'gallery'}">
            <i class="fa fa-paste"></i>
            <span>Manage Gallery</span>
          </nuxt-link>
        </li>


        <li>
          <nuxt-link activ-class="active" :to="{name: 'settings'}">
            <i class="fa fa-cogs"></i>
            <span>Settings</span>
          </nuxt-link>
        </li>
      </ul>
      <!-- sidebar menu end-->
    </div>
  </aside>

</template>

<script>
  export default {
    name: "Sidebar",
    mounted() {
      window.initSidebar();
    }
  }
</script>

<style scoped>

</style>
