import React, { useState } from 'react';

function MyList() {

    const [myList, setMyList] = useState([
        {"name": "Takoyaki", "image": "https://www.otafuku.co.jp/recipe/cook/taco/assets/img/main_image01.jpg", "label": ["lunch"], "time": 30, "description": "Not bad", "material": [{"octopus": 1}, {"mayones": 0.5}], "recipe": ["Recipe1", "Recipe2"]}, 
        {"name": "Ramen", "image": "https://zenb.jp/cdn/shop/articles/912a_645x.jpg?v=1695687265", "label": ["lunch", "dinner"], "time": 60, "description": "Good", "material": [{"noodles": 10}, {"pork": 1}], "recipe": ["Recipe1", "Recipe2", "Recipe3"]}
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
        recipeLabel: [],
    });

    const handleAddRecipe  = () => {
        setIsAdding(!isAdding);
    }

    const handleCancelRecipe  = () => {
        setIsAdding(false);
    }

    const handleOpenSearch  = () => {
        setIsSearching(!isSearching);
    }

    const handleCancelSearch  = () => {
        setIsSearching(false);
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (name === "recipeLabel") {
            value = value.split(',')
        };
        if (name === "recipeMaterial") {
            value = value.split(',')
            let list = [];
            for (var i = 0; i < value.length; i++) {
                const materialKey = value[i].split(":")[0];
                const materialValue = value[i].split(":")[1];
                let o = new Object();
                o[materialKey] = materialValue;
                list.push(o);
            }
            value = list;
        };
        if (name === "recipeRecipe") {
            value = value.split(',')
        };
        setFormData({
            ...formData,
            [name]: value, 
        });
    }

    const handleSearchChange = (event) => {
        let { name, value } = event.target;
        if (name === "recipeLabel") {
            value = value.split(',')
        };
        if (name === "recipeMaterial") {
            value = value.split(',')
        };
        setSearchData({
            ...searchData,
            [name]: value, 
        });
    }

    const handleSubmit  = (event) => {
        event.preventDefault();
        const data = {"name": formData.recipeName, "image": formData.recipeImage, "time": formData.recipeTime, "description": formData.recipeDescription, "material": formData.recipeMaterial, "recipe": formData.recipeRecipe, "label": formData.recipeLabel}
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
        const label = searchData.recipeLabel;
        const time = searchData.recipeTime;
        const material = searchData.recipeMaterial;
        alert(material.length);
        let searchedList = myList;
        if (name) {
            searchedList = myList.filter(item => item.name.toLowerCase() === name.toLowerCase());
            alert(name);
        };
        if (label.length > 0) {
            for (var i = 0; i < label.length; i++) {
                searchedList = searchedList.filter(item => item.label.includes(label[i]));
                alert(label[i]);
            }
        };
        if (time > 0) {
            searchedList = searchedList.filter(item => item.time < time);
        };
        if (material.length > 0) {
            for (var i = 0; i < material.length; i++) {
                const materialCheck = (m) => {
                    let isOk = false;
                    for (var j = 0; j < m.length; j++) {
                        if (Object.keys(m[j]).includes(material[i])) {
                            isOk = true;
                        }
                    }
                    return isOk;
                }
                searchedList = searchedList.filter(item => materialCheck(item.material));
            };
        };
        setNewList(searchedList);
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
                    <button className='header-button' onClick={handleOpenSearch}>Search</button>
                    {isSearching && (
                        <form onSubmit={handleSearchSubmit} className='search-recipe-container'>
                            <h3>Recipe Title</h3>
                            <input 
                                className='recipe-name' 
                                placeholder=""
                                type="text"
                                name="recipeName"
                                value={searchData.recipeName}
                                onChange={handleSearchChange}
                            />
                            <h3>Label</h3>
                            <input 
                                className='recipe-label' 
                                placeholder="example: lunch,summer,..."
                                type="text"
                                name="recipeLabel"
                                value={searchData.recipeLabel}
                                onChange={handleSearchChange}
                            />
                            <h3>Time (max)</h3>
                            <input 
                                className='recipe-time' 
                                placeholder="Max Min"
                                type="number"
                                name="recipeTime"
                                value={searchData.recipeTime}
                                onChange={handleSearchChange}
                            />
                            <h3>Material</h3>
                            <input 
                                className='recipe-material' 
                                placeholder="example: egg,pork,..."
                                type="text"
                                name="recipeMaterial"
                                value={searchData.recipeMaterial}
                                onChange={handleSearchChange}
                            />
                            <div className='button-container'>
                                <button type='submit'>Apply</button>
                                <button onClick={handleCancelSearch}>Cancel</button>
                                <button onClick={handleResetSearch}>Reset</button>    
                            </div>
                            
                        </form>
                    )}
                </div>
                <div className='my-list-add' >
                    <button className='header-button' onClick={handleAddRecipe}>Add</button>
                    {isAdding && (
                        <form onSubmit={handleSubmit} className='add-recipe-container'>
                            <h3>Recipe Title</h3>
                            <input 
                                className='recipe-name' 
                                placeholder=""
                                type="text"
                                name="recipeName"
                                value={formData.recipeName}
                                onChange={handleChange}
                            />
                            <h3>Image</h3>
                            <input 
                                className='recipe-image' 
                                placeholder="Recipe Image URL"
                                type="text"
                                name="recipeImage"
                                value={formData.recipeImage}
                                onChange={handleChange}
                            />
                            <h3>Label</h3>
                            <input 
                                className='recipe-label' 
                                placeholder="example: lunch,summer,..."
                                type="text"
                                name="recipeLabel"
                                value={formData.recipeLabel}
                                onChange={handleChange}
                            />
                            <h3>Description</h3>
                            <input 
                                className='recipe-description' 
                                placeholder=""
                                type="text"
                                name="recipeDescription"
                                value={formData.recipeDescription}
                                onChange={handleChange}
                            />
                            <h3>Time</h3>
                            <input 
                                className='recipe-time' 
                                placeholder=""
                                type="number"
                                name="recipeTime"
                                value={formData.recipeTime}
                                onChange={handleChange}
                            />
                            <h3>Material</h3>
                            <input 
                                className='recipe-material' 
                                placeholder=""
                                type="text"
                                name="recipeMaterial"
                                // value={formData.recipeMaterial}
                                onChange={handleChange}
                            />
                            <h3>Recipe</h3>
                            <input 
                                className='recipe-recipe' 
                                placeholder="Recipe"
                                type="text"
                                name="recipeRecipe"
                                value={formData.recipeRecipe}
                                onChange={handleChange}
                            />
                            <div className='button-container'> 
                                <button type='submit'>Apply</button>
                                <button onClick={handleCancelRecipe}>Cancel</button>    
                            </div>
                        </form>
                    )}
                </div> 
            </div>
            <div className='my-list-container'>
                {newList.length > 0 ? (
                newList.map((myRecipe, index) => (
                <div className='my-recipe-container' key={index}>
                    <h2>{myRecipe.name}</h2>
                    <hr/>
                    <div className='label-container' >
                    {myRecipe.label.map((l, index) => (
                        <p className='label' key={index}>{l}</p>
                    ))}
                    </div>
                    <hr/>
                    <img height='200px' src={myRecipe.image} alt={myRecipe.name} ></img>
                    <hr/>
                    <h3>{myRecipe.time} min</h3>
                    <hr/>
                    <h3>{myRecipe.description}</h3>
                    <hr/>
                    <div>
                        <h3>Material</h3>
                        <ul>
                        {myRecipe.material.map((m, index) => (
                            <li key={index}>{Object.keys(m)[0]} … {m[Object.keys(m)[0]]}</li>
                        ))}
                        </ul>
                    </div>
                    <hr/>
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


// import React, { useState } from 'react';
// import Single from './Single';
// import Set from './Set';

// function MyList() {

//     const [myList, setMyList] = useState([
//         {"name": "Takoyaki", "image": "https://www.otafuku.co.jp/recipe/cook/taco/assets/img/main_image01.jpg", "label": ["lunch"], "time": 30, "description": "Not bad", "material": [{"octopus": 1}, {"mayones": 0.5}], "recipe": ["Recipe1", "Recipe2"]}, 
//         {"name": "Ramen", "image": "https://zenb.jp/cdn/shop/articles/912a_645x.jpg?v=1695687265", "label": ["lunch", "dinner"], "time": 60, "description": "Good", "material": [{"noodles": 10}, {"pork": 1}], "recipe": ["Recipe1", "Recipe2", "Recipe3"]}
//     ]);

//     const [newList, setNewList] = useState(myList);
//     const [isAdding, setIsAdding] = useState(false);
//     const [isSearching, setIsSearching] = useState(false);
//     const [singleOrSet, setSingleOrSet] = useState(false);

//     const [formData, setFormData] = useState({
//         recipeName: "", 
//         recipeImage: "", 
//         recipeDescription: "",
//         recipeTime: 0, 
//         recipeMaterial: [], 
//         recipeRecipe: [], 
//         recipeLabel: [],
//     });

//     const [searchData, setSearchData] = useState({
//         recipeName: "", 
//         recipeTime: 0, 
//         recipeMaterial: [], 
//         recipeLabel: [],
//     });

//     const handleAddRecipe  = () => {
//         setIsAdding(!isAdding);
//     }

//     const handleCancelRecipe  = () => {
//         setIsAdding(false);
//     }

//     const handleOpenSearch  = () => {
//         setIsSearching(!isSearching);
//     }

//     const handleCancelSearch  = () => {
//         setIsSearching(false);
//     }

//     const handleChange = (event) => {
//         let { name, value } = event.target;
//         if (name === "recipeLabel") {
//             value = value.split(',')
//         };
//         if (name === "recipeMaterial") {
//             value = value.split(',')
//             let list = [];
//             for (var i = 0; i < value.length; i++) {
//                 const materialKey = value[i].split(":")[0];
//                 const materialValue = value[i].split(":")[1];
//                 let o = new Object();
//                 o[materialKey] = materialValue;
//                 list.push(o);
//             }
//             value = list;
//         };
//         if (name === "recipeRecipe") {
//             value = value.split(',')
//         };
//         setFormData({
//             ...formData,
//             [name]: value, 
//         });
//     }

//     const handleSearchChange = (event) => {
//         let { name, value } = event.target;
//         if (name === "recipeLabel") {
//             value = value.split(',')
//         };
//         if (name === "recipeMaterial") {
//             value = value.split(',')
//         };
//         setSearchData({
//             ...searchData,
//             [name]: value, 
//         });
//     }

//     const handleSubmit  = (event) => {
//         event.preventDefault();
//         const data = {"name": formData.recipeName, "image": formData.recipeImage, "time": formData.recipeTime, "description": formData.recipeDescription, "material": formData.recipeMaterial, "recipe": formData.recipeRecipe, "label": formData.recipeLabel}
//         const updatedList = [...myList, data];
//         setMyList(updatedList);
//         setNewList(updatedList);
//         setFormData({
//             recipeName: "",
//             recipeImage: "",
//             recipeDescription: "",
//             recipeTime: 0,
//             recipeMaterial: [],
//             recipeRecipe: [],
//             recipeLabel: [],
//         });
//         setIsAdding(false);
//     }

//     const handleSearchSubmit  = (event) => {
//         event.preventDefault();
//         const name = searchData.recipeName;
//         const label = searchData.recipeLabel;
//         const time = searchData.recipeTime;
//         const material = searchData.recipeMaterial;
//         alert(material.length);
//         let searchedList = myList;
//         if (name) {
//             searchedList = myList.filter(item => item.name.toLowerCase() === name.toLowerCase());
//             alert(name);
//         };
//         if (label.length > 0) {
//             for (var i = 0; i < label.length; i++) {
//                 searchedList = searchedList.filter(item => item.label.includes(label[i]));
//                 alert(label[i]);
//             }
//         };
//         if (time > 0) {
//             searchedList = searchedList.filter(item => item.time < time);
//         };
//         if (material.length > 0) {
//             for (var i = 0; i < material.length; i++) {
//                 const materialCheck = (m) => {
//                     let isOk = false;
//                     for (var j = 0; j < m.length; j++) {
//                         if (Object.keys(m[j]).includes(material[i])) {
//                             isOk = true;
//                         }
//                     }
//                     return isOk;
//                 }
//                 searchedList = searchedList.filter(item => materialCheck(item.material));
//             };
//         };
//         setNewList(searchedList);
//         setSearchData({
//             recipeName: "", 
//             recipeTime: 0, 
//             recipeMaterial: [], 
//             recipeRecipe: [], 
//             recipeLabel: [],
//         });
//         setIsSearching(false);
//     }

//     const handleResetSearch  = (event) => {
//         event.preventDefault();
//         setNewList(myList);
//         setIsSearching(false);
//     }

//     const handleSingle  = () => {
//         setSingleOrSet(false);
//     }

//     const handleSet  = () => {
//         setSingleOrSet(true);
//     }

//     return (
//         <div className='my-list' >
//             <div className='my-list-header'>
//                 <button onClick={handleSingle}>Single</button>
//                 <button onClick={handleSet}>Set</button>
//             </div>
//             {singleOrSet ? (
//                 <Set/>
//             ) : (
//                 <Single/>
//             )}
//         </div>
        
//     );
// }

// export default MyList;