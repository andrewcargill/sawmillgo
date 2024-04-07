import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const AddProjectForm = () => {
  const [projectData, setProjectData] = useState({
    creatorId: '',
    customerName: '',
    projectName: '',
    status: 'active',
    projectInfo: '',
    notes: '',
    deadline: '',
    date: '',
  });

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId || !currentUserUID) {
      console.error("Sawmill ID or current user UID is not available. Cannot add project.");
      return;
    }

    const newProjectData = {
      ...projectData,
      SawmillName: sawmillId,
      createdBy: currentUserUID,
      // Use current date as the creation date if not provided
      date: projectData.date || new Date().toISOString().split('T')[0], 
    };

    try {
      await addDoc(collection(db, `sawmill/${sawmillId}/projects`), newProjectData);
      alert('Project added successfully!');
      navigate('/projects'); // Navigate to the projects list page or any other page
    } catch (error) {
      console.error("Error adding project: ", error);
      alert('Failed to add project. See console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Project</h3>
      {/* Fields for project attributes */}
      <div>
        <label>Creator ID (Optional):
          <input
            type="text"
            name="creatorId"
            value={projectData.creatorId}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>Customer Name:
          <input
            type="text"
            name="customerName"
            value={projectData.customerName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Project Name:
          <input
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>About (Optional):
          <input
            type="text"
            name="projectInfo"
            value={projectData.projectInfo}
            onChange={handleChange}
            
          />
        </label>
      </div>
      <div>
        <label>Notes (Optional):
          <input
            type="text"
            name="notes"
            value={projectData.notes}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>Status:
          <select name="status" value={projectData.status} onChange={handleChange} required>
            <option value="active">Active</option>
            <option value="complete">Complete</option>
            <option value="paused">Paused</option>
          </select>
        </label>
      </div>
      <div>
        <label>Deadline:
          <input
            type="date"
            name="deadline"
            value={projectData.deadline}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>Date:
          <input
            type="date"
            name="date"
            value={projectData.date}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
