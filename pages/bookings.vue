<template>
  <div class="bookings">
    <breadcrumb :links="breadcrumbLinks"/>
    <card title="Bookings">
      <table class="table">
        <thead>
        <tr>
          <th>S/N</th>
          <th>Customer</th>
          <th>Service</th>
          <th>Status</th>
          <th>Date</th>
          <th>Time</th>
          <th>Booked on</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(booking, index) in bookings" :key="index">
          <td>{{index+1}}</td>
          <td>{{booking.customer.first_name + ' ' +booking.customer.last_name }}</td>
          <td>{{booking.service.name}}</td>
          <td><span class="badge badge-info">{{getStatus(booking.status)}}</span> </td>
          <td>{{formatDate(booking.date)}}</td>
          <td>{{formatTime(booking.time)}}</td>
          <td>{{formatDate(booking.created_at)}}</td>
          <td class="btn-group-sm btn-group">
            <button class="btn btn-secondary">View</button>
            <div class="dropdown">
              <button class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-spinner fa-spin" v-if="booking.id ===updatingBookingId"></i>Mark as</button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item" @click="updateStatus(booking.id,'confirmed')">Confirmed</button>
                <button class="dropdown-item" @click="updateStatus(booking.id,'cancelled')">Cancelled</button>
                <button class="dropdown-item" @click="updateStatus(booking.id,'completed')">Completed</button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </card>
  </div>
</template>

<script>
  import Breadcrumb from "../components/general/breadcrumb";
  import Card from "../components/general/card";
  import moment from 'moment';


  export default {
    name: "booking",
    components: {Card, Breadcrumb},
    data:()=>({
      breadcrumbLinks:[
        {
          title: "Bookings",
          path: "/booking"
        }
      ],
      updatingBookingId:'',
      bookings: [],
      bookingsMeta: {}
    }),
    methods: {

      formatDate(date){
        return  moment(date).format('MMMM DD, YYYY')
      },
      formatTime(time){
        return moment(time,['h:mm A']).format('hh:mm a')
      },


      getStatus(status){

        switch (status) {
          case 'pending':
            return 'Pending';
          case 'awaiting_confirmation':
            return 'Awaiting confirmation'
          case 'completed':
            return 'completed';
          case 'confirmed':
            return  'Confirmed';
          case 'cancelled':
            return 'Cancelled';

        }

      },

      getBookings(){
        this.$axios.get('booking/list')
          .then((res) => {
            this.bookings = res.data.data.items;
            this.bookingsMeta = res.data.data.meta;
          })
      },

      updateStatus(id,status){


        if(status == 'cancelled'){
          swal({
            title: "Cancel booking?",
            text: "If you cancel this booking the customer will get a refund of her mone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then((shouldUpdate) => {
              if (shouldUpdate) {
                this.changeBookingStatus(id,status);
              }
            });
        }else {

          this.changeBookingStatus(id,status);
        }
      }
      ,
      changeBookingStatus(id,status){
        this.updatingBookingId = id;
        this.$axios.post('booking/update-status',{booking_id:id,status})
          .then((res) => {
            this.$toast.success("Booking status updated successfully");
            this.getBookings();
          }).catch((err) => {
          console.log(err.response)
          this.$toast.error("Unable to updated booking status");
        })
          .finally(() => {
            this.updatingBookingId ='';
          })

      },
    },




    created() {
      this.getBookings();
    }
  }
</script>

<style scoped>

</style>
