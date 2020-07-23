
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.$ =window.jQuery=require('jquery');
window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('categoria', require('./components/Categoria.vue'));
Vue.component('articulo', require('./components/Articulo.vue'));
Vue.component('rol', require('./components/Rol.vue'));
Vue.component('user', require('./components/User.vue'));
Vue.component('datoperfil', require('./components/DatoPerfil.vue'));
Vue.component('perfil', require('./components/Perfil.vue'));
Vue.component('movilidad', require('./components/Tweetmovilidad.vue'));
Vue.component('incendio', require('./components/Tweetincendio.vue'));
Vue.component('lluvia', require('./components/Tweetlluvia.vue'));
Vue.component('salud', require('./components/Tweetsalud.vue'));
Vue.component('dashboard', require('./components/Dashboard.vue'));
Vue.component('notification', require('./components/Notification.vue'));

const app = new Vue({
    el: '#app',
    data :{
        menu : 0,
        notifications:[]
    },
    created(){
        let me=this;
        axios.post('notification/get').then(function(response){
           // console.log(response.data);
         me.notifications=response.data
        }).catch(function(error){
            console.log(error);
        });

         var userId=$('meta[name="userId"]').attr('content');
         Echo.private('App.User.'+userId).notification((notification)=>{
             me.notifications.unshift(notification);

         })
    }
});
