<template>
    <div id="login">
        <!-- start navbar -->
        <ul class="nav bg-dark nav-pills ">
            <li class="nav-item nav-item1">
                <a class="nav-link ml-0">The Billing</a>
            </li>
        </ul>
        <!-- end navbar -->
        <!-- login form -->
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-4">
                    <div class="card card-style bg-dark mt-5">
                        <div class=" card-header-style mt-4"><i class="fas fa-user-circle"></i></div>
                        <div class="card-body">
                            <form @submit.prevent="Login">
                                <div class="form-group">
                                    <input v-model.trim="phoneNumber" class="form-control  mb-4" id="input-1" placeholder="Phone Number">
                                    <input v-model.trim="password" class="form-control  mb-2" id="input-2" placeholder="Password">
                                    <button type="submit" class="btn btn-primary mt-5 form-contro">Submit</button>
                                </div>
                            </form>
                            <div  v-if="message !=''" class="alert alert-danger" role="alert">
                                {{message}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
                return{

                    phoneNumber: "",
                    password: "",
                    message:""
                }
        },
        methods:{
              Login :function(){
                  if(this.phoneNumber !="" && this.password !=""){
                      axios.post('http://uat.tasdid.net:88/v1/api/Auth/Token', {
                          "phoneNumber": this.phoneNumber,
                          "password": this.password
                      }).then(response=> {
                              localStorage.setItem('token',response.data.data)
                              this.$router.push('/')
                          }
                      );
                  }else{
                      this.message = "the phone number and password are required"
                      this.phoneNumber =""
                      this.password = ""
                  }
              },
        },

    }
</script>
<style>
    .nav-item1{
        font-size: 30px;
        color: aliceblue;
        font-family: 'Anton', sans-serif;
    }
    .card-style{
        border-radius: 10px;
        -webkit-box-shadow: 0px 2px 40px -6px rgba(92,92,92,1);
        -moz-box-shadow: 0px 2px 40px -6px rgba(92,92,92,1);
        box-shadow: 0px 2px 40px -6px rgba(92,92,92,1);
    }
    .card-header-style{
       font-size: 120px;
        color: brown;
    }
</style>