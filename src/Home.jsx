import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

    const api_id = process.env.REACT_APP_API_ID;
    const api_key = process.env.REACT_APP_API_KEY;

    const [menu, setMenu] = useState(null);

    const headers = {
        'accept': 'application/json',
        'Accept-Language': 'ja', 
        'Edamam-Account-User': api_id,
    }

    const getMenu = () => {
        axios.get("https://api.edamam.com/api/recipes/v2", {
            params: {
                type: "public",
                // q: "chicken",
                app_id: api_id,
                app_key: api_key,
                mealType: "Dinner",
            },
            headers: headers,
        })
        .then((response) => {
            const data = response.data;
            setMenu(data);
        })
        .catch((error) => {
            console.error("There was an error fetching the data!", error);
        });
    };

    return (
        <div className='home'>
            <h1>Home</h1>
            <h2>Today's menu</h2>
            {menu ? (
            menu.hits.map((recipe, index) => (
            <div key={index}>
                <h3>{recipe.recipe.label}</h3>
                <img src={recipe.recipe.image} alt={recipe.recipe.label} ></img>
            </div>))) : 
            <h3>No menu</h3>
            }
            <button onClick={getMenu}>Get menu</button>
        </div>
    );
}

export default Home;