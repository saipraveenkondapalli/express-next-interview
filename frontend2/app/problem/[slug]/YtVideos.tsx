"use client";

import React from "react";
import { Box, Center, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { YTVideoInterface } from "@/app/services/youtube";
import { BsEyeFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import { GrChannel } from "react-icons/gr";
import { Link } from "@chakra-ui/next-js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface IYtVideosProps {
  name: string;
}

function YtVideos({ name }: IYtVideosProps) {
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["youtube", name],
    queryFn: async ({ signal }) => {
      const response = await axios.get<YTVideoInterface[]>("/youtube/data", {
        signal,
        params: { name },
      });
      return response.data;
    },
  });

  return (
    <>
      {isLoading && (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      <VStack>
        {videos &&
          videos.map((video, index) => {
            return (
              <Box mb={5} key={`YTVideo-${index}`}>
                <iframe
                  width={916}
                  height={515}
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <HStack mt={2}>
                  <b>{video.title} </b> <BsEyeFill />
                  <Text>{video.viewCount} </Text>
                  <FaClock />
                  <Text>{video.publishedTime}</Text>
                  <GrChannel />
                  <Link
                    href={`https://youtube.com/${video.channelEndPoint}`}
                    isExternal
                    rel={"noreferrer noopener"}
                  >
                    {video.channelName}
                  </Link>
                </HStack>
              </Box>
            );
          })}
      </VStack>
    </>
  );
}

export default YtVideos;
