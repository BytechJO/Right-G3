const WrongMark = ({
  top = "top-1/2",
  left = "left-full",
  marginLeft = "ml-2",
}) => {
  return (
    <div
      className={`absolute ${top} ${left} ${marginLeft} -translate-y-1/2
      w-[22px] h-[22px]
rounded-full
bg-[red] text-white
flex items-center justify-center
text-[12px] font-bold
border-2 border-white
shadow-[0_2px_6px_rgba(0,0,0,0.2)]
pointer-events-none`}
    >
      ✕
    </div>
  );
};

export default WrongMark;
