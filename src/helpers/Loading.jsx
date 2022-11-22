import {
  BallTriangle,
  Audio,
  RotatingSquare,
  // Dna,
  // Blocks,
  // MutatingDots,
  // Bars,
} from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="flex fixed left-0 top-0 justify-center flex-col gap-3 items-center bg-white w-full min-h-screen">
      <RotatingSquare
        height="100"
        width="100"
        color="#695cfe"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}

      />

      <h4>Cargando ...</h4>
    </div>
  );
};
