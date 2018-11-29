(function(){
	'use strict';
	
	//Опишем наши игровые объекты + научим их рисовать себя на канвасе и передвигаться
	var Ball = function () {
		return {
			radius: 8,
			color: '#000000',
			x: 0,
			y: 0,
			yspeed: 5,
			xspeed: 7,
			bounce: 1.1, //коофицент упругости - для ускорения шарика после отскока
			render: function (ctx) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
				ctx.fillStyle = this.color;
				ctx.fill();
			},
			//Передвижение шара всегда происходит с определенной скоростью 
			//по этому мы не будем передавть x y для кастомного перемещения.
			move: function () {
				this.x = this.x + this.xspeed;
				this.y = this.y + this.yspeed;
			}
		}
	};

	//Блоки для отбивания шарика
	var Bracket = function () {
		return {
			w: 10,
			h: 100,
			x: 0,
			y: 0,
			speed: 20,
			color: '#000000',
			render: function (ctx) {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.w, this.h);
			}
		}
	};

	//Собственно сам игрок с его свойствами
	var Player = function () {
		return {
			rate: 0
		};
	};

	//Теперь сама игра
	var Game = function () {
        var _this = this;

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
            var _this = this;
			
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
        
        //пауза
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
        window.game = new Game();
		
		game.startGame();
	}		
})();