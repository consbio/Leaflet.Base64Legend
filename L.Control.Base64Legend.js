L.Control.Base64Legend = L.Control.extend({
    _map: null,
    includes: L.Mixin.Events,
    options: {
        position: 'bottomright',
        legends: [],   // array of legend entries
        collapseSimple: false  // if true, legend entries that are from a simple renderer will use compact presentation
    },
    onAdd: function (map) {
        console.log('onAdd')
        this._map = map;
        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar leaflet-legend');
        this._container = container;

        // Disable events on container
        L.DomEvent.disableClickPropagation(container);
        if (!L.Browser.touch) {
            L.DomEvent.disableScrollPropagation(container);
        }

        this.render();


        // TODO: if mouse enter / leave events are needed, uncomment this
        // L.DomEvent.on(container, 'mouseenter', function() {
        //     // TODO
        // }, this);
        //
        // L.DomEvent.on(container, 'mouseleave', function() {
        //     // TODO
        // }, this);


        // TODO: if this plugin provides events, adapt the following
        // this.fire('event_name', {event data obj});


        return this._container;
    },

    // render this.options.entries
    render: function () {
        L.DomUtil.empty(this._container);
        var legends = this.options.legends;
        
        console.log('legend entries', legends)
        
        if (!legends) return;

        legends.forEach(function(legend) {
            var className = 'legend-block';

            // if (legend.className) {
            //     className += ' ' + legend.className
            // }

            var block = L.DomUtil.create('div', className, this._container);
            // TODO: allow block to be expanded / contracted by clicking on
            // header, and have a default state from data

            if (this.options.collapseSimple && legend.elements.length == 1 && !legend.elements[0].label){
                this._addElement(legend.elements[0].imageData, legend.name, block);
                return;
            }

            if (legend.name) {
                var header = L.DomUtil.create('h4', null, block);
                header.innerHTML = legend.name;
            }

            // TODO: stretched legend needs something different entirely
            legend.elements.forEach(function (element) {
                this._addElement(element.imageData, element.label, block);
            }, this);

        }, this);
    },

    _addElement: function(imageData, label, container) {
        var row = L.DomUtil.create('div', 'legend-row', container);
        L.DomUtil.create('img', null, row).src = imageData;
        if (!!label) {
            L.DomUtil.create('label', null, row).innerHTML = label;
        }
    }


});

L.control.base64legend = function (options) {
    return new L.Control.Base64Legend(options);
};