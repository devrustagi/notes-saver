import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const paste = useSelector((state) =>
    state.paste.pastes.find((p) => p._id === id)
  );

  if (!paste) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Note not found!</h2>
        <p className="mt-2">
          This note is not available in your saved pastes.
        </p>
        <button
          onClick={() => navigate("/pastes")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Pastes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {paste.title}
      </h1>

      <div className="border rounded-xl p-5 whitespace-pre-wrap wrap-break-word">
        {paste.content}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Created: {new Date(paste.createdAt).toLocaleString()}
      </p>

      <button
        onClick={() => navigate("/pastes")}
        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Back to Pastes
      </button>
    </div>
  );
};

export default ViewPaste;
