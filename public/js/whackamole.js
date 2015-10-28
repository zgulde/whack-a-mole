// $(document).ready(function(){
	function getRandomNumber(min,max){
        return Math.floor( (Math.random() * (max-min+1) + min) );
    }

	var whackamole = {

		gameTiles: [],
		molesWhacked: 0,
		roundInterval: 0,
		roundTimeout: 0,
		roundLength: 10000,
		molesToWhack: 10,

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
			this.activeInt = 0;
		},

		getGameAreaHeight: function(){
			var height = $('#game-area').css('height');
			return parseFloat(height);
		},

		getGameAreaWidth: function(){
			var width = $('#game-area').css('width');
			return parseFloat(width);
		},


		//numOfTiles must be a perfect square!
		buildGame: function(numOfTiles){
			var tileHeight = whackamole.getGameAreaHeight()/Math.sqrt(numOfTiles);
			var tileWidth = whackamole.getGameAreaWidth()/Math.sqrt(numOfTiles);

			$('#game-area').html('');

			for(var i = 0; i < numOfTiles; i++){
				
				var gameTile = new whackamole.GameTile(i);

				gameTile.$html.appendTo('#game-area');
				whackamole.gameTiles.push(gameTile);
			}

			$('.game-tile').css('height',tileHeight);
			$('.game-tile').css('width',tileWidth);
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

		//if 3/4 or more of the tiles are active return true else return false
		isGameLost: function(){
			var numActive = 0;
			this.gameTiles.forEach(function(tile){
				if (tile.isActive) numActive++;
			});
			if ( numActive >= (3*this.gameTiles.length/4) ){
				return true;
			} else {
				return false;
			}
		},

		startNewRound: function(){
			var game = this;
			
			game.roundInterval = setInterval(function(){
				if ( game.isGameLost() ) {
					game.endGame();
				} else {
					game.getRandomInactiveTile().setActive();
				}
			}, (game.roundLength/game.molesToWhack) );
				
			game.roundTimeout = setTimeout( function(){
				game.endRound();
			}, game.roundLength);
			
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
				clearInterval(gameTile.activeInt);
			}
		},

		init: function(){
			this.buildGame(9);
			$('.game-tile').on('click',this.tileClicked);
			this.molesToWhack = this.gameTiles.length;
			this.startNewRound();
		}

	}

	$('#start-btn').click(function(){
		whackamole.init();
	});
	
// });