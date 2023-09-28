import { useSelector } from "react-redux";

const AsideHastag = () => {
  const state = useSelector((store) => store);

  const sortedTrend = state.trend?.slice().sort((a, b) => {
    return b.tweet_volume - a.tweet_volume;
  });
  return (
    <div>
      {sortedTrend?.slice(0, 15).map((hastag, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-b-slate-700 mb-2"
        >
          <p> {i + 1}-</p>
          <p className="text-start w-full ms-3">{hastag?.name}</p>
          <p>{hastag?.tweet_volume}</p>
        </div>
      ))}
    </div>
  );
};

export default AsideHastag;
