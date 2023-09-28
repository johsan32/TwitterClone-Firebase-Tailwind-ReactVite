import { useSelector } from "react-redux";

const AsideFollowing = () => {
  const state = useSelector((store) => store.following);
  return (
    <div>
      {state?.slice(0, 15).map((following) => (
        <div
          key={following.id}
          className="flex items-center justify-start mb-3"
        >
          <img src={following?.img} className="w-12 rounded-full" />
          <div className="ms-3">
            <p className="text-start ">{following?.name}</p>
            <p className="text-start font-thin">
              @{following?.username.toLowerCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AsideFollowing;
