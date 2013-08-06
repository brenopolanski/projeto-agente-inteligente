/* ------------------------------------------------------------------------------------------------------------------
    Descrição: Funções JavaScript
    Versão: 1.0            
    Autor: Breno Polanski - breno.polanski@gmail.com - www.brenopolanski.com
--------------------------------------------------------------------------------------------------------------------- */

// Retorna o primeiro elemento dentro do documento que corresponde ao grupo especificado de seletores.
// https://developer.mozilla.org/pt-BR/docs/DOM/Document.querySelector
var city = document.querySelector('#city');

//--------------------------------------------------------//
//  					 CONSTANTES						  //
//--------------------------------------------------------//

// Tamanho do sprite 64x64 PNG
var SIZE = 64;
var QTD_ROWS    = Math.floor(Math.random()*10);
var QTD_COLUMNS = Math.floor(Math.random()*10);
var QUEUE = [];
// O caminhão não vai ser criado no mapa, e sim um sprite para informar a quantidade de lixo.
var TRUCK = 0;
//               |            PAPEL          |             METAL           |            PLÁSTICO         |            VIDRO            | 
var TRASH_RECY = [Math.floor(Math.random()*10), Math.floor(Math.random()*10), Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
var PAPER   = 0;
var	METAL   = 0;
var	PLASTIC = 0;
var	GLASS   = 0;
var CONTAINER = 0;

//--------------------------------------------------------//
//  					 VARIÁVEIS						  //
//--------------------------------------------------------//        

// Sprites
var STREET = 0;            
var HOUSE  = 1;
var TREE   = 2;
var TRASH  = 3;
var ROBO   = 4;

// Mapa da cidade
var map =
[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

// Mapa do robô
var mapRobo = 
[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

// Número total de linhas (10)
var ROWS = map.length;

// Número total de colunas (10)
var COLUMNS = map[0].length;

// Posição atual do robô em X
var ROBO_ROW;

// Posição atual do robô em Y
var ROBO_COLUMN;

//--------------------------------------------------------//
//  					 FUNÇÕES						  //
//--------------------------------------------------------//

// Função responsável pela criação do mapa da cidade
createMap();

// Chama uma função ou executa um trecho de código repetidamente, com um atraso de tempo fixo entre cada chamada para essa função.
// https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
window.setInterval('gameLoop()', 2999);

/**
* Loop do game
* @public
*/
function gameLoop() {	
	game();
	// debug();
}

/**
* Inicialização do algoritmo: criação de elementos no mapa
* @private
*/
function init() {
	for (var row = 0; row < ROWS; row++) {
		for (var column = 0; column < COLUMNS; column++) {
			map[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)] = HOUSE;
			map[Math.floor(Math.random()*QTD_ROWS)][Math.floor(Math.random()*QTD_COLUMNS)] = TREE;
			map[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)] = TRASH;
		}
	}
}

/**
* Inicialização da posição do robô na cidade
* @private
*/
function initRobo() {
	for (var row = QTD_ROWS+1; row < ROWS-1; row++) {
		for (var column = 0; column < COLUMNS-1; column++) {
			// O robô será criado em uma posição aleatória, onde não pode haver na mesma posição: Casa, árvore ou lixo
			if (map[row][column] == STREET) {
				mapRobo[row][column] = ROBO;
				ROBO_ROW = row; ROBO_COLUMN = column;
				row = 10; column = 10;
			}
		}
	}
}

/**
* Criação do mapa
* @public
*/
function createMap() {
	init();
	initRobo();

	// Retorna true/false se este nó tem filhos
	// https://developer.mozilla.org/en-US/docs/DOM/Node.hasChildNodes
	// http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-810594187
	if (city.hasChildNodes())
		// Removendo todos os filhos de um elemento
		// https://developer.mozilla.org/en-US/docs/DOM/Node.removeChild
		for (var i = 0; i < ROWS * COLUMNS; i++)
			// https://developer.mozilla.org/en-US/docs/DOM/Node.firstChild
			city.removeChild(city.firstChild);

	// Adiciona elementos(sprites) dentro da matriz(city)
	for (var row = 0; row < ROWS; row++) {
		for (var column = 0; column < COLUMNS; column++) {
			// Variável cell que recebe um elemento HTML img
			var cell = document.createElement('img');

			// É atribuito a tag HTML img uma class cell
			// exemplo:
			// <img class="cell" src="img/sprite.png">
			cell.setAttribute('class', 'cell');

			// Adiciona um nó para o final da lista de filhos de um nó pai especificada. 
			// Se o nó já existe ele é removido da atual nó pai, em seguida, adicionado ao novo nó pai.
			// https://developer.mozilla.org/pt-BR/docs/DOM/Node.appendChild
			city.appendChild(cell);

			// add sprites na posição map[row][column]
			switch(map[row][column]) {
				case STREET:
					cell.src = 'img/street.png';
					break;
				case HOUSE:
					cell.src = 'img/house.png';
					break;
				case TREE:
					cell.src = 'img/tree.png';
					break;
				case TRASH:
					cell.src = 'img/trash.png';
					break;
			}

			// add sprites na posição mapRobo[row][column]
			switch(mapRobo[row][column]) {
				case ROBO:
					cell.src = 'img/robo.png';
					break;
			}

			// add o atributo style >> top e left
            // exemplo row = 0, então: 0 * 64 concatena o resultado com px -> 0px
            // exemplo column = 1, então: 1 * 64 concatena o resultado com px -> 64px
            // e assim vai... até row for igual a 9
			cell.style.top  = row * SIZE + 'px';
			cell.style.left = column * SIZE + 'px';
		}
	}
}

function debug() {
	//      |          RIGHT            |             BOTTOM         |            LEFT            |              TOP            |
	QUEUE = [map[ROBO_ROW][ROBO_COLUMN+1],map[ROBO_ROW+1][ROBO_COLUMN],map[ROBO_ROW][ROBO_COLUMN-1],map[ROBO_ROW-1][ROBO_COLUMN]];
	alert(QUEUE);
}

/**
* @private
*/
function bfs(QUEUE) {
	var PATH_TRASH = undefined;

	for (var i = 0; i < QUEUE.length; i++) {
		if (QUEUE[i] == TRASH) {
			// Váriaveis que recebe os valores dos sacos de lixos
			PAPER    += TRASH_RECY[0];
			METAL    += TRASH_RECY[1];
			PLASTIC  += TRASH_RECY[2];
			GLASS    += TRASH_RECY[3];
			CONTAINER = PAPER+METAL+PLASTIC+GLASS;

			if (CONTAINER > 30) {
				TRUCK += CONTAINER;
				CONTAINER = 0;
			}
			
			document.getElementById('paper').innerHTML   = PAPER   + " kg";
			document.getElementById('metal').innerHTML   = METAL   + " kg";
			document.getElementById('plastic').innerHTML = PLASTIC + " kg";
			document.getElementById('glass').innerHTML   = GLASS   + " kg";
			document.getElementById('truck').innerHTML   = TRUCK   + " kg";

			PATH_TRASH = i;
			switch(PATH_TRASH) {
				// RIGHT
				case 0:
					mapRobo[ROBO_ROW][ROBO_COLUMN] = 0;
					ROBO_COLUMN++;
					mapRobo[ROBO_ROW][ROBO_COLUMN] = ROBO;
					map[ROBO_ROW][ROBO_COLUMN] = 0;
					break;

				// BOTTOM
				case 1:
					mapRobo[ROBO_ROW][ROBO_COLUMN] = 0;
					ROBO_ROW++;
					mapRobo[ROBO_ROW][ROBO_COLUMN] = ROBO;
					map[ROBO_ROW][ROBO_COLUMN] = 0;
					break;

				// LEFT
				case 2:
					mapRobo[ROBO_ROW][ROBO_COLUMN] = 0;
					ROBO_COLUMN--;
					mapRobo[ROBO_ROW][ROBO_COLUMN] = ROBO;
					map[ROBO_ROW][ROBO_COLUMN] = 0;
					break;

				// TOP
				case 3:
					mapRobo[ROBO_ROW][ROBO_COLUMN] = 0;
					ROBO_ROW--;
					mapRobo[ROBO_ROW][ROBO_COLUMN] = ROBO;
					map[ROBO_ROW][ROBO_COLUMN] = 0;
					break;
			}
			i = 3;
		} else {
			if (i == 3 && PATH_TRASH === undefined) {
				for (var j = 0; j < QUEUE.length; j++) {
					if (QUEUE[j] == STREET) {
						switch(j) {
							// RIGHT
							case 0:
								mapRobo[ROBO_ROW][ROBO_COLUMN] = 0;
								ROBO_COLUMN++;
								mapRobo[ROBO_ROW][ROBO_COLUMN] = ROBO;
								break;
							
							// BOTTOM
							case 1:
								mapRobo[ROBO_ROW][ROBO_COLUMN] = 0;
								ROBO_ROW++;
								mapRobo[ROBO_ROW][ROBO_COLUMN] = ROBO;
								break;
							
							// LEFT
							case 2:
								mapRobo[ROBO_ROW][ROBO_COLUMN] = 0;
								ROBO_COLUMN--;
								mapRobo[ROBO_ROW][ROBO_COLUMN] = ROBO;
								break;
							
							// TOP
							case 3:
								mapRobo[ROBO_ROW][ROBO_COLUMN] = 0;
								ROBO_ROW--;
								mapRobo[ROBO_ROW][ROBO_COLUMN] = ROBO;
								break;
						}
						j = 3;
					} 
				}
			}
		}
	}
}

/**
* Início da busca por lixo na cidade
* @public
*/
function game() {
	if (ROBO_ROW > 0) {
		if (ROBO_COLUMN == 0) {
			//      |          RIGHT            |             BOTTOM         |   |            TOP            |
			QUEUE = [map[ROBO_ROW][ROBO_COLUMN+1],map[ROBO_ROW+1][ROBO_COLUMN],2,map[ROBO_ROW-1][ROBO_COLUMN]];
			bfs(QUEUE);
		} else if (ROBO_COLUMN == 9) {
			//         |             BOTTOM         |            LEFT            |              TOP          |
			QUEUE = [2,map[ROBO_ROW+1][ROBO_COLUMN],map[ROBO_ROW][ROBO_COLUMN-1],map[ROBO_ROW-1][ROBO_COLUMN]];
			bfs(QUEUE);
		} else if (ROBO_ROW == 9) {
			//      |          RIGHT            |   |          LEFT            |              TOP            |
			QUEUE = [map[ROBO_ROW][ROBO_COLUMN+1],2,map[ROBO_ROW][ROBO_COLUMN-1],map[ROBO_ROW-1][ROBO_COLUMN]];
			bfs(QUEUE);
		} else if (ROBO_ROW == 0 && ROBO_COLUMN == 0) {
			//      |          RIGHT            |             BOTTOM         |
			QUEUE = [map[ROBO_ROW][ROBO_COLUMN+1],map[ROBO_ROW+1][ROBO_COLUMN],2,2];
			bfs(QUEUE);
		} else if (ROBO_ROW == 0 && ROBO_COLUMN == 9) {
			//         |           BOTTOM         |            LEFT            |
			QUEUE = [2,map[ROBO_ROW+1][ROBO_COLUMN],map[ROBO_ROW][ROBO_COLUMN-1],2];
			bfs(QUEUE);
		} else if (ROBO_ROW == 9 && ROBO_COLUMN == 0) {
			//      |          RIGHT            |     |            TOP            |
			QUEUE = [map[ROBO_ROW][ROBO_COLUMN+1],2,2,map[ROBO_ROW-1][ROBO_COLUMN]];
			bfs(QUEUE);
		} else if (ROBO_ROW == 9 && ROBO_COLUMN == 9) {
			//           |          LEFT            |              TOP            |
			QUEUE = [2,2,map[ROBO_ROW][ROBO_COLUMN-1],map[ROBO_ROW-1][ROBO_COLUMN]];
			bfs(QUEUE);
		} else {
			//      |          RIGHT            |             BOTTOM         |            LEFT            |              TOP            |
			QUEUE = [map[ROBO_ROW][ROBO_COLUMN+1],map[ROBO_ROW+1][ROBO_COLUMN],map[ROBO_ROW][ROBO_COLUMN-1],map[ROBO_ROW-1][ROBO_COLUMN]];
			bfs(QUEUE);
		}
	}

	// Adiciona elementos(sprites) dentro da matriz(city)
	for (var row = 0; row < ROWS; row++) {
		for (var column = 0; column < COLUMNS; column++) {
			// Variável cell que recebe um elemento HTML img
			var cell = document.createElement('img');

			// É atribuito a tag HTML img uma class cell
			// exemplo:
			// <img class="cell" src="img/sprite.png">
			cell.setAttribute('class', 'cell');

			// Adiciona um nó para o final da lista de filhos de um nó pai especificada. 
			// Se o nó já existe ele é removido da atual nó pai, em seguida, adicionado ao novo nó pai.
			// https://developer.mozilla.org/pt-BR/docs/DOM/Node.appendChild
			city.appendChild(cell);

			// add sprites na posição map[row][column]
			switch(map[row][column]) {
				case STREET:
					cell.src = 'img/street.png';
					break;
				case HOUSE:
					cell.src = 'img/house.png';
					break;
				case TREE:
					cell.src = 'img/tree.png';
					break;
				case TRASH:
					cell.src = 'img/trash.png';
					break;
			}

			// add sprites na posição mapRobo[row][column]
			switch(mapRobo[row][column]) {
				case ROBO:
					cell.src = 'img/robo.png';
					break;
			}

			// add o atributo style >> top e left
            // exemplo row = 0, então: 0 * 64 concatena o resultado com px -> 0px
            // exemplo column = 1, então: 1 * 64 concatena o resultado com px -> 64px
            // e assim vai... até row for igual a 9
			cell.style.top  = row * SIZE + 'px';
			cell.style.left = column * SIZE + 'px';
		}
	}
}