
<template>
  <main class="main">
<ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Escritorio</a></li>
</ol>
<div class="container-fluid">
    <div class="card">
        <div class="card-header bg-gradient- Light" style="background-color:rgb(177, 183, 193)">
                    <div class="row justify-content-between">
                        <div class="text-value-lg" style="color:black;">Gráfica General</div>&nbsp;

                           
                    </div>
                </div>
        <br>
        <br>
            <div class="car-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-chart">
                            <div class="card-header">
                                <h4>Gráfica General</h4>
                            </div>
                            <div class="card-content">
                                <div class="ct-chart">
                                    <canvas id="general" >                                                
                                    </canvas>
                                </div>
                            </div>
                            <div class="card-footer">
                                <p>Gráfica general de eventos de emergencia por categorias</p>
                            </div>
                        </div>
                    </div>
                  
                </div>
                
            </div>
        
    </div>
</div>


</main>
</template>

<script>
export default {
      data(){
        return {
         varGeneral:null,
         charGeneral: null,
         general:[],
         varTotalGeneral:[],
         varEtiquetaGeneral:[],
  

         }
       },
       methods: {
           getGeneral(){
               let me=this;
               var url='/dashboard/graficas';
               axios.get(url).then(function (response){
                   var respuesta=response.data;
                   me.general=respuesta.general;
                   //cargan los datos del chart 
                   me.loadGeneral();
               })
               .catch(function(error){
                   console.log(error);
               });
           },
           
        
           loadGeneral(){
               let me =this;
               me.general.map(function(x){
                   me.varEtiquetaGeneral.push(x.etiqueta);
                   me.varTotalGeneral.push(x.total);
                
               });
               me.varGeneral=document.getElementById('general').getContext('2d');
                         
              me.charGeneral= new Chart(me.varGeneral, {
                 type: 'bar',
                    data: {
                            labels:me.varEtiquetaGeneral,
                                datasets: [{
                                    label: 'Tweets por Categoria'  ,
                                    data: me.varTotalGeneral,
                                   backgroundColor: [
                                      'rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                  ],
                                    borderColor: [
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                  ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });

           
           }
       },
       mounted() {
           this.getGeneral();
       },

}
</script>