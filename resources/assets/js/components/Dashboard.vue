<template>
    <main class="main">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Escritorio</a></li>
        </ol>
        <div class="container-fluid">
            <div class="card">
                 <div class="card-header bg-gradient- Light" style="background-color:rgb(177, 183, 193)">
                    <div class="row justify-content-between">
                        <div class="text-value-lg" style="color:black;">Gráficas por Categoria del mes de Julio</div>&nbsp;

                           
                    </div>
                </div>

                <br>
                <br>
                <div class="car-body">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="card card-chart">
                                <div class="card-header">
                                    <h4>Tweets de Movilidad </h4>
                                </div>
                                <div class="card-content">
                                    <div class="ct-chart">
                                        <canvas id="movilidad">
                                        </canvas>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <p>Eventos de Movilidad en el transcurso del mes</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="card card-chart">
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
                                    <p>Eventos de Incendios en el transcurso del mes</p>
                                </div>
                            </div>
                        </div>
                        

                        <div class="col-md-6">
                            <div class="card card-chart">
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
                                    <p>Eventos de Salud en el transcurso del mes</p>
                                </div>
                            </div>
                        </div>
                         <div class="col-md-6">
                            <div class="card card-chart">
                                <div class="card-footer">
                                    <p>los eventos de salud en el transcurso del mes</p>
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
                varDayMovilidad: [],


                varIncendio: null,
                charIncendio: null,
                incendio: [],
                varTotalIncendio: [],
                varDayIncendio: [],

                varLluvia: null,
                charLluvia: null,
                lluvia: [],
                varTotalLluvia: [],
                varDayLluvia: [],

                varSalud: null,
                charSalud: null,
                salud: [],
                varTotalSalud: [],
                varDaySalud: [],
            }
        },
        methods: {
            getMovilidad() {
                let me = this;
                var url = '/dashboard/graficas';
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
            getSalud() {
                let me = this;
                var url = '/dashboard/graficas';
                axios.get(url).then(function (response) {
                    var respuesta = response.data;
                    me.salud = respuesta.salud;
                    //cargan los datos del chart 
                    me.loadSalud();
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getLluvia() {
                let me = this;
                var url = '/dashboard/graficas';
                axios.get(url).then(function (response) {
                    var respuesta = response.data;
                    me.lluvia = respuesta.lluvia;
                    //cargan los datos del chart 
                    me.loadLluvia();
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getIncendio() {
                let me = this;
                var url = '/dashboard/graficas';
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
                    me.varDayMovilidad.push(x.dia);
                    me.varTotalMovilidad.push(x.total);
                });
                me.varMovilidad = document.getElementById('movilidad').getContext('2d');

                me.charMovilidad = new Chart(me.varMovilidad, {
                    type: 'bar',
                    data: {
                        labels: me.varDayMovilidad,
                        datasets: [{
                            label: 'Movilidad',
                            data: me.varTotalMovilidad,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 0.2)',
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

            loadLluvia() {
                let me = this;
                me.lluvia.map(function (x) {
                    me.varDayLluvia.push(x.dia);
                    me.varTotalLluvia.push(x.total);
                });
                me.varLluvia = document.getElementById('lluvia').getContext('2d');

                me.charLluvia = new Chart(me.varLluvia, {
                    type: 'bar',
                    data: {
                        labels: me.varDayLluvia,
                        datasets: [{
                            label: 'Lluvia',
                            data: me.varTotalLluvia,
                            backgroundColor: 'rgb(130, 224, 170  )',
                            borderColor: 'rgba(255, 99, 132, 1)',
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


            }, loadSalud() {
                let me = this;
                me.salud.map(function (x) {
                    me.varDaySalud.push(x.dia);
                    me.varTotalSalud.push(x.total);
                });
                me.varSalud = document.getElementById('salud').getContext('2d');

                me.charSalud = new Chart(me.varSalud, {
                    type: 'bar',
                    data: {
                        labels: me.varDaySalud,
                        datasets: [{
                            label: 'Salud',
                            data: me.varTotalSalud,
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


            },
            loadIncendio() {
                let me = this;
                me.incendio.map(function (x) {
                    me.varDayIncendio.push(x.dia);
                    me.varTotalIncendio.push(x.total);
                });
                me.varIncendio = document.getElementById('incendio').getContext('2d');

                me.charIncendio = new Chart(me.varIncendio, {
                    type: 'bar',
                    data: {
                        labels: me.varDayIncendio,
                        datasets: [{
                            label: 'Incendio',
                            data: me.varTotalIncendio,
                            backgroundColor:
                                'rgb(247, 220, 111 )',


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
            this.getLluvia();
            this.getSalud();
        },

    }
</script>