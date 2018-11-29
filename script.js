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

        this.params = {
			width: 960,
			height: 600,
			state: 'loading', //Состояние игры
			maxRate: 10 //до скольки будет идти матч.
        };

        //Сохраняем ссылки на canvas и контекст для дальнейшего рисования
		this.canvasBlock = document.getElementById('pingpong');
		this.ctx = this.canvasBlock.getContext('2d');
        //Подписываемся на события кнопок
		document.addEventListener('keydown', function (event) {
			_this.keyDownEvent.call(_this, event);
		});
		return this;
	};

	//В прототип будем писать методы всякие игровые
	Game.prototype = {
        //Старт игры
		startGame: function () {
			//Инициализируем игровые объекты
			this.objects = {

            };
            //Меняем состояние
            this.params.state = 'game';
            
            //Расставляем стартовые позиции ракеток
			this.objects.bracket1.x = 50;
			this.objects.bracket1.y = this.params.height / 2 - this.objects.bracket1.h / 2;
			
			this.objects.bracket2.x = this.params.width - 50;
			this.objects.bracket2.y = this.params.height / 2 - this.objects.bracket1.h / 2;

			//Перекрасим второго игрока
			this.objects.bracket2.color = '#000000';
			//Запускаем игровой цикл
			this.loop();
		},

		//Игровой цикл
		loop: function () {
            var _this = this;

            this.logic();

            this.physic();
            
            this.render();

			this.requestLoop = requestAnimationFrame(function(){
				_this.loop.call(_this);
			});
		},

		//Логика игры
		logic: function () {
            //Если сейчас идет игра
			if(this.params.state == 'game') {

				//И шарик оказался за первым игроком
				if (ball.x + ball.radius/2 < 0) {
					//Засчтитаем гол
					this.objects.player2.rate++;
					//Сменим состояние игры
					this.params.state = 'playerwait';
					//Сохарним информацию о забившем
					this.params.lastGoalBracket = this.objects.bracket2;
					this.params.lastGoalPlayer = 'player2';
				}
			}
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