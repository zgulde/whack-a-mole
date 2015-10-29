// $(document).ready(function(){
	function getRandomNumber(min,max){
        return Math.floor( (Math.random() * (max-min+1) + min) );
    }

	var whackamole = {

		gameTiles: [],
		molesWhacked: 0,
		roundInterval: 0,
		roundTimeout: 0,
		molesToWhack: 0,
		options: {
			numberOfTiles: 0,
			roundLength: 0,
			percentLoss: 0 // %
		},

		GameTile: function(idNumber){
			
			this.setActive = function(){
				var gameTile = this;
				gameTile.isActive = true;
				$(gameTile.id).addClass('active');
			}

			this.setInactive = function(){
				this.isActive = false;
				$(this.id).removeClass('active');
			}

			this.$html = $('<div>').addClass('game-tile').attr('id','tile'+idNumber).attr('data-value',idNumber);
			this.id = '#tile' + idNumber;
			this.isActive = false;
		},

		getGameAreaHeight: function(){
			var height = $('#whackamole-game').css('height');
			return parseFloat(height);
		},

		getGameAreaWidth: function(){
			var width = $('#whackamole-game').css('width');
			return parseFloat(width);
		},

		buildGameArea: function(){
			var $gameArea = $('<div>').attr('id','game-area');
			$gameArea.css('height',whackamole.getGameAreaHeight());
			$gameArea.css('width',whackamole.getGameAreaWidth());
			return $gameArea;
		},

		buildOptionsArea: function(){
			var $optionsArea = $('<div>').attr('id','options-area');
			$optionsArea.css('width',whackamole.getGameAreaWidth());
			$optionsArea.css('width',whackamole.getGameAreaWidth());
			return $optionsArea;
		},

		//numOfTiles must be a perfect square!
		buildGame: function(numOfTiles){
			var $gameArea = whackamole.buildGameArea();
			var $optionsArea = whackamole.buildOptionsArea();
			var tileHeight = whackamole.getGameAreaHeight()/Math.sqrt(numOfTiles);
			var tileWidth = whackamole.getGameAreaWidth()/Math.sqrt(numOfTiles);


			for(var i = 0; i < numOfTiles; i++){
				
				var gameTile = new whackamole.GameTile(i);

				gameTile.$html.css('height',tileHeight);
				gameTile.$html.css('width',tileWidth);

				gameTile.$html.appendTo($gameArea);
				whackamole.gameTiles.push(gameTile);
			}

			$('#whackamole-game').html('');
			$gameArea.css('position','absolute');
			$gameArea.appendTo($('#whackamole-game'));

		},

		//if you call this while all tiles are active it will create
		//an infinite loop!
		//returns a GameTile object
		getRandomInactiveTile: function(){
			var i = getRandomNumber(0, (this.gameTiles.length-1) );
			if(this.gameTiles[i].isActive){
				return this.getRandomInactiveTile();
			} else {
				return this.gameTiles[i];
			}
		},

		//if percentLoss*numOfTiles are active return true else return false
		isGameLost: function(){
			var game = this;
			var numActive = 0;
			game.gameTiles.forEach(function(tile){
				if (tile.isActive) numActive++;
			});
			if ( numActive >= (game.gameTiles.length * game.options.percentLoss) ){
				return true;
			} else {
				return false;
			}
		},

		startNewRound: function(){
			var game = this;
			
			game.startRoundTimer();
			game.roundInterval = setInterval(function(){
				if ( game.isGameLost() ) {
					game.endGame();
				} else {
					game.getRandomInactiveTile().setActive();
				}
			}, (game.options.roundLength/game.molesToWhack) );
				
			game.roundTimeout = setTimeout( function(){
				game.endRound();
			}, game.options.roundLength);
		},

		endRound: function(){
			var game = this;
			game.molesToWhack += (game.gameTiles.length/2);
			console.log("endRound called!");
			console.log("molesWhacked: " + game.molesWhacked);
			clearInterval(game.roundInterval);
			game.gameTiles.forEach(function(tile){
				tile.setInactive(tile);
			});
			game.startBreakTimer();
			setTimeout( function(){
				game.startNewRound();
			}, 3000);
		},

		endGame: function(){
			var game = this;
			clearInterval(game.roundInterval);
			clearInterval(game.roundTimeout);
			alert('game over!');
		},

		tileClicked: function(){
			var gameTile = whackamole.gameTiles[$(this).attr('data-value')];

			if (gameTile.isActive){	
				whackamole.molesWhacked++;
				gameTile.setInactive(gameTile);
				$('#score').text(whackamole.molesWhacked);
			}
		},

		startBreakTimer: function(){
			var $timer = $('#break-timer');
			var i = 0;
			$timer.show();
			$timer.text(3-i);
			var countingDown = setInterval(function(){
				i++;
				$timer.text(3-i);
				if (i === 3){
					clearInterval(countingDown);
					$timer.hide();
				}
			},1000)
		},

		startRoundTimer: function(){
			var $timer = $('#round-timer');
			var i = 0;
			var initial = this.options.roundLength / 1000; //ms to s
			$timer.show();
			$timer.text(initial-i);
			var countingDown = setInterval(function(){
				i++;
				$timer.text(initial-i);
				if (i === initial){
					clearInterval(countingDown);
					$timer.hide();
				}
			},1000)
		},

		init: function(){
			var game = this;

			game.options.numberOfTiles = parseInt($('#number-of-tiles-select').val());
			game.options.percentLoss = parseFloat($('#percent-loss-select').val());
			game.options.roundLength = parseInt($('#round-length-select').val());
			game.molesToWhack = game.options.numberOfTiles;
			
			game.buildGame(game.options.numberOfTiles);
			$('.game-tile').on('click',game.tileClicked);
			game.startNewRound();
		}

	}

	$('#start-btn').click(function(){
		whackamole.init();
	});
	
// });