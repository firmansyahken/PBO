import React, { useEffect, useState } from "react";
import { Filter, Card, List, Header } from "../components";
import { useAuth } from "../context/AuthContext";
import { BASE_API } from "../utils/Constant";

const Home = () => {
  const { authUser } = useAuth();
  const [layout, setLayout] = useState("grid");
  const [category, setCategory] = useState("Semua");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    switch (category) {
      case "Semua":
        fetchAll();
        break;
      case "Direspon":
        fetchResponded();
      default:
        break;
    }
  }, [category, page]);

  const fetchAll = () => {
    fetch(`${BASE_API}/question?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authUser,
      },
    })
      .then((r) => r.json())
      .then((response) => {
        setData([...data, ...response.data]);
        if (response.links.next === null) {
          return setLoading(false);
        }
        setLoading(true);
      });
  };

  const fetchResponded = () => {
    fetch(`${BASE_API}/question/responded?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authUser,
      },
    })
      .then((r) => r.json())
      .then((response) => {
        setData([...data, ...response.data]);
        if (response.links.next === null) {
          return setLoading(false);
        }
        setLoading(true);
      });
  };

  const handleCategory = (category) => {
    setCategory(category);
    setData([]);
    setPage(1)
  };

  return (
    <>
      <div className="flex justify-between gap-x-12">
        <div className="hidden sm:block w-[30%]">
          <div className="sticky top-[100px]">
            <Filter
              category={category}
              onChangeCategory={(category) => handleCategory(category)}
            />
          </div>
        </div>
        <div className="w-full sm:w-[70%]">
          <Header onChangeLayout={(type) => setLayout(type)} />
          <div
            className={`mt-8 pb-24 grid ${
              layout == "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
            } gap-x-4 gap-y-6`}
          >
            {data.map((data, index) =>
              layout == "grid" ? (
                <Card
                  key={index}
                  id={data.id}
                  consultation={data.question}
                  date={data.time}
                  status={data.status}
                />
              ) : (
                <List
                  key={index}
                  id={data.id}
                  consultation={data.question}
                  date={data.time}
                  status={data.status}
                />
              )
            )}
          </div>
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

export default Home;
