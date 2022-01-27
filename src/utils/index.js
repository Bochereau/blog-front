export const reverseDate = (str) => {
    let newDate = str.replaceAll('-', '/').substring(0, 10);
    return newDate.split('/').reverse().join('/');
}
