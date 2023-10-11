export class Component {
    $target;
    props;
    state;
    constructor($target, props) {
        this.$target = $target;
        this.props = props
        this.setup();
        this.setEvent();
        this.render();
    }
    setup() { };
    template() { return ''; }
    mounted() { };

    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }
    setEvent() { }
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    addEvent(event, selector, callback) {
        this.$target.addEventListener(event, e => {

            if (e.target.closest(selector)) {
                callback();
            }
        })
    }

}