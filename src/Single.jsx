import React, { useState } from 'react';

function Single({ user, myList, newList, setMyList, setNewList }) {

    // Recipe add
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        recipeName: "", 
        recipeImage: "", 
        recipeDescription: "",
        recipeTime: 0, 
        recipeMaterial: [], 
        recipeProcess: [], 
        recipeLabel: [],
    });
    const handleAddRecipe  = () => {
        setIsAdding(!isAdding);
    }
    const handleCancelRecipe  = () => {
        setIsAdding(false);
    }

    // Add label input
    const [labelInput, setLabelInput] = useState([""]);
    const handleNewLabel  = (event) => {
        event.preventDefault();
        setLabelInput([...labelInput, ""]);
        console.log('labelInput:', labelInput);
    }
    const handleLabelChange  = (index, value) => {
        const updatedLabel = [...labelInput];
        updatedLabel[index] = value;
        setLabelInput(updatedLabel);
        setFormData({
            ...formData,
            ["recipeLabel"]: updatedLabel, 
        });
    }
    const handleCancelLabel  = (event, index) => {
        event.preventDefault();
        const updatedLabel = labelInput.filter((_, i) => i !== index);
        setLabelInput(updatedLabel);
        setFormData({
            ...formData,
            ["recipeLabel"]: updatedLabel, 
        });
    }

    //Add material input
    const [materiallInput, setMaterialInput] = useState([{"name": "", "quantity": ""}]);
    const handleNewMaterial = (event) => {
        event.preventDefault();
        setMaterialInput([...materiallInput, {"name": "", "quantity": ""}]);
        console.log('materiallInput:', materiallInput);
    }
    const handleMaterialChange = (index, target) => {
        const updatedMaterial = [...materiallInput];
        if (target.name === "recipeMaterialName") {
            updatedMaterial[index]["name"] = target.value;
            setMaterialInput(updatedMaterial);
        }
        else {
            updatedMaterial[index]["quantity"] = target.value;
            setMaterialInput(updatedMaterial);
        }
        setFormData({
            ...formData,
            ["recipeMaterial"]: updatedMaterial, 
        });
    }
    const handleCancelMaterial = (event, index) => {
        event.preventDefault();
        const updatedMaterial = materiallInput.filter((_, i) => i !== index);
        setMaterialInput(updatedMaterial);
        setFormData({
            ...formData,
            ["recipeMaterial"]: updatedMaterial, 
        });
    }

    // Add process input
    const [processInput, setProcessInput] = useState([{"step": "", "name": ""}]);
    const handleNewProcess  = (event) => {
        event.preventDefault();
        setProcessInput([...processInput, {"step": "", "name": ""}]);
        console.log('processInput:', processInput);
    }
    const handleProcessChange  = (index, value) => {
        const updatedProcess = [...processInput];
        updatedProcess[index]["step"] = index + 1;
        updatedProcess[index]["name"] = value;
        setProcessInput(updatedProcess);
        setFormData({
            ...formData,
            ["recipeProcess"]: updatedProcess, 
        });
    }
    const handleCancelProcess  = (event, index) => {
        event.preventDefault();
        const updatedProcess = processInput.filter((_, i) => i !== index);
        setProcessInput(updatedProcess);
        setFormData({
            ...formData,
            ["recipeProcess"]: updatedProcess, 
        });
    }

    // Title, time. description, ..
    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }
    const handleSubmit  = async (event) => {
        event.preventDefault();
        const data = {"accountId": user.id, "title": formData.recipeName, "image": formData.recipeImage, "time": formData.recipeTime, "description": formData.recipeDescription, "material": formData.recipeMaterial, "process": formData.recipeProcess, "label": formData.recipeLabel}
        const updatedList = [...myList, data];
        setMyList(updatedList);
        setNewList(updatedList);

        // Add into database
        try {
            const response = await fetch('http://localhost:3001/recipe/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(data), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(`Success!: ${data.name}`);
                // navigate('/setting');
            } else {
                console.log('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Server error');
        }

        // Reset the form data
        setFormData({
            recipeName: "",
            recipeImage: "",
            recipeDescription: "",
            recipeTime: 0,
            recipeMaterial: [],
            recipeProcess: [],
            recipeLabel: [],
        });
        setIsAdding(false);
    }


    // Recipe search
    const [isSearching, setIsSearching] = useState(false);
    const [searchData, setSearchData] = useState({
        recipeName: "", 
        recipeTime: 0, 
        recipeMaterial: [], 
        recipeLabel: [],
    });
    const handleOpenSearch  = () => {
        setIsSearching(!isSearching);
    }
    const handleCancelSearch  = () => {
        setIsSearching(false);
    }
    const handleResetSearch  = (event) => {
        event.preventDefault();
        setNewList(myList);
        setIsSearching(false);
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
            recipeLabel: [],
        });
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
                            <div>
                                <input 
                                    className='recipe-material' 
                                    placeholder="example: egg,pork,..."
                                    type="text"
                                    name="recipeMaterial"
                                    value={searchData.recipeMaterial}
                                    onChange={handleSearchChange}
                                />
                                <input 
                                    className='recipe-material' 
                                    placeholder="example: egg,pork,..."
                                    type="text"
                                    name="recipeMaterial"
                                    value={searchData.recipeMaterial}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            
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
                            <button onClick={handleNewLabel} className='plus-label'>+ Add label</button>
                            {labelInput.map((label, index) => (
                            <div key={index} className='label-input-container'>
                                <input 
                                    className='recipe-label' 
                                    placeholder="example: lunch,summer,..."
                                    type="text"
                                    name="recipeLabel"
                                    value={label}
                                    onChange={(e) => handleLabelChange(index, e.target.value)}
                                />
                                <button onClick={(event) => handleCancelLabel(event, index)} className='cancel-label'>×</button>
                            </div>
                            ))}
                            
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
                            <button onClick={handleNewMaterial} className='plus-material'>+ Add material</button>
                            {materiallInput.map((material, index) => (
                            <div key={index} className='material-input-container'>
                                <input 
                                    className='recipe-material-name' 
                                    placeholder="name"
                                    type="text"
                                    name="recipeMaterialName"
                                    // value={material[0]}
                                    onChange={(e) => handleMaterialChange(index, e.target)}
                                />
                                <input 
                                    className='recipe-material-quantity' 
                                    placeholder="quantity"
                                    type="text"
                                    name="recipeMaterialQuantity"
                                    // value={material[1]}
                                    // onChange={(e) => handleMaterialChange(index, e.target.value, )}
                                    onChange={(e) => handleMaterialChange(index, e.target)}
                                />
                                <button onClick={(event) => handleCancelMaterial(event, index)} className='cancel-material'>×</button>
                            </div>
                            ))}

                            <h3>Process</h3>
                            <button onClick={handleNewProcess} className='plus-process'>+ Add process</button>
                            {processInput.map((process, index) => (
                            <div key={index} className='process-input-container'>
                                <input 
                                    className='recipe-process' 
                                    placeholder="Process"
                                    type="text"
                                    name="recipeProcess"
                                    // value={process}
                                    onChange={(e) => handleProcessChange(index, e.target.value)}
                                />
                                <button onClick={(event) => handleCancelProcess(event, index)} className='cancel-process'>×</button>
                            </div>
                            ))}
                            <div className='button-container'> 
                                <button type='submit'>Apply</button>
                                <button onClick={handleCancelRecipe}>Cancel</button>    
                            </div>
                        </form>
                    )}
                </div> 
            </div>
            {/* <div className='my-list-container'>
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
            </div>  */}
        </div>
        
    );
}

export default Single;