import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../store/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted!");
  }

  async function handleShare(paste) {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error("Unable to share this note");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Share link copied!");
      } catch {
        toast.error("Unable to copy share link");
      }
    }
  }

  return (
    <div className="p-5">
      <input
        className="p-2 rounded-2xl min-w-150 my-5 border"
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div className="border rounded-xl p-4" key={paste._id}>
              <div className="font-bold text-xl">{paste.title}</div>

              <div className="my-3 whitespace-pre-wrap wrap-break-word">
                {paste.content}
              </div>

              <div className="flex flex-row flex-wrap gap-4">
                
                <button>
                <Link to={`/?pasteid=${paste._id}`}>
                  Edit
                </Link>
                </button>

                <button> 
                <Link to={`/pastes/${paste._id}`}>
                  View
                </Link>
                </button>
                
                <button onClick={() => handleDelete(paste._id)}>
                  Delete
                </button>

                <button onClick={() => {navigator.clipboard.writeText(paste?.content);
                  toast.success("copied to clipboard");
                }}>
                  Copy
                </button>

                <button onClick={() => handleShare(paste)}>
                  Share
                </button>
              </div>

              <div className="text-sm text-gray-500 mt-3">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p>No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
