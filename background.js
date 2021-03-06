var getTokens = function (content) {
    var ret = {
        regex: {},
        normal: {}
    };

    content = content.split('\n').filter(function (e) {
        return !!e;
    });

    for (var i = 0; i < content.length; i++) {
        var key;
        var value = null;
        var regex = null;

        if (content[i].indexOf(':') !== -1) {
            key = content[i].split(':')[0];
            value = content[i].substr(key.length + 1);
            if (value[0] === ' ') {
                value = content[i].substr(key.length + 2);
            }
        } else {
            key = content[i];
        }

        if (key[0] === '#') {
            key = key.substr(1);
            regex = new RegExp(key);
            ret.regex[key] = {
                val: value,
                regex: regex
            };
        } else {
            ret.normal[key] = {
                val: value,
            };
        }

    }

    return ret;
};

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    var filter = localStorage.getItem('filter');

    if (!filter) {
        return;
    }

    var tokens = getTokens(filter);
    var newHeaders = [];

    if (Object.keys(tokens.regex).length) {
        for (var i = 0; i < details.requestHeaders.length; i++) {
            var h = {};
            var match = false;

            for (var key in tokens.regex) {
                if (tokens.regex[key].regex.test(details.requestHeaders[i].name)) {
                    if (tokens.regex[key].val) {
                        h.name = details.requestHeaders[i].name;
                        h.value = tokens.regex[key].val;
                        details.requestHeaders[i].ignore = true;
                        newHeaders.push(h);
                    }

                    match = true;
                    break;
                }
            }
        }
    }

    for (var i = 0; i < details.requestHeaders.length; i++) {
        var h = {};
        var headerMatch = tokens.normal[details.requestHeaders[i].name];

        if (details.requestHeaders[i].ignore) {
            continue;
        }

        if (headerMatch) {
            if (headerMatch.val) {
                h.name = details.requestHeaders[i].name;
                h.value = headerMatch.val
                newHeaders.push(h);
            }

            delete tokens.normal[details.requestHeaders[i].name];

        } else {
            newHeaders.push(details.requestHeaders[i]);
        }
    }

    for (var key in tokens.normal) {
        if (tokens.normal[key].val !== null) {
            newHeaders.push({
                name: key,
                value: tokens.normal[key].val
            });
        }
    }

    return {
        requestHeaders: newHeaders
    };

}, {

    urls: [
        '<all_urls>'
    ],

}, [

    'blocking',
    'requestHeaders',
    'extraHeaders'

]);
