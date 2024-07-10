(function ($) {
    "use strict";



///////////////////////////////////////////////////////
// Preloader

function template_preloader() {
  var preloader = $('#preloader');

  $(document).ready(function() {
    setTimeout(function() {
      preloader.addClass('preloaded');
    }, 1000);
    setTimeout(function() {
      preloader.remove();
    }, 2000);
  });
}

template_preloader();

// Preloader End


///////////////////////////////////////////////////////

// hamburger menu
jQuery(document).ready(function () {
	jQuery('header .mainmenu').meanmenu({
    meanScreenWidth: "992",
  });
});


document.querySelectorAll('.menu-anim > li > a').forEach(button => button.innerHTML = '<div class="menu-text"><span>' + button.textContent.split('').join('</span><span>') + '</span></div>');

setTimeout(() => {
  var menu_text = document.querySelectorAll(".menu-text span")
  menu_text.forEach((item) => {
    var font_sizes = window.getComputedStyle(item, null);
    let font_size = font_sizes.getPropertyValue("font-size");
    let size_in_number = parseInt(font_size.replace("px", ""));
    let new_size = parseInt(size_in_number / 3)
    new_size = new_size + "px"
    if (item.innerHTML == " ") {
      item.style.width = new_size
    }
  })
}, 1000)
// hamburger menu End


// Search Start
document.addEventListener("click", (event) => {
  const searchToggle = event.target.closest(".search-icon");
  if (searchToggle) {
    searchToggle.classList.toggle("active");
  }
});
// Search End


///////////////////////////////////////////////////////
// Sticky Menu
$(window).on( 'scroll', function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
        $(".menu-area").addClass("sticky");
    } else {
        $(".menu-area").removeClass("sticky");
    }
});
// Sticky Menu End


///////////////////////////////////////////////////////
// Magnific Popup gallery
$('.popup-gallery').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    gallery: {
        enabled: true
    },
    type: 'image'
    // other options
});

$('.popup-youtube').magnificPopup({
  type: 'iframe'
});

// Magnific Popup gallery End


///////////////////////////////////////////////////////
// Cta Slider

var d0ne_project_slider = new Swiper(".done-project-slider", {
  loop: true,
  freemode: true,
  slidesPerView: 3.5,
  spaceBetween: 24,
  centeredSlides: true,
  allowTouchMove: true,
  speed:5000,
  autoplay: {
    delay: 1000,
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    480: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3.5
    },
    1400: {
      slidesPerView:3.5
    }
  },
});

// Cta Slider End



/*Testimonial Slide*/

var testimonialSlider = new Swiper('.testimonial-slider', {
  slidesPerView: 3,
  spaceBetween: 24,
  fadeEffect: {
    crossFade: true
  },
  loop:true,
  speed: 1500,
  pagination: {
    el: ".testimonial-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    },
  },
});

/*Testimonial Slide End*/


/*Testimonial Two Slide*/

var testimonialSlider_two = new Swiper(".testimonial-slider-two", {
  loop: true,
  freemode: true,
  slidesPerView: 3.8,
  spaceBetween: 24,
  centeredSlides: true,
  allowTouchMove: true,
  speed:500,
  navigation: {
    nextEl: ".testimonial-button-next",
    prevEl: ".testimonial-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2
    },
    480: {
      slidesPerView: 1.5
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3.4
    },
    1400: {
      slidesPerView:3.8
    }
  },
});

/*Testimonial Two Slide End*/




///////////////////////////////////////////////////////
// Contact Form Start

// Get the form.
var form = $('#contact-form');

// Get the messages div.
var formMessages = $('.form-message');

