<?php 
$datos = array( array(	"nombre"	=>	"Medellin",
						"pais" =>	"Colombia" ), 
				array(	"nombre"	=>	"Bogotá",  
						"pais"	=> 	"Colombia") 									
				); 
echo json_encode($datos, JSON_FORCE_OBJECT);
?>