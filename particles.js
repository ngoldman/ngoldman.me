/* modified from source: http://bl.ocks.org/mbostock/280d83080497c8c13152 */
/* https://github.com/d3/d3-timer Copyright 2015 Mike Bostock */
"undefined"==typeof requestAnimationFrame&&(requestAnimationFrame="undefined"!=typeof window&&(window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame)||function(e){return setTimeout(e,17)}),function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.timer={})}(this,function(e){"use strict";function n(){r=m=0,c=1/0,t(u())}function t(e){if(!r){var t=e-Date.now();t>24?c>e&&(m&&clearTimeout(m),m=setTimeout(n,t),c=e):(m&&(m=clearTimeout(m),c=1/0),r=requestAnimationFrame(n))}}function i(e,n,i){i=null==i?Date.now():+i,null!=n&&(i+=+n);var o={callback:e,time:i,flush:!1,next:null};a?a.next=o:f=o,a=o,t(i)}function o(e,n,t){t=null==t?Date.now():+t,null!=n&&(t+=+n),l.callback=e,l.time=t}function u(e){e=null==e?Date.now():+e;var n=l;for(l=f;l;)e>=l.time&&(l.flush=l.callback(e-l.time,e)),l=l.next;l=n,e=1/0;for(var t,i=f;i;)i.flush?i=t?t.next=i.next:f=i.next:(i.time<e&&(e=i.time),i=(t=i).next);return a=t,e}var a,m,r,f,l,c=1/0;e.timer=i,e.timerReplace=o,e.timerFlush=u});

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = context.canvas.width = window.innerWidth,
    height = context.canvas.height,
    radius = 0,
    eye = 5,
    alf = .15,
    strokeColor = 'white'
    minDistance = 0,
    maxDistance = 31,
    minDistance2 = minDistance * minDistance,
    maxDistance2 = maxDistance * maxDistance,
    drawing = false;

var tau = 2 * Math.PI,
    n = 222,
    particles = new Array(n);

for (var i = 0; i < n; ++i) {
  particles[i] = {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0
  };
}

canvas.addEventListener("mousedown", function (e) {
  drawing = true
  addParticle(e)
}, false);
canvas.addEventListener("mousemove", function (e) {
  if (drawing) addParticle(e)
}, false);
canvas.addEventListener("mouseup", function () {
  drawing = false
}, false);

function addParticle (event) {
  var x = event.x;
  var y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  particles.push({
    x: x,
    y: y,
    vx: 0,
    vy: 0
  })

  // if (eye < 7) eye += .01
  // alf = alf >= .3 ? .3 : alf += .001

  if (!(particles.length < 444)) {
    strokeColor = 'gold' // '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  } else {
    strokeColor = 'white'
  }
}

timer.timer(function(elapsed) {
  width = context.canvas.width = window.innerWidth;
  context.save();
  context.clearRect(0, 0, width, height);

  for (var i = 0; i < particles.length; ++i) {
    var p = particles[i];
    p.x += p.vx; if (p.x < -maxDistance) p.x += width + maxDistance * 2; else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
    p.y += p.vy; if (p.y < -maxDistance) p.y += height + maxDistance * 2; else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
    p.vx += 0.05 * (Math.random() - .5) - 0.01 * p.vx;
    p.vy += 0.05 * (Math.random() - .5) - 0.01 * p.vy;
    context.globalAlpha = alf
    context.beginPath();
    context.fillStyle = strokeColor;
    context.arc(p.x, p.y, radius, 0, tau);
    context.fill();
  }

  for (var i = 0; i < particles.length; ++i) {
    for (var j = i + 1; j < particles.length; ++j) {
      var pi = particles[i],
          pj = particles[j],
          dx = pi.x - pj.x,
          dy = pi.y - pj.y,
          d2 = dx * dx + dy * dy;
      if (d2 < maxDistance2) {
        context.globalAlpha = (d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : .1) * ( alf * 3 );
        context.beginPath();
        context.strokeStyle = strokeColor;
        context.moveTo(pi.x, pi.y);
        context.lineTo(pj.x, pj.y);
        context.stroke();
      }
    }
  }

  // context.globalAlpha = 1;
  // context.fillStyle = 'black';

  // context.beginPath();
  // context.arc(107, 85, eye, 0, tau);
  // context.fill();

  // context.beginPath();
  // context.arc(142, 85, eye, 0, tau);
  // context.fill();

  context.restore();
});

setInterval(function () {
  particles.shift()
}, 200)