// Set up an event listener for the contact form.
$(form).on( 'submit', function(e) {
  // Stop the browser from submitting the form.
  e.preventDefault();

  // Serialize the form data.
  var formData = $(form).serialize();

  // Submit the form using AJAX.
  $.ajax({
    type: 'POST',
    url: $(form).attr('action'),
    data: formData
  })
  .done(function(response) {
    // Make sure that the formMessages div has the 'success' class.
    $(formMessages).removeClass('error');
    $(formMessages).addClass('success');

    // Set the message text.
    $(formMessages).text(response);

    // Clear the form.
    $('#contact-form input,#contact-form textarea').val('');
  })
  .fail(function(data) {
    // Make sure that the formMessages div has the 'error' class.
    $(formMessages).removeClass('success');
    $(formMessages).addClass('error');

    // Set the message text.
    if (data.responseText !== '') {
      $(formMessages).text(data.responseText);
    } else {
      $(formMessages).text('Oops! An error occurred. Message could not be sent.');
    }
  });
});
// Contact Form End

///////////////////////////////////////////////////////
// Bottom to top start
$(document).ready(function () {
  $(window).on('scroll', (function () {
    if ($(this).scrollTop() > 100) {
      $('#scroll-top').fadeIn();
    } else {
      $('#scroll-top').fadeOut();
    }
  }));
  $('#scroll-top').on( 'click', function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});
// Bottom to top End


///////////////////////////////////////////////////////
// Odometer Counter
$(".counter-item").each(function () {
  $(this).isInViewport(function (status) {
  if (status === "entered") {
      for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
      var el = document.querySelectorAll('.odometer')[i];
      el.innerHTML = el.getAttribute("data-odometer-final");
    }
  }
  });
});


///////////////////////////////////////////////////////


// GSAP Title Animation




// Style 4 Zoom out

let splitTitleLines = gsap.utils.toArray(".title-anim");

splitTitleLines.forEach(splitTextLine => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: splitTextLine,
      start: 'top 90%',
      end: 'bottom 60%',
      scrub: false,
      markers: false,
      toggleActions: 'play none none none'
    }
  });

  const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
  gsap.set(splitTextLine, { perspective: 400 });
  itemSplitted.split({ type: "lines" })
  tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
});

///////////////////////////////////////////////////////
// GSAP Text Animation
var mySplitText = new SplitText(".quote", {type:"chars, words"}),
    tl = new TimelineLite(),
    numChars = mySplitText.chars.length;

for(var i = 0; i < numChars; i++){
  tl.from(mySplitText.chars[i], .5, {opacity:0}, Math.random() * 2);
}

//Text Animation
let splitTextLines = gsap.utils.toArray(".text-anim");

splitTextLines.forEach(splitTextLine => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: splitTextLine,
      start: 'top 90%',
      duration: 2,
      end: 'bottom 60%',
      scrub: false,
      markers: false,
      toggleActions: 'play none none none'
    }
  });

  const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
  gsap.set(splitTextLine, { perspective: 400 });
  itemSplitted.split({ type: "lines" })
  tl.from(itemSplitted.lines, { duration: 1, delay: 0.5, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
});

///////////////////////////////////////////////////////
// Image reveal on hover

let menuItem = document.querySelectorAll(".hover-item-image-wrap");
let menuImage = document.querySelectorAll(".hover-item-image");

// adding eventListeners to all the menuItems.
for (let i = 0; i < menuItem.length; i++) { // Use menuItem.length to determine the loop's length
  //   image reveal animation
  const animation = gsap.to(menuImage[i], {
    opacity: 1,
    duration: 0.2,
    scale: 1,
    ease: "ease-in-out"
  });

  menuItem[i].addEventListener("mouseenter", () => animation.play());
  menuItem[i].addEventListener("mouseleave", () => animation.reverse());

  //   initialization
  animation.reverse();
}

//   to move image along with cursor
function moveText(e) {
  gsap.to([...menuImage], {
    css: {
      left: e.pageX + 50,
      top: e.pageY,
    },
    duration: 0.3,
  });
}

menuItem.forEach((el) => {
  el.addEventListener("mousemove", moveText);
});

// Image reveal on hover End


///////////////////////////////////////////////////////
// GSAP Register

window.gsap.registerPlugin(
  window.ScrollTrigger,
  window.ScrollSmoother,
  window.TweenMax
);


// Hero Animation

let mark = document.querySelector(" .title-left")
let eting = document.querySelector(".title-right")
let hero__text_animation = document.querySelector(".hero__text-animation")
let HomeDigital = gsap.timeline()


let split_creatives = new SplitText(mark, { type: "chars" })
let split_solutions = new SplitText(eting, { type: "chars" })
let split_text_animation = new SplitText(hero__text_animation, { type: "chars words" })

HomeDigital.from(split_creatives.chars, { duration: 1, x: 100, autoAlpha: 0, stagger: 0.1 });
HomeDigital.from(split_solutions.chars, { duration: 1, x: 100, autoAlpha: 0, stagger: 0.1 }, "-=1");
HomeDigital.from(split_text_animation.words, { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 }, "-=1");

// Hero Animation End


// Image from right

const imageRevel = gsap.timeline({ defaults: { ease: "power__2" } });
  
gsap.to(".image-scale-anim", {
  scrollTrigger: ".image-scale-anim", 
  scaleX: 1,
  x: 0,
  opacity: 1,
  delay : .6,
  ease: "power__2",
  duration: 1.5,
});

// Image from right End

// Image from left

const imageRevel_left = gsap.timeline({ defaults: { ease: "power__2" } });
  
gsap.to(".image-scale-anim-left", {
  scrollTrigger: ".image-scale-anim-left", 
  scaleX: 1,
  x: 0,
  opacity: 1,
  delay : .6,
  ease: "power__2",
  duration: 1.5,
});

// Image from left End


/////////////////////////////////////////////////////
// Magnate Animation
var magnets = document.querySelectorAll('.site-magnetic')
var strength = 50

magnets.forEach( (magnet) => {
  magnet.addEventListener('mousemove', moveMagnet );
  magnet.addEventListener('mouseout', function(event) {
    TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
  } );
});

function moveMagnet(event) {
  var magnetButton = event.currentTarget
  var bounding = magnetButton.getBoundingClientRect()

  //console.log(magnetButton, bounding)

  TweenMax.to( magnetButton, 1, {
    x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
    y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
    ease: Power4.easeOut
  })
}

// Magnate Animation End


/////////////////////////////////////////////////////

let zoom_items = gsap.utils.toArray(".zoom_item_single");

zoom_items.forEach((zoom_item, i) => {
  gsap.set(zoom_item, { opacity: 0, y: 30, scale: 0.5 });

  let zoom_timeline = gsap.timeline({
    scrollTrigger: {
      trigger: zoom_item,
      start: "top center+=200",
      markers: false
    }
  })

  zoom_timeline.to(zoom_item, {
    y: 0,
    opacity: 1,
    scale: 1,
    ease: "power2.out",
    duration: 1,
    stagger: {
      each: 0.2,
      delay: 0.5 // add a 0.5 second delay between each item animation
    }
  })
});

// Zoom In Animation End


/////////////////////////////////////////////////////
//  Animation Fade Left

const fadeElements = document.querySelectorAll(".fade_left");

fadeElements.forEach((element, index) => {
  gsap.set(element, { x: -50, opacity: 0 });
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top center+=300"
    },
    x: 0,
    opacity: 1,
    ease: "power2.out",
    duration: 1,
    stagger: {
      each: 0.2,
      from: index * 0.2 // stagger delay based on element index
    }
  });
});


//  Animation image scale
let imageTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".img-anim-scale",
    start: "top bottom",
    markers: false,
    scrub: 1,
    end: "top 100px",
  }
})

// Image pin 
imageTl.to(".img-anim-scale img", {
  scale: 1,
  duration: 1,
})
//  Animation image scale End



// Custom Cursor

const cursor = document.querySelector('.cursor');
const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
};
window.addEventListener('mousemove', editCursor);

$("a, .cursor-pointer").hover(
    function () {
        $(".cursor").addClass("cursor-active");
    }, function () {
        $(".cursor").removeClass("cursor-active");
    }
);

// Custom Cursor End



}(jQuery)); 