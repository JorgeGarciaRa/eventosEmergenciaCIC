<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <div id="logo">
                        <img src="img/logo.jpg"  id="imagen">
            </div>
   
            <p >
                    <b>CIC-IPN</b><br>Reporte de eventos de emergencia de Salud<br>
            </p>
           
</head>
<style>
body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 0.875rem;
            font-weight: normal;
            line-height: 1.5;
            color: #151b1e;           
        }
        #salud thead{
        padding: 20px;
        background: #2183E3;
        text-align: center;
        border-bottom: 1px solid #FFFFFF;  
        }
        #salud{
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 15px;
        }
     
         #fv, #fa{
        color: #FFFFFF;
        font-size: 15px;
        }
        #imagen{
        width: 100px;
        }
        #encabezado{
        text-align: center;
        margin-left: 10%;
        margin-right: 35%;
        font-size: 15px;
        }

        #logo{
        float: left;
        margin-top: 1%;
        margin-left: 2%;
        margin-right: 2%;
        }
        .table {
            display: table;
            width: 100%;
            max-width: 100%;
            margin-bottom: 1rem;
            background-color: transparent;
            border-collapse: collapse;
        }
        .table-bordered {
            border: 1px solid #c2cfd6;
        }
        thead {
            display: table-header-group;
            vertical-align: middle;
            border-color: inherit;
        }
        tr {
            display: table-row;
            vertical-align: inherit;
            border-color: inherit;
        }
        .table th, .table td {
            padding: 0.75rem;
            vertical-align: top;
            border-top: 1px solid #c2cfd6;
        }
        .table thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #c2cfd6;
        }
        .table-bordered thead th, .table-bordered thead td {
            border-bottom-width: 2px;
        }
        .table-bordered th, .table-bordered td {
            border: 1px solid #c2cfd6;
        }
        th, td {
            display: table-cell;
            vertical-align: inherit;
        }
        th {
            font-weight: bold;
            text-align: -internal-center;
            text-align: left;
        }
        tbody {
            display: table-row-group;
            vertical-align: middle;
            border-color: inherit;
        }
        tr {
            display: table-row;
            vertical-align: inherit;
            border-color: inherit;
        }
        .table-striped tbody tr:nth-of-type(odd) {
            background-color: rgba(0, 0, 0, 0.05);
        }
        .izquierda{
            float:left;
        }
        .derecha{
            float:right;
        }
</style>
<body>
<br>

    <div>
      <h3>Lista de eventos de Emergencia de la Categoria Salud <spam class="derecha" >{{now()}}</spam></h3>
    </div>
        <div>
        <br>
        <table class="table table-bordered table-striped table-sm"  id="salud">
                            <thead>
                            <tr id="fa">
                                    <th>Fecha</th>
                                    <th>Tweet</th>
                                    <th>Ubicación</th>
                                    <th>Cuenta</th>
                                </tr>
                            </thead>
                            <tbody>
                               @foreach($tweetsalud as $a)
                                <tr>
                                   
                                    <td>{{$a->fecha}}</td>
                                    <td>{{$a->texto}}</td>
                                    <td>{{$a->ubicacion}}</td>
                                    <td>{{$a->cuenta_verificada}}</td>
                                    
                                </tr>     
                                @endforeach                           
                            </tbody>
                        </table>
        </div>
        <div class="izquierda">
        <p><strong>Total de eventos de emergencia de Salud: </strong>{{$cont}}<p>
        </div>

</body>
</html>