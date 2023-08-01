export const getExternalRating = (kpRating, imdbRating) => {
  switch (true) {
    case !!kpRating:
      return kpRating + " / 10";
    case !!imdbRating:
      return imdbRating + " / 10";
    default: return null;
  }
}

export const getExternalVotes = (kpVotes, imdbVotes) => {
  switch (true) {
    case !!kpVotes:
      return kpVotes;
    case !!imdbVotes:
      return imdbVotes;
    default: return null;
  }
}
