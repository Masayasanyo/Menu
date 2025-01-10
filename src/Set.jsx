import React from 'react';

function Set() {


    return (
        <div className='set' >
            {/* <div className='set-header' >
                <div className='set-search-container' >
                    <button className='header-button' onClick={handleOpenSearch}>Search</button>
                    {isSetSearching && (
                        <form onSubmit={handleSetSearchSubmit} className='search-recipe-container'>
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
                <div className='set-add-container' >
                    <button className='header-button' onClick={handleAddRecipe}>Add</button>
                    {isSetAdding && (
                        <form onSubmit={handleSetSubmit} className='add-recipe-container'>
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
            <div className='sets'>
                <div>
                    
                </div>
            </div> */}
        </div>
    );
}

export default Set;