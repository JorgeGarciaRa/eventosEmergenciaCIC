<div class="sidebar">
            <nav class="sidebar-nav">
                <ul class="nav">
                    <li @click="menu=0" class="nav-item">
                        <a class="nav-link active" href="#"><i class="icon-speedometer"></i> Página Principal</a>
                    </li>
                    <li class="nav-title">
                        Menú
                    </li>
                    <li class="nav-item nav-dropdown">
                        <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-bag" ></i> Categorías</a>
                        <ul class="nav-dropdown-items">

                            <li @click="menu=1" class="nav-item">
                                <a class="nav-link" href="#"><i class="icon-map" style="color:white"></i> Movilidad</a>
                            </li>
                            <li @click="menu=2" class="nav-item">
                                <a class="nav-link" href="#"><i class="icon-fire" style="color:red"></i> Incendios</a>
                            </li>
                            <li @click="menu=3" class="nav-item">
                                <a class="nav-link" href="#"><i class="icon-umbrella"  style="color:white"></i> Lluvias</a>
                            </li>
                            <li @click="menu=4" class="nav-item">
                                <a class="nav-link" href="#"><i class="icon-heart"  style="color:red"></i> Salud</a>
                            </li>
                           
                        </ul>
                    </li>
                    <li class="nav-item nav-dropdown">
                        <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-doc"  ></i> Documentos</a>
                        <ul class="nav-dropdown-items">
                            <li @click="menu=5" class="nav-item">
                                <a class="nav-link" href="#"><i class="icon-docs"></i>Reportes</a>
                            </li> 
                        </ul>
                    </li>
                    <li class="nav-item nav-dropdown">
                        <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-pie-chart" ></i> Graficas </a>
                        <ul class="nav-dropdown-items">
                            <li @click="menu=6" class="nav-item">
                                <a class="nav-link" href="#"><i class="icon-chart"></i> Grafica General</a>
                            </li>
                            <li @click="menu=7" class="nav-item">
                                <a class="nav-link" href="#"><i class="icon-chart"></i> Grafica por Categoria</a>
                            </li>
                        </ul>
                    </li>
                    
                   
                  
                  

                    <li @click="menu=11" class="nav-item">
                        <a class="nav-link" href="#"><i class="icon-book-open" ></i> Ayuda <span class="badge badge-danger">PDF</span></a>
                    </li>
                    <li @click="menu=12" class="nav-item">
                        <a class="nav-link" href="#"><i class="icon-info"  ></i> Acerca de...<span class="badge badge-info">IT</span></a>
                    </li>
                </ul>
            </nav>
            <button class="sidebar-minimizer brand-minimizer" type="button"></button>
        </div>