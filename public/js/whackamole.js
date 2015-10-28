// $(document).ready(function(){
	function getRandomNumber(min,max){
        return Math.floor( (Math.random() * (max-min+1) + min) );
    }

	var whackamole = {

		gameTiles: [],
		molesWhacked: 0,
		roundInt: 0,
		roundLength: 10000,

		GameTile: function(idNumber){
			
			this.setActive = function(duration){
				var gameTile = this;
				gameTile.isActive = true;
				$(gameTile.id).addClass('active');
				gameTile.activeInt = setTimeout( function(){
					gameTile.setInactive();
				}, duration);
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
			return parseInt(height);
		},

		getGameAreaWidth: function(){
			var width = $('#game-area').css('width');
			return parseInt(width);
		},

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

		//if all the tiles are lit return true else return false
		isGameLost: function(){
			var gameLost = true;
			this.gameTiles.forEach(function(tile){
				if (tile.isActive === false) gameLost = false;
			});
			return gameLost;
		},

		startNewRound: function(){
			var game = this;
			if ( game.isGameLost() ) {
				game.endGame();
			} else {
				setTimeout( function(){
					game.endRound();
				}, game.roundLength);
				game.getRandomInactiveTile().setActive(5000);
			}
		},

		endRound: function(){
			console.log("endRound called!");
			console.log(this);
			this.gameTiles.forEach(function(tile){
				tile.setInactive(tile);
			});
		},

		endGame: function(){
			alert('game over!');
		},

		tileClicked: function(){
			var gameTile = whackamole.gameTiles[$(this).attr('data-value')];

			if (gameTile.isActive){
				
				this.molesWhacked++;
				gameTile.setInactive(gameTile);
				clearInterval(gameTile.activeInt);
			}
		},

		init: function(){
			this.buildGame(4);
			$('.game-tile').on('click',this.tileClicked);
		}

	}

	whackamole.init();
	whackamole.startNewRound();
	
// });