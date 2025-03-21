const YoutubeVideo = ({ videoUrl }: { videoUrl: string }) => {
  function getVideo() {
    // Se não contém "http", assume que já é um ID
    if (!videoUrl.startsWith('http')) {
      return `https://www.youtube.com/embed/${videoUrl}`;
    }

    try {
      const urlObj = new URL(videoUrl);
      const hostname = urlObj.hostname;
      let videoId = '';

      if (hostname.includes('youtube.com')) {
        videoId = new URLSearchParams(urlObj.search).get('v') || '';
      } else if (hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.substring(1).split('?')[0];
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } catch (error) {
      console.error('URL inválida:', videoUrl);
      return '';
    }
  }

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        className="w-full h-full"
        src={getVideo()}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeVideo;
