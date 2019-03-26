<?php
class Dasboard{
    public static function headerTemplate($title){
        print('
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link  href="../../resources/css/font_materialize.css" rel="stylesheet" >
                <link type="text/css" rel="stylesheet" href="../../resources/css/materialize.css" media="screen,projection">
                <title>Dashboard-'.$title.'</title>
            </head>
            <body>
                <header>
                        <div id="header">
                            <div class="navbar-fixed">
                                <nav>
                                    <div class="nav-wrapper">
                                    <a href="#!" class="brand-logo">Logo</a>
                                    <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                                    <ul class="right hide-on-med-and-down">
                                        <li><a href="sass.html">Sass</a></li>
                                        <li><a href="badges.html">Components</a></li>
                                        <li><a href="collapsible.html">Javascript</a></li>
                                        <li><a href="mobile.html">Mobile</a></li>
                                    </ul>
                                    </div>
                                </nav>
                                
                                <ul class="sidenav" id="mobile-demo">
                                    <li><a href="sass.html">Sass</a></li>
                                    <li><a href="badges.html">Components</a></li>
                                    <li><a href="collapsible.html">Javascript</a></li>
                                    <li><a href="mobile.html">Mobile</a></li>
                                </ul>
                            </div>
                        </div>
                </header>
        ');
    }
}
?>