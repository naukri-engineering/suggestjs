var url = {
    autoComplete: 'http://suggest.naukimg.com/demo/suggest/autocomplete?',
    relatedConcept: 'http://suggest.naukimg.com/demo/suggest/autoconcepts?',
    checkVersion: 'http://suggest.naukimg.com/demo/suggest/v?',
    prefetch: 'http://suggest.naukimg.com/demo/suggest/prefetch?'
}

$('#Section-1-suggestor').suggestor({
    domain: "http://suggest.naukimg.com/demo",
    url: url,
    category: {
        'location': "Locations"
    },
    showRelatedConcept: false
});


$('#Section-2-suggestor').suggestor({
    domain: "http://suggest.naukimg.com/demo",
    url: url,
    category: {
        'location': "Locations"
    },
    showRelatedConcept: false,
    multiSearch: true
});

$('#Section-3-suggestor').suggestor({
    domain: "http://suggest.naukimg.com/demo",
    url: url,
    category: {
        'location': "Locations"
    },
    relatedConceptCategory: {
        'location': "location"
    },
    multiSearch: true
});

$('#Section-4-suggestor').suggestor({
    domain: "http://suggest.naukimg.com/demo",
    url: url,
    category: {
        'location': "Locations"
    },
    relatedConceptCategory: {
        'location': "location"
    },
    suggestOnClick: true,
    multiSearch: true
});

$('#Section-5-suggestor').suggestor({
    domain: "http://suggest.naukimg.com/demo",
    url: url,
    category: {
        'location': "Locations"
    },
    showRelatedConcept: false,
    showDataOnFocus: [{
        "displayTextEn": "New Delhi"
    }, {
        "displayTextEn": "Chennai"
    }, {
        "displayTextEn": "Mumbai"
    }, {
        "displayTextEn": "Jaipur"
    }, {
        "displayTextEn": "Goa"
    }]
});

$('#Section-6-suggestor').suggestor({
    domain: "http://suggest.naukimg.com/demo",
    url: url,
    category: {
        'location': "Locations"
    },
    relatedConceptCategory: {
        'location': "location"
    },
    multiSearch: true,
    trackUserInteraction: true,
    getTrackUserInteractionData: function(data) {
        $('#userInteraction_data pre code').html(JSON.stringify(data['Section-6-suggestor']))
    }
});

$('#Section-7-suggestor').suggestor({
    domain: "http://suggest.naukri.com",
    url: url,
    category: {
        'location': "Group1",
        'skill': "Group2"
    },
    appId: 101,
    maxSuggestions: 3
});



$('#sidebar-wrapper').on('click', 'li', function(argument) {
    var _t = $(this);
    $('#sidebar-wrapper li').removeClass('sidebar-brand');
    $(this).addClass('sidebar-brand');
    $('.codeContainer .col-lg-11').fadeOut(0).eq($(this).index()).fadeIn(function() {
        if (_t.index() == 2 && !_t.data('set')) {
            //miscellaneous();
            _t.data('set', true);
        }
    });
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
