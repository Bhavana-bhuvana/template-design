import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const ProgrammeDetail = () => {
  const { id } = useParams();
  const [programme, setProgramme] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/programmes/${id}`)
      .then((res) => setProgramme(res.data))
      .catch((err) => console.error("Error fetching programme:", err));
  }, [id]);

  if (!programme) return <p>Loading...</p>;

  return (
    <div className="p-8 text-center">
      <img
        src={`${config.API_URL}/uploads/icons/${programme.icon}`}
        alt={programme.title}
        className="w-20 h-20 mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold" style={{ color: programme.color }}>
        {programme.title}
      </h1>
      <p className="mt-4 text-lg">{programme.description}</p>
    </div>
  );
};

export default ProgrammeDetail;

