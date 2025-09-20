import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const Programmes = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProg, setEditingProg] = useState(null);
  const [newProg, setNewProg] = useState({ title: "", description: "", color: "#000000", icon: null });

  const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");

  // Fetch all programmes
  const fetchProgrammes = () => {
    axios
      .get(`${config.API_URL}/api/programmes`)
      .then((res) => {
        setProgrammes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching programmes:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProgrammes();
  }, []);

  // Save edited programme
  const handleSave = async (prog) => {
    try {
      await axios.put(`${config.API_URL}/api/programmes/${prog._id}`, {
        title: prog.title,
        description: prog.description,
        color: prog.color,
      });
      fetchProgrammes();
      setEditingProg(null);
      alert("Programme updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update programme!");
    }
  };

  // Upload/replace icon
  const handleIconUpload = async (e, prog) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${config.API_URL}/api/programmes/${prog._id}/upload-icon`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      fetchProgrammes();
      alert("Icon uploaded!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload icon!");
    }
  };

  // Delete programme
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this programme?")) return;
    try {
      await axios.delete(`${config.API_URL}/api/programmes/${id}`);
      fetchProgrammes();
      alert("Programme deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete programme!");
    }
  };

  // Add new programme
  const handleAdd = async () => {
    if (!newProg.title || !newProg.description) {
      alert("Title and description are required!");
      return;
    }

    try {
      const res = await axios.post(`${config.API_URL}/api/programmes`, {
        title: newProg.title,
        description: newProg.description,
        color: newProg.color,
      });

      const createdProg = res.data;

      if (newProg.icon) {
        const formData = new FormData();
        formData.append("file", newProg.icon);
        await axios.post(`${config.API_URL}/api/programmes/${createdProg._id}/upload-icon`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchProgrammes();
      setNewProg({ title: "", description: "", color: "#000000", icon: null });
      alert("Programme added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add programme!");
    }
  };

  if (loading) return <div className="text-center py-10 text-white">Loading programmes...</div>;
  if (!programmes.length) return <div className="text-center py-10 text-white">No programmes found.</div>;

  return (
    <section className="py-12 text-center px-6 bg-heroBG">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-20 border-b-2 border-green-700 inline-block">
        OUR PROGRAMMES
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-auto max-w-6xl mx-auto">
        {programmes.map((prog) => (
          <div key={prog._id} className="relative flex flex-col items-center text-left bg-transparent rounded-lg p-4 border border-gray-700 hover:shadow-md transition-all">
            {editingProg === prog._id ? (
              <>
                <input
                  type="text"
                  value={prog.title}
                  onChange={(e) =>
                    setProgrammes((prev) =>
                      prev.map((p) => (p._id === prog._id ? { ...p, title: e.target.value } : p))
                    )
                  }
                  className="w-full mb-2 px-2 py-1 rounded border text-black"
                />
                <textarea
                  value={prog.description}
                  onChange={(e) =>
                    setProgrammes((prev) =>
                      prev.map((p) => (p._id === prog._id ? { ...p, description: e.target.value } : p))
                    )
                  }
                  className="w-full mb-2 px-2 py-1 rounded border text-black"
                />
                <input
                  type="color"
                  value={prog.color}
                  onChange={(e) =>
                    setProgrammes((prev) =>
                      prev.map((p) => (p._id === prog._id ? { ...p, color: e.target.value } : p))
                    )
                  }
                  className="w-full mb-2 h-10 rounded"
                />
                <input type="file" accept="image/*" onChange={(e) => handleIconUpload(e, prog)} className="mb-2" />
                <div className="flex gap-2">
                  <button onClick={() => handleSave(prog)} className="px-3 py-1 bg-green-600 text-white rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingProg(null)} className="px-3 py-1 bg-gray-500 text-white rounded">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={prog.icon ? `${prog.icon}` : "https://via.placeholder.com/56"}
                  alt={prog.title}
                  className="w-14 h-14 object-contain mb-2"
                />
                <h3 className="text-xl font-extrabold mb-1" style={{ color: prog.color }}>
                  {prog.title}
                </h3>
                <p className="text-white text-sm mb-2">{prog.description}</p>

                {isAdmin && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setEditingProg(prog._id)} className="px-3 py-1 bg-blue-600 text-white rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(prog._id)} className="px-3 py-1 bg-red-600 text-white rounded">
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Admin: Add new programme */}
      {isAdmin && (
        <div className="mt-10 bg-white p-4 rounded-lg shadow-md max-w-md mx-auto text-left">
          <h3 className="text-lg font-bold mb-2">Add New Programme</h3>
          <input
            type="text"
            placeholder="Title"
            value={newProg.title}
            onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <textarea
            placeholder="Description"
            value={newProg.description}
            onChange={(e) => setNewProg({ ...newProg, description: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <input
            type="color"
            value={newProg.color}
            onChange={(e) => setNewProg({ ...newProg, color: e.target.value })}
            className="w-full mb-2 h-10 rounded"
          />
          <input type="file" accept="image/*" onChange={(e) => setNewProg({ ...newProg, icon: e.target.files[0] })} className="mb-2" />
          <button onClick={handleAdd} className="px-4 py-2 bg-green-700 text-white rounded">
            Add Programme
          </button>
        </div>
      )}
    </section>
  );
};

export default Programmes;
