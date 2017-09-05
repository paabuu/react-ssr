export function Add () {
    return {
        type: 'ADD'
    }
}

export default function (state = 0, action) {
    switch(action.type) {
        case 'ADD':
            return state + 1;
        case 'Minux':
            return state - 1;
        default:
            return state;
    }
}
