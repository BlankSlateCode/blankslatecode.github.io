/**
 * Shift parallax layers based on a y offset
 * @param  {Number} top y offset
 */
function goParallax(top) {
    "use strict";

    /**
     * Generate CSS pixel coordinates
     * @param  {Array} xs List of pixel numbers
     * @return {String}   CSV pixel coords e.g. 1px,2px,3px
     */
    var coords = function(xs) {
        return xs.map(function(x) {return x+'px';}).join(',');
    };

    /**
     * @deprecated use translateY instead
     * @param  {Number} x pixels
     * @param  {Number} y pixels
     * @param  {Number} z pixels
     * @return {String}   CSS transform
     */
    var translate3d = function(x,y,z) {
        return 'transform: translate3d('+coords([x,y,z])+');';
    };

    /**
     * translateY transform
     * @param  {Number} y pixels
     * @return {String}   CSS transform
     */
    var translateY = function(y) {
        return 'transform: translateY('+coords([y])+');';
    };

    /**
     * ms prefix
     * @param  {String} css
     * @return {String}     css with ms prefix
     */
    var ms = function(css) {return 'ms-'+css;};

    /**
     * Move a layer
     * @param  {Object} layer Element
     */
    var shift = function(layer) {
        var speed = layer.getAttribute('data-speed');
        var yPos = -(top * speed / 100);
        var style = translateY(yPos);
        layer.setAttribute('style', style+ms(style));
    };

    // document.getElementsByClassName is 'array like' not an actual array
    Array.prototype.forEach.call(
        document.getElementsByClassName('parallax'),
        shift
    );
}

function init() {
    "use strict";

    if (!window.addEventListener) {
        // you are not worthy
        return;
    }

    goParallax(0);

    window.addEventListener('scroll', function(){
        goParallax(this.pageYOffset);
    });
    return;
}

document.body.onload = function() {
    init();
};
