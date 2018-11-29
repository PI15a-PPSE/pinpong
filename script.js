(function(){
	'use strict';
	
	//Опишем наши игровые объекты + научим их рисовать себя на канвасе и передвигаться
	var Ball = function () {
		return {
			
		}
	};

	//Блоки для отбивания шарика
	var Bracket = function () {
		return {
			
		}
	};

	//Собственно сам игрок с его свойствами
	var Player = function () {
		return {
			
		};
	};

	//Теперь сама игра
	var Game = function () {

		return this;
	};

	//В прототип будем писать методы всякие игровые
	Game.prototype = {
        //Старт игры
		startGame: function () {
			
			//Запускаем игровой цикл
			this.loop();
		},

		//Игровой цикл
		loop: function () {
			
		},

		//Логика игры
		logic: function () {

		},

		//Физика игры
		physic: function () {
			
		},

		//Рендер игры
		render: function () {
			
		},
		
		//Показываем счет игры
		renderRate: function (ctx) {
			
		},

		//Инициализация игровых событий
		keyDownEvent: function (event) {
			
		},
		
		//Пуск шарика после гола
		kickBall: function () {
			
		},

		
		//Стоп игра
		stopGame: function () {
			
		},
		
		pauseGame: function () {
			
		},

		//Рестарт шарика
		restartBall: function () {
			
		},

		//Рестарт игры
		restartGame: function () {
			
		}
	};

	//При загрузке window, стартуем нашу игру
	window.onload = function () {
        //Game Start!!
	}		
})();