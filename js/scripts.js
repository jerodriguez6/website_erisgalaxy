/* Description: Custom JS file */

$(window).on('load', function () {
	$('.preloader').hide();
});

(function($) {
    "use strict";
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");

		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });


	$(window).scroll(function () {
		onScrollHandle();
	});

	function onScrollHandle() {

		var currentScrollPos = $(document).scrollTop();

		//Iterate through all node
		$('#navbarsExampleDefault > ul > li > a').each(function () {
			var curLink = $(this);
			var refElem = $(curLink.attr('href'));

			//Compare the value of current position and the every section position in each scroll
			if (refElem.offset().top <= currentScrollPos + 92 && refElem.offset().top + refElem.height() > currentScrollPos + 92) {
				//Remove class active in all nav
				$('#navbarsExampleDefault > ul > li > a').removeClass("active");
				//Add class active
				curLink.addClass("active");
			}
			else {
				curLink.removeClass("active");
			}
		});
	}

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 91
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
		},
		slidesPerView: 1,
		spaceBetween: 70,
        breakpoints: {
            // when window is <= 767px
            767: {
                slidesPerView: 1
            },
            // when window is <= 991px
            991: {
                slidesPerView: 1,
                spaceBetween: 40
            }
        }
    });
	/* Card Slider - Swiper */
	var teamSlider = new Swiper('.team-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        // loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
		},
		slidesPerGroup: 4,
		slidesPerView: 4,
		spaceBetween: 70,
        breakpoints: {
            // when window is <= 767px
            767: {
            	slidesPerGroup: 1,
                slidesPerView: 1
            },
            // when window is <= 991px
            991: {
            	slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 10
            },
			1199: {
            	slidesPerGroup: 3,
				slidesPerView: 3,
				spaceBetween: 40
			}
        }
    });
	var partnerSlider = new Swiper('.partner-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
		},
		slidesPerView: 1,
		spaceBetween: 70,
		breakpoints: {
			// when window is <= 767px
			767: {
				slidesPerView: 1
			},
			// when window is <= 991px
			991: {
				slidesPerView: 1,
				spaceBetween: 40
			}
		}
    });

	function main(el, gl) {
		const canvas = document.createElement('canvas');
		const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
		const fov = 50;
		const aspect = 1;  // the canvas default
		const near = 1;
		const far = 100;
		let mixer;
		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.position.set(50, 0, 50);
		const controls = new THREE.OrbitControls(camera, canvas);
		// to disable zoom
		controls.enableZoom = false;
		controls.target.set(0, 10, 25);
		controls.minPolarAngle = controls.maxPolarAngle = Math.PI * 0.4;
		controls.update();
		const scene = new THREE.Scene();

		const clock = new THREE.Clock();
		// scene.background = new THREE.Color('black');
		{
			const skyColor = 0xFFFFFF;
			const groundColor = 0xeeeeee;
			const intensity = 1;
			const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
			scene.add(light);
		}

		{
			const color = 0xFFFFFF;
			const intensity = 1;
			const light = new THREE.DirectionalLight(color, intensity);
			light.position.set(0, 100, 100);
			scene.add(light);
			scene.add(light.target);
		}
		//
		// {
		// 	const color = 0xFFFFFF;
		// 	const intensity = 1;
		// 	const light = new THREE.DirectionalLight(color, intensity);
		// 	light.position.set(100, 100, 100);
		// 	scene.add(light);
		// 	scene.add(light.target);
		// }
		//
		// {
		// 	const color = 0xFFFFFF;
		// 	const intensity = 1;
		// 	const light = new THREE.DirectionalLight(color, intensity);
		// 	light.position.set(200, 100, 100);
		// 	scene.add(light);
		// 	scene.add(light.target);
		// }

		{
			const gltfLoader = new THREE.GLTFLoader();
			gltfLoader.load(gl, (gltf) => {
				const root = gltf.scene;
				root.scale.set(6, 6, 6);
				scene.add(root);
				mixer = new THREE.AnimationMixer(gltf.scene);

				gltf.animations.forEach((clip) => {

					mixer.clipAction(clip).play();

				});
				const box = new THREE.Box3().setFromObject(root);
				const boxSize = box.getSize(new THREE.Vector3()).length();
				// const boxCenter = box.getCenter(new THREE.Vector3());
				controls.maxDistance = boxSize * 100;
				// controls.target.copy(boxCenter);
				controls.target.copy({
					x: 0,
					y: 22,
					z: 0
				});
				controls.update();
			});
		}

		function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement;
			const width = 300;
			const height = 450;
			const needResize = canvas.width !== width || canvas.height !== height;
			if (needResize) {
				renderer.setSize(width, height, false);
			}
			return needResize;
		}

		function render() {
			if (resizeRendererToDisplaySize(renderer)) {
				const canvas = renderer.domElement;
				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();
				camera.getEffectiveFOV();
			}

			renderer.render(scene, camera);

			requestAnimationFrame(render);
		}

		function animate() {

			requestAnimationFrame(animate);

			var delta = clock.getDelta();

			if (mixer) mixer.update(delta);

			renderer.render(scene, camera);

		}

		renderer.gammaFactor = 2.2;
		renderer.gammaOutput = true;

		requestAnimationFrame(render);

		animate();

		return canvas;
	}

	const arrayFiles = [
		{ el: '.black', gltf: './heros/Bio_v2.glb', },
		{ el: '.violet', gltf: './heros/Ele_v2.glb', },
		{ el: '.red', gltf: './heros/Tech_v2.glb', },
		{ el: '.yellow', gltf: './heros/Bio_v4.glb', },
		{ el: '.green', gltf: './heros/Tech_v2.glb', },
	];

	var championsSlider = new Swiper('.champions-slider', {
		allowTouchMove: false,
		autoplay: {
			delay: 6000,
			disableOnInteraction: false
		},
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
	});

	arrayFiles.forEach((e) => {
		$(e.el).each(function(i, obj) {
			$(obj).html(main(e.el, e.gltf));
		});
	});
	// bg-tokenomic.png


    /* Text Slider - Swiper */
	var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    });


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });


    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 0,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
    $(".copy").click(function(){
    	$('.btn-address').css('color', '#0BCF37')
	    setTimeout(() => {
		    $('.btn-address').css('color', '#ffffff')
	    },100)
	    /* Copy the text inside the text field */
	    navigator.clipboard.writeText('0x0b20e6b9899b96a3a7aa10224499ef5a1dc165ea');

    });


    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

	new WOW().init({mobile: false});

	// Chart js

	var canvas_border_color = '#0A0A0A';
	var pie_color = '#06261a';
	var pie_hover_color = '#89DB0E';
	var data_set = {
		labels: ['Ecosystem & Reward in Games', 'Community', 'Marketing',
			'Seed', 'Liquidity', 'Private', 'Team & Founder', 'Public Sales'],
		titles: '',
		datasets: [{
			label: "949",
			lineTension: 0,
			backgroundColor: ['#15B439', pie_color, pie_color, pie_color, pie_color, pie_color, pie_color, pie_color, pie_color],
			hoverBackgroundColor: [pie_hover_color, pie_hover_color, pie_hover_color, pie_hover_color, pie_hover_color, pie_hover_color, pie_hover_color, pie_hover_color, pie_hover_color],
			borderColor: canvas_border_color,
			borderWidth: 2,
			hoverBorderColor: canvas_border_color,
			data: [40, 6, 10, 4, 6, 11, 20, 3],
			animationDuration: 400,
		}]
	};
	var options_set = {
		legend: {display: false},
		plugins: {
			legend: {display: false},
			cutoutPercentage: 0,
			maintainAspectRatio: false,
			tooltip: {
				callbacks: {
					title: function (tooltipItem) {
						return [tooltipItem[0]['label']];
					}, label: function (tooltipItem, data) {
						return tooltipItem['raw'] + ' %';
					}
				},
				backgroundColor: 'transparent',
				titleFontSize: 11,
				bodyFontColor: '#fff',
				bodyFontSize: 14,
				bodyFontStyle: 'bold',
				bodySpacing: 0,
				yPadding: 0,
				xPadding: 0,
				yAlign: 'center',
				xAlign: 'center',
				footerMarginTop: 5,
				displayColors: false
			},
		},
		onHover: function (e, i) {
			if (i.length) {
				var _cur_idx = i[0].index + 1;
				$('#tq-chart-legends li').removeClass('active');
				$('#tq-chart-legends li:nth-child(' + _cur_idx + ')').addClass('active');
			} else {
				$('#tq-chart-legends li').removeClass('active');
			}
		}
	};
	var doughnut_chart = new Chart(document.getElementById('tokenChart'), {
		type: 'doughnut',
		data: data_set,
		options: options_set
	});
	$(window).on('resize', function () {
		doughnut_chart.resize();
	});

	$('.carousel').carousel({
		pause: true,
		interval: 100000
	})

	// document.addEventListener('scroll', function(e) {
	// 	let position = document.documentElement.scrollTop
	// 	if(position > 7000) {
	// 		$(".social-fixed").css("opacity", "0");
	// 	}
	// 	if(position < 7000) {
	// 		$(".social-fixed").css("opacity", "1");
	// 	}
	// });

})(jQuery);
