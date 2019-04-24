<template>
<div>
   <!--  start nav -->
   <ul class="nav bg-dark nav-pills ">
      <li class="nav-item nav-item1">
         <a class="nav-link ml-0">The Billing</a>
      </li>
      <li class="nav-item nav-item2">
         <button class="nav-link active mt-2 btn btn-danger "  v-on:click="logout">logout</button>
      </li>
   </ul>
   <!-- end nav -->
   <div class="row justify-content-start">
      <button type="button " class="btn btn-danger mt-5 ml-5 rounded-circle button-size" v-on:click="Back()"><i class="fas fa-arrow-left"></i></button>
   </div>
   <!-- start table -->
   <div class="container mt-3">
      <div class="row">
         <div class="card bg-dark">
            <div class="card-body">
               <table class="table text-light ">
                  <thead>
                     <tr>
                        <th>Payd</th>
                        <th>customerId</th>
                        <th>customerName</th>
                        <th> phoneNumber</th>
                        <th>serviceName</th>
                        <th>providerName</th>
                        <th>note</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr  v-for="item in array " :key="`${item.id}`">
                        <td>{{item.payId}}</td>
                        <td>{{item.customerId}}</td>
                        <td>{{item.customerName}}</td>
                        <td>{{item.phoneNumber}}</td>
                        <td>{{item.serviceName}}</td>
                        <td>{{item.providerName}}</td>
                        <td>{{item.note}}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
      <!-- end table -->
      <!-- start button group -->
      <div class="row justify-content-center mt-5">
         <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2 " role="group" aria-label="First group">
               <button type="button" class="btn btn-secondary" @click="changeIt(0,3)">1</button>
               <button type="button" class="btn btn-secondary" @click="changeIt(3,3)">2</button>
               <button type="button" class="btn btn-secondary" @click="changeIt(6,3)">3</button>
            </div>
          </div>
      </div>
      <!-- end button group -->
   </div>
</div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){return{
           start:"",
           end:"",
            array:[]
        }},
        methods:{
           changeIt : function(start, end){
              this.start = start
              this.end = end
              axios.get('http://uat.tasdid.net:88/v1/api/Customer/GetAllBills', {
                 headers: { Authorization:`Bearer ${localStorage.getItem('token')}`,
                 },
                 params: {'start':this.start,
                    'end': this.end,
                    'type':1}

              }).then(response=> this.array = response.data.data)

           },
           logout: function(){
              localStorage.clear();
              this.$router.replace('/login')
           },
           loaded : function(){
              if(localStorage.getItem('token')){
                 axios.get('http://uat.tasdid.net:88/v1/api/Customer/GetAllBills', {
                    headers: { Authorization:`Bearer ${localStorage.getItem('token')}`,
                    },
                    params: {'start':0,
                       'end':3,
                       'type':1}

                 }).then(response=> this.array = response.data.data)

              }else{
                 this.$router.replace('/login')
              }
           },
           Back(){
              this.$router.replace('/')
           }
        },
       mounted() {
     this.loaded()
       }

    }
</script>
<style>
   .button-size{
      height: 60px !important;
      width: 60px !important;
      font-size: 30px !important;
   }
   .button-size:hover{
     color: darkgrey !important;
      font-size: 25px !important;

   }
</style>