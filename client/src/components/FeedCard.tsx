import Image from "next/image";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
const FeedCard = () => {
  return (
    <section className="grid grid-cols-12 border-b border-gray-600/80 hover:bg-gray-800 p-4 ">
      <div className="col-span-1 ">
        <Image
          src="https://avatars.githubusercontent.com/u/116288316?v=4"
          width={50}
          height={50}
          className="rounded-full"
          alt="profile"
        />
      </div>
      <div className="col-span-11 ">
        <h3>Atif Ali</h3>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          doloremque, quos, voluptatum, quod dolorum nemo quidem quas quae
          voluptates autem iusto. Quisquam doloremque, quos, voluptatum, quod
          dolorum nemo quidem quas quae voluptates autem iusto.
        </p>
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
