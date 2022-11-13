import {
  BallTriangle,
  // Audio,
  // Dna,
  // Blocks,
  // MutatingDots,
  // Bars,
} from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center bg-[#283046] w-full min-h-screen">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#695CFE"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};
