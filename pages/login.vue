<template>

  <div v-if="!userIsLoggedIn" class="container">
    <form method="post" @submit.prevent="loginUser" class="form-signin">
      <h2 class="form-signin-heading">sign in now</h2>
      <div class="login-wrap">
        <p v-if="showEmailError" class="error-message text-left my-0 text-danger">{{ emailErrorMessage }}</p>
        <input v-model="user.email" name="email" type="email" class="form-control email-input mb-3" placeholder="Enter Email" autofocus>
        <p v-if="showPasswordError" class="error-message text-left my-0 text-danger">{{ passwordErrorMessage }}</p>
        <input v-model="user.password" name="password" type="password" class="form-control" placeholder="Enter Password">
        <label class="checkbox">
          <input type="checkbox" value="remember-me"> Remember me
        </label>
        <button class="btn btn-lg btn-login btn-block" type="submit" :disabled="sendingRequest"><i v-if="sendingRequest" class="fa fa-spin fa-spinner"></i>  Sign in</button>


      </div>
    </form>

      <!-- Modal -->
    <form>
      <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Forgot Password ?</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Enter your e-mail address below to reset your password.</p>
              <input type="text" name="email" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix">

            </div>
            <div class="modal-footer">
              <button data-dismiss="modal" class="btn btn-default" type="button">Cancel</button>
              <button class="btn btn-success" type="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal -->

    </form>

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import auth from '../utils/auth'
import swal from 'sweetalert'
export default {
    layout: 'login',
    components: {
        Logo
    },
    created() {
        this.isLoggedIn();
    },
    data() {
        return {
            userIsLoggedIn: false,
            user: {
                email: '',
                password: ''
            },
            emailErrorMessage: '',
            passwordErrorMessage: '',
            showEmailError: false,
            showPasswordError: false,
          sendingRequest:false
        }
    },
    methods: {
        isLoggedIn() {
            if (auth.userIsLogged()) {
                this.userIsLoggedIn = true
                this.$router.push('/')
            }
        },
        loginUser () {
          let isValid = true;

          if(this.user.email === '') {
              this.error(this.user.email);
              isValid = false;
          }
          if(this.user.password === '') {
              this.error(this.user.password);
              isValid = false;
          }


          if(isValid){

            this.sendingRequest = true;
            this.$axios
              .post('/admin/login', this.user)
              .then((res) => {
                console.log('Showing User Login Details');
                console.log(res.data);
                if(res.data.status === 'success') {
                  localStorage.setItem('token', res.data.data.token);
                  localStorage.setItem('currentUser', JSON.stringify(res.data.data.user));
                  auth.loginUser(res.data.data.user, res.data.data.token);
                }
                this.isLoggedIn()
              })
              .catch((err) => {
                console.log('error respons',err.response);
                if(!err.response){
                  this.$toast.error("Can't connect connect to server");
                }else {
                    let res = err.response;
                    if(res.status == 401){
                      this.$toast.error(res.data.message)
                    }else {
                      this.$toast.error('Oops! unknown error occurred')
                    }

                }


              }).finally(()=>{
                this.sendingRequest = false;
            })
          }

        },


        error(field) {
            if(field === this.user.email) {
                this.emailErrorMessage = 'Email is required';
                this.showEmailError = true
            }
            if(field === this.user.password) {
                this.passwordErrorMessage = 'Password is required';
                this.showPasswordError = true
            }
        }
    }
}
</script>

<style>
  .error-message {
    font-size: 12px !important;
  }
  .email-input {
    height: 40px !important;
    border: 1px solid #eaeaea;
    font-size: 12px !important;
  }
</style>
