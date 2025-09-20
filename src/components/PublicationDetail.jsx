import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

const PublicationDetail = () => {
  const { id } = useParams(); //  get publication id from URL
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/publications/${_id}`) //  fetch single publication
      .then((res) => {
        setPublication(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching publication:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading publication...</div>;
  if (!publication) return <div className="text-center py-10">Publication not found.</div>;

  return (
    <div className="min-h-screen bg-heroBG py-10 px-6 sm:px-12 lg:px-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition"
      >
        ← Back
      </button>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
        {/* Image */}
        <img
          src={`${config.API_URL}/uploads/publications/${publication.imageUrl}`}
          alt={publication.title}
          className="w-full h-80 object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-coffee-brown mb-4">{publication.title}</h1>
          <p className="text-gray-700 text-base leading-relaxed">{publication.description}</p>

          {/* Optional extra fields if you add later */}
          {publication.author && (
            <p className="mt-4 text-sm text-gray-600">
              <span className="font-semibold">Author:</span> {publication.author}
            </p>
          )}
          {publication.date && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Published on:</span> {new Date(publication.date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;

