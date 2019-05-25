<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Principal.php');
?>

        <div class="divider"></div>
        <div class="container">
            <h2 class="center grey-text">Estadisticas</h2>
            <div class="row">
                <div class="col s12">
                    <!--Se divide la pagina-->
                        <div class="col s6">
                            <!--Se manda a llamar la grafica-->
                                <canvas id="bar-chart" width="250" height="250"></canvas>
                        </div>
                        <!--Se divide la pagina-->
                            <div class="col s6 offset s6">
                                <!--Se manda a llamar la grafica-->
                                    <canvas id="bar-chart1" width="250" height="250"></canvas>
                                    <canvas id="bar-chart2" width="250" height="250"></canvas>
                           </div>
                </div>
            </div>
        </div>
    </section>

</body>
<!--Se conecta con Javascript-->
<script type="text/javascript" src="../../resources/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../../resources/js/Chart.bundle.js"></script>
<script type="text/javascript" src="../../resources/js/Chart.bundle.min.js"></script>
<script type="text/javascript" src="../../resources/js/materialize.js"></script>
<script type="text/javascript" src="../../resources/js/index.js"></script>
<script type="text/javascript" src="../../resources/js/grafica.js"></script>

</html>