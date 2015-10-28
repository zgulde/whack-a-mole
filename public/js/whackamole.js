// $(document).ready(function(){
	var whackamole = {

		game-tiles: [],



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
				$gameTile.appendTo('#game-area');
			}
			$('.game-tile').css('height',tileHeight);
			$('.game-tile').css('width',tileWidth);
		}

	}

	whackamole.buildGame(4);
// });