import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const PressReleaseDetails = () => {
  const { id } = useParams();
  const [pressRelease, setPressRelease] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/press-releases/${id}`)
      .then((res) => setPressRelease(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pressRelease) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img
        src={release.imageUrl
                    ? `${config.API_URL}/uploads/${release.imageUrl}`
                    : "https://via.placeholder.com/300x200?text=No+Image"}
        alt={pressRelease.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{pressRelease.title}</h1>
      <p className="text-green-700"> • {pressRelease.date}</p>
      <div className="mt-4 text-gray-800">{pressRelease.content}</div>
    </div>
  );
};

export default PressReleaseDetails;

