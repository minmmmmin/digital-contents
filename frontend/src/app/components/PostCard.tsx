import Image from 'next/image';
import type { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="flex space-x-3 p-4 border-b border-gray-200">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src="/images/dummycat.png" // Using the same dummy image as avatar
            alt="user avatar"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
      </div>

      {/* Post content */}
      <div className="flex-1">
        {/* User Info */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-base text-black">{post.username}</span>
          <span className="text-xs text-gray-500">{post.location}</span>
        </div>

        {/* Post Body */}
        <p className="text-sm mt-1">{post.body}</p>

        {/* Post Image */}
        {post.imageUrl && (
          <div className="mt-3 rounded-2xl overflow-hidden">
            <Image
              src={post.imageUrl}
              alt="猫の画像"
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-start space-x-8 mt-3 text-gray-500">
          <button className="flex items-center space-x-1 hover:text-pink-500 cursor-pointer">
            <span role="img" aria-label="likes">❤️</span>
            <span>{post.likeCount}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
            <span role="img" aria-label="replies">💬</span>
            <span>{post.replies.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
