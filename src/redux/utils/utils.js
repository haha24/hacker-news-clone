export const getPage = (data, page, pageSize) => {
    if (page * pageSize >= data.length) {
        page = Math.ceil(data.length / pageSize);
    }
    else if (page < 1) {
        page = 1;
    }

    const start = (page - 1) * pageSize;
    const end = Math.min((page - 1) * pageSize + pageSize, data.length - 1);
    return data.slice(start, end);
}