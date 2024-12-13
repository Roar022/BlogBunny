import { useRef, useState } from "react";

const FaqsCard = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div className="space-y-3 mt-2 overflow-hidden border-b" key={idx}>
      <h4
        onClick={handleOpenAnswer}
        className="cursor-pointer  flex items-center justify-between text-lg text-gray-700 font-medium"
      >
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-gray-500">
            <input
              type="text"
              placeholder="label"
              onChange={(e)=> props.setLabel(e.target.value)}
              value={props.label}
              className="focus:outline-none border-b-2   border-indigo-400 px-2  text-base"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

 const  Accordian = ({label, setLabel}) => {
  const faqsList = [
    {
      q: "Labels",
    },
  ];

  return (
    <section className="leading-relaxed px-3 md:block hidden  mt-4 w-[15%]">
      <div className="mt-8 w-full ">
        {faqsList.map((item, idx) => (
          <FaqsCard idx={idx} key={idx} faqsList={item} label={label} setLabel={setLabel} />
        ))}
      </div>
    </section>
  );
};
export  default Accordian;
