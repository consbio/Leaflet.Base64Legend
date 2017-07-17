L.Control.Base64Legend = L.Control.extend({
    _map: null,
    includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,
    options: {
        position: 'topright',
        legends: [],   // array of legend entries - see README for format
        collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
        detectStretched: false  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
    },
    onAdd: function (map) {
        this._map = map;
        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar leaflet-legend');
        this._container = container;

        // Disable events on container
        L.DomEvent.disableClickPropagation(container);
        if (!L.Browser.touch) {
            L.DomEvent.disableScrollPropagation(container);
        }

        this.render();

        return this._container;
    },

    // render this.options.entries
    render: function () {
        L.DomUtil.empty(this._container);
        var legends = this.options.legends;

        if (!legends) return;

        legends.forEach(function(legend) {
            if (!legend.elements) return;
            var elements = legend.elements;

            var className = 'legend-block';

            if (this.options.detectStretched) {
                if (elements.length === 3  && elements[0].label !== '' && elements[1].label === '' && elements[2].label !== ''){
                    legend.type = 'stretched';
                }
            }

            if (legend.type === 'stretched') {
                className += ' legend-stretched';
            }

            var block = L.DomUtil.create('div', className, this._container);

            if (this.options.collapseSimple && elements.length == 1 && !elements[0].label){
                this._addElement(elements[0].imageData, legend.name, block);
                return;
            }

            if (legend.name) {
                var header = L.DomUtil.create('h4', null, block);
                L.DomUtil.create('div', 'caret', header);
                L.DomUtil.create('span', null, header).innerHTML = legend.name;

                L.DomEvent.on(header, 'click', function() {
                    if (L.DomUtil.hasClass(header, 'closed')) {
                        L.DomUtil.removeClass(header, 'closed');
                    }
                    else {
                        L.DomUtil.addClass(header, 'closed');
                    }
                }, this);
            }
            var elementContainer = L.DomUtil.create('div', 'legend-elements', block);

            elements.forEach(function (element) {
                this._addElement(element.imageData, element.label, elementContainer);
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
