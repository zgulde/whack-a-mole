// $(document).ready(function(){
	function getRandomNumber(min,max){
        return Math.floor( (Math.random() * (max-min+1) + min) );
    }

	var whackamole = {

		gameTiles: [],

		GameTile: function(idNumber){
			
			this.setActive = function(duration){
				this.isActive = true;
				$(this.id).addClass('active');
			}

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
				var $gameTile = $('<div>').addClass('game-tile').attr('id','tile'+i);
				var gameTile = new whackamole.GameTile(i);

				$gameTile.appendTo('#game-area');
				whackamole.gameTiles.push(gameTile);
			}
			$('.game-tile').css('height',tileHeight);
			$('.game-tile').css('width',tileWidth);
		},

		pickRandomInactiveTile: function(){

		}

	}

	whackamole.buildGame(4);
// });