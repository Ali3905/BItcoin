import React from 'react'
import { NextResponse } from 'next/server';


export default class Helpers {

    static getFullPathByRouter(router) {

        const location = router;
    
        let newPath = '';
        const locales = ['en', 'th', 'ko', 'zh', 'de', 'fr', 'sp'];
        
        if (location != undefined && location.pathname != undefined) {
            var pathname = location.pathname;
            let pathnames = pathname.split('/');
            for (var i = 0; i < pathnames.length; i++) {
                const localesexists = locales.some(locale => (locale === pathnames[i]));
                if (localesexists) {
                    newPath = '/' + pathnames[i];
                    break;
                }
            }
        }
        return newPath;
    }
    
    static hasText(value) {
        return undefined != value && null != value && String(value).trim().length > 0;
    }


    static navigateToPath(router, path) {
        NextResponse.redirect(this.getFullPathByRouter(router) + `${path}`);
    }
}