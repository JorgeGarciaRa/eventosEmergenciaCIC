
<div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show bg-background-cic" id="sidebar">
    <div class="c-sidebar-brand d-md-down-none">
        <div class="c-sidebar-brand-full"  width="118" height="46" alt="CoreUI Logo">
            <i class="cil-speedometer"></i>
        </div>
        <div class="c-sidebar-brand-minimized" width="118" height="46" alt="CoreUI Logo">
            <i class="cil-drop1"></i>
        </div>
    </div>
    <ul class="c-sidebar-nav ps ps--active-y">
        <li @click="menu=0" class="c-sidebar-nav-item">
            <a id="btn-coreui" class="c-sidebar-nav-link c-active" href="#">
                <div class="c-sidebar-nav-icon">
                    <i class="cil-speedometer"></i>
                </div>
                Página Principal<span class="badge badge-info">ver</span></a>
        </li>
        <li class="c-sidebar-nav-title">Menú</li>
        <li class="c-sidebar-nav-dropdown">
            <a id="btn-coreui" class="c-sidebar-nav-dropdown-toggle" href="#">
                <div class="c-sidebar-nav-icon">
                    <i class="cil-bag"></i>
                </div> Categoría</a>
            <ul class="c-sidebar-nav-dropdown-items">
                <li @click="menu=1" class="c-sidebar-nav-item"><a id="btn-coreui" class="c-sidebar-nav-link cil-car-alt" href="#"> &nbsp; Movilidad</a></li>
                <li @click="menu=2" class="c-sidebar-nav-item"><a id="btn-coreui" class="c-sidebar-nav-link cil-fire" href="#"> &nbsp; Incendios</a></li>
                <li @click="menu=4" class="c-sidebar-nav-item"><a id="btn-coreui" class="c-sidebar-nav-link  cil-heart " href="#">  &nbsp;Salud</a></li>
               </ul>
        </li>
       
        <li class="c-sidebar-nav-dropdown">
            <a id="btn-coreui" class="c-sidebar-nav-dropdown-toggle" href="#">
                    <div class="c-sidebar-nav-icon">
                        
                    </div> Gráficas</a>
            <ul class="c-sidebar-nav-dropdown-items">
                <li @click="menu=6" class="c-sidebar-nav-item"><a id="btn-coreui" class="c-sidebar-nav-link" href="#">
                    <div class="c-sidebar-nav-icon">
                        <i class="cil-chart"></i>
                    </div>Gráfica General</a></li>
                <li @click="menu=7" class="c-sidebar-nav-item"><a id="btn-coreui" class="c-sidebar-nav-link" href="#">
                    <div class="c-sidebar-nav-icon">
                        <i class="cil-chart"></i>
                    </div> Gráfica por Categoría</a></li>
            </ul>
        </li>

      
        <li class="c-sidebar-nav-divider"></li>
        <li class="c-sidebar-nav-title">Funciones Administrador</li>
        <li class="c-sidebar-nav-dropdown">
            <a id="btn-coreui" class="c-sidebar-nav-dropdown-toggle" href="#">
                    <div class="c-sidebar-nav-icon">
                        <i class="cil-user"></i>
                    </div> Usuarios</a>
            <ul class="c-sidebar-nav-dropdown-items">
            <li @click="menu=8" class="c-sidebar-nav-item">
                    <a id="btn-coreui" class="c-sidebar-nav-link" href="#" target="_top">
                    <div class="c-sidebar-nav-icon">
                        <i class="cil-people"></i>
                    </div> usuarios</a>
                </li>    
            <li @click="menu=9" class="c-sidebar-nav-item">
                    <a id="btn-coreui" class="c-sidebar-nav-link" href="#" target="_top">
                    <div class="c-sidebar-nav-icon">
                        <i class="cil-user-follow"></i>
                    </div> Roles</a>
                </li>
              

            </ul>
        </li>
        
        
    </ul>
    <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-unfoldable"></button>
</div>