<template>
        <li class="nav-item d-md-down-none">
                        <a class="nav-link" href="#" data-toggle="dropdown">
                            <i class="cil-bell"></i>
                            <span class="badge badge-pill badge-danger">{{notifications.length}}</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <div class="dropdown-header text-center">
                                <strong>Notificaciones</strong>
                            </div>
                            <div v-if="notifications.length">
                                <li v-for="item in listar" :key="item.id">
                                        <a class="dropdown-item" href="#">
                                            <i class="fa fa-envelope-o"></i>{{item.movilidad.msj}}
                                            <span class="badge badge-success">{{item.movilidad.numero}}</span>
                                        </a>
                                         <a class="dropdown-item" href="#">
                                            <i class="fa fa-envelope-o"></i>{{item.incendio.msj}}
                                            <span class="badge badge-success">{{item.incendio.numero}}</span>
                                        </a>
                                         <a class="dropdown-item" href="#">
                                            <i class="fa fa-envelope-o"></i>{{item.lluvia.msj}}
                                            <span class="badge badge-success">{{item.lluvia.numero}}</span>
                                        </a>
                                         <a class="dropdown-item" href="#">
                                            <i class="fa fa-envelope-o"></i>{{item.salud.msj}}
                                            <span class="badge badge-success">{{item.salud.numero}}</span>
                                        </a>
                                </li>
                            </div>
                            <div v-else>
                               <a><span>No tiene notificaciones</span></a>
                            </div>
                        </div>
         </li>
  
</template>
<script>
export default {
    props: ['notifications'],
    data(){
        return{
       arrayNotifications:[]
        }
    },
    computed: {
       listar:function(){
           //return this.notifications[0];
           this.arrayNotifications=Object.values(this.notifications[0]);
           if(this.notifications==''){
               return this.arrayNotifications=[];

           }else{
               //capturar la ultima notificacion agregada 
               this.arrayNotifications=Object.values(this.notifications[0]);
              //validacion 
              if (this.arrayNotifications.length>3){
                  //si el tamaño es mayor de 3 es cuando las notificaciones son obtenidas
                  return Object.values(this.arrayNotifications[4]);
              }else{
                  return Object.values(this.arrayNotifications[0]);
              }
           }
       } 
    }
}
</script>