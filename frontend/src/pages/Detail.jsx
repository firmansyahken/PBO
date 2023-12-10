import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment, TextArea } from "../components";
import { useAuth } from "../context/AuthContext";
import { BASE_API } from "../utils/Constant";

const Detail = () => {
  const { authUser } = useAuth();
  const params = useParams();
  const id = params.id;

  const [question, setQuestion] = useState([]);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch(`${BASE_API}/question/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authUser,
      },
    })
      .then((r) => r.json())
      .then((response) => {
        setQuestion(response.data[0]);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${BASE_API}/answer/${id}?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authUser,
      },
    })
      .then((r) => r.json())
      .then((response) => {
        setComments([...comments, ...response.data]);
        if (response.links.next === null) {
          return setLoading(false);
        }
        setLoading(true);
      });
  }, [id, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_API}/answer/${id}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authUser,
      },
      body: JSON.stringify({ answer: answer }),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.message === "Success") {
          setComments([...comments, response.data])
          e.target.reset();
        }
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 pb-32">
        <div className="sticky">
          <div className="sticky top-[100px]">
            <div className="py-6 px-6 border-[1.5px] border-gray-300 mb-4">
              <h2 className="text-md font-semibold mb-4">{question && question.name}</h2>
              <p className="text-sm sm:text-md">
                {question && question.question}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-400">
                  {question && question.date}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} method="post">
              <TextArea
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write comment..."
                rows="3"
              />
              <button
                className="bg-black text-white text-sm px-6 py-2 mt-2"
                type="submit"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
        <div className="px-4 sm:px-0 space-y-12 mt-12 sm:mt-0">
          <div>
            <h1 className="text-xl font-bold">Response</h1>
          </div>
          {comments &&
            comments.map((comment, index) => (
              <Comment
                key={index}
                name={comment.name}
                answer={comment.answer}
                photo={comment.photo}
                date={comment.time}
              />
            ))}
          {loading && (
            <div className="mx-auto w-full text-center pb-4">
              <button
                onClick={() => setPage(page + 1)}
                className="bg-black text-white text-sm py-2 px-6"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
