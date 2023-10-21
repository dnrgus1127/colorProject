
/**
 * Observer
 * 자식 클래스에서 setup메서드를 작성하여 Observer 클래스의 initStore 메서드를 이용해서 state값 초기화 해줘야함
 */
export class Observer {
    constructor() {
        this.store = {}
        this.setup();
    }

    setup() {
        // 상속 받은 클래스에서 작성
    }

    get state() {
        let result = {};
        let keys = Object.keys(this.store);
        keys.forEach(key => {
            result[key] = this.store[key]._state;
        })
        return result;

    }

    setState({ key, value }) {
        if (!(key in this.store)) throw Error("존재하지 않는 키");
        this.store[key]._state = value;
        this.notify(key);
    }

    initStore({ key, initValue }) {

        if (key in this.store) throw Error("중복된 키");
        this.store[key] = {
            _state: initValue,
            _observers: new Set(),
        };
    }

    subscribe(key, observer) {
        if (typeof observer !== "function") return;
        if (key instanceof Array) {
            key.forEach(k => {
                if (typeof k !== "string") return;
                this.store[k]._observers.add(observer);
            })
        }
        else if (typeof key === "string") {
            this.store[key]._observers.add(observer);

        }
    }

    notify(key) {
        if (key instanceof Array) {
            key.forEach(k => {
                this.store[key]._observers.forEach(observer => observer())
            })
        }
        else if (typeof key === "string") {
            this.store[key]._observers.forEach((observer) => observer())
        }
    }
}
