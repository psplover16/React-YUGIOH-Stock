export function toRFC3339(dateString) {
    // 將字符串轉換為 Date 對象
    const date = new Date(dateString?.replace(/\//g, '-')); // 替換 / 為 -
    // 確保日期有效
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }
    return date.toISOString();
}

export function fromRFC3339ToYYYY(rfc3339String) {
    // 將 RFC 3339 字符串轉換為 Date 對象
    const date = new Date(rfc3339String);
    // 確保日期有效
    if (isNaN(date.getTime())) {
        throw new Error('Invalid RFC 3339 date');
    }
    // 格式化為 YYYY/MM/DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，所以要加 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}