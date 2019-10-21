const actions = {
    TOGGLE_USER: 'TOGGLE_USER',
}
const INITIAL_STATE = {
    user: {
        id: 1,
        nome: 'Diogo Borges Antunes',
        email: 'diogololz159@gmail.com',
        cpf: '078.313.279-40',
        servicos: [
            { id: 1, nome: 'Pedreiro' },
            { id: 2, nome: 'Padeiro' },
            { id: 3, nome: 'Confeteiro' },
            { id: 4, nome: 'Programador' },
            { id: 5, nome: 'Engenheiro' },
        ],
    }
}

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.TOGGLE_USER:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}