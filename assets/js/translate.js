/*!
 * SPDX-FileCopyrightText: 2013-2017 The angular-translate team and Pascal Precht
 * SPDX-License-Identifier: MIT
*/
// Copied and adapted from:
// https://github.com/angular-translate/angular-translate/

// tries to determine the browsers language
var getFirstBrowserLanguage = function () {

    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};
