var obj = 
{
	"bunny": Snap("#bunny"),
	"hand": Snap("#bunny .hand"),
	"foot": Snap("#bunny .foot"),
	"carrot": Snap("#bunny .carrot"),
	"moon": Snap("#moon").select("polygon"),
	"mountain": Snap("#mountain").selectAll("polygon")
}

var block = {
	"#bunny" : 0
};

/* --------------------------- funciones --------------------------- */


var isOnScreen = function(obj)
{
	var $elem = $(obj);
	var $window = $(window);

	var docViewLeft = $window.scrollLeft();
	var docViewRight = docViewLeft + $window.width();
	var elemLeft = $elem.offset().left;
	var elemRight = elemLeft + $elem.width();
	var response = ((elemRight < docViewRight) && (elemLeft > docViewLeft));

	if(response)
	{
		$(obj).attr("class", "onScreen");
	}
	else
	{
		$(obj).attr("class", "");
	}

	return response;
};

var hideFoot = function()
{
	var check = block["#bunny"];
	block["#bunny"] = 1;

	if(check != block["#bunny"])
	{
		obj["hand"].select("rect:nth-child(2)").animate({transform: 'matrix(-0.619 -0.7854 1 -0.619 160 266)'}, 200, function()
		{
			setTimeout(function()
			{
				obj["hand"].select("rect:nth-child(2)").animate({transform: 'matrix(-0.619 -0.7854 0.7854 -0.619 288.5501 275.8257)'}, 200);
				obj["hand"].select("rect:nth-child(1)").animate({transform: 'matrix(0.482 0.8762 -0.8762 0.482 170.0171 -162.7)'}, 200);
				obj["carrot"].animate({transform: 'translate(100 0)'}, 200);	
			}, 200);					
		});
		obj["hand"].select("rect:nth-child(1)").animate({transform: 'matrix(1 1.00 -5.00 0.00 250 -162.7)'}, 200);
		obj["foot"].animate({transform: 'translate(-100 0)'}, 200);
	}
};

var hideCarrot = function()
{
	var check = block["#bunny"];
	block["#bunny"] = 0;

	if(check != block["#bunny"])
	{
		obj["hand"].select("rect:nth-child(2)").animate({transform: 'matrix(-0.619 -0.7854 1 -0.619 160 266)'}, 200, function()
		{
			setTimeout(function()
			{
				obj["hand"].select("rect:nth-child(2)").animate({transform: 'matrix(-0.619 -0.7854 0.7854 -0.619 288.5501 275.8257)'}, 200);
				obj["hand"].select("rect:nth-child(1)").animate({transform: 'matrix(0.482 0.8762 -0.8762 0.482 170.0171 -162.7)'}, 200);
				obj["carrot"].animate({transform: 'translate(0 0)'}, 200);
			}, 200);					
		});
		obj["hand"].select("rect:nth-child(1)").animate({transform: 'matrix(1 1.00 -5.00 0.00 250 -162.7)'}, 200);
		obj["foot"].animate({transform: 'translate(0 0)'}, 200);
	}
};

var showStroke = function(ide)
{
	obj[ide].animate({ "stroke-width" : "4", "fill-opacity" : "0"}, 200);
};

var hideStroke = function(ide)
{
	obj[ide].animate({ "stroke-width" : "0", "fill-opacity" : "1"}, 200);
};

/* --------------------------- eventos --------------------------- */

Snap("#ship").click(function()
{
	Snap("#ship").select(".body").animate({transform: 'rotate(45 350 350)'}, 400, function()
	{
		Snap("#ship").select(".body").animate({transform: 'rotate(45 350 350) translate(350 200)'}, 900);
	});
});

Snap("#mountain").mouseover(function(){ showStroke("mountain"); });
Snap("#mountain").mouseout(function(){ hideStroke("mountain"); });
obj["moon"].mouseover(function(){ showStroke("moon"); });
obj["moon"].mouseout(function(){ hideStroke("moon"); });

for(var k = 1; k<7; k++)
{
	( function( kounter )
	{
		Snap(".penguin:nth-child(" + kounter + ")").click(function(){
			Snap(".penguin:nth-child(" + kounter + ") .sign").animate({ "opacity" : "1"}, 200)
		});

	})( k );
}

Snap("#spaceShip").mouseover(function(){
	Snap("#spaceShip").select(".ship").animate({ "opacity" : "0.9"}, 200);
});

Snap("#spaceShip").mouseout(function(){
	Snap("#spaceShip").select(".ship").animate({ "opacity" : "0"}, 200);
});

Snap("#giraffe").click(function(){
	Snap("#giraffe").select(".static").animate({ "opacity" : "0"}, 200);
	Snap("#giraffe").select(".text").animate({ "opacity" : "1"}, 200);
});

Snap("#igloo").click(function(){
	Snap("#igloo").select(".textBox").animate({ "opacity" : "1"}, 200);
});

$(window).on('scroll', function()
{
	var obj = "#bunny";
	var check = isOnScreen('#bunny');

	if(isOnScreen(obj))
	{ setTimeout(hideFoot, 600); } 
	else
	{ setTimeout(hideCarrot, 600); }		
});

$(window).load(function(){ $("aside").slideUp(400); });
$(document).ready( function()
{

	$("body").mousewheel(function(event, delta)
	{
		this.scrollLeft -= (delta * 150);
		event.preventDefault();
	});

	$.stellar
	({
		horizontalScrolling: true,
		verticalScrolling: false,
		horizontalOffset: 0,
		verticalOffset: 0,
		parallaxBackgrounds: true,
		parallaxElements: true,
		hideDistantElements: true,
		responsive: true
	});

});