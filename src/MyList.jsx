import React, { useState } from 'react';

function MyList() {

    const [myList, setMyList] = useState([
        {"name": "Takoyaki", "image": "https://www.otafuku.co.jp/recipe/cook/taco/assets/img/main_image01.jpg", "label": ["lunch"], "time": 30, "description": "Not bad", "material": [["octopus", 1], ["mayones", 0.5]], "recipe": ["Recipe1", "Recipe2"]}, 
        {"name": "Ramen", "image": "https://zenb.jp/cdn/shop/articles/912a_645x.jpg?v=1695687265", "label": ["lunch"], "time": 60, "description": "Good", "material": [["noodles", 10], ["pig", 1]], "recipe": ["Recipe1", "Recipe2", "Recipe3"]}
    ]);

    const [newList, setNewList] = useState(myList);
    const [isAdding, setIsAdding] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [formData, setFormData] = useState({
        recipeName: "", 
        recipeImage: "", 
        recipeDescription: "",
        recipeTime: 0, 
        recipeMaterial: [], 
        recipeRecipe: [], 
        recipeLabel: [],
    });

    const [searchData, setSearchData] = useState({
        recipeName: "", 
        recipeTime: 0, 
        recipeMaterial: [], 
        recipeRecipe: [], 
        recipeLabel: [],
    });

    const handleAddRecipe  = () => {
        setIsAdding(true);
    }

    const handleCancelRecipe  = () => {
        setIsAdding(false);
    }

    const handleOpenSearch  = () => {
        setIsSearching(true);
    }

    const handleCancelSearch  = () => {
        setIsSearching(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }

    const handleSearchChange = (event) => {
        const { name, value } = event.target;
        setSearchData({
            ...searchData,
            [name]: value, 
        });
    }

    const handleSubmit  = (event) => {
        event.preventDefault();
        const data = {"name": formData.recipeName, "image": formData.recipeImage, "time": formData.recipeTime, "description": formData.recipeDescription, "material": formData.recipeMaterial, "recipe": formData.recipeRecipe}
        const updatedList = [...myList, data];
        setMyList(updatedList);
        setNewList(updatedList);
        setFormData({
            recipeName: "",
            recipeImage: "",
            recipeDescription: "",
            recipeTime: 0,
            recipeMaterial: [],
            recipeRecipe: [],
            recipeLabel: [],
        });
        setIsAdding(false);
    }

    const handleSearchSubmit  = (event) => {
        event.preventDefault();
        const name = searchData.recipeName;
        setNewList(myList.filter(item => item.name === name));
        setSearchData({
            recipeName: "", 
            recipeTime: 0, 
            recipeMaterial: [], 
            recipeRecipe: [], 
            recipeLabel: [],
        });
        setIsSearching(false);
    }

    const handleResetSearch  = (event) => {
        event.preventDefault();
        setNewList(myList);
        setIsSearching(false);
    }

    return (
        <div className='my-list' >
            <div className='my-list-header' >
                <div className='my-list-search' >
                    <button onClick={handleOpenSearch}>Search</button>
                    {isSearching && (
                    <div>
                        <form onSubmit={handleSearchSubmit} className='search-recipe-container'>
                            <input 
                                className='recipe-name' 
                                placeholder="Recipe Title"
                                type="text"
                                name="recipeName"
                                value={searchData.recipeName}
                                onChange={handleSearchChange}
                            />
                            <button type='submit'>Apply</button>
                            <button onClick={handleCancelSearch}>Cancel</button>
                            <button onClick={handleResetSearch}>Reset</button>
                        </form>
                    </div>
                    )}
                </div>
                <div className='my-list-add' >
                    <button onClick={handleAddRecipe}>Add</button>
                    {isAdding && (
                    <div>
                        <form onSubmit={handleSubmit} className='add-recipe-container'>
                            <input 
                                className='recipe-name' 
                                placeholder="Recipe Title"
                                type="text"
                                name="recipeName"
                                value={formData.recipeName}
                                onChange={handleChange}
                            />
                            <input 
                                className='recipe-image' 
                                placeholder="Recipe Image URL"
                                type="text"
                                name="recipeImage"
                                value={formData.recipeImage}
                                onChange={handleChange}
                            />
                            <input 
                                className='recipe-label' 
                                placeholder="Recipe Label"
                                type="text"
                                name="recipeLabel"
                                value={formData.recipeLabel}
                                onChange={handleChange}
                            />
                            <input 
                                className='recipe-description' 
                                placeholder="Description"
                                type="text"
                                name="recipeDescription"
                                value={formData.recipeDescription}
                                onChange={handleChange}
                            />
                            <input 
                                className='recipe-time' 
                                placeholder="Time Min"
                                type="number"
                                name="recipeTime"
                                value={formData.recipeTime}
                                onChange={handleChange}
                            />
                            <input 
                                className='recipe-material' 
                                placeholder="Material"
                                type="text"
                                name="recipeMaterial"
                                value={formData.recipeMaterial.join(",")}
                                onChange={handleChange}
                            />
                            <input 
                                className='recipe-recipe' 
                                placeholder="Recipe"
                                type="text"
                                name="recipeRecipe"
                                value={formData.recipeRecipe.join(",")}
                                onChange={handleChange}
                            />
                            <button type='submit'>Apply</button>
                            <button onClick={handleCancelRecipe}>Cancel</button>
                        </form>
                    </div>
                    )}
                </div> 
            </div>
            <div className='my-list-container'>
                {newList.length > 0 ? (
                newList.map((myRecipe, index) => (
                <div className='my-recipe-container' key={index}>
                    <h2>{myRecipe.name}</h2>
                    <h3>{myRecipe.label}</h3>
                    <img height='200px' src={myRecipe.image} alt={myRecipe.name} ></img>
                    <h3>{myRecipe.time} min</h3>
                    <h3>{myRecipe.description}</h3>
                    <div>
                        <h3>Material</h3>
                        <ul>
                        {myRecipe.material.map((m, index) => (
                            <li key={index}>{m[0]} … {m[1]}</li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Recipe</h3>
                        <ol>
                        {myRecipe.recipe.map((r, index) => (
                            <li key={index}>{r}</li>
                        ))}
                        </ol>
                    </div>
                </div>
                ))
                ) : (
                    <p>No Recipe</p>
                )}
            </div> 
        </div>
        
    );
}

export default MyList;