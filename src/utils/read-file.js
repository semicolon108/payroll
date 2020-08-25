export function readableBytes(num) {
    const neg = num < 0;

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (neg){
        num = -num;
    }

    if (num < 1){
        return (neg ? '-' : '') + num + (neg ? ' B' : '');
    }

    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);

    num = Number((num / Math.pow(1000, exponent)).toFixed(2));

    const unit = units[exponent];

    return (neg ? '-' : '') + num + ' ' + unit;
}