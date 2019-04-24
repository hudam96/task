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
        <div class="row justify-content-end">
            <button type="button " class="btn btn-danger mt-5 mr-5 rounded-circle button-size" v-on:click="Back()"><i class="fas fa-arrow-right"></i></button>
        </div>
        <!-- start content -->
        <div class="container">
            <div class="row mp-5 justify-content-center">
                <div class="col-10">
                    <div class="alert alert-danger" role="alert">
                       ALERT!! there is an issue to {{info.issuedBills}} of Bills
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <!--  start total payed -->
                <div class="col-4">
                    <div class="card card2">
                        <div class="card-body text-light">
                            <p><i class="fas fa-outdent"></i>  total un Paid Amount : {{info.totalUnPaidAmount}}</p>
                            <p><i class="fas fa-sign-in-alt"></i>  total Paid Amount : {{info.totalPaidAmount}}</p>
                        </div>
                    </div>
                </div>
                <!--  end total payed -->
                <!--  start  payed bills -->
                <div class="col-6">
                    <div class="card card1">
                        <div class="card-body text-light">
                            <p>  un Paid Bills : {{info.unPaidBills}}</p>
                            <p>  Paid Bills : {{info.paidBills}}</p>
                        </div>
                    </div>
                </div>
                <!--  start  payed bills -->
            </div>
            <div class="row justify-content-center mt-5">
                <div class="col-10">
                    <div class="card card3">
                        <div class="card-body">
                            <div v-for="item in info.monthlyBills ">
                              <p> For: {{item.key}} the paid is :{{item.value.paid}} the unpaid is : {{item.value.unPaid}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end content -->
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                info:{}
            }
        },
        methods:{
          logout: function(){
              localStorage.clear();
              this.$router.replace('/login')
          },
            loaded : function(){
              if(localStorage.getItem('token')){
                  axios.get("http://uat.tasdid.net:88/v1/api/Customer/GetHome", {
                      headers: { Authorization:`Bearer ${localStorage.getItem('token')}`}
                  }).then(response=>
                      this.info= response.data.data  )

              }else{
                  this.$router.replace('/login')
              }
            },
            Back(){
                this.$router.replace('/bills')
            }
        },
        mounted(){

         this.loaded();

        }
    }
</script>
<style>
    body{

    }
    .nav-item1{
        font-size: 30px;
        color: aliceblue;
        font-family: 'Anton', sans-serif;
    }
    .nav-item2{
        font-size: 15px;
        color: aliceblue;
        font-family: 'Anton', sans-serif;
    }
    .card1{
        background-color: #DD823B;
        font-size: 20px;
    }
    .card2{
        background-color:#CCAF0B;
        font-size: 20px;
    }
    .card3{
        background-color: darkgray;
        font-size: 20px;
    }
</style>