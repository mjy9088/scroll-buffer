window.addEventListener('load', function ()
{
    var divs = document.querySelectorAll('section > article');
    var body = document.getElementsByTagName('BODY')[0];
    body.style.height = divs.length + '00vh';
    body.style.overflow = 'hidden';
    var section = document.getElementsByTagName('SECTION')[0];
    section.style.position = 'fixed';
    var height, animating = false, from = 0, to = 0, lt = Date.now(),
        dr = 1, it = function (x) { return x * x; }, prev = 0;
    function draw()
    {
        animating = true;
        var now = Date.now(), dt = now - lt;
        if (dt > dr)
        {
            section.style.marginTop = -height * to + "px";
            animating = false;
            lt = now;
            return;
        }
        section.style.marginTop = (from + (to - from) * it(dt / dr)) * -height + "px";
        window.requestAnimationFrame(draw);
    }
    function resize()
    {
        var w = window, d = document, e = d.documentElement;
        height = w.innerHeight || e.clientHeight || body.clientHeight;
        if (!animating) window.requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', function ()
    {
        var tmp = window.pageYOffset || document.scrollTop,
            now = Math.floor((tmp - (document.clientTop || 0)) / height);
        if (isNaN(now)) now = 0;
        if (prev != now) {
            from = prev;
            to = prev = now;
            dr = 500;
            if (animating)
            {
                // TODO: 적당히 from 계산
                return;
            }
            it = function (x) { return x * x; }
            lt = Date.now();
            window.requestAnimationFrame(draw);
        }
    });
    resize();
});
