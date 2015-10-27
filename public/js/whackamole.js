// $(document).ready(function(){
	var whackamole = {
		buildGame: function(){
			for(var i = 1; i < 10; i++){
				var $gameSquare = $('<div>').addClass('game-square').attr('id','square' + i);
				$gameSquare.appendTo('#game-area');
			}
		}
	}
// });