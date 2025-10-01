import MainLoader from "@/components/common/MainLoader";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <MainLoader />
    </div>
  );
}
