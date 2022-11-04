import { Box } from "native-base";
import React, { useState, useCallback, useEffect } from "react";
import { View, Pressable } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoPlayer({ video, playing, size = 180 }) {
  const [isPlaying, setPlaying] = useState(playing);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!isPlaying && playing) {
      setPlaying(true);
    }
  }, [playing]);

  return (
    <Box
      style={{
        height: size,
        width: size * 1.77777777778,
        borderWidth: 1,
        marginRight: 15,
      }}
    >
      <YoutubePlayer
        height={size}
        play={playing}
        videoId={video.key}
        onChangeState={onStateChange}
      />
    </Box>
  );
}
