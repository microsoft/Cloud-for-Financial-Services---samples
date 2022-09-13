const queryParams = new URLSearchParams(window.location.search);

export const setParam = (key: string, value: string) => {
    queryParams.set(key, value || '');
    history.replaceState(null, '', '?' + queryParams.toString());
};

export const getParam = (key: string) => {
    return queryParams.get(key) || '';
};