export default function lecturers(state = {
    data: []
}, action) {
    switch (action.type) {
        case "LOAD_LECTURERS":
            return {
                data: action.data
            };
        default: break
    };
    return state
}