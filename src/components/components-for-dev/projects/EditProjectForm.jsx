import React, { useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';

const EditProjectForm = () => {
  const [projectId, setProjectId] = useState('');
  const [projectData, setProjectData] = useState({
    creatorId: '',
    customerName: '',
    projectName: '',
    status: '',
    projectInfo: '',
    notes: '',
    deadline: '',
    date: '',
  });

  const [isProjectIdSubmitted, setIsProjectIdSubmitted] = useState(false);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;

  const handleProjectIdChange = (e) => {
    setProjectId(e.target.value);
  };

  const handleProjectIdSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, `sawmill/${sawmillId}/projects`, projectId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProjectData(docSnap.data());
        setIsProjectIdSubmitted(true); // Allows the form to be shown after the project ID has been submitted
      } else {
        alert("No such project!");
        setIsProjectIdSubmitted(false);
      }
    } catch (error) {
      console.error("Error fetching project: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const projectRef = doc(db, `sawmill/${sawmillId}/projects`, projectId);
      await updateDoc(projectRef, projectData);
      alert('Project updated successfully!');
      navigate('/projects'); // Navigate back to the projects list or dashboard
    } catch (error) {
      console.error("Error updating project: ", error);
      alert('Failed to update project. See console for details.');
    }
  };

  return (
    <div>
      {!isProjectIdSubmitted ? (
        <form onSubmit={handleProjectIdSubmit}>
          <label>
            Project ID:
            <input
              type="text"
              value={projectId}
              onChange={handleProjectIdChange}
              required
            />
          </label>
          <button type="submit">Load Project</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Edit Project</h3>
          {/* Form fields for editing project */}
          {/* ... */}
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
            <option value="sold">Sold</option>
            <option value="paused">Paused</option>
            <option value="with creator">With Creator</option>
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
          <button type="submit">Update Project</button>
        </form>
      )}
    </div>
  );
};

export default EditProjectForm;
