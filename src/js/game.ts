interface Props {
  context: CanvasRenderingContext2D;
}

export const Game = ({ context }: Props) => {
  const userInfo = new Proxy({ score: 0, lines: 0, level: 0 }, {});

  const reset = () => {
    userInfo.score = 0;
    userInfo.level = 0;
    userInfo.lines = 0;
  };

  reset();
};
