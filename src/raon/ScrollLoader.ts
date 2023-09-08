export type ScrollCallback = (scrollLoader: ScrollLoader) => void;
export interface ScrollLoaderOptions {
    target?: HTMLElement,
    sparePage?: number
}

export class ScrollLoader {

    constructor(options: ScrollLoaderOptions = {}) {
        this._target = options.target || document.documentElement;
        this._sparePage = options.sparePage || 0.8;
        this._event = () => {
            if (this._on && this.needReload) {
                this._on = false;
                this._callbackNeedNextPage(this);
            }
        };
        this._init();
    }

    private readonly _sparePage: number;
    private readonly _target: HTMLElement;
    private readonly _event: (event: Event|null) => any;
    private _callbackNeedNextPage: ScrollCallback = () => {};
    private _on = false;

    private _init() {
        if (!(this._sparePage > 0 && this._sparePage < 10)) {
            const err = 'scroll-loader error: invalid value: sparePage must be greater than 0 and less than 10.0';
            console.error(err);
            alert(err);
            return;
        }
        window.addEventListener('scroll', this._event, true);
        window.addEventListener('resize', this._event, true);
    }

    public onNeedNextPage(scrollCallback: ScrollCallback): ScrollLoader {
        this._callbackNeedNextPage = scrollCallback;
        return this;
    }

    public get needReload() {
        const scrollHeight = this._target.scrollHeight;
        const pageHeight = this._target.clientHeight;
        const scrollTop = this._target.scrollTop;
        return ((this._sparePage + 1) * pageHeight + scrollTop) >= scrollHeight;
    }

    public watch(onWatch: boolean = true) {
        if ((this._on = onWatch)) {
            this._event(null);
        }
    }

    public destroy() {
        this._callbackNeedNextPage = () => {};
        this._on = false;
        window.removeEventListener('scroll', this._event, true);
        window.removeEventListener('resize', this._event, true);
    }
}
