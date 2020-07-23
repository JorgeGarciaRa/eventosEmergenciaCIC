<div  class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
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
                Dashboard<span class="badge badge-info">ver</span></a>
        </li>
        <li class="c-sidebar-nav-title">Página Principal</li>
        <li class="c-sidebar-nav-dropdown">
            <a id="btn-coreui" class="c-sidebar-nav-dropdown-toggle" href="#">
                <div class="c-sidebar-nav-icon">
                    <i class="cil-globe-alt"></i>
                </div> Categoria</a>
            <ul class="c-sidebar-nav-dropdown-items">
                <li @click="menu=1" class="c-sidebar-nav-item"><a id="btn-coreui" class="c-sidebar-nav-link" href="#"> Movilidad</a></li>
                <li @click="menu=2" class="c-sidebar-nav-item"><a id="btn-coreui" class="c-sidebar-nav-link" href="#"> Incendios</a></li>
                <li @click="menu=4" class="c-sidebar-nav-item"><a id="btn-coreui" class="c-sidebar-nav-link" href="#"> Salud</a></li>
          </ul>
          </ul>
    <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-unfoldable"></button>
</div>
</div>
        