import Image from "next/image";
import Link from "next/link";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
const FeedCard = ({ tweet }: any) => {
  return (
    <section className="grid grid-cols-12 max-md:space-x-4 border-b border-gray-600/80 hover:bg-gray-800 p-4 ">
      <div className="col-span-1 ">
        <Link href={"/profile/" + tweet.author.id}>
          <Image
            src={tweet.author.profileImage}
            width={40}
            height={40}
            className="rounded-full"
            alt="profile"
          />
        </Link>
      </div>
      <div className="col-span-11 ">
        <Link href={"/profile/" + tweet.author.id}>
          <h3>
            {tweet.author.firstName} {tweet.author.lastName}
          </h3>
        </Link>
        <p className="text-sm">{tweet.content}</p>
        {tweet.imageURL && (
          <Image src={tweet.imageURL} width={400} height={400} alt="image" />
        )}
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
