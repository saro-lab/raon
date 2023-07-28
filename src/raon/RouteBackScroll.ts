import {RouteBackHistory} from "./RouteBackHistory";

export class RouteBackScroll {
    constructor() {}

    private histories: RouteBackHistory[] = [];

    beforeLeave(fullPath: string = window.location.href.substring(window.location.origin.length)) {
        this.histories.push(new RouteBackHistory(fullPath, window.scrollX, window.scrollY));
    }

    afterLoad(fullPath: string = window.location.href.substring(window.location.origin.length)) {
        if (window.history.state.forward) {
            let history: RouteBackHistory | undefined
            while ((history = this.histories.pop())) {
                if (history.fullPath === fullPath) {
                    this.scroll(history.x, history.y);
                    return;
                }
            }
            this.histories = [];
        }
        window.scrollTo(0, 0);
    }

    scroll(x: number, y: number) {
        if (x == 0 && y == 0) {
            window.scrollTo(0, 0);
        } else {
            let handle: number[] = [];
            for (let i = 1 ; i <= 10 ; i++) {
                handle.push(setTimeout(() => {
                    if (window.scrollX != x || window.scrollY != y) {
                        window.scrollTo(x, y);
                    } else {
                        handle.forEach(h => clearTimeout(h));
                    }
                }, 35 * i));
            }
        }
    }
}
