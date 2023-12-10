import React from 'react'

const Article = () => {
    const articles = [
        {
            img: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Kesehatan Mental (Mental Health): Pengertian & Cara Menjaganya",
        },
        {
            img: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Sebagian Besar Orang Dewasa Pernah Alami Gangguan Kesehatan Mental",
        },
        {
            img: "https://images.unsplash.com/photo-1511297968426-a869b61af3da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Menjaga Kesehatan Mental Generasi Sandwich",
        }
    ]
  return (
    <>
        <div className="space-y-4">
            { articles.map((article, index) => (
                <div key={index} className="flex items-center gap-x-6 border-[1.5px] border-gray-300">
                    <img src={article.img} className="w-[100px] sm:w-[200px] h-[100px] sm:h-[150px] object-cover" alt="article"/>
                    <h2 className="pr-6">{article.title}</h2>
                </div>
            ))}
        </div>
    </>
  )
}

export default Article