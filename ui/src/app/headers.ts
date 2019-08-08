import { HttpHeaders } from '@angular/common/http';

export function createAuthorizationHeader(names = [], values = []) {
    let heads = {};

    heads['Access-Control-Allow-Origin'] = '*';

    if (names.length === values.length) {
        for (let i = 0; i < names.length; i++) {
            heads[names[i]] = [values[i]];
        }
    }


    const headers = new HttpHeaders(heads);


    return headers;
}