import {DateAgo} from "../DateAgo";

class Ko {

    public readonly KO_ATOM_S = 'ㄱ ㄱㄱ ㄴ ㄷ ㄷㄷ ㄹ ㅁ ㅂ ㅂㅂ ㅅ ㅅㅅ ㅇ ㅈ ㅈㅈ ㅊ ㅋ ㅌ ㅍ ㅎ'.split(' ');
    public readonly KO_ATOM_M = 'ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅗㅏ ㅗㅐ ㅗㅣ ㅛ ㅜ ㅜㅓ ㅜㅔ ㅜㅣ ㅠ ㅡ ㅡㅣ ㅣ'.split(' ');
    public readonly KO_ATOM_E = ['', ...('ㄱ ㄱㄱ ㄱㅅ ㄴ ㄴㅈ ㄴㅎ ㄷ ㄹ ㄹㄱ ㄹㅁ ㄹㅂ ㄹㅅ ㄹㅌ ㄹㅍ ㄹㅎ ㅁ ㅂ ㅂㅅ ㅅ ㅅㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ'.split(' '))];
    public readonly KO_ATOM_P = "ㄱ ㄱㄱ ㄱㅅ ㄴ ㄴㅈ ㄴㅎ ㄷ ㄸ ㄹ ㄹㄱ ㄹㅁ ㄹㅂ ㄹㅅ ㄹㄷ ㄹㅍ ㄹㅎ ㅁ ㅂ ㅂㅂ ㅂㅅ ㅅ ㅅㅅ ㅇ ㅈ ㅈㅈ ㅊ ㅋ ㅌ ㅍ ㅎ ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅗㅏ ㅗㅐ ㅗㅣ ㅛ ㅜ ㅜㅓ ㅜㅔ ㅜㅣ ㅠ ㅡ ㅡㅣ ㅣ".split(' ');

    // ㄱ = 12593
    // 가 = 44032
    public toAtom(word: string): string {
        return (word
            .replace(/[가-힣]/g, (ko: string) => {
                let rv = '';
                let ce = ko.charCodeAt(0) - 44032;
                rv += this.KO_ATOM_S[Math.floor(ce / 588)];
                ce %= 588;
                rv += this.KO_ATOM_M[Math.floor(ce / 28)];
                ce %= 28;
                if (ce  != 0) {
                    rv += this.KO_ATOM_E[ce];
                }
                return rv;
            }).replace(/[ㄱ-ㅣ]/g, ko => this.KO_ATOM_P[ko.charCodeAt(0) - 12593]))
    }


    public toDateAgo(dateAgo: DateAgo): string {
        switch (dateAgo.unit) {
            case DateAgo.second: return `${dateAgo.value}초 전`;
            case DateAgo.minute: return `${dateAgo.value}분 전`;
            case DateAgo.hour: return `${dateAgo.value}시간 전`;
            case DateAgo.day: return `${dateAgo.value}일 전`;
            case DateAgo.month: return `${dateAgo.value}개월 전`;
            case DateAgo.year: default: return `${dateAgo.value}년 전`;
        }
    }
}

export default new Ko();