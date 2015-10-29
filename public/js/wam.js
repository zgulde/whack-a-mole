var wam = {
	init: function(){
		wam.$optionsArea = wam.options.buildOptionsArea();
		wam.$optionsArea.show();
	},

	getGameHeight: function(){
		var height = $('#whackamole-game').css('height');
		return parseFloat(height);
	},

	getGameWidth: function(){
		var width = $('#whackamole-game').css('width');
		return parseFloat(width);
	},

	startGame: function(){
		//initialize values
		wam.$optionsArea.hide();
		wam.$gameArea = wam.game.buildGameArea();
		wam.game.setOptions();
		wam.startNewRound();
	},

	startNewRound: function(){
		wam.currentRound++;
		wam.$gameArea.show();
		wam.game.startRound();
	},

	endRound: function(){
		wam.$gameArea.hide();
		wam.$breakArea.show();
	},

	endGame: function(){
		wam.$gameArea.hide();
		wam.$breakArea.hide();
		wam.$optionsArea.show();
	},

	options: {
		buildOptionsArea: function(score){
			function setAndAppend ($optionsElement) {
				$optionsElement.css('height', maxHeight/5 );
				$optionsElement.css('position','relative');
				$optionsElement.css('text-align','center');
				$optionsElement.addClass('options-element');
				$optionsElement.appendTo($options);
			}
			var maxHeight = wam.getGameHeight();
			var maxWidth = wam.getGameWidth();

			var $options = $('<div>').attr('id','options-area');
			$options.css('height', maxHeight );
			$options.css('width', maxWidth );
			$options.css('position', 'absolute' );


			var $heading = $('<div>');
			$('<h3>').text('Whack-A-Mole!').appendTo($heading);
			setAndAppend($heading);

			var $boardSize = $('<div>');
			$('<h4>').text('Board Size').appendTo($boardSize);
			var $l = $('<label>').attr('for','small').text('small').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','small').val('4').appendTo($l);
			$l.appendTo($boardSize);
			$l = $('<label>').attr('for','med').text('med').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','med').val('9').appendTo($l);
			$l.appendTo($boardSize);
			$l = $('<label>').attr('for','large').text('large').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','large').val('16').appendTo($l);
			$l.appendTo($boardSize);
			$l = $('<label>').attr('for','xlarge').text('xlarge').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','xlarge').val('25').appendTo($l);
			$l.appendTo($boardSize);
			setAndAppend($boardSize);

			var $roundLength = $('<div>');
			$('<h4>').text('Round Length').appendTo($roundLength);
			$l = $('<label>').attr('for','roundLength1').text('10s').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','roundLength1').val('10000').appendTo($l);
			$l.appendTo($roundLength);
			$l = $('<label>').attr('for','roundLength2').text('20s').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','roundLength2').val('20000').appendTo($l);
			$l.appendTo($roundLength);
			$l = $('<label>').attr('for','roundLength3').text('30s').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','roundLength3').val('30000').appendTo($l);
			$l.appendTo($roundLength);
			setAndAppend($roundLength);

			var $lossPercentage = $('<div>');
			$('<h4>').text('Loss Percentage').appendTo($lossPercentage);
			$l = $('<label>').attr('for','loss-percent1').text('50%').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','loss-percent1').val('10000').appendTo($l);
			$l.appendTo($lossPercentage);
			$l = $('<label>').attr('for','loss-percent2').text('75%').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','loss-percent2').val('10000').appendTo($l);
			$l.appendTo($lossPercentage);
			$l = $('<label>').attr('for','loss-percent3').text('100%').css('margin','0 10px');
			$('<input type="radio" name="board-size">').attr('id','loss-percent3').val('10000').appendTo($l);
			$l.appendTo($lossPercentage);
			setAndAppend($lossPercentage);

			var $buttons = $('<div>');
			$('<button>').attr('id','intstructions-btn').css('position','absolute').css('bottom','10px').css('left','10px').text('instructions').appendTo($buttons);
			$('<button>').attr('id','start-btn').css('position','absolute').css('bottom','10px').css('right','10px').text('start').appendTo($buttons);
			setAndAppend($buttons);


			$('.options-element').css('height', (maxHeight/5) );
			$('.options-element').css('width', maxWidth );

			return $options;
		}
	},

	game: {
		buildGameArea: function(numberOfTiles){},
		startRound: function(roundNumber){},
		getRandomNumber: function(min,max){
			return Math.floor( (Math.random() * (max-min+1) + min) );
		},


	},

	score: 0,
	currentRound: 0,

	$optionsArea: 0,
	$gameArea: 0,
	$breakArea: 0


}