
import './App.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addUserAction, clearUserAction, deleteUserAction, filterUserAction, updateUserAction } from './Config/action';

function App() {

  const [nom, setNom] = useState("");
  const [PreNom, setPreNom] = useState("");
  const [ville, setVille] = useState(1);
  const [id, setId] = useState("");
  
  const villes = useSelector(data => data.villes);
  const users = useSelector(data => data.users);
  const [villeFilter, setVilleFilter] = useState();
  const count = users.length ;
  const dispatcher = useDispatch();

  

  const userFilter = useSelector(data => data.usersFilter);

  const listusersmap = userFilter ? userFilter : users;

  //Enregister

  const handelclickEnregister = () => {
 
    dispatcher(addUserAction({
      id: count + 1,
      nom: nom,
      prenom: PreNom,
      ville: ville ,
    }));
    handleClear();

  }

  //Clear 

  const handleClear = () => {
    
    setNom("");
    setPreNom("");
    setVille(1);
  }

  //Update 

  const handleUpdate = (id) => {

    const user = users.find((u) => u.id == parseInt(id));
    setId(id);
    setNom(user.nom);
    setPreNom(user.prenom);
    setVille(user.ville);

    

  }

  //Modifier 
  const handelRemplir = () => {
    
    dispatcher(updateUserAction({

      id: id,
      nom: nom,
      prenom: PreNom,
      ville: ville

    }));

    handleClear();
    setId();

  }

  //Filter

  const handleFilter = () => {

    dispatcher(filterUserAction(villeFilter));
    
  }

  //Clear Filter
  const handleFilterClear = () => {

    dispatcher(clearUserAction());

  }

  return (

    <div className="App">
      <h1>
        Crud React Readux Example 2
      </h1>
      
      {//Add Section 
      }

      <div>
        <label> Nom </label>
        <input type="text" placeholder="Nom"  value={nom} onChange={ (e)=> setNom(e.target.value)} />
        <label> PreNom </label>
        <input type="text" placeholder="PreNom" value={PreNom} onChange={(e) => setPreNom(e.target.value)} />
        
        <label> Ville </label>
        <select value={ville} onChange={(e) => setVille(e.target.value)}> 
          {villes.map((ville, i) => <option key={i} value={ville.id} > {ville.nom} </option>)}
        </select>
        {
          id ? <button onClick={handelRemplir}> Modifier</button> :
            <button onClick={handelclickEnregister}> Enregistrer</button> 
        }     
        <button onClick={handleClear}> Clear</button> 

        <br />
        <br />
        <br />


        {//Filter Section 
        }

        <div>

          <label>
            Filter par Ville
          </label>

          <select value={villeFilter} onChange={ (e) => setVilleFilter(e.target.value)} >

           {villes.map((ville, i) => <option key={i} value={ville.id}  > {ville.nom} </option> )}
            
          </select>
          <button onClick={() => handleFilter()}> Filter</button>
          <button onClick={() => handleFilterClear()}> Clear</button> 

        </div>

        {//Table Section 
        }

        <table>

          <thead> 
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Ville</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>

            {listusersmap.map((user, index) => {
              const ville = villes.find((v) => v.id == parseInt(user.ville))
  
              return (

                <tr>
                  <td>{user.id}</td>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{ville.nom}</td>

                  <td>
                    <button onClick={() => handleUpdate(user.id)}> Modifier </button>
                    <button onClick={ ()=> dispatcher(deleteUserAction(user.id))}> Supprimer </button>
                  </td>


                </tr>
              );
              
})}

           
            
          </tbody>
          
        </table>


      </div>
    </div>
  );
}

export default App;
