import Image from "next/image";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
const FeedCard = ({ tweet }) => {
  return (
    <section className="grid grid-cols-12 border-b border-gray-600/80 hover:bg-gray-800 p-4 ">
      <div className="col-span-1 ">
        <Image
          src={tweet.author.profileImage}
          width={40}
          height={40}
          className="rounded-full"
          alt="profile"
        />
      </div>
      <div className="col-span-11 ">
        <h3>
          {tweet.firstName} {tweet.lastName}
        </h3>
        <p className="text-sm">{tweet.content}</p>
        <div className="flex justify-between gap-4 mt-4   w-[80%]">
          <div>
            <FaRegComment />
          </div>
          <div>
            <AiOutlineRetweet />
          </div>
          <div>
            <FaRegHeart />
          </div>
          <div>
            <GoDownload />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedCard;
