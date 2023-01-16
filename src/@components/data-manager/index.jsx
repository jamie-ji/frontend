// ** to replace _
const nameHandler = (val) => {
    if (val.includes("_")) {
      const split = val.split("_");
      const spliced = split
        .slice(0, -1)
        .map((i) => i)
        .join(" ");
      return spliced;
    } else {
      return val;
    }
  },
  CustomOption = ({ innerProps, data }) => (
    <div {...innerProps}>
      <div className="p-3 pt-1 pb-1 select_option first_uppercase">
        {data.label}
      </div>
    </div>
  );

export { nameHandler, CustomOption };
