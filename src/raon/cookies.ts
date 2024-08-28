class Cookies {
    public get(name: string): string {
        const enNameEq = encodeURIComponent(name) + '=';
        const enValue = document.cookie.split(/\s*;\s*/)
            ?.find(e => e.startsWith(enNameEq))
            ?.substring(enNameEq.length) || '';
        return decodeURIComponent(enValue);
    }

    public set(name: string, value: any, date: Date|null = null) {
        const expires = date ? `;expires=${date.toUTCString()}` : '';
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};path=/${expires}`;
    }

    public del(name: string) {
        document.cookie = `${encodeURIComponent(name)}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
}

export default new Cookies();
