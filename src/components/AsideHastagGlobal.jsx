import { useSelector } from "react-redux";

const AsideHastagGlobal = () => {
  const state = useSelector((store) => store);
  console.log(state);
  const globalArray = Object.values(state.global);

  return (
    <div>
      {globalArray.slice(0,20).map((hastag, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-b-slate-700 mb-2"
        >
          <p> {i + 1}-</p>
          <p className="text-start w-full ms-3">{hastag?.name}</p>
          <p>{hastag?.volume}</p>
        </div>
      ))}
    </div>
  );
};

export default AsideHastagGlobal;
