import { useSelector } from "react-redux";

const AsideFollowers = () => {
  const state = useSelector((store) => store.follower);
  return (
    <div>
      {state?.slice(0, 15).map((follow) => (
        <div key={follow?.id} className="flex items-center justify-start mb-3">
          <img src={follow?.img} className="w-12 rounded-full" />
          <div className="ms-3">
            <p className="text-start ">{follow?.name}</p>
            <p className="text-start font-thin">
              @{follow?.username.toLowerCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AsideFollowers;
