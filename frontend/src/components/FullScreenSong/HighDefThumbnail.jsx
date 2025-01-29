import { useState, useEffect } from 'react';

export function HighDefThumbnail({ videoId }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when the videoId changes
    setIsLoading(true);
  }, [videoId]);

  return (
    <div className="relative overflow-hidden w-[429px] h-[430px] mx-auto rounded-lg">
      {isLoading ? (
        <div role="status" class="w-full h-full animate-pulse">
          <div class="w-full h-full bg-gray-100 rounded-lg dark:bg-gray-400  mb-4"></div>
        </div>
      ) : null}
      <img
        src={`https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`}
        alt={`Thumbnail for ${videoId}`}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
