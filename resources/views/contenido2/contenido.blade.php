@extends('principal2')
    @section('contenido2')
    @if(Auth::check())
          @if(Auth::user()->idrol==1)
                    <template v-if="menu==0">
                    <datoperfil></datoperfil>
                    </template>

                    <template v-if="menu==1">
                        <movilidad></movilidad>
                    </template>

                    <template v-if="menu==2">
                    <incendio></indendio>
                    </template>

                    <template v-if="menu==3">
                    <lluvia></lluvia>
                    </template>

                    <template v-if="menu==4">
                      <salud></salud>
                    </template>

                    <template v-if="menu==5">
                    <h2>descargar archivos</h2>
                    </template>

                    <template v-if="menu==6">
                    <categoria> </categoria>
                    </template>

                    <template v-if="menu==7">
                    <dashboard></dashboard>
                    </template>

                    <template v-if="menu==8">
                    <user></user>
                    </template>

                    <template v-if="menu==9">
                    <rol></rol>
                    </template>

                    <template v-if="menu==11">
                        <h1>Ayuda</h1>
                    </template>

                    <template v-if="menu==12">
                        <h1>acerca de </h1>
                    </template>
                    
                    <template v-if="menu==13">
                        <perfil v-bind:id_user_prop="{{ Auth::user()->id }}"></perfil>
                    </template>







              @elseif (Auth::user()->idrol==2)
              <template v-if="menu==0">
                    <datoperfil></datoperfil>
                    </template>

                    <template v-if="menu==1">
                        <movilidad></movilidad>
                    </template>

                    <template v-if="menu==2">
                    <incendio></indendio>
                    </template>

                    <template v-if="menu==3">
                    <lluvia></lluvia>
                    </template>

                    <template v-if="menu==4">
                      <salud></salud>
                    </template>

                    <template v-if="menu==5">
                    <h2>descargar archivos</h2>
                    </template>

                    <template v-if="menu==6">
                    <categoria> </categoria>
                    </template>

                    <template v-if="menu==7">
                    <dashboard></dashboard>
                    </template>

                    <template v-if="menu==11">
                        <h1>Ayuda</h1>
                    </template>

                    <template v-if="menu==12">
                        <h1>acerca de </h1>
                    </template>
                    
                    <template v-if="menu==13">
                    <perfil v-bind:id_user_prop="{{ Auth::user()->id }}"></perfil>
                    </template>


             @endif
     @endif


    @endsection