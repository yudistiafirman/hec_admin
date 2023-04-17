export const stringSlicer = (string) => {
  if (string.length >= 45) {
    return string.slice(0, 45) + "...";
  } else {
    return string;
  }
};

export const cardDescSlicer = (string) => {
  if (string.length >= 60) {
    return string.slice(0, 60) + "...";
  } else {
    return string;
  }
};

export const cardTitleSlicer = (string) => {
  if (string.length >= 32) {
    return string.slice(0, 32) + "...";
  } else {
    return string;
  }
};
