import React, { useState } from "react";
import { Article, FlashMessage, TextArea, Validation } from "../components";
import { useAuth } from "../context/AuthContext";
import { BASE_API } from "../utils/Constant";

const Create = () => {
  const { authUser } = useAuth();
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState("");
  const [active, setActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_API}/question/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authUser,
      },
      body: JSON.stringify({question: question}),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.message === "Success") {
          e.target.reset()
          return setActive(!active);
        }
        setError(response.question[0]);
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="pb-12 space-y-6">
              <h1 className="text-xl font-bold mb-12">Buat Konsultasi</h1>
              {active && (
                <FlashMessage type="success" message="Berhasil membuat konsultasi!" />
              )}
              <p className="text-md mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
                veniam! Pariatur, debitis! Assumenda, vero nisi.
              </p>
              <div>
                <TextArea
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Write Consultation.."
                  rows="10"
                />
                <Validation message={error && error} />
              </div>
              <button className="bg-black text-white px-8 py-2 text-md font-semibold">
                Kirim
              </button>
            </div>
          </form>
        </div>
        <div>
          <h1 className="text-xl font-bold mb-12 text-right">Artikel</h1>
          <Article />
        </div>
      </div>
    </>
  );
};

export default Create;
