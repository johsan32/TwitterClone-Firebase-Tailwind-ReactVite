
import moment from "moment";
import "moment/locale/tr";

const Comments = ({ comments, modal }) => {
console.log(comments);
  return (
    <div className="flex flex-col gap-3 p-3  border-gray-800">
      {!comments.length > 0 && (
        <div
          className="flex w-full text-xl bg-[#242729] rounded-lg cursor-pointer"
          onClick={() => modal(true)}
        >
          <p className="text-gray-400 text-center w-full  ">
            There are no comments on the tweet yet.
          </p>
        </div>
      )}
      {comments?.map((comment, i) => (
        <>
          <div className=" p-3 rounded-lg bg-[#242729]">
            <div key={i} className="flex w-full gap-3 ">
              <img
                className="w-8 h-8 rounded-full"
                src={comment?.user.userPhoto}
              />
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <p className="font-bold hidden md:block">
                      {comment?.user.userName}
                    </p>
                    <p className="text-gray-400">
                      @{comment?.user.userName.toLowerCase()}
                    </p>

                    <p className="text-gray-500">
                    {moment(comment?.createdAt?.toDate()).locale("tr").fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3 mx-5 w-full">
              <p>{comment?.textContent}</p>
            </div>
            <div className="my-3 mx-5 w-full">
              {comment.imageContent && (
                <div className="w-[200px] h-[150px]">
                  <img
                    className="rounded-lg mt-3 w-full h-full object-contain "
                    src={comment.imageContent}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Comments;
