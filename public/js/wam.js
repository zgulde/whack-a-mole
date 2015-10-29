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
		buildOptionsArea: function(score){}
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

	$optionsArea: 0;
	$gameArea: 0;
	$breakArea: 0;


}