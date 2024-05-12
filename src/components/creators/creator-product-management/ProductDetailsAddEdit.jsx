import React from "react";


const ProductDetailsAddEdit = ({ title , description, setTitle, setDescription, handleSubmit }) => {
    return (
        <>
        
        <form onSubmit={handleSubmit}>
            <label>
                Product Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <button type="submit">Save Product Info</button>
        </form>
        </>
    );
    };

export default ProductDetailsAddEdit;