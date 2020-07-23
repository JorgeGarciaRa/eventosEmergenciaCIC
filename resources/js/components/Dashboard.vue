<template>
    <main class="main">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Escritorio</a></li>
        </ol>
        <div class="container-fluid">
            <div class="card">
                <div class="card-header" style="background-color:rgb(235, 152, 78  )">
                    <i class="fa fa-align-justify"></i> Graficas por Categoria
                </div>
                <div class="card-header">
                    <div class="car-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card card-header">
                                    <h4>Tweets de Movilidad</h4>
                                </div>
                                <div class="card-content">
                                    <div class="ct-chart">
                                        <canvas id="movilidad">
                                        </canvas>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <p>Eventos de movilidad en los ultimos meses</p>
                                </div>

                            </div>
                            <div class="col-md-6">
                                <div class="card card-header">
                                    <h4>Tweets de Incendios</h4>
                                </div>
                                <div class="card-content">
                                    <div class="ct-chart">
                                        <canvas id="incendio">
                                        </canvas>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <p>Eventos de incendios los ultimos meses</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card card-header">
                                    <h4>Tweets de Lluvias</h4>
                                </div>
                                <div class="card-content">
                                    <div class="ct-chart">
                                        <canvas id="lluvias">
                                        </canvas>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <p>Eventos de LLuvias en los ultimos meses</p>
                                </div>

                            </div>
                            <div class="col-md-6">
                                <div class="card card-header">
                                    <h4>Tweets de Salud</h4>
                                </div>
                                <div class="card-content">
                                    <div class="ct-chart">
                                        <canvas id="salud">
                                        </canvas>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <p>Eventos de salud en los ultimos meses</p>
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
        data() {
            return {
                varMovilidad: null,
                charMovilidad: null,
                movilidad: [],
                varTotalMovilidad: [],
                varMesMovilidad: [],


                varIncendio: null,
                charIncendio: null,
                incendio: [],
                varTotalIncendio: [],
                varMesIncendio: [],

            }
        },
        methods: {
            getMovilidad() {
                let me = this;
                var url = '/dashboard';
                axios.get(url).then(function (response) {
                    var respuesta = response.data;
                    me.movilidad = respuesta.movilidad;
                    //cargan los datos del chart 
                    me.loadMovilidad();
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getIncendio() {
                let me = this;
                var url = '/dashboard';
                axios.get(url).then(function (response) {
                    var respuesta = response.data;
                    me.incendio = respuesta.incendio;
                    //cargan los datos del chart 
                    me.loadIncendio();
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            loadMovilidad() {
                let me = this;
                me.movilidad.map(function (x) {
                    me.varMesMovilidad.push(x.mes);
                    me.varTotalMovilidad.push(x.total);
                });
                me.varMovilidad = document.getElementById('movilidad').getContext('2d');

                me.charMovilidad = new Chart(me.varMovilidad, {
                    type: 'bar',
                    data: {
                        labels: me.varMesMovilidad,
                        datasets: [{
                            label: 'Movilidad',
                            data: me.varTotalMovilidad,
                            backgroundColor:
                                'rgba(255, 99, 132, 0.2)',


                            borderColor:
                                'rgba(255, 99, 132, 1)',


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


            },
            loadIncendio() {
                let me = this;
                me.incendio.map(function (x) {
                    me.varMesIncendio.push(x.mes);
                    me.varTotalIncendio.push(x.total);
                });
                me.varIncendio = document.getElementById('incendio').getContext('2d');

                me.charIncendio = new Chart(me.varIncendio, {
                    type: 'bar',
                    data: {
                        labels: me.varMesIncendio,
                        datasets: [{
                            label: 'Incendio',
                            data: me.varTotalIncendio,
                            backgroundColor:
                                'rgba(54, 162, 235, 0.2)',


                            borderColor:
                                'rgba(54, 162, 235, 1)',


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
            this.getMovilidad();
            this.getIncendio();
        },

    }
</script>