<template>

    <div class="container">
        <form class="form-signin needs-validation" method="post"
              @submit.prevent="signUpUser(user)">
            <h2 class="form-signin-heading">sign up</h2>
            <p v-if="showError">{{ errorMessage }}</p>
            <div class="login-wrap">
                <input v-model="user.first_name" name="first_name" type="text" class="form-control" placeholder="First Name" autofocus>
                <input v-model="user.last_name" name="last_name" type="text" class="form-control" placeholder="Last Name" autofocus>
                <input v-model="user.email" name="email" type="text" class="form-control" placeholder="Email" autofocus>
                <input v-model="user.phone_no" name="phone_no" type="text" class="form-control" placeholder="Phone Number" autofocus>
                <input v-model="user.password" name="password" type="password" class="form-control" placeholder="Password">
                <input v-model="user.confirm_password" name="confirm_password" type="password" class="form-control" placeholder="Confirm Password">
                <button class="btn btn-lg btn-login btn-block" type="submit">Sign up</button>
            </div>

        </form>

    </div>
</template>

<script>
    import Logo from '~/components/Logo.vue'

    export default {
        layout:'signup',
        components: {
            Logo
        },
        data () {
            return {
                user: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_no: '',
                    password: '',
                    confirm_password: ''
                },
                errorMessage: '',
                showError: false
            }
        },
        methods: {
            signUpUser (user) {
                console.log(user)
                // if(user.password.length < 6) {
                //     this.error('Passwords must not be less than 6 characters')
                // }
                this.$axios
                    .post('account/create', user)
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                        this.error('Error signing up the user')
                    })
            },
            error(message) {
                this.errorMessage = message
                this.showError = true
            },
            initValidation() {
                const forms = document.getElementsByClassName('needs-validation')
                // Loop over them and prevent submission
                Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener(
                        'submit',
                        function(event) {
                            if (form.checkValidity() === false) {
                                event.preventDefault()
                                event.stopPropagation()
                            }
                            form.classList.add('was-validated')
                        },
                        false
                    )
                })
            }
        }
    }
</script>

<style>

</style>
