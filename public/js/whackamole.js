// $(document).ready(function(){
	var whackamole = {

		getGameAreaHeight: function(){
			var height = $('#game-area').css('height');
			return parseInt(height);
		},

		getGameAreaWidth: function(){
			var width = $('#game-area').css('width');
			return parseInt(width);
		},

		buildGame: function(numOfSquares){
			var squareHeight = whackamole.getGameAreaHeight()/Math.sqrt(numOfSquares);
			var squareWidth = whackamole.getGameAreaWidth()/Math.sqrt(numOfSquares);

			$('#game-area').html('');

			for(var i = 0; i < numOfSquares; i++){
				var $gameSquare = $('<div>').addClass('game-square').attr('id','square'+i);
				$gameSquare.appendTo('#game-area');
			}
			$('.game-square').css('height',squareHeight);
			$('.game-square').css('width',squareWidth);
		}

	}

	whackamole.buildGame(4);
// });