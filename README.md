# Leaflet.Base64Legend

A simple Leaflet plugin for showing legends with base64 elements.

Under active development!


See the [example](//consbio.github.io/Leaflet.Base64Legend).

*Tested with Leaflet 1.0.3*



## Install

From NPM:

```
npm install leaflet-base64-legend
```


## Usage

Include the CSS:

```
<link rel="stylesheet" href="L.Control.Base64Legend.css" />
```


Include the JavaScript:

```
<script src="L.Control.Base64Legend-min.js"></script>
```


Options:
```
{
    position: 'topright',
    legends: [],   // array of legend entries - see README for format
    collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
    detectStretched: false  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
}
```



Inputs are an array of legends.  Each legend has:
* name
* array of elements
* type (optional).  Options: 'stretched', null or absent


Each element has:
* imageData: base64 encoded image data URI
* label (optional)


Simple example:
```
var legends = [{
    "name": "A simple element",
    "elements": [{"imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAO5JREFUOI3NlD0OgzAMhd+AIliYsnhHbD4Np+QwnVgjBq4QIeypHarQ0ECBlqFvc5R8evFf1rbtHRcqi4O+7zGO4+bluq4hIhiGIYmZ+QXsug4AYK39CBQR5HmexOE9My8dEhGIaPdbwU1Q0zQQkZdDay2maQIAlGUJY8wuFAC891DVhfMsOAsyxqCqqkNA5xxUdc7p/OU4B78q27/yBTDO4SXAI5U9Bfz/HP6quAaXAOMaXALcnGXgOU7OuUMg731ylgBVFap6yuFqDuMVRkRzvCVmXuzPxT6M++/MxBRFkezP2eF7Ux9p8pX9eXsAPNt0X7NgcsoAAAAASUVORK5CYII="}]
}];

var legend = L.control.base64legend({
    position: 'topright',
    legends: legends,
    collapseSimple: true
});

map.addControl(legend);
```


Categorical example:
```
var legends = [{
    "name": "A longer legend",
    "elements": [{
        "imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnJyGigxaMqUKQ1wA3Nychq0VAXrRYS5yDLs/uNPDDk5OQxTpkxpgLtQRJiLQVNNlGwXPn76mQHuQmqCUQNHDRw1cJgZeP/xJ7INefP2G6qBU6ZMacjJyYEXQeQAlAIWWYBSAABjPiDfvMzQCwAAAABJRU5ErkJggg==",
        "label": "Alabama"
    }, {
        "imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHZJREFUOI3t1LEJgDAUBNArLBTcIOAQgiC40u3gH+JWS+wFRxBbK4NpEyvJVZ9fPK66Bh+neQ6SVgJJsgiStGU+V+euLMyHHiQhyWJD5y5M457Zb4DfWsSGX6aCFazgz0AfegBDFnIcXQpKMpJxgnKSDOz7UZobwRof/EtWWjIAAAAASUVORK5CYII=",
        "label": "Alaska"
    },
    ...
}];
```



Stretched example.  Stretched legends use a compact display:
```
var legends = [{
    "name": "stretched legend",
    "type": "stretched",
    "elements": [
        {"label": "High : 4", "imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAF1JREFUOI2t0sENgDAMQ9E4pHULF5iA/cdjgKos8T3Ak5y4vtc7wJQekoso3TR40eDJiqVhFgx3FtRoMDgPFgwXC2rClaPBX5bhGyYNrgGDKnqHThZc9A6zw+CGwR+9jAZatYouQAAAAABJRU5ErkJggg=="},
        {"label": "", "imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAFdJREFUOI2t0oENgDAIRFGiQDd0Y3dqCngu8TvAC/dT3+8jA59bOumZ27pZUAmD+GQFPpm+kG74rWRBBT1ZFwvWwA1rggV74IY9dMOGGx5+MgwWD7Lf5gdcuB2P8+YnfgAAAABJRU5ErkJggg=="},
        {"label": "Low : 0", "imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAFpJREFUOI2t0oENgCAMRFHU7j+CqzgIYxgjkIIu8TrAz/Xux1XPr8CLnLvklRjzsMBMDOw64dTAvsICh+5waG34KDwhF5u/3JYeRWvTEid8dYf32izw4StjsX/siyj7Hs38/gAAAABJRU5ErkJggg=="}
    ]
}];
```


You can also have the plugin auto-detect stretched legends.  Typically,
these are identified by legends 3 elements long, where the label for the
middle element is blank.
```
var legend = L.control.base64legend({
    ... 
    detectStretched: true
});
```




## Contributors:
* [Brendan Ward](https://github.com/brendan-ward)
* [Nik Molnar](https://github.com/nikmolnar)