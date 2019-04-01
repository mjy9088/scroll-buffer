window.addEventListener('load', function ()
{
    var divs = document.querySelectorAll('section > article');
    var body = document.getElementsByTagName('BODY')[0];
    body.style.height = divs.length + '00vh';
    body.style.overflow = 'hidden';
    var section = document.getElementsByTagName('SECTION')[0];
    section.style.position = 'fixed';
    var height, animating = false, idxFrom = 0, idxTo = 0, lastTime = Date.now(),
        duration = 1, interpolator = function (x) { return 0.5 + -0.5 * Math.cos(Math.PI * x); };
    function scry()
    {
        if(!animating)
        {
            section.style.marginTop = height * idxTo * -0.8 + (window.pageYOffset || document.scrollTop || 0) * -0.2 + "px";
        }
    }
    function draw()
    {
        animating = true;
        var now = Date.now(), deltaTime = now - lastTime;
        if (deltaTime > duration)
        {
            section.style.marginTop = height * idxTo * -0.8 + (window.pageYOffset || document.scrollTop || 0) * -0.2 + "px";
            animating = false;
            lastTime = now;
        }
        else
        {
            section.style.marginTop = (idxFrom + (idxTo - idxFrom) * interpolator(deltaTime / duration)) * height * -0.8 + (window.pageYOffset || document.scrollTop || 0) * -0.2 + "px";
            window.requestAnimationFrame(draw);
        }
    }
    function updateHeight()
    {
        height = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
        if (!animating) window.requestAnimationFrame(draw);
    }
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', function ()
    {
        var tmp = window.pageYOffset || document.scrollTop || 0,
            idxNow = Math.floor((tmp - (document.clientTop || 0)) / height + 0.5);
        if (isNaN(idxNow)) idxNow = 0;
        if (idxTo != idxNow)
        {
            if (animating)
            {
                idxFrom = idxFrom + Math.min(Math.max(interpolator((Date.now() - lastTime) / duration), 0), 1) * (idxTo - idxFrom);
                lastTime = Date.now();
                idxTo = idxNow;
                duration = 500 * Math.sqrt(Math.abs(idxTo - idxFrom));
            }
            else
            {
                duration = 500 * Math.sqrt(Math.abs((idxFrom = idxTo) - (idxTo = idxNow)));
                interpolator = function (x) { return 0.5 + -0.5 * Math.cos(Math.PI * x); }
                lastTime = Date.now();
                window.requestAnimationFrame(draw);
            }
        }
        window.requestAnimationFrame(scry);
    });
    updateHeight();
});
