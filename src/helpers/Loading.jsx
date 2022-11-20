import {
  BallTriangle,
  Audio,
  // Dna,
  // Blocks,
  // MutatingDots,
  // Bars,
} from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="flex fixed left-0 top-0 justify-center flex-col gap-3 items-center bg-white w-full min-h-screen">
      <Audio
        height={100}
        width={100}
        radius={5}
        color="#695CFE"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />

      <h4>Cargando ...</h4>


    </div>
  );
};
