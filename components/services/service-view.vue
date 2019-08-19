<template>
  <div class="service-view" v-if="showDetails">
    <header>
      <div class="close-btn">
        <button @click="hide" class="btn btn-danger btn-sm fa fa-times"></button>
      </div>
    </header>
    <div class="details">
      <div class="img text-center p-3">
        <img :src="service.cover_image" alt="service img" class="img-fluid" >
      </div>
      <div class="attributes p-3 mt-2">
        <table>
          <tr>
            <th width="40%">Name:</th>
            <td>{{service.name}}</td>
          </tr>

          <tr>
            <th>Price:</th>
            <td>{{service.price| currency}}</td>
          </tr>
          <tr>
            <th>Duration:</th>
            <td>{{duration}}</td>
          </tr>

          <tr>
            <th>Is Available: </th>
            <th>{{service.is_available? 'Yes' : 'No'}}</th>
          </tr>
          <tr>
            <th>Category</th>
            <td>{{service.category.name}}</td>
          </tr>

          <tr>
            <th colspan="2" class="mt-3">Description:</th>
          </tr>

          <tr>
            <td colspan="2"  class="text-justify">
              {{service.description}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "service-view",
    data:()=>({
      showDetails:false,
    }),
    computed:{
       duration(){
         return this.service.duration.split(':')[0]+'Hrs'+':'+this.service.duration.split(':')[0]+'min';

       }
    },
    props:{
      service: {
        type: Object,
        default:() => ({})
      }
    },
    methods:{
      show(){
        this.showDetails = true;
        this.$emit('shown')
      },

      hide(){
        this.showDetails = false;
        this.$emit('hidden')
      },
      getDuration(){
      },
    }
  }
</script>

<style scoped lang="scss">
  .service-view{
    position: fixed;
    top: 100px;
    width: 300px;
   bottom: 0;
    background: white;
    box-shadow: 0 0   5px #e6e6e6;
    right: -500px;
    z-index: 500;
    animation: slide-in 200ms forwards linear;




    header{
      background: lighten(lightgrey,10%);
      padding: 5px 5px;
      position: fixed;
      width: 100%;
    }

    .details{
      top: 35px;
      position: relative;
      overflow-y: scroll;
      height: 90%;

      table{
        td,th{
          padding: 5px 2px;
          font-size: 1.1em;
        }
      }
    }
  }


  @keyframes slide-in {

    0%{
      transform: translateX(-200px);
    }

    40%{
      transform: translateX(-400px);
    }

    100%{
      transform: translateX(-515px);
    }
  }





</style>
