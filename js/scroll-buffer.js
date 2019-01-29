window.addEventListener('load', function ()
{
    var divs = document.querySelectorAll('section > article');
    var body = document.getElementsByTagName('BODY')[0];
    body.style.height = divs.length + '00vh';
    body.style.overflow = 'hidden';
    var section = document.getElementsByTagName('SECTION')[0];
    section.style.position = 'fixed';
    var height, animating = false, idxFrom = 0, idxTo = 0, lastTime = Date.now(),
        duration = 1, interpolator = function (x) { return x * x; };
    function draw()
    {
        animating = true;
        var now = Date.now(), deltaTime = now - lastTime;
        if (deltaTime > duration)
        {
            section.style.marginTop = -height * idxTo + "px";
            animating = false;
            lastTime = now;
            return;
        }
        section.style.marginTop = (idxFrom + (idxTo - idxFrom) * interpolator(deltaTime / duration)) * -height + "px";
        window.requestAnimationFrame(draw);
    }
    function updateHeight()
    {
        height = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
        if (!animating) window.requestAnimationFrame(draw);
    }
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', function ()
    {
        var tmp = window.pageYOffset || document.scrollTop,
            idxNow = Math.floor((tmp - (document.clientTop || 0)) / height);
        if (isNaN(idxNow)) idxNow = 0;
        if (idxTo != idxNow) {
            idxFrom = idxTo;
            idxTo = idxNow;
            duration = 500;
            if (animating)
            {
                // TODO: 적당히 from 계산
                return;
            }
            interpolator = function (x) { return x * x; }
            lastTime = Date.now();
            window.requestAnimationFrame(draw);
        }
    });
    updateHeight();
});
