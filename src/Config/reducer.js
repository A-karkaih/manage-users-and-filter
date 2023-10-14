
const initialeState = {
    users: [
        { id: 1, nom: "Karkaih", prenom: "Achraf", ville: 2 },
        { id: 2, nom: "Benzouine", prenom: "Yousra", ville: 1 },
        
],
    villes: [
        { id: 1, nom: "Agadir" },
        { id: 2, nom: "Essaouira" },
        { id: 3, nom: "Marrakech" },
        { id: 4, nom: "Mekenes" },
    ]

}

const reducer = (state = initialeState, action) => {
    
    switch (action.type) {
        case "Add_User":
            return { ...state, users: [...state.users, action.payload] };
        
        case "Update_User":

            const user = state.users.find((u) => u.id == parseInt(action.payload.id));

            if (user) {

                user.nom = action.payload.nom;
                user.prenom = action.payload.prenom;
                user.ville = action.payload.ville;

            }

            return state;
        
        case "Delete_User":

            return { ...state, users: [...state.users.filter((u) => u.id !== parseInt(action.payload))] };
        
        case "Filter_User":

            return { ...state, usersFilter: [...state.users.filter((u) => u.ville == parseInt(action.payload))] };
        
        case "Clear_Users":

            return { ...state , usersFilter: null};


        default:
            return state;
}


}

export default reducer;