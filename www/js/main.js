//LIBS
(function(a) {
	a.snowfall = function(c, b) {
		function o(e, j, p, q, r) {
			this.id = r;
			this.x = e;
			this.y = j;
			this.size = p;
			this.speed = q;
			this.step = 0;
			this.stepSize = d(1, 10) / 100;
			e = a(document.createElement("div")).attr({
				"class": "snowfall-flakes",
				id: "flake-" + this.id
			}).css({
				width: this.size,
				height: this.size,
				background: b.flakeColor,
				position: "absolute",
				top: this.y,
				left: this.x,
				fontSize: 0,
				zIndex: b.flakeIndex
			});
			if(a(c).get(0).tagName === a(document).get(0).tagName) {
				a("body").append(e);
				c = a("body")
			} else a(c).append(e);
			this.element = document.getElementById("flake-" + this.id);
			this.update = function() {
				this.y += this.speed;
				this.y > k - (this.size + 6) && this.reset();
				this.element.style.top = this.y + "px";
				this.element.style.left = this.x + "px";
				this.step += this.stepSize;
				this.x += Math.cos(this.step);
				if(this.x > i - f || this.x < f) this.reset()
			};
			this.reset = function() {
				this.y = 0;
				this.x = d(f, i - f);
				this.stepSize = d(1, 10) / 100;
				this.size = d(b.minSize * 100, b.maxSize * 100) / 100;
				this.speed = d(b.minSpeed, b.maxSpeed)
			}
		}
		function l() {
			for(g = 0; g < h.length; g += 1) h[g].update();
			m = setTimeout(function() {
				l()
			}, 30)
		}
		b = a.extend({
			flakeCount: 35,
			flakeColor: "#fff",
			flakeIndex: 999999,
			minSize: 1,
			maxSize: 3,
			minSpeed: 2,
			maxSpeed: 3,
			round: false,
			shadow: false
		}, b);
		var d = function(e, j) {
				return Math.round(e + Math.random() * (j - e))
			};
		a(c).data("snowfall", this);
		var h = [],
			n = 0,
			g = 0,
			k = a(c).height(),
			i = a(c).width(),
			f = 0,
			m = 0;
		if(a(c).get(0).tagName === a(document).get(0).tagName) f = 25;
		a(window).bind("resize", function() {
			k = a(c).height();
			i = a(c).width()
		});
		for(g = 0; g < b.flakeCount; g += 1) {
			n = h.length;
			h.push(new o(d(f, i - f), d(0, k), d(b.minSize * 100, b.maxSize * 100) / 100, d(b.minSpeed, b.maxSpeed), n))
		}
		b.round && a(".snowfall-flakes").css({
			"-moz-border-radius": b.maxSize,
			"-webkit-border-radius": b.maxSize,
			"border-radius": b.maxSize
		});
		b.shadow && a(".snowfall-flakes").css({
			"-moz-box-shadow": "1px 1px 1px #555",
			"-webkit-box-shadow": "1px 1px 1px #555",
			"box-shadow": "1px 1px 1px #555"
		});
		l();
		this.clear = function() {
			a(c).children(".snowfall-flakes").remove();
			h = [];
			clearTimeout(m)
		}
	};
	a.fn.snowfall = function(c) {
		if(typeof c == "object" || c == undefined) return this.each(function() {
			new a.snowfall(this, c)
		});
		else if(typeof c == "string") return this.each(function() {
			var b = a(this).data("snowfall");
			b && b.clear()
		})
	}
})(jQuery);
(function(jQuery) {
	jQuery.fn.konami = function(opts) {
		var enteredKeys = [];

		var textualKeyMap = {
			'left': 37,
			'up': 38,
			'right': 39,
			'down': 40,
			'a': 65,
			'b': 66
		};

		var options = jQuery.extend({
			code: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'],
			callback: function() {}
		}, opts);

		var codes = options.code;

		var solutionCodes = [];
		$.each(codes, function(i, item) {
			if(codes[i] !== undefined && textualKeyMap[codes[i]] !== undefined) {
				solutionCodes.push(textualKeyMap[codes[i]]);
			} else if(codes[i] !== undefined && typeof(codes[i]) == 'number') {
				// This is in case one wants to pass direct keycodes instead of textual keycodes.
				solutionCodes.push(codes[i]);
			}
		});

		$(document).keyup(function(e) {
			var keyCode = e.keyCode ? e.keyCode : e.charCode;
			enteredKeys.push(keyCode);

			if(enteredKeys.toString().indexOf(solutionCodes) >= 0) {
				enteredKeys = [];
				options.callback($(this));
			}
		});
	}
})(jQuery);
jQuery(document).ready(function($) {
	initChristmasGift();
});

function christmasIsBeautiful() {

	var len = $('img').length,
	imgs = 22,
	fesse = 1,
	j = 1;

	$('img').each(function(index) {
		if(index == fesse*imgs){
			j = 1;
			fesse++;	
		}
	    $(this).attr("src", "img/lol/"+j+".gif");
	    j++;
	});


	$(document).snowfall({
		flakeCount: 100,
		// number
		flakeColor: '#ffffff',
		// string
		flakeIndex: 999999,
		// number
		minSize: 1,
		// number
		maxSize: 8,
		// number
		minSpeed: 2,
		// number
		maxSpeed: 5,
		// number
		round: true,
		// bool
		shadow: true // bool
	});


	$("body").css("background" , "url('img/cwallpaper.jpg')")
	.append('<audio autoplay preload="auto" autobuffer><source src="img/el/elvis.mp3" /><source src="img/el/elvis.ogg" /></audio>');
};

function initChristmasGift() {
	$(document).konami({
		callback: function() {
			christmasIsBeautiful();
		}
	});
};