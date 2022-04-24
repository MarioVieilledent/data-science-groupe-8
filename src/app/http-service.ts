
// eslint-disable-next-line @typescript-eslint/ban-types
function httpService(url: string, func: Function): void {
    const headers = new Headers();
    headers.append('Content-Type', 'text/json');
    fetch(url, { method: 'GET', mode: 'cors' }).then(res => {
        res.json().then(data => {
            func(data);
        });
    })
}

export default httpService;