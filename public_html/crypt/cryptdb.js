var cryptDataBase = [
/*
"He estado en París durante un breve periodo de tiempo.",
"La gente tímida puede desarrollar dependencia a la droga como una defensa.",
"El pensamiento pitagórico estuvo dominado por la matemática, pero también era profundamente místico.",
"Tom hará todo lo que le pidas.",
"¿Por qué insistís? ¡Ya dije que no!",
"Rara vez tomo café.",
"No quiero matarte.",
"El clima está cambiando.",
"Ella le alquila una habitación a un estudiante.",
"No es una palabra de mucha frecuencia.",
"'Yo soy feliz', dijo. Naturalmente, se trataba de un necio. ", 
"A dónde podrá ir el que hasta aquí llego, si más allá solo fueron los muertos. ", 
"A la mujer hay que amarla, no comprenderla. Eso es lo primero que hay que comprender. ", 
"A las mujeres les gustan los hombres desesperados; si no los encuentran, los hacen. ", 
"A los artistas no se les debe hacer monumentos, puesto que ya lo tienen hecho con sus obras. ", 
"A medida que avanza una discusión, retrocede la verdad. ", 
"A menudo se echa en cara ante la juventud el creer que el mundo comienza con ella. Cierto. Pero la vejez cree aún más a menudo que el mundo acaba con ella. ¿Qué es peor? ", 
"A quien va usted a creer, ¿A mi, o a sus propios ojos? ", 
"A un hombre sólo le pido tres cosas: que sea guapo, implacable y estúpido. ", 
"A veces creo que hay vida en otros planetas, y a veces creo que no. En cualquiera de los dos casos la conclusión es asombrosa. ", 
"A veces creo que hay vida en otros planetas, y a veces creo que no. En cualquiera de los dos casos la conclusión es asombrosa. ", 
"A veces hay que estropear un poquito el cuadro para poder terminarlo. ", 
"A veces pienso que la prueba más fehaciente de que existe vida inteligente en el universo es que nadie ha intentado contactar con nosotros. ", 
"A veces pienso que la prueba más fehaciente de que existe vida inteligente en el universo es que nadie ha intentado contactarse con nosotros. ", 
"A veces, cuesta mucho más eliminar un sólo defecto que adquirir cien virtudes. ", 
"A veces, lavándonos las manos, nos ensuciamos la conciencia. ", 
"Aceptar un favor de un amigo, es hacerle otro. ", 
"Ahora que estas lejos de mí, ¡no sabes cuanto te extraño!... ¡pero cuanto me divierto! ", 
"Al amor lo pintan ciego y con alas. Ciego para no ver los obstáculos y con alas para salvarlos. ", 
"Al inteligente se le puede convencer; al tonto, persuadir. ", 
"Al perro que tiene dinero se le llama señor perro. ", 
"Al perro que tiene dinero se le llama Sr. Perro ", 
"Al utilizar por primera vez este tipo de armas nos alineamos con los bárbaros de las primeras edades. ", 
"Al vencer sin obstáculos se triunfa sin gloria. ", 
"Algo malo debe tener el trabajo porque si no, los ricos lo habrían acaparado. ", 
"Algunos encuentran el silencio insoportable porque tienen demasiado ruido dentro de ellos mismos. ", 
"Algunos nacen grandes; otros hacen grandes cosas, y otros se ven aplastados por ellas ", 
"Algunos nacen grandes; otros hacen grandes cosas, y otros se ven aplastados por ellas ", 
"Ama a quien no te ama, responde a quien no te llama, andarás carrera vana. ", 
"Ama a una nube, ama a una mujer, pero ama. ", 
"Amar es el más poderoso hechizo para ser amado. ", 
"Amo la traición, pero odio al traidor. ", 
"Amor no es mirarse el uno al otro, sino mirar los dos en la misma dirección. ", 
"Amor: sólo una eternidad que no se alcanza. ", 
"Añorar el pasado es correr tras el viento. ", 
"Antes de casarme veía difícil permanecer fiel a una persona. Ahora creo en el calor de un hogar, en la relación oficial. Cuando se está enamorada, la fidelidad es fácil. ", 
"Aquel que duda y no investiga, se torna no sólo infeliz, sino también injusto. ", 
"Aquello que se considera ceguera del destino es en realidad propia miopía ", 
"Aunque a todos les está permitido pensar, muchos se lo ahorran. ", 
"Aunque las mujeres no somos buenas para el consejo, algunas veces acertamos. ", 
"Aunque personalmente me satisfaga que se hayan inventado los explosivos, creo que no debemos mejorarlos. ", 
"Bebo para hacer interesantes a las demás personas. ", 
"Buscamos llenar el vacío de nuestra individualidad y por un breve momento disfrutamos de la ilusión de estar completos. Pero es sólo una ilusión: el amor une y después divide. ", 
"Buscando el bien de nuestros semejantes, encontramos el nuestro. ", 
"Buscando mi destino, concluyo por pensar que sólo en el buscar consiste mi destino. ", 
"Cabalgar, viajar y cambiar de lugar recrean el ánimo. ", 
"Cada criatura, al nacer, nos trae el mensaje de que Dios todavía no pierde la esperanza en los hombres. ", 
"Cada hombre puede mejorar su vida mejorando su actitud. ", 
"Cada uno es ortodoxo con respecto a sí mismo. ", 
"Cada uno está solamente atento a su negocio ", 
"Cada virtud sólo necesita un hombre, pero la amistad necesita dos ", 
"Caer está permitido. ¡Levantarse es obligatorio!. ", 
"Casarse está bien. No casarse está mejor. ", 
"Cásate; si por casualidad das con una buena mujer, serás feliz; si no, te volverás filósofo, lo que siempre es útil para un hombre. ", 
"Cataluña es la mejor maquina de tren que tiene España. ", 
"Citadme diciendo que me han citado mal. ", 
"Claro que lo entiendo. Incluso un niño de cinco años podría entenderlo. ¡Que me traigan un niño de cinco años! ", 
"Coge el día presente y fíate lo menos posible del mañana. ", 
"Como individuo, la mujer es un ser endeble y defectuoso. ", 
"Como no me he preocupado de nacer, no me preocupo de morir. ", 
"Como no sabían que era imposible lo hicieron. ", 
"Como no sabían que era imposible lo hicieron. ", 
"Compórtate con tu mujer como te comportarías con la de otro. ", 
"Con audacia se puede intentar todo; mas no se puede conseguir todo ", 
"Con el persuasivo lenguaje de una lagrima. ", 
"Con el submarino ya no habrá mas batallas navales como seguirán inventándose instrumentos de guerra cada vez mas perfeccionados y terroríficos, la guerra misma será imposible. ", 
"Con la invención de la bomba atómica he llegado a ser la muerte, el destructor de mundos. ", 
"Conocer y amar nuestro folclore, es honrar el lenguaje de nuestra bandera. ", 
"Consulta el ojo de tú enemigo, porque es el primero que ve tus defectos. ", 
"Continuamos siendo imperfectos, peligrosos y terribles, y también maravillosos y fantásticos. Pero estamos aprendiendo a cambiar. ", 
"Contra el optimismo no hay vacunas ", 
"Cosas hay que aunque se digan, no son para que se entienda. ", 
"Crecí besando libros y pan... Desde que besé a una mujer, mis actividades con el pan y los libros perdieron interés. ", 
"Creo que parte de mi amor a la vida se lo debo a mi amor a los libros. ", 
"Cualquier esfuerzo resulta ligero con el hábito. ", 
"Cualquier hombre puede llegar a ser feliz con una mujer, con tal de que no la ame. ", 
"Cualquiera puede simpatizar con las penas de un amigo, simpatizar con sus éxitos requiere una naturaleza delicadísima. ", 
"Cuando alguien dice teóricamente, realmente quiere decir no. ",
*/


//------------- TEST START

//------------- TEST END

];