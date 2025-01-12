import React, { useState, useEffect } from 'react';
import Single from './Single';
import Set from './Set';

function MyList({ user }) {
    const [myList, setMyList] = useState({});
    const [newList, setNewList] = useState(myList);

    // Fetch user's recipe list
    useEffect(() => {
        const fetchRecipes = async () => {
            let account_id = user.id;
            try {
                const response = await fetch('http://localhost:3001/recipe/mylist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({"account_id": account_id}), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(`Success!`);
                    organezeData(data.myRecipe);
                } else {
                    console.log('Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('Server error');
            }
        };
        fetchRecipes();
    }, []);

    // Organize the data
    const organezeData = (data) => {
        const recipe_list = [];
        const recipeIdList = [];
        let firstId = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].recipe_id > firstId) {
                firstId = data[i].recipe_id;
            }
        }
        for (var i = 0; i < data.length; i++) {
            if (!recipeIdList.includes(data[i].recipe_id)) {
                recipeIdList.push(data[i].recipe_id);
            }
        }
        for (var i = 0; i < recipeIdList.length; i++) {
            var title = '';
            var image = '';
            var description = '';
            var time = 0;
            const label = [];
            const material = [];
            const process = [];
            for (var j = 0; j < data.length; j++) {
                if (data[j].recipe_id === recipeIdList[i]) {
                    title = data[j].recipe_name;
                    image = data[j].image;
                    description = data[j].description;
                    time = data[j].time;
                    if (!label.includes(data[j].label_name)) {
                        label.push(data[j].label_name);
                    }
                    if (!material.some(item => Object.values(item).includes(data[j].material_name))) {
                        material.push({"name": data[j].material_name, "quantity": data[j].quantity});
                    }
                    if (!process.some(item => Object.values(item).includes(data[j].process_name))) {
                        process.push({"step": data[j].process_step, "name": data[j].process_name});
                    }
                }
            }
            recipe_list.push({"title": title, "image": image, "description": description, "time": time, "label": label, "material": material, "process": process});
        }
        setMyList(recipe_list);
        setNewList(recipe_list);
    }

    // My list header
    const [singleOrSet, setSingleOrSet] = useState(false);
    const handleSingle  = () => {
        setSingleOrSet(false);
    }
    const handleSet  = () => {
        setSingleOrSet(true);
    }

    return (
        <div className='my-list' >
            <div className='my-list-header'>
                <button onClick={handleSingle}>Single</button>
                <button onClick={handleSet}>Set</button>
            </div>
            {singleOrSet ? (
                <Set/>
            ) : (
                <Single user={user} myList={myList} newList={newList} setMyList={setMyList} setNewList={setNewList}/>
            )}
        </div>
    );
}

export default MyList;