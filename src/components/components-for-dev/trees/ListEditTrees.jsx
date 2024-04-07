import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../../firebase-config';
import { getAuth } from 'firebase/auth';

const ListEditTree = () => {
    const [trees, setTrees] = useState([]);
    const [editTreeId, setEditTreeId] = useState(null); // ID of the tree being edited
    const [editFormData, setEditFormData] = useState({}); // Form data for the tree being edited
    
    const db = getFirestore(app);
    const auth = getAuth(app);
    const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;

    useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem("user"));
        const sawmillId = userLocalStorage?.sawmillId;
        
        if (sawmillId && currentUserUID) {
            const treesRef = collection(db, `sawmill/${sawmillId}/trees`);
            const q = query(treesRef);
            getDocs(q).then(querySnapshot => {
                const treesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTrees(treesData);
            }).catch(error => console.error("Error fetching trees: ", error));
        }
    }, [currentUserUID, db]);

    const handleEditClick = (tree) => {
        setEditTreeId(tree.id);
        setEditFormData(tree);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userLocalStorage = JSON.parse(localStorage.getItem("user"));
        const sawmillId = userLocalStorage?.sawmillId;

        if (!sawmillId) {
            console.error("Sawmill ID is not available. Cannot update tree.");
            return;
        }

        try {
            const treeRef = doc(db, `sawmill/${sawmillId}/trees`, editTreeId);
            await updateDoc(treeRef, editFormData);
            alert('Tree updated successfully!');
            setTrees(trees.map(tree => tree.id === editTreeId ? { ...tree, ...editFormData } : tree));
            setEditTreeId(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating tree: ", error);
            alert('Failed to update tree. See console for details.');
        }
    };

    return (
        <div>
            <h3>List of Trees</h3>
            {trees.map(tree => (
                <div key={tree.id}>
                    {editTreeId === tree.id ? (
                        // Edit mode
                    
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                name="woodType"
                                value={editFormData.woodType}
                                onChange={handleEditChange}
                            />
                    
                         
                            {/* Include other fields as needed */}
                            <button type="submit">Save</button>
                            <button onClick={() => setEditTreeId(null)}>Cancel</button>

                        </form>

                    ) : (
                        // Display mode
                        <>
                            <p>Wood Type: {tree.woodType}</p>
                            <p>RefId: {tree.refId}</p>
                            <button onClick={() => handleEditClick(tree)}>Edit</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListEditTree;