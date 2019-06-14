// This Module works with NAMED EXPORTS

export default {
    getRandomIntInclusive,
    sureUniqueId,
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

export function sureUniqueId(arr) {
    if (arr && arr.length) {
        var uniqueId;
        var isUnique = false;
        while (!isUnique) {
            uniqueId = makeId();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id !== uniqueId) {
                    isUnique = true;
                } else {
                    isUnique = false;
                    break;
                }
            }
        }
        return uniqueId;
    } else {
        return makeId();
    }
}