import { Box, Row, Text } from "native-base";
import { useMovieGenres } from "../queries";

const Genres = ({ genres }) => {
  const { data: genreList, isLoading: genresLoading } = useMovieGenres();

  if (!genreList) return null; // @todo add a loader

  return (
    <Row space="2" mt="4">
      {genres.slice(0, 3).map((id: number) => {
        const genre = genreList.find((g) => g.id === id);

        if (!genre) return null;
        return (
          <Box
            key={`genre_${id}`}
            borderWidth={"1"}
            borderColor={"gray.300"}
            borderRadius="full"
            py="1"
            px="2"
          >
            <Text fontSize="xs" fontWeight="semibold">
              {genre.name}
            </Text>
          </Box>
        );
      })}
    </Row>
  );
};

export default Genres;
