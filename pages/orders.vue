<template>
  <div class="orders">
    <breadcrumb :links="breadcrumbLinks"/>
    <card title="Manage orders">
      <table class="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Cost</th>
            <th>Items</th>
            <th>Status</th>
            <th>Created on</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Ekemini Sunday</td>
            <td>A nice product with a long name</td>
            <td>500000</td>
            <td>5</td>
            <td>In Shipment</td>
            <td>June 5, 2019</td>
            <td>

              <div class="btn-group">
                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Update Status
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Confirmed</a>
                  <a class="dropdown-item" href="#">In Shipment</a>
                  <a class="dropdown-item" href="#">Completed</a>
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
  export default {
    name: "orders",
    components: {Card, Breadcrumb},
    data: ()=> ({
      breadcrumbLinks:[
        {
          title: "Manage Orders",
          path:"orders"
        }
      ]
    })
  }
</script>

<style scoped>

</style>
