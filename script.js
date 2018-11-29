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

				//Шарик оказался за выторым игроком
				if (ball.x + ball.radius/2 > game.params.width) {
					//Засчтитаем гол
					this.objects.player1.rate++;
					//Сменим состояние игры
					this.params.state = 'playerwait';
					//Сохарним информацию о забившем
					this.params.lastGoalBracket = this.objects.bracket1;
					this.params.lastGoalPlayer = 'player1';
				}

				//Проверяем наличие победителя
				//Если кто-то из игроков набрал необходимое количество очков
				//Он выиграл
				if(this.objects.player1.rate === this.params.maxRate) {
					alert('1 игрок выиграл');
					this.gameRestart();
				}

				if(this.objects.player2.rate === this.params.maxRate) {
					alert('2 игрок выиграл');
					this.gameRestart();
				}
			}
		},

		//Физика игры
		physic: function () {
			//Для краткости записи
			var ball = game.objects.ball,
				b1 = game.objects.bracket1,
				b2 = game.objects.bracket2;
			
			//Передвигаем шар
			game.objects.ball.move();

			//Отскок слева
			if (ball.x + ball.radius/2 < 0) {
				game.objects.ball.xspeed = -game.objects.ball.xspeed;
			}
			//Отскок Справа
			if (ball.x + ball.radius/2 > game.params.width) {
				game.objects.ball.xspeed = -game.objects.ball.xspeed;
			}
			//Отскок от границ canvas по высоте
			if (ball.y + ball.radius/2 > game.params.height || ball.y + ball.radius/2 < 0) {
				game.objects.ball.yspeed = -game.objects.ball.yspeed;
			}

			
			//Отскок шарика от 1 блока
			if(ball.x <= 60 && ball.y >= b1.y && ball.y <= b1.y+b1.h) {
				ball.xspeed = -ball.xspeed;
				//Ускоряем шарик
				ball.xspeed = ball.xspeed * ball.bounce;
			}
			//Отскок шарика от 2 блока
			if(ball.x >= this.params.width-50 && ball.y >= b2.y && ball.y <= b2.y+b2.h) {
				ball.xspeed = -ball.xspeed;
				//Ускоряем шарик
				ball.xspeed = ball.xspeed * ball.bounce;
			}

			//В состоянии ожидания пуска шарика от ракетки игрока, выставляем шарик рядом с ракеткой забившего игрока.
			if(this.params.state === 'playerwait') {
				ball.xspeed = 0;
				ball.yspeed = 0;
				if(this.params.lastGoalPlayer === 'player1') {
					ball.x 	= this.params.lastGoalBracket.x + this.params.lastGoalBracket.w + ball.radius + 1;
					ball.y 	= this.params.lastGoalBracket.y + this.params.lastGoalBracket.h/2;
				}
				if(this.params.lastGoalPlayer === 'player2') {
					ball.x 	= this.params.lastGoalBracket.x - ball.radius - 1;
					ball.y 	= this.params.lastGoalBracket.y + this.params.lastGoalBracket.h/2;
				}
			}

			//Не позволяем вылезать блокам за canvas и возврщаем их на место
			if(b1.y <= 0) b1.y = 1; 
			if(b2.y <= 0) b2.y = 1; 
			if(b1.y+b1.h >= this.params.height) b1.y = this.params.height-b1.h;
			if(b2.y+b2.h >= this.params.height) b2.y = this.params.height-b2.h;
		},

		//Рендер игры
		render: function () {
			//Чистим канвас на каждом кадре
			game.ctx.fillStyle = '#eeeeee';
			game.ctx.fillRect(0,0, game.params.width, game.params.height);

			//Рендерим шарик
			game.objects.ball.render(game.ctx);
			game.objects.bracket1.render(game.ctx);
			game.objects.bracket2.render(game.ctx);
			game.renderRate(game.ctx);
		},
		
		//Показываем счет игры
		renderRate: function (ctx) {
			var rateText = game.objects.player1.rate + ' : ' + game.objects.player2.rate;
			ctx.fillStyle = '#000000';
			ctx.font = "20px Arial";
			ctx.fillText(rateText,game.params.width/2,50);
		},

		//Инициализация игровых событий
		keyDownEvent: function (event) {
			var kCode = event.keyCode;
				//1-вверх 
				if(kCode === 49) {
					game.objects.bracket1.y = game.objects.bracket1.y + game.objects.bracket1.speed;
				} 
				//2-вниз
				if(kCode === 50) {
					game.objects.bracket1.y = game.objects.bracket1.y - game.objects.bracket1.speed;
				} 
				//9-вверх 
				if(kCode === 57) {
					game.objects.bracket2.y = game.objects.bracket2.y + game.objects.bracket2.speed;
				} 
				//0-вниз
				if(kCode === 48) {
					game.objects.bracket2.y = game.objects.bracket2.y - game.objects.bracket2.speed;
                } 
                //E - рестарт шарика
				if(kCode === 69) {
					this.restartBall();
				}
				//R - рестарт игры
				if(kCode === 82) {
					this.restartGame();
				}
				//Пробел - пуск шарика
				if(kCode === 32 && game.params.state === 'playerwait') {
					this.kickBall();
				}
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