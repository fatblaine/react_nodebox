import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
  {
    id: 2024,
    question: "Who made this?",
    answer: "Ch Fan",
  },
  {
    id: 2025,
    question: "What are Fan's favorite sports?",
    answer: "Football and badminton",
  },
  {
    id: 2002,
    question: "Where does Fan graduate?",
    answer: "HIT",
  },
];

/**
 * 解决方法一：
 * 每个卡片的翻面状态是独立的，可以同时有多个卡片翻面。
 * FlashCards 组件渲染了一个卡片列表，每个卡片由 Card 组件表示。
 * 每个 Card 组件管理自己的状态 sid，用于跟踪是否被选中（翻面）。
 * 当点击一个卡片时，只有被点击的卡片会翻面。如果再次点击同一个卡片，它会翻回原来的面。
 * */

function FlashCards() {
  return (
    <div className="flashcards">
      {questions.map((q) => (
        <Card question={q} key={q.id} />
      ))}
    </div>
  );
}

function Card({ question }) {
  const [sid, setSid] = useState(null);

  function flipCard(id) {
    setSid(id === sid ? null : id); //如果当前id之前已经被选中了，意味着该卡片这次要翻回来；如果没有被选中，则这次要翻面。
  }

  return (
    <div
      key={question.id}
      onClick={() => flipCard(question.id)}
      className={question.id === sid ? "selected" : ""}
    >
      <p>{question.id === sid ? question.answer : question.question}</p>
    </div>
  );
}

/**
 * 解决方法二：
 * 一次只能有一个卡片翻面。点击新的卡片会使之前翻面的卡片翻回去。
 * FlashCards 组件本身管理一个状态 selectedId，用于跟踪当前选中的卡片 ID。
 * 所有卡片共享同一个状态，当点击任何一个卡片时，selectedId 会更新。
 * 如果点击已经翻面的卡片，它会翻回原来的面。如果点击另一个卡片，之前翻面的卡片会翻回原来的面，而新点击的卡片会翻面。
 */

// function FlashCards() {
//   const [selectedId, setSelectedId] = useState(null);

//   function handleClick(id) {
//     setSelectedId(id !== selectedId ? id : null);
//   }

//   return (
//     <div className="flashcards">
//       {questions.map((question) => (
//         <div
//           key={question.id}
//           onClick={() => handleClick(question.id)}
//           className={question.id === selectedId ? "selected" : ""}
//         >
//           <p>
//             {question.id === selectedId ? question.answer : question.question}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }
