import axios from "axios";

export interface YTVideoInterface {
  videoId: string;
  title: string;
  runTime: string;
  channelName: string;
  channelEndPoint: string;
  viewCount: string;
  publishedTime: string;
}

interface YTInitialDataInterface {
  contents: {
    twoColumnSearchResultsRenderer: {
      primaryContents: {
        sectionListRenderer: {
          contents: VideoRenderer[];
        };
      };
    };
  };
}

interface VideoRenderer {
  videoId: string;
  title: {
    runs: {
      text: string;
    }[];
  };
  lengthText: {
    simpleText: string;
  };
  ownerText: {
    runs: {
      text: string;
      navigationEndpoint: {
        commandMetadata: {
          webCommandMetadata: {
            url: string;
          };
        };
      };
    }[];
  };
  viewCountText: {
    simpleText: string;
  };
  publishedTimeText: {
    simpleText: string;
  };
}

class YoutubeService {
  private axios = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  private youtubeBaseUrl = "https://www.youtube.com/results?search_query=";

  private encodedSearchUrl = (slug: string) => {
    // sample slug: "two-sum"
    const url = this.youtubeBaseUrl + "leetcode+" + slug.split("-").join("+");
    return encodeURI(url);
  };

  public getYoutubeInitialData = async (searchTerm: string) => {
    const sourcePage = await this.axios.get(this.encodedSearchUrl(searchTerm));
    const ytInitialData = sourcePage.data.split("var ytInitialData =");
    if (ytInitialData && ytInitialData.length > 1) {
      const data = await ytInitialData[1].split("</script>")[0].slice(0, -1);
      const parsedJsonData = JSON.parse(data);

      return parsedJsonData.contents.twoColumnSearchResultsRenderer
        .primaryContents.sectionListRenderer.contents[0].itemSectionRenderer
        .contents;

      //   contents.twoColumnSearchResultsRenderer
      //         .primaryContents.sectionListRenderer.contents[0].itemSectionRenderer
      //         .contents;
    }

    return null;
  };
  public getVideos = async (searchTerm: string) => {
    if (!searchTerm) {
      return [];
    }

    const ytInitialData = await this.getYoutubeInitialData(searchTerm);
    if (!ytInitialData) {
      return [];
    }
    const videos: YTVideoInterface[] = [];
    ytInitialData.forEach((item: any) => {
      if (item.videoRenderer) {
        const video = item.videoRenderer;
        videos.push({
          videoId: video.videoId,
          title: video.title.runs[0].text,
          runTime: video.lengthText.simpleText,
          channelName: video.ownerText.runs[0].text,
          channelEndPoint:
            video.ownerText.runs[0].navigationEndpoint.commandMetadata
              .webCommandMetadata.url,
          viewCount: video.viewCountText.simpleText,
          publishedTime: video.publishedTimeText.simpleText,
        });
      }
    });
    return videos;
  };
}

const youtubeService = new YoutubeService();

export default youtubeService;